// Gaming Meme Templates - Pre-made configurations

export interface MemeTemplate {
  id: string;
  name: string;
  description: string;
  background: number; // index in backgrounds array
  accessories: number[]; // indices in accessories array
  preset: 'classic' | 'tactical' | 'legendary' | 'epic';
}

export const MEME_TEMPLATES: MemeTemplate[] = [
  {
    id: 'headshot-king',
    name: '👑 Headshot King',
    description: 'The ultimate AWP Dragon Lore flex',
    background: 0, // Dust II
    accessories: [1, 2], // AWP Dragon + Karambit
    preset: 'legendary'
  },
  {
    id: 'ak47-spray',
    name: '🔫 AK-47 Spray Master',
    description: 'One tap, no spray',
    background: 1, // Inferno
    accessories: [0, 4], // AK-47 + Karambit Fade
    preset: 'epic'
  },
  {
    id: 'awp-god',
    name: '🎯 AWP God',
    description: 'When you\'re feeling Asiimov',
    background: 2, // Mirage
    accessories: [3], // AWP Asiimov
    preset: 'epic'
  },
  {
    id: 'knife-flex',
    name: '💎 Knife Flex',
    description: 'Doppler dreams',
    background: 3, // Nuke
    accessories: [2], // Karambit Rainbow
    preset: 'legendary'
  },
  {
    id: 'terrorist-rush',
    name: '💥 Rush B No Stop',
    description: 'Classic terrorist energy',
    background: 0, // Dust II
    accessories: [0, 5, 6], // AK + Terrorist + Logo
    preset: 'classic'
  },
  {
    id: 'ct-setup',
    name: '🛡️ CT Setup',
    description: 'M4A1-S Silent but deadly',
    background: 4, // Vertigo
    accessories: [0, 7], // M4A1 + MP7
    preset: 'tactical'
  },
  {
    id: 'full-loadout',
    name: '⚔️ Full Loadout',
    description: 'Everything you need',
    background: 5, // Cache
    accessories: [0, 1, 2, 5], // Multiple weapons
    preset: 'legendary'
  },
  {
    id: 'eco-round',
    name: '💰 Eco Round',
    description: 'UMP-45 and hope',
    background: 1, // Inferno
    accessories: [8], // UMP
    preset: 'classic'
  },
  {
    id: 'awp-dragon-legend',
    name: '🐉 Dragon Lore Legend',
    description: 'The most expensive flex',
    background: 2, // Mirage
    accessories: [1, 2, 5], // AWP Dragon + extras
    preset: 'legendary'
  },
  {
    id: 'karambit-collection',
    name: '🔪 Karambit Collection',
    description: 'All the knives',
    background: 3, // Nuke
    accessories: [2, 4], // Both Karambits
    preset: 'legendary'
  },
  {
    id: 'minimal-pro',
    name: '⚡ Minimal Pro',
    description: 'Less is more',
    background: 4, // Vertigo
    accessories: [0], // Just one weapon
    preset: 'tactical'
  },
  {
    id: 'rainbow-flex',
    name: '🌈 Rainbow Doppler',
    description: 'Maximum color flex',
    background: 2, // Mirage
    accessories: [2, 5], // Rainbow Karambit + Logo
    preset: 'epic'
  }
];

export const getTemplateByPreset = (preset: MemeTemplate['preset']) => {
  return MEME_TEMPLATES.filter(t => t.preset === preset);
};

export const getRandomTemplate = () => {
  return MEME_TEMPLATES[Math.floor(Math.random() * MEME_TEMPLATES.length)];
};
