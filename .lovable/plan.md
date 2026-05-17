# Plan d'exécution — Batch CardSurgery

Le périmètre est très large. Je propose de l'exécuter en **3 vagues** pour livrer rapidement de la valeur, valider visuellement à chaque étape, et garder le code maintenable.

---

## VAGUE 1 — UI globale, contenu homepage, services (rapide, à fort impact visuel)

### 1.1 Global / i18n
- Réduire de 50% le volume audio par défaut au premier clic (modifier `Enter.tsx` + `AudioControls.tsx` : default 70 → 35).
- FR = langue par défaut (modifier `i18n/config.ts` : `fallbackLng: 'fr'`, prio FR > EN > autres dans la détection).
- Switcher de langue : rendre le `LanguageSwitcher` visible dans la Navbar desktop ET dans le menu mobile (actuellement floating en haut à droite).

### 1.2 Homepage
- **Pourquoi CardSurgery** : réécriture corporate/premium (préservation haut de gamme, maximisation valeur grading, méthodologie chirurgicale).
- **Compteur** : harmoniser à `+200 cartes restaurées` partout (`useSavedCardsCounter`, `SocialProof`, `CardHome`).
- **Encore des questions ?** : retirer Discord, remplacer par `contact@cardsurgery.com` (mailto + icône Mail).

### 1.3 Processus 4 étapes (refonte ordonnée)
1. Analyse au microscope 🔬
2. Nettoyage en profondeur (recto/verso)
3. Redressage carte + coins (humidification contrôlée) — **délais dynamiques injectés depuis les forfaits**
4. Polissage de surface (réduction rayures superficielles)
- Liens externes : lien produit vers `kurtscardcare.com`, badge "Formations professionnelles" vers `rocketcollect.net`.

### 1.4 Services (page Pricing)
- Pack 19€ : ajouter "Renvoi sous assurance + suivi".
- Pack 39€ : ajouter "Couverture assurance haute valeur".
- Pack 95€ : dropdown grading (PCA / CCC / Collect Aura) avec liens, délais dynamiques selon le choix, mention "Colis assurés selon valeur déclarée", **wizard tarif avancé** (valeur déclarée + variables d'assurance, log côté Supabase pour ajustement manuel admin).
- Retirer "Options à la carte" → remplacer par **matrice tarifaire PCA/CCC/Collect Aura** (tarifs de soumission tiers).
- Disclaimer minimaliste : "CardSurgery optimise la condition physique ; le grade final reste à la discrétion exclusive de PCA/CCC/Aura."

---

## VAGUE 2 — FAQ + IA, suivi dossiers, emails automatiques

### 2.1 FAQ
- Approfondir avec Q/R techniques (holofoil, cartonnage vintage, chrome moderne, encres UV, vernis).
- Lien direct vers `/faq` sous l'assistant.

### 2.2 Chatbot IA (FAQAssistant)
- Refonte du composant existant pour appeler une **edge function `faq-assistant`** utilisant Lovable AI (`google/gemini-3-flash-preview`) avec un system prompt strict centré sur l'expertise CardSurgery (matériaux, sécurité, types acceptés, préparation grading).
- Rendu markdown + streaming, garde-fou : refuse de répondre hors-sujet.

### 2.3 Suivi dossiers
- Déjà côté serveur (Supabase). Vérifier que :
  - Paiement gaté par statut `approved` ✅ (déjà en place via `confirm_dossier_payment`).
  - Timeline visuelle "Received → Analysis → Surgery → Grading/Shipping" plus claire dans `Tracking.tsx`.

### 2.4 Emails automatiques
- L'edge function `send-dossier-email` existe déjà. Vérifier qu'elle est bien déclenchée à chaque transition de statut + lors de la création (récap + instructions d'envoi).

---

## VAGUE 3 — Booking calendrier, Admin étendu, bonus premium

### 3.1 Booking (Discovery Call)
- Calendrier interactif (créneaux 30 min, lun-ven 10h-18h) avec placeholders.
- Table Supabase `booking_slots` (date, slot, is_booked, customer_email, customer_name, source).
- Form de réservation simple, confirmation email.

### 3.2 Admin Portal centralisé (`/admin`)
- Tabs : **Dossiers** (existant), **Réservations**, **Blog**, **Créneaux**, **Forfaits & Tarifs grading**.
- CRUD pour : posts blog, slots calendrier, prix forfaits, tarifs grading tiers.
- Tables Supabase : `service_pricing` (id, pack, price, label, features jsonb), `grading_pricing` (provider, tier, price, turnaround_days).
- Sécurité : RLS admin uniquement via `has_role(uid, 'admin')`.

### 3.3 Bonus premium
- **Before/After slider** : composant existe (`BeforeAfterSlider.tsx`) — l'intégrer à la `/gallery` avec drag fluide + responsive.
- **Section Sécurité Clinique** : nouvelle section (vidéo unboxing, coffre ignifuge, gants antistatiques, zone sans poussière).
- **Micro-interactions Apple** : audit `index.css` pour glassmorphism navbar + transitions 300ms ease-in-out sur cards/boutons.
- **Schema.org/Service JSON-LD** : ajouter dans `index.html` et `RouteSEO.tsx` pour la page services.
- **Disclaimer technique** : footnote dans footer + page Services.

---

## Détails techniques (pour validation)

- **Base de données** (nouvelles tables) :
  - `booking_slots(id, slot_date, slot_time, is_booked, customer_email, customer_name, notes, created_at)`
  - `service_pricing(id, pack_id, label, price_eur, features jsonb, sort_order, active)`
  - `grading_pricing(id, provider, tier_label, price_eur, turnaround_days, url)`
  - `dossier_grading_request(dossier_id, provider, declared_value_eur, insurance_tier)` — pour le wizard 95€
- **Edge functions** :
  - Nouvelle : `faq-assistant` (Lovable AI Gateway, sans secret)
  - Existante : `send-dossier-email` (à vérifier déclenchements)
- **Pas de changements** sur l'auth ni sur le système de rôles (déjà en place).

---

## Questions de cadrage avant de démarrer

1. **Tarifs PCA/CCC/Collect Aura** : je mets des placeholders réalistes ou tu me fournis les grilles exactes ?
2. **Créneaux Booking** : 30 min lun-ven 10h-18h OK, ou autre format ?
3. **Vagues** : on enchaîne les 3 d'affilée, ou tu valides vague par vague ?
4. **Section Sécurité Clinique** : photos/vidéos placeholder pour l'instant, tu fourniras les vrais médias plus tard ?

Dis-moi sur quoi tu veux que je commence (ou "GO tout" pour enchaîner les 3 vagues).
