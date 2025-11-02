/// <reference types="vite/client" />

declare global {
  interface Window {
    TradingView: {
      widget: new (config: any) => void;
    };
  }
}

export {};
