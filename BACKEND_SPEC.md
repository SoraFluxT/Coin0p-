# Coin0p — Backend Specification

Everything required to turn the frontend into a functional marketplace. Build in the order listed: each phase makes the site more real, and nothing later blocks anything earlier.

**Suggested stack:** Node.js (Express or NestJS) or Next.js API routes · PostgreSQL · Prisma ORM · Redis (sessions/rate-limits) · S3-compatible storage (Cloudflare R2 is cheap) · Stripe + PayPal SDKs. Host on Railway/Render/Fly to start.

---

## Phase 1 — Authentication (fixes the "login problem")

The frontend's `AuthModal` currently fakes sign-in. Replace with:

| Feature | Details |
|---|---|
| Email + password | argon2/bcrypt hashing, email verification link, password reset flow |
| **Google OAuth** | Google Cloud Console → OAuth client ID + secret → `/api/auth/google` redirect + `/api/auth/google/callback`. Libraries: `passport-google-oauth20` or Auth.js |
| Sessions | httpOnly secure cookies (or short-lived JWT + refresh). The frontend stores the user object it gets back — same shape it uses now: `{ name, email, via }` |
| Roles | `buyer` (default), `seller` (after onboarding), `admin`. **Admin = role in the DB assigned to SoraFluxT@gmail.com — delete the hardcoded email/passcode in `Admin` component** |
| 2FA | TOTP (speakeasy/otplib) — mandatory for admin, optional for sellers |
| Age gate | Store the 18+ confirmation timestamp on the account (frontend already collects it) |

**Endpoints:** `POST /api/auth/register` · `POST /api/auth/login` · `GET /api/auth/google` + callback · `POST /api/auth/logout` · `GET /api/auth/me` · `POST /api/auth/2fa/setup|verify` · `POST /api/auth/reset-password`

**Frontend hook points:** `AuthModal → finish(via)` (replace with API call), `App → onLogin/logout`, persisted `coin0p-user` localStorage becomes a session cookie.

---

## Phase 2 — Database schema (core tables)

```
users        id, email, password_hash, name, role, google_id, age_confirmed_at, 2fa_secret, created_at
sellers      user_id, display_name, kyc_status, stripe_account_id, rating, sales_count, online_at
games        id, name, tag, currency_label, currency_unit, hue, hidden (bool)
listings     id, game_id, seller_id, category (Currency|Accounts|Items|Services),
             title, description, price_usd, stock, rarity, delivery_estimate, tag, image_url, active
orders       id, buyer_id, seller_id, listing_id, price_usd, fee_usd, method,
             status (paid|username_shared|seller_delivered|confirmed|released|disputed|refunded),
             buyer_ig_username, admin_verified (bool), created_at, confirmed_at
messages     id, order_id, from (buyer|seller|system|admin), body, created_at
wallet_txns  id, user_id, amount_usd, type (topup|purchase|refund|payout|prize), ref_order_id, created_at
disputes     id, order_id, opened_by, reason, status, resolution, resolved_at
fx_rates     code, symbol, rate_per_usd, updated_at
xp_ledger    id, user_id, amount, reason, created_at
audit_log    id, actor_id, action, target, meta_json, created_at
```

---

## Phase 3 — Payments, escrow & fees

This is the heart of the business. **Never trust the frontend's fee math — recompute server-side.**

1. **Stripe** for cards **and Google Pay** (Google Pay is a Stripe Payment Element option — one integration covers both). Create PaymentIntents server-side.
2. **PayPal** via PayPal Checkout SDK — create order server-side, capture on approval.
3. **Fee rule (as designed):** buyer pays `2.9% + $0.30` on card/Google Pay/PayPal; **$0 fee when paying from wallet**. Seller pays 8% commission on release.
4. **Escrow via Stripe Connect (Express accounts):**
   - Seller onboarding = Stripe-hosted KYC (`/api/sellers/onboard` → account link). Stripe handles identity docs, AML, sanctions — huge compliance win.
   - Charge the buyer to the **platform** account; on buyer confirmation (or 48h auto-confirm), create a **Transfer** to the seller's connected account minus 8%. That transfer-on-confirm IS your escrow.
   - Disputed orders: don't transfer; refund or release after resolution.
