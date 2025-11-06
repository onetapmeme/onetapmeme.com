# Launch Configuration System

This directory contains the centralized launch configuration for the $1TAP token project.

## 📁 Files

- **`launch.ts`** - Main configuration file for pre-launch and launch states

## 🎯 Purpose

The launch configuration system allows you to:
1. **Control Pre-Launch vs Launch Mode** - Single switch to activate all features
2. **Manage Security Proofs** - Centralized audit and LP lock data
3. **Update Links** - All buy/chart/proof links in one place
4. **Display Countdown** - Automatic countdown banner before launch

## 🔧 How to Use

### Phase 1: Pre-Launch Configuration (Semaine -1)

1. **Set Launch Date** (as soon as you know it):
```typescript
launchDate: "2025-01-20T14:00:00Z", // UTC timestamp
```

2. **Configure Audit Data** (when audit completed):
```typescript
audit: {
  completed: true,           // ✅ Set to TRUE
  auditor: "CertiK",         // Auditor name
  score: "96/100",           // Security score
  reportUrl: "ipfs://Qm...", // IPFS or direct link
  date: "2025-01-10"         // Completion date
}
```

3. **Configure LP Lock** (after locking liquidity):
```typescript
lpLock: {
  locked: true,                        // ✅ Set to TRUE
  platform: "Team.Finance",            // Platform name
  lockUrl: "https://...",              // Direct link to proof
  amount: "95%",                       // Percentage locked
  unlockDate: "2025-07-20T14:00:00Z"   // Unlock date (UTC)
}
```

### Phase 2: Launch Day (Jour J)

**At launch time (H-1 hour before):**

1. Open `src/config/launch.ts`
2. Change `isLaunched` to `true`:
```typescript
export const LAUNCH_CONFIG: LaunchConfig = {
  isLaunched: true, // ✅ ACTIVATE THIS
  // ... rest of config
};
```
3. Deploy the changes immediately
4. Verify buy buttons appear on the site
5. Make simultaneous announcements (Twitter, Discord, Telegram)

## 🔗 Components Using This Config

### Automatic Updates
These components automatically read from `launch.ts`:

1. **`PreLaunchBanner`** 
   - Shows countdown until launch
   - Disappears when `isLaunched: true`
   - Location: Top of all pages

2. **`AuditBadge`**
   - Updates status based on `audit.completed`
   - Shows real auditor, score, report when ready
   - Location: Hero, Token page, Security page

3. **`LPLockProof`**
   - Shows "Verified" badge when `lpLock.locked: true`
   - Displays real unlock countdown
   - Location: Token page, Security page

4. **Buy Buttons** (if implemented with config)
   - Disabled when `isLaunched: false`
   - Active with real links when `isLaunched: true`
   - Location: Hero, SwapWidget, StickyBuyButton

## 🚨 Critical Timing Rules

### DO NOT activate `isLaunched: true` BEFORE:
- ❌ Audit is completed and report is ready
- ❌ LP is created and locked (minimum 6 months)
- ❌ Team is ready to respond to community (24/7 monitoring)
- ❌ All links are tested (buy, chart, audit, LP lock)

### ACTIVATE `isLaunched: true` WHEN:
- ✅ All security proofs are ready (audit + LP lock)
- ✅ Liquidity pool is active on Uniswap
- ✅ Team is standing by for launch support
- ✅ Communication templates are ready (Twitter, Discord)

## 📊 Example Timeline

### 2 Weeks Before Launch
```typescript
isLaunched: false
audit: { completed: false, ... }
lpLock: { locked: false, ... }
// Pre-launch banner showing "Launching Soon"
```

### 1 Week Before Launch (Audit Received)
```typescript
isLaunched: false
audit: { 
  completed: true,
  auditor: "CertiK",
  score: "96/100",
  reportUrl: "ipfs://Qm...",
  date: "2025-01-13"
}
lpLock: { locked: false, ... }
// Audit badge shows "Completed by CertiK: 96/100"
```

### 5 Days Before Launch (LP Locked)
```typescript
isLaunched: false
audit: { completed: true, ... }
lpLock: {
  locked: true,
  platform: "Team.Finance",
  lockUrl: "https://...",
  amount: "95%",
  unlockDate: "2025-07-20T14:00:00Z"
}
// LP Lock Proof shows "Verified - 95% Locked"
```

### Launch Day (H-1 hour)
```typescript
isLaunched: true // ✅ ACTIVATE
// Pre-launch banner disappears
// Buy buttons become active
// All proofs visible (audit + LP lock)
```

## 🧪 Testing Checklist

Before changing `isLaunched: true`, verify:

- [ ] Contract address is correct
- [ ] Buy link works (test with small amount)
- [ ] Chart link displays correct data
- [ ] Audit report is accessible (IPFS/direct link)
- [ ] LP lock proof is visible on Team.Finance
- [ ] All countdown timers show correct data
- [ ] Mobile responsive design works
- [ ] Translation works (EN/FR)

## 🛠️ Helper Functions

```typescript
import { 
  isLaunched,          // Returns true if launched
  isAuditCompleted,    // Returns true if audit done
  isLPLocked,          // Returns true if LP locked
  getTimeUntilLaunch   // Returns countdown object
} from '@/config/launch';

// Example usage
if (isLaunched()) {
  // Show buy button
} else {
  // Show "Coming Soon"
}
```

## 📝 Notes

- **Single Source of Truth**: This config file is the ONLY place to manage launch state
- **No Manual Updates**: Components read automatically, no need to edit each one
- **Audit Trail**: Keep old values commented for reference
- **Backup**: Save a copy of config before major changes

## 🔐 Security

- Never commit sensitive data (private keys, API secrets)
- Contract address is public (safe to commit)
- IPFS links are public (safe to commit)
- Audit reports are public (safe to commit)

## 📞 Support

If you need help with launch configuration:
1. Check this README
2. Review `URGENT_ACTION_PLAN.md` in project root
3. Contact dev team on Discord
