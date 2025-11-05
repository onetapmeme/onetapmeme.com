import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';
import { getLanguageWithGeolocation } from '@/utils/ipGeolocation';

// Get browser language or default to 'en'
const getBrowserLanguage = () => {
  const browserLang = navigator.language.split('-')[0];
  const supportedLangs = ['en', 'fr', 'es', 'ru', 'zh'];
  return supportedLangs.includes(browserLang) ? browserLang : 'en';
};

// Get saved language preference or detect via IP geolocation + browser
const getInitialLanguage = async () => {
  // Use geolocation-enhanced detection
  return await getLanguageWithGeolocation();
};

// Initialize with async language detection
(async () => {
  const initialLang = await getInitialLanguage();
  
  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fr: { translation: fr },
        es: { translation: es },
        ru: { translation: ru },
        zh: { translation: zh }
      },
      lng: initialLang,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
})();

// Save language preference whenever it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('1tap-language', lng);
  // Update HTML lang attribute for SEO
  document.documentElement.lang = lng;
});

export default i18n;
