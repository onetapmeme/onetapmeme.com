import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hover:bg-primary/10 transition-all duration-300"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-primary rotate-0 scale-100 transition-all duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-primary rotate-0 scale-100 transition-all duration-300" />
      )}
    </Button>
  );
};

export default ThemeToggle;