5. **Wallet:** balance = sum of `wallet_txns`. Top-ups are normal Stripe/PayPal payments. Wallet purchases just write ledger rows (this is why they're fee-free — no processor involved).
6. **Webhooks:** `payment_intent.succeeded`, `charge.refunded`, `account.updated` (KYC status), PayPal capture webhooks. Verify signatures.

**Endpoints:** `POST /api/checkout/intent` · `POST /api/checkout/paypal` · `POST /api/wallet/topup` · `POST /api/orders/:id/confirm` (→ escrow release) · `POST /api/orders/:id/dispute` · `POST /api/sellers/onboard` · `POST /api/sellers/payout` · `POST /api/webhooks/stripe|paypal`

---

## Phase 4 — Orders & chat

- Order creation on successful payment → seed the system + seller-greeting messages (frontend already renders this shape: `{ from, t }`).
- **Order chat:** REST is fine to start (`GET/POST /api/orders/:id/messages`, poll every 3–5s); upgrade to WebSockets (socket.io) later. The "simulated reply" in `OrderChat → sellerReply()` gets deleted — real sellers answer from their dashboard.
- Username-share step: `PATCH /api/orders/:id { buyer_ig_username }`.
- Seller side: `POST /api/orders/:id/mark-delivered` (starts the 48h auto-confirm timer — a cron/queue job, e.g. BullMQ).
- Notifications: email (Resend/Postmark) + in-app (the 🔔 bell) for: order placed, username shared, delivered, confirmed, dispute, payout.

---

## Phase 5 — Catalog, search, images

- Listings CRUD for sellers (`POST/PATCH/DELETE /api/listings`), admin can edit any.
- **Image upload:** presigned URL to R2/S3 → save URL to `listings.image_url`. The frontend's `img` field already overrides the generated icon, so this is plug-and-play.
- Search endpoint powering `GlobalSearch`: `GET /api/search?q=` returning `{games, listings, sellers}` (Postgres `ILIKE`/trigram is plenty at launch).
- Game visibility: `PATCH /api/games/:id { hidden }` (admin) — replaces the in-memory `HIDDEN_GAMES` set.

---

## Phase 6 — Admin

All behind role=admin + 2FA. The admin UI already exists; give it real data:
- `GET /api/admin/stats` (orders, GMV, users, live games)
- `GET /api/admin/transactions` (paginated, filterable) + `POST /api/admin/orders/:id/verify`
- `GET /api/admin/orders/:id/chat` (audit)
- Dispute resolution: `POST /api/admin/disputes/:id/resolve { outcome: refund|release }`
- User management: suspend/ban, force password reset
- FX override, listing edits — everything in the current admin panel, persisted
- **Write every admin action to `audit_log`.**

---

## Phase 7 — Supporting systems

- **FX rates:** daily cron pulling a free API (frankfurter.app / exchangerate.host) into `fx_rates`; `GET /api/fx` replaces the hardcoded `CURRENCIES` table.
- **Rewards:** server-side spin (`POST /api/rewards/spin`, RNG on server, one per UTC day per user), XP on order release, quest checks, redemptions debiting `xp_ledger`.
- **Support chat:** start with a vendor (Crisp/Tawk free tiers) rather than building; swap the `SupportChat` widget for their embed.
- **Reviews:** post-confirmation only, one per order (`POST /api/orders/:id/review`).

---

## Phase 8 — Security & compliance (non-negotiable before launch)

- HTTPS only, CORS locked to your domain, helmet headers
- Rate limiting (login, checkout, chat), zod/joi validation on every endpoint
- GDPR: data export + account deletion endpoints, ICO registration, real privacy contact addresses (policies currently use `@coin0p.example` placeholders)
- Cookie consent: only load analytics after "Accept all"
- Backups (daily DB), error monitoring (Sentry), uptime alerts
- Solicitor review of all policy text before real money moves

---

## Launch order (realistic)
1. Auth + DB (week 1–2)
2. Listings + games from DB (week 2–3)
3. Stripe payments + wallet (week 3–5)
4. Orders + chat + escrow release (week 5–7)
5. Stripe Connect payouts + seller dashboard live (week 7–9)
6. Admin + disputes (week 9–10)
7. PayPal, FX cron, rewards, polish (week 10–12)

Everything in the frontend that says "demo", "simulated", or "connects with the backend" is a marker for exactly where these APIs plug in.
