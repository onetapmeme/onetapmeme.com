import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SEOHead = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Remove existing hreflang links
    const existingLinks = document.querySelectorAll('link[rel="alternate"]');
    existingLinks.forEach(link => link.remove());

    // Add hreflang links for all supported languages
    const languages = ['en', 'fr', 'de', 'es', 'ru', 'zh'];
    const baseUrl = 'https://cardsurgery.com';
    
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
      en: 'CardSurgery restores collectible cards with surgical precision. Premium asset preservation, absolute trust — Pokémon, One Piece, Magic, Yu-Gi-Oh and more.',
      fr: "CardSurgery restaure vos cartes de collection avec une précision chirurgicale. Préservation de la valeur, confiance absolue — Pokémon, One Piece, Magic, Yu-Gi-Oh et plus.",
      de: 'CardSurgery restauriert Sammelkarten mit chirurgischer Präzision. Werterhalt für Premium-Sammler, absolute Zuverlässigkeit — Pokémon, One Piece, Magic, Yu-Gi-Oh und mehr.',
      es: 'CardSurgery restaura cartas coleccionables con precisión quirúrgica. Preservación premium del valor y confianza absoluta — Pokémon, One Piece, Magic, Yu-Gi-Oh y más.',
      ru: 'CardSurgery реставрирует коллекционные карты с хирургической точностью. Сохранение премиальной ценности и абсолютное доверие — Pokémon, One Piece, Magic, Yu-Gi-Oh и другие.',
      zh: 'CardSurgery 以外科级精准修复收藏卡牌，守护藏品价值，赢得绝对信任 —— Pokémon、One Piece、Magic、Yu-Gi-Oh 及更多。',
    };

    const titles: Record<string, string> = {
      en: 'CardSurgery — Surgical Card Restoration',
      fr: 'CardSurgery — Restauration Clinique de Cartes',
      de: 'CardSurgery — Chirurgische Kartenrestaurierung',
      es: 'CardSurgery — Restauración Quirúrgica de Cartas',
      ru: 'CardSurgery — Хирургическая реставрация карт',
      zh: 'CardSurgery — 外科级卡牌修复',
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