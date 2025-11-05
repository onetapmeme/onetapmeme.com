// IP Geolocation utility for language detection
export interface GeolocationData {
  country_code: string;
  country_name: string;
  city?: string;
  timezone?: string;
}

const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  // French-speaking countries
  FR: 'fr',
  BE: 'fr', // Belgium (French)
  CH: 'fr', // Switzerland (French)
  CA: 'fr', // Canada (French)
  LU: 'fr', // Luxembourg
  MC: 'fr', // Monaco
  
  // Spanish-speaking countries
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  PE: 'es',
  VE: 'es',
  CL: 'es',
  EC: 'es',
  GT: 'es',
  CU: 'es',
  BO: 'es',
  DO: 'es',
  HN: 'es',
  PY: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  UY: 'es',
  
  // Russian-speaking countries
  RU: 'ru',
  BY: 'ru', // Belarus
  KZ: 'ru', // Kazakhstan
  KG: 'ru', // Kyrgyzstan
  UA: 'ru', // Ukraine (many Russian speakers)
  
  // Chinese-speaking regions
  CN: 'zh',
  TW: 'zh',
  HK: 'zh',
  SG: 'zh', // Singapore (Chinese)
  MO: 'zh', // Macau
};

export const detectLanguageFromIP = async (): Promise<string | null> => {
  try {
    // Using ipapi.co free tier (1,000 requests/day, no API key needed)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('IP geolocation request failed:', response.status);
      return null;
    }

    const data: GeolocationData = await response.json();
    const countryCode = data.country_code;

    // Map country code to language
    const suggestedLanguage = COUNTRY_TO_LANGUAGE[countryCode];
    
    if (suggestedLanguage) {
      console.log(`IP geolocation: ${countryCode} → ${suggestedLanguage}`);
      return suggestedLanguage;
    }

    // Default to English for unmapped countries
    console.log(`IP geolocation: ${countryCode} → en (fallback)`);
    return 'en';
  } catch (error) {
    console.error('IP geolocation detection failed:', error);
    return null;
  }
};

export const getLanguageWithGeolocation = async (): Promise<string> => {
  // 1. Check localStorage for saved preference (highest priority)
  const savedLang = localStorage.getItem('1tap-language');
  if (savedLang && ['en', 'fr', 'es', 'ru', 'zh'].includes(savedLang)) {
    console.log(`Using saved language preference: ${savedLang}`);
    return savedLang;
  }

  // 2. Try IP geolocation (second priority)
  const ipLang = await detectLanguageFromIP();
  if (ipLang) {
    console.log(`Using IP-based language: ${ipLang}`);
    return ipLang;
  }

  // 3. Fall back to browser language detection
  const browserLang = navigator.language.split('-')[0];
  const supportedLangs = ['en', 'fr', 'es', 'ru', 'zh'];
  const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
  
  console.log(`Using browser language: ${detectedLang}`);
  return detectedLang;
};