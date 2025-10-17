import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';

// Get browser language or default to 'en'
const getBrowserLanguage = () => {
  const browserLang = navigator.language.split('-')[0];
  const supportedLangs = ['en', 'fr', 'es', 'ru', 'zh'];
  return supportedLangs.includes(browserLang) ? browserLang : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      ru: { translation: ru },
      zh: { translation: zh }
    },
    lng: getBrowserLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
