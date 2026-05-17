// IP Geolocation utility for language detection.
// Policy: French-speaking regions → FR. Everywhere else → EN.
// Manual user choice (saved in localStorage) ALWAYS overrides auto-detection.

export interface GeolocationData {
  country_code: string;
  country_name: string;
  city?: string;
  timezone?: string;
}

const SUPPORTED_LANGS = ['en', 'fr', 'es', 'ru', 'zh'] as const;
const STORAGE_KEY = '1tap-language';

// Francophone countries / regions where we default to French.
const FRENCH_COUNTRIES = new Set([
  'FR', // France
  'BE', // Belgium
  'CH', // Switzerland
  'LU', // Luxembourg
  'MC', // Monaco
  'CA', // Canada (FR-CA fallback; users in Anglo-Canada can switch manually)
  'GP', 'MQ', 'GF', 'RE', 'YT', 'PM', 'NC', 'PF', 'WF', 'BL', 'MF', // FR overseas
  'CI', 'SN', 'CM', 'CD', 'CG', 'GA', 'BJ', 'BF', 'ML', 'NE', 'TG', 'MG', 'TN', 'DZ', 'MA', 'HT',
]);

export const detectLanguageFromIP = async (): Promise<'fr' | 'en' | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      console.warn('IP geolocation request failed:', response.status);
      return null;
    }
    const data: GeolocationData = await response.json();
    const country = (data.country_code || '').toUpperCase();
    const lang: 'fr' | 'en' = FRENCH_COUNTRIES.has(country) ? 'fr' : 'en';
    console.log(`IP geolocation: ${country || 'unknown'} → ${lang}`);
    return lang;
  } catch (error) {
    console.error('IP geolocation detection failed:', error);
    return null;
  }
};

const browserFallback = (): 'fr' | 'en' => {
  const browserLang = (navigator.language || 'en').toLowerCase();
  return browserLang.startsWith('fr') ? 'fr' : 'en';
};

export const getLanguageWithGeolocation = async (): Promise<string> => {
  // 1. Manual override always wins.
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) {
    console.log(`Using saved language preference: ${saved}`);
    return saved;
  }

  // 2. IP-based auto-detect (FR vs EN only).
  const ipLang = await detectLanguageFromIP();
  if (ipLang) return ipLang;

  // 3. Browser fallback (FR family → fr, everything else → en).
  return browserFallback();
};
