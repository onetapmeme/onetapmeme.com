// IP Geolocation utility for language detection.
// Policy: FR-speaking → FR. DE-speaking (DE, AT, LI) → DE. Everywhere else → EN.
// Manual user choice (saved in localStorage) ALWAYS overrides auto-detection.

export interface GeolocationData {
  country_code: string;
  country_name: string;
  city?: string;
  timezone?: string;
}

const SUPPORTED_LANGS = ['en', 'fr', 'de', 'es', 'ru', 'zh'] as const;
const STORAGE_KEY = '1tap-language';

// Francophone countries / regions.
const FRENCH_COUNTRIES = new Set([
  'FR', 'BE', 'LU', 'MC',
  'CA', // Canada (FR-CA fallback)
  'GP', 'MQ', 'GF', 'RE', 'YT', 'PM', 'NC', 'PF', 'WF', 'BL', 'MF',
  'CI', 'SN', 'CM', 'CD', 'CG', 'GA', 'BJ', 'BF', 'ML', 'NE', 'TG', 'MG', 'TN', 'DZ', 'MA', 'HT',
]);

// German-speaking countries — auto-default to DE.
const GERMAN_COUNTRIES = new Set([
  'DE', // Germany
  'AT', // Austria
  'LI', // Liechtenstein
]);

// Switzerland is multilingual — default to DE (largest linguistic group) unless
// browser language hints French.
const SWISS = 'CH';

type AutoLang = 'fr' | 'en' | 'de';

const browserHintsFrench = (): boolean => (navigator.language || '').toLowerCase().startsWith('fr');

export const detectLanguageFromIP = async (): Promise<AutoLang | null> => {
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

    let lang: AutoLang = 'en';
    if (FRENCH_COUNTRIES.has(country)) lang = 'fr';
    else if (GERMAN_COUNTRIES.has(country)) lang = 'de';
    else if (country === SWISS) lang = browserHintsFrench() ? 'fr' : 'de';

    console.log(`IP geolocation: ${country || 'unknown'} → ${lang}`);
    return lang;
  } catch (error) {
    console.error('IP geolocation detection failed:', error);
    return null;
  }
};

const browserFallback = (): AutoLang => {
  const browserLang = (navigator.language || 'en').toLowerCase();
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('de')) return 'de';
  return 'en';
};

export const getLanguageWithGeolocation = async (): Promise<string> => {
  // 1. Manual override always wins.
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) {
    console.log(`Using saved language preference: ${saved}`);
    return saved;
  }

  // 2. IP-based auto-detect (FR / DE / EN).
  const ipLang = await detectLanguageFromIP();
  if (ipLang) return ipLang;

  // 3. Browser fallback.
  return browserFallback();
};
