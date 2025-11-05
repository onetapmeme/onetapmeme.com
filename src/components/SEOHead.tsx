import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SEOHead = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Remove existing hreflang links
    const existingLinks = document.querySelectorAll('link[rel="alternate"]');
    existingLinks.forEach(link => link.remove());

    // Add hreflang links for all supported languages
    const languages = ['en', 'fr', 'es', 'ru', 'zh'];
    const baseUrl = 'https://onetapmeme.com';
    
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = lang === 'en' ? baseUrl : `${baseUrl}?lang=${lang}`;
      document.head.appendChild(link);
    });

    // Add x-default hreflang
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = baseUrl;
    document.head.appendChild(defaultLink);

    // Update meta tags based on language
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement;
      }
      if (meta) {
        meta.content = content;
      }
    };

    // Language-specific meta descriptions
    const descriptions: Record<string, string> = {
      en: '$1TAP combines FPS nostalgia with modern crypto. Join the revolution where every trade is a headshot. Community-driven, fair launch gaming memecoin.',
      fr: '$1TAP combine la nostalgie des FPS avec la crypto moderne. Rejoins la révolution où chaque trade est un headshot. Memecoin gaming communautaire, fair launch.',
      es: '$1TAP combina nostalgia FPS con cripto moderna. Únete a la revolución donde cada trade es un headshot. Gaming memecoin community-driven, fair launch.',
      ru: '$1TAP сочетает FPS ностальгию с современной криптой. Присоединяйся к революции, где каждый трейд — хедшот. Community-driven gaming memecoin, fair launch.',
      zh: '$1TAP 结合了 FPS 怀旧与现代加密货币。加入革命，每笔交易都是爆头。社区驱动的游戏 memecoin，公平启动。'
    };

    // Language-specific titles
    const titles: Record<string, string> = {
      en: '$1TAP - The Ultimate Gaming Memecoin',
      fr: '$1TAP - Le Memecoin Gaming Ultime',
      es: '$1TAP - El Memecoin Gaming Definitivo',
      ru: '$1TAP - Главный Gaming Memecoin',
      zh: '$1TAP - 终极游戏 Memecoin'
    };

    document.title = titles[currentLang] || titles.en;
    updateMetaTag('description', descriptions[currentLang] || descriptions.en);
    updateMetaTag('og:title', titles[currentLang] || titles.en);
    updateMetaTag('og:description', descriptions[currentLang] || descriptions.en);
    updateMetaTag('twitter:title', titles[currentLang] || titles.en);
    updateMetaTag('twitter:description', descriptions[currentLang] || descriptions.en);
    updateMetaTag('og:locale', currentLang === 'en' ? 'en_US' : `${currentLang}_${currentLang.toUpperCase()}`);
  }, [currentLang]);

  return null;
};

export default SEOHead;