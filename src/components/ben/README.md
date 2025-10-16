# Ben Character System - Documentation

## 🎯 Vue d'ensemble

Ben est la mascotte interactive de $ONETAP, un personnage animé qui guide les visiteurs à travers le site web. Inspiré du logo du projet, Ben offre une expérience utilisateur engageante tout en maintenant un design professionnel et performant.

## 📁 Structure des fichiers

```
src/components/ben/
├── BenController.tsx     # Composant principal (logique + animations)
├── BenDialogues.ts       # Système de dialogues multilingues
└── README.md            # Cette documentation
```

## 🎨 Fonctionnalités principales

### 1. Apparition animée (Spawn)
- **Déclenchement**: 1.5s après le chargement du site
- **Effet**: Particules explosives simulant une sortie du logo/pistolet
- **Animation**: Spring physics avec scale et fade-in
- **Durée**: ~1 seconde

### 2. Suivi du scroll
Ben se déplace automatiquement entre les sections du site :
- **Hero**: Position bottom-right (20%, 10%)
- **About**: Position bottom-right (30%, 15%)
- **Tokenomics**: Position bottom-right (25%, 12%)
- **Live Stats**: Position bottom-right (28%, 10%)
- **Roadmap**: Position bottom-right (35%, 8%)
- **Rewards**: Position bottom-right (25%, 13%)
- **Community**: Position bottom-right (20%, 10%)
- **Memes**: Position bottom-right (30%, 15%)
- **Tap to Earn**: Position bottom-right (25%, 10%)

### 3. Dialogues contextuels
Ben affiche des bulles de dialogue adaptées à chaque section :
- **Multilingue**: EN, FR, ES, RU, ZH
- **Durée**: 4 secondes par défaut
- **Animation**: Fade-in/out avec scale

### 4. Menu de contrôle interactif
Accessible au hover/click sur Ben :
- 🔇 Mute/Unmute (préparé pour son)
- ❌ Disable Ben (sauvegardé dans localStorage)

### 5. Mode mobile
Version simplifiée sur mobile (<768px) :
- Avatar statique circulaire
- Animation de glow pulsante
- Bouton de fermeture visible

## 🔧 Utilisation technique

### Import et intégration
```tsx
import BenController from '@/components/ben/BenController';

function App() {
  return (
    <div>
      <BenController />
      {/* Reste de votre contenu */}
    </div>
  );
}
```

### Personnaliser les dialogues
Éditez `BenDialogues.ts` :

```typescript
export const benDialogues: BenDialogues = {
  en: {
    customSection: { 
      text: "Your custom message here", 
      duration: 5000 
    },
  },
  // ... autres langues
};
```

### Ajouter une nouvelle section
1. Dans `BenController.tsx`, ajoutez la section à l'array de tracking :
```typescript
const sections = ['hero', 'about', 'newSection', ...];
```

2. Dans `sectionPositions`, définissez la position :
```typescript
const sectionPositions: Record<string, BenPosition> = {
  newSection: { bottom: '30%', right: '12%' },
  // ...
};
```

3. Dans `BenDialogues.ts`, ajoutez les textes :
```typescript
en: {
  newSection: { text: "Welcome to new section!", duration: 4000 },
}
```

## 🎭 Animations et effets

### Apparition (Spawn)
```typescript
initial={{ scale: 0, opacity: 0, y: 50 }}
animate={{ scale: 1, opacity: 1, y: 0 }}
transition={{ type: 'spring', stiffness: 100, damping: 15 }}
```

### Idle (flottement)
```typescript
animate={{ y: [0, -10, 0] }}
transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
```

### Glow pulsant
```typescript
animate={{
  filter: [
    'drop-shadow(0 0 20px rgba(22,163,224,0.6))',
    'drop-shadow(0 0 40px rgba(22,163,224,0.9))',
    'drop-shadow(0 0 20px rgba(22,163,224,0.6))',
  ],
}}
transition={{ duration: 2, repeat: Infinity }}
```

## 💾 Stockage local

### Désactivation de Ben
```typescript
localStorage.setItem('benDisabled', 'true');
```

Pour réactiver, supprimez la clé ou définissez-la à `'false'`.

## 🌍 Multilingue

Ben détecte automatiquement la langue active via `react-i18next` :

```typescript
const { i18n } = useTranslation();
const dialogue = getBenDialogue(i18n.language, currentSection);
```

Langues supportées :
- 🇬🇧 English (en)
- 🇫🇷 Français (fr)
- 🇪🇸 Español (es)
- 🇷🇺 Русский (ru)
- 🇨🇳 中文 (zh)

## 🎮 Intégration avec LoadingScreen

Ben est également utilisé dans l'écran de chargement (`LoadingScreen.tsx`) avec :
- Animation 3D (rotateY)
- Particules orbitales
- Effet de rechargement (Deagle magazine)
- Messages dynamiques de chargement

## ⚡ Performance

### Optimisations implémentées
- **Lazy rendering**: Ben ne se rend que s'il est activé
- **Passive scroll listener**: `{ passive: true }` sur le scroll
- **Cleanup**: Tous les intervals et listeners sont nettoyés au démontage
- **Image optimisée**: Logo pixelisé léger
- **Animations GPU**: Transform et opacity uniquement

### Bundle size
- `BenController.tsx`: ~8KB (non minifié)
- `BenDialogues.ts`: ~3KB (non minifié)
- **Total**: ~11KB avant minification

## 🐛 Debugging

### Vérifier si Ben est désactivé
```javascript
console.log(localStorage.getItem('benDisabled'));
```

### Forcer la réapparition
```javascript
localStorage.removeItem('benDisabled');
window.location.reload();
```

### Tester une section spécifique
```typescript
// Temporairement dans BenController.tsx
useEffect(() => {
  setCurrentSection('tokenomics'); // Force une section
  showDialogForSection('tokenomics');
}, []);
```

## 🔮 Améliorations futures

### Système audio (TODO)
```typescript
const sounds = {
  spawn: '/sounds/ben-spawn.mp3',
  speak: '/sounds/ben-speak.mp3',
  move: '/sounds/ben-move.mp3',
};

// Implémentation dans toggleMute()
```

### Animations avancées (TODO)
- Ben qui pointe vers des éléments spécifiques
- Expressions faciales (smile, wink, surprised)
- Interactions avec les CTA (hover sur les boutons)

### Analytics (TODO)
```typescript
// Tracking des interactions
trackEvent('ben_dialogue_shown', { section: currentSection });
trackEvent('ben_disabled', { timestamp: Date.now() });
```

## 📝 Bonnes pratiques

1. **Toujours tester sur mobile** - Le mode mobile est très différent
2. **Garder les animations légères** - Performance > esthétique
3. **Messages courts** - Max 50 caractères pour les dialogues
4. **Positions cohérentes** - Ben ne doit pas chevaucher le contenu
5. **Accessibilité** - Respecter `prefers-reduced-motion`

## 🤝 Contribution

Pour ajouter des fonctionnalités :
1. Créez un nouveau fichier dans `/ben/` si nécessaire
2. Maintenez la cohérence du code (TypeScript strict)
3. Documentez les nouveaux props/fonctions
4. Testez sur desktop et mobile
5. Vérifiez la performance (React DevTools Profiler)

## 📄 Licence

Ce système fait partie du projet $ONETAP et est protégé sous ONETAP Legal Shield v1.0.

---

**Créé avec ❤️ pour la communauté $ONETAP**
