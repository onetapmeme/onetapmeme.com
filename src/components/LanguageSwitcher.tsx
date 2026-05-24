import { useTranslation } from 'react-i18next';
import { Languages, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type LangDef = { code: string; flag: string; name: string };

// Priority order: FR / EN / DE shown first, then fallback locales below the separator.
const PRIMARY: LangDef[] = [
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
];
const SECONDARY: LangDef[] = [
  { code: 'pt', flag: '🇵🇹', name: 'Português' },
  { code: 'ja', flag: '🇯🇵', name: '日本語' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
];

const ALL = [...PRIMARY, ...SECONDARY];

const LanguageSwitcher = ({ inline = false }: { inline?: boolean }) => {
  const { i18n } = useTranslation();
  const current = ALL.find((l) => l.code === i18n.language) || PRIMARY[0];

  const triggerClasses = inline
    ? 'bg-card/80 backdrop-blur-sm border border-primary/20 hover:border-primary/50 rounded-full h-10 min-w-[64px] transition-all'
    : 'fixed top-4 right-4 z-50 bg-card/80 backdrop-blur-sm border border-primary/20 hover:border-primary/50 rounded-full h-10 transition-all';

  const renderItem = (lang: LangDef) => {
    const active = i18n.language === lang.code;
    return (
      <DropdownMenuItem
        key={lang.code}
        onClick={() => i18n.changeLanguage(lang.code)}
        className={`cursor-pointer min-h-[44px] gap-3 px-3 py-2.5 rounded-md transition-colors ${
          active ? 'bg-primary/10 text-foreground' : 'text-foreground/85 hover:text-foreground hover:bg-accent/10'
        }`}
      >
        <span className="text-lg leading-none">{lang.flag}</span>
        <span className="flex-1 text-sm font-medium tracking-wide">{lang.name}</span>
        {active && <Check className="w-4 h-4 text-accent" />}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={triggerClasses}
          aria-label="Change language"
        >
          <Languages className="w-4 h-4 mr-1.5" />
          <span className="mr-1 text-base leading-none">{current.flag}</span>
          <span className="hidden sm:inline text-xs font-semibold tracking-wider">
            {current.code.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-[120] w-[min(calc(100vw-2rem),18rem)] bg-card/95 backdrop-blur-md border-primary/20 p-1"
      >
        <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground px-3 pt-2 pb-1">
          Languages
        </DropdownMenuLabel>
        {PRIMARY.map(renderItem)}
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground px-3 pt-1 pb-1">
          More
        </DropdownMenuLabel>
        {SECONDARY.map(renderItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
