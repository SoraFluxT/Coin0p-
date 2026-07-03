# Coin0p

Escrow-protected marketplace for game currency, accounts, items, boosting and 1-to-1 coaching across 10 games. Frontend complete — mock data with localStorage persistence. Backend to be built (see checklist).

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
```

## Stack
React 18 + Vite 6 + Tailwind CSS v4. Single-component architecture in `src/App.jsx` (state-based routing) — split into modules when the backend lands.

## What's included
Buyer side (games directory, per-game sections with Eldorado-style seller offer rows, marketplace, listing/seller pages, cart, Stripe-style checkout, wallet, orders, watchlist, rewards + prize wheel), seller dashboard (order queue, payouts, listing management), admin console (game visibility, listing/FX editing, test tools — demo login: SoraFluxT@gmail.com / admin123), legal hub (Terms, Privacy/UK GDPR, Cookies, AML/KYC, Governing law, Complaints), cookie consent, 18+ age gate, multi-currency display, support chat widget, error boundary.

## Push to GitHub (repo is pre-initialised — 2 commands)
The unzipped folder is already a git repository with an initial commit on `main`. Just:
1. Create an **empty** repo at https://github.com/new (no README/license) — e.g. `coin0p`
2. Run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/coin0p.git
git push -u origin main
```

## Free live site (GitHub Pages)
A deploy workflow is included. After your first push:
1. On GitHub: **Settings → Pages → Source: GitHub Actions**
2. Push to `main` (or re-run the "Deploy to GitHub Pages" workflow)
3. Your site goes live at `https://YOUR_USERNAME.github.io/coin0p/`

CI also builds every pull request automatically (`.github/workflows/ci.yml`), so broken code can't sneak into main.

## Docs
- **BACKEND_SPEC.md** — everything to build (auth, Stripe Connect escrow, chat, admin APIs) in launch order
- **FRONTEND_GUIDE.md** — where to edit every design token, game, fee, and text in `src/App.jsx`

## Launch checklist (before real users)

**Legal & compliance — not optional**
- [ ] Solicitor review of all policy text (Terms, Privacy, Refunds) — templates only right now
- [ ] Register the company (Companies House) and put real details in the footer
- [ ] UK GDPR: ICO registration, privacy notice sign-off, data-processing agreements with processors
- [ ] Age verification approach (self-declaration vs verified) — currently self-declared 18+
- [ ] AML/KYC via payment partner (Stripe Connect handles most seller KYC)
- [ ] Game ToS / IP risk assessment — RMT breaches many publishers' terms; decide policy per game
- [ ] Consumer Rights Act 2015 / Consumer Contracts Regs review of refund flows
- [ ] Complaints/ADR provider selection
- [ ] Replace demo cookie banner logic with a proper consent-management setup if adding analytics

**Backend**
- [ ] Auth (email + password + 2FA), roles: buyer / seller / admin (admin bound to real accounts, not hardcoded email)
- [ ] Stripe Connect: payment intents, escrow via delayed transfers, seller onboarding + payouts
- [ ] Orders + dispute engine (state machine: paid → delivered → confirmed/disputed → released/refunded)
- [ ] Live FX rates (daily API) replacing hardcoded table
- [ ] Image upload/storage for listing photos (`img` field is already wired in the UI)
- [ ] Admin endpoints: PATCH /listings/:id, PATCH /games/:id/visibility, GET /admin/stats
- [ ] Order chat (buyer ↔ seller) + support chat handoff
- [ ] Rate limiting, audit logs, backups

**Quality**
- [ ] Split App.jsx into modules/routes; add tests
- [ ] Real analytics (post-consent), error monitoring, uptime alerts
