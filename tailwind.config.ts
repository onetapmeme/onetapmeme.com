import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-card': 'var(--gradient-card)',
      },
      boxShadow: {
        'glow-primary': 'var(--glow-primary)',
        'glow-gold': 'var(--glow-gold)',
        'glow-subtle': 'var(--glow-subtle)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scale(1)",
            filter: "brightness(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.03)",
            filter: "brightness(1.2)",
          },
        },
        "shimmer": {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 8px 32px hsla(199, 89%, 48%, 0.15)",
          },
          "50%": {
            boxShadow: "0 0 80px hsla(199, 89%, 48%, 0.3)",
          },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pixel-fade": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "text-glow": {
          "0%, 100%": { textShadow: "0 0 20px hsl(199 89% 48% / 0.5)" },
          "50%": { textShadow: "0 0 40px hsl(199 89% 48% / 0.8), 0 0 60px hsl(199 89% 48% / 0.4)" },
        },
        "tap-pulse": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 20px hsl(199 89% 48% / 0.3)" },
          "50%": { transform: "scale(1.03)", boxShadow: "0 0 40px hsl(199 89% 48% / 0.6)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "explosive-flash": {
          "0%": { opacity: "1", filter: "brightness(1)" },
          "20%": { opacity: "1", filter: "brightness(3) saturate(2)" },
          "50%": { opacity: "0.9", filter: "brightness(4) saturate(3) blur(2px)" },
          "100%": { opacity: "0", filter: "brightness(5) saturate(4) blur(10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "pixel-fade": "pixel-fade 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "scale-pulse": "scale-pulse 2s ease-in-out infinite",
        "text-glow": "text-glow 2s ease-in-out infinite",
        "tap-pulse": "tap-pulse 1.5s ease-in-out infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "explosive-flash": "explosive-flash 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
