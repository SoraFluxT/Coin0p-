# Coin0p — Frontend Editing Guide

Everything lives in **`src/App.jsx`**. Use Ctrl+F with the search anchors below — each is unique in the file. After any edit: `npm run dev` to preview, `npm run build` to verify, commit + push (Pages redeploys automatically).

---

## 1. Design & branding

| What | Search for | Notes |
|---|---|---|
| **Colours** (violet/cyan/magenta/gold/success, background) | `:root{` | OKLCH tokens — change `--violet` etc. and the whole site follows |
| **Light theme** colours | `[data-theme="light"]` | Its own token block + component overrides |
| **Fonts** | `fonts.googleapis.com` | Swap Space Grotesk / Inter / JetBrains Mono for any Google Fonts; update the `font-family` lines below it |
| Glass/card/button styles | `.glass{`, `.hub-card{`, `.btn-primary{` | Border radius, blur, glow shadows |
| Logo/wordmark | `Coin<span className="text-grad">0p</span>` | Appears in header, welcome screen, footer |
| Background nebula | `.c0-app::before` | The radial colour glows behind everything |

## 2. Games (add/remove/reskin)

- **`GAMES_META`** — one line per game: `{ name, tag, cur, unit, hue }`. Add a line = new game across the entire site (search, nav dropdowns, directory, sections, sell flow). `hue` (0–360) sets its icon/tile colour. `cur`/`unit` name its currency listing.
- Mock listings are generated per game in **`CAT_TEMPLATES`** (2 per category — edit titles/prices/descriptions/delivery/tags there) and the loop right below it.
- Featured hero games: **`const FEATURED = [`** in `Home`. Popular-now order counts: **`const POPULAR`**.

## 3. Sellers & offers

- **`SELLERS`** — names, ratings, sales counts. **`ONLINE`** — who shows a green dot.
- Offer-row layout: **`function OfferRow`**. Card layout: **`function ListingCapsule`**.
- Item icons per category (coin stack, gem, ID, bolt): **`CAT_ICON_PATHS`**. Real photos: set a listing's `img` URL (admin panel does this live).

## 4. Money

- **Currencies & rates:** `const CURRENCIES` — add/remove currencies, edit rates (admin panel can also edit live).
- **Buyer fee (2.9% + $0.30, waived on wallet):** search `method === "wallet" ? 0 :` in `BuyNowModal`. The checkout-page label: search `waived if you pay by wallet`.
- **Seller commission (8%):** search `* 0.92` (seller dashboard) and `8% commission` (policies text).
- **Default wallet balance:** `useState(1284.5)`.

## 5. Pages & copy

| Page | Search for |
|---|---|
| Welcome screen text/badges | `function Welcome` |
| Home sections order | `function Home` (hero → selector → ticker → popular → drops → how-it-works/leaderboard → recent → explore → trust) |
| Policies/legal text | `const SECTIONS = [` inside `function Policies` — plain string arrays, edit freely |
| Auction coming-soon copy | `function Auction` |
| Rewards wheel prizes | `const SEGS = [` in `SpinWheel` (labels + `+$` prizes credit the wallet automatically) |
| Quests & redeem shop | `const quests`, `const perks` in `Rewards` |
| Support-chat canned answers | `const CANNED` in `SupportChat` |
| Order-chat scripted seller replies (demo) | `sellerReply(` in `OrderChat` — delete when real chat lands |
| Footer links/badges/© line | `<footer` |

## 6. Navigation

- Top nav tabs: `const NAV`. Sidebar account links: `const ACCOUNT`. Sidebar icons: `const ICONS` in `SideNav`.
- Category dropdown bar: `function CatNav`. Sidebar category browser: the `Browse` block in `SideNav`.

## 7. Auth & admin (demo values to replace)

- Demo admin credentials: `ADMIN_EMAIL` + `"admin123"` in `function Admin` — **delete when backend auth exists**.
- Fake sign-in: `finish(via)` in `AuthModal` — replace with your API call; the app expects back `{ name, email, via }`.
- Login-gating of purchases: `const buy = (item) =>` in `App`.

## 8. Where backend calls plug in

Search these markers — each fakes something the API will do for real:
`finish(via)` (auth) · `setTimeout(() => {` inside `pay` (payment) · `sellerReply(` (chat) · `HIDDEN_GAMES` (game visibility) · `CURRENCIES` (FX) · `INITIAL_ORDERS` (order history) · `seed(` in `SellerDash` (seller orders) · `edit(l,` in `Admin` (listing edits). Full API list: **BACKEND_SPEC.md**.

## 9. Workflow tips

- The file is one component on purpose (fast iteration). When the backend lands, split it: `components/`, `pages/`, `data/`, `api/`.
- Best tool for ongoing edits: **Claude Code** in this repo — it can find these anchors, make the change, run the build, and commit in one go.
