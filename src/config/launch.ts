/**
 * LAUNCH CONFIGURATION
 * 
 * Central configuration for the $1TAP token launch.
 * Now managed through the Admin Dashboard with Supabase backend.
 * 
 * IMPORTANT: Use the Admin Dashboard (/admin) to update launch settings
 */

import { supabase } from '@/integrations/supabase/client';

export interface LaunchConfig {
  // Launch Status
  isLaunched: boolean;
  launchDate: string; // ISO 8601 format (UTC)
  
  // Contract & Links
  contractAddress: string;
  buyLink: string;
  chartLink: string;
  
  // Security Proofs
  audit: {
    completed: boolean;
    auditor: string | null;
    score: string | null;
    reportUrl: string | null;
    date: string | null;
  };
  
  lpLock: {
    locked: boolean;
    platform: string;
    lockUrl: string;
    amount: string;
    unlockDate: string | null; // ISO 8601 format
  };
}

/**
 * DEFAULT LAUNCH CONFIGURATION (Fallback)
 * 
 * Used when database is not available
 */
const DEFAULT_CONFIG: LaunchConfig = {
  isLaunched: false,
  launchDate: "2025-01-20T14:00:00Z",
  contractAddress: "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8",
  buyLink: "https://app.uniswap.org/#/swap?outputCurrency=0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8&chain=base",
  chartLink: "https://dexscreener.com/base/0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8",
  audit: {
    completed: false,
    auditor: null,
    score: null,
    reportUrl: null,
    date: null,
  },
  lpLock: {
    locked: false,
    platform: "Team.Finance",
    lockUrl: "https://www.team.finance/view-coin/0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8?name=ONETAP&symbol=ONETAP",
    amount: "95%",
    unlockDate: null,
  },
};

// Cache for the config to avoid multiple DB calls
let cachedConfig: LaunchConfig | null = null;
let lastFetch = 0;
const CACHE_DURATION = 30000; // 30 seconds

/**
 * MAIN LAUNCH CONFIGURATION
 * 
 * Fetches from Supabase database with fallback to defaults
 * Use the Admin Dashboard (/admin) to update these values
 */
export const getLaunchConfig = async (): Promise<LaunchConfig> => {
  // Return cached config if still valid
  const now = Date.now();
  if (cachedConfig && (now - lastFetch) < CACHE_DURATION) {
    return cachedConfig;
  }

  try {
    const { data, error } = await supabase
      .from('launch_config')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    if (data) {
      cachedConfig = {
        isLaunched: data.is_launched,
        launchDate: data.launch_date,
        contractAddress: data.contract_address,
        buyLink: data.buy_link,
        chartLink: data.chart_link,
        audit: {
          completed: data.audit_completed,
          auditor: data.audit_auditor,
          score: data.audit_score,
          reportUrl: data.audit_report_url,
          date: data.audit_date,
        },
        lpLock: {
          locked: data.lp_locked,
          platform: data.lp_platform,
          lockUrl: data.lp_lock_url,
          amount: data.lp_amount,
          unlockDate: data.lp_unlock_date,
        },
      };
      lastFetch = now;
      return cachedConfig;
    }
  } catch (error) {
    console.error('Error fetching launch config:', error);
  }

  // Fallback to default config
  return DEFAULT_CONFIG;
};

// Synchronous version for backward compatibility (uses cached or default)
export const LAUNCH_CONFIG = cachedConfig || DEFAULT_CONFIG;

/**
 * Helper functions (async versions that fetch from DB)
 */
export const isLaunched = async () => {
  const config = await getLaunchConfig();
  return config.isLaunched;
};

export const isAuditCompleted = async () => {
  const config = await getLaunchConfig();
  return config.audit.completed;
};

export const isLPLocked = async () => {
  const config = await getLaunchConfig();
  return config.lpLock.locked;
};

/**
 * Clear the cache (useful after updates)
 */
export const clearConfigCache = () => {
  cachedConfig = null;
  lastFetch = 0;
};

/**
 * Get time remaining until launch
 * Returns null if already launched
 */
export const getTimeUntilLaunch = async (): Promise<{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} | null> => {
  const config = await getLaunchConfig();
  
  if (config.isLaunched) return null;
  
  const now = new Date();
  const launch = new Date(config.launchDate);
  const diff = launch.getTime() - now.getTime();
  
  if (diff <= 0) return null;
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};
