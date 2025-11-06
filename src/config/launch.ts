/**
 * LAUNCH CONFIGURATION
 * 
 * Central configuration for the $1TAP token launch.
 * Update this file to switch between pre-launch and launch modes.
 * 
 * IMPORTANT: Set isLaunched to TRUE on launch day (Jour J)
 */

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
 * MAIN LAUNCH CONFIGURATION
 * 
 * UPDATE THIS OBJECT ON LAUNCH DAY
 */
export const LAUNCH_CONFIG: LaunchConfig = {
  // ============================================
  // 🚨 CHANGE THIS TO TRUE ON LAUNCH DAY (Jour J)
  // ============================================
  isLaunched: false,
  
  // Launch Date (UTC timestamp)
  // Example: "2025-01-15T14:00:00Z" for Jan 15, 2025 at 2 PM UTC
  launchDate: "2025-01-20T14:00:00Z",
  
  // Contract & Trading Links
  contractAddress: "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8",
  buyLink: "https://app.uniswap.org/#/swap?outputCurrency=0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8&chain=base",
  chartLink: "https://dexscreener.com/base/0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8",
  
  // ============================================
  // AUDIT CONFIGURATION
  // ============================================
  // UPDATE THESE FIELDS WHEN AUDIT IS COMPLETED (Semaine -1)
  audit: {
    completed: false, // Set to TRUE when audit report received
    auditor: null, // e.g., "CertiK", "Solidproof", "HashEx"
    score: null, // e.g., "96/100"
    reportUrl: null, // e.g., "ipfs://Qm..." or direct link
    date: null, // e.g., "2025-01-10"
  },
  
  // ============================================
  // LP LOCK CONFIGURATION
  // ============================================
  // UPDATE THESE FIELDS WHEN LP IS LOCKED (Semaine -1, Jour -5)
  lpLock: {
    locked: false, // Set to TRUE when LP is locked
    platform: "Team.Finance",
    lockUrl: "https://www.team.finance/view-coin/0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8?name=ONETAP&symbol=ONETAP",
    amount: "95%", // Percentage of LP locked
    unlockDate: null, // e.g., "2025-07-20T14:00:00Z" (6 months minimum)
  },
};

/**
 * Helper functions
 */
export const isLaunched = () => LAUNCH_CONFIG.isLaunched;
export const isAuditCompleted = () => LAUNCH_CONFIG.audit.completed;
export const isLPLocked = () => LAUNCH_CONFIG.lpLock.locked;

/**
 * Get time remaining until launch
 * Returns null if already launched
 */
export const getTimeUntilLaunch = (): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} | null => {
  if (LAUNCH_CONFIG.isLaunched) return null;
  
  const now = new Date();
  const launch = new Date(LAUNCH_CONFIG.launchDate);
  const diff = launch.getTime() - now.getTime();
  
  if (diff <= 0) return null;
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};
