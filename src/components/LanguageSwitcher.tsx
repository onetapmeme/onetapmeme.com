import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className="fixed bottom-4 left-4 z-50 bg-card/80 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all"
    >
      <Languages className="w-4 h-4 mr-2" />
      {i18n.language === 'en' ? 'FR' : 'EN'}
    </Button>
  );
};

export default LanguageSwitcher;
