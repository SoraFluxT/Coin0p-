import React, { useState, useEffect, useMemo, useCallback } from "react";

/* ================= DESIGN TOKENS / GLOBAL CSS ================= */
const GlobalStyle = () => (
  <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :root{
    --bg: oklch(0.08 0.02 270);
    --fg: oklch(0.97 0.005 270);
    --violet: oklch(0.65 0.25 295);
    --cyan: oklch(0.75 0.18 210);
    --magenta: oklch(0.65 0.28 340);
    --gold: oklch(0.8 0.16 85);
    --success: oklch(0.72 0.19 150);
    --muted: rgba(255,255,255,0.55);
  }
  .c0-app{ background: var(--bg); color: var(--fg); font-family:'Inter',system-ui,sans-serif; min-height:100vh; transition: background .3s, color .3s; }
  [data-theme="light"]{ --bg: oklch(0.97 0.006 280); --fg: oklch(0.16 0.02 270); --muted: rgba(20,15,45,0.6); }
  [data-theme="light"] .c0-app::before{ opacity:0.45; }
  [data-theme="light"] .glass{ background:rgba(20,15,45,0.04); border-color:rgba(20,15,45,0.12); }
  [data-theme="light"] .glass-strong{ background:rgba(252,251,255,0.92); border-color:rgba(20,15,45,0.14); }
  [data-theme="light"] .hub-card{ background:rgba(255,255,255,0.75); border-color:rgba(20,15,45,0.1);
    box-shadow: 0 8px 30px -18px rgba(30,20,80,0.35); }
  [data-theme="light"] .hub-card:hover{ border-color: oklch(0.65 0.25 295 / 0.55); }
  [data-theme="light"] .c0-input{ background:rgba(20,15,45,0.05); border-color:rgba(20,15,45,0.15); color:var(--fg); }
  [data-theme="light"] .c0-input::placeholder{ color:rgba(20,15,45,0.4); }
  [data-theme="light"] .chip{ border-color:rgba(20,15,45,0.18); background:rgba(20,15,45,0.03); color:rgba(20,15,45,0.65); }
  [data-theme="light"] .chip:hover{ color:var(--fg); border-color:rgba(20,15,45,0.4); }
  [data-theme="light"] .btn-ghost-glass{ background:rgba(20,15,45,0.05); border-color:rgba(20,15,45,0.16); }
  [data-theme="light"] .btn-ghost-glass:hover{ background:rgba(20,15,45,0.1); }
  [data-theme="light"] .text-white\/70, [data-theme="light"] .text-white\/60 { color: rgba(20,15,45,0.65); }
  [data-theme="light"] .text-white\/50, [data-theme="light"] .text-white\/40, [data-theme="light"] .text-white\/35 { color: rgba(20,15,45,0.45); }
  [data-theme="light"] .hover\:text-white:hover { color: rgba(20,15,45,0.95); }
  [data-theme="light"] .bg-white\/10 { background: rgba(20,15,45,0.08); }
  [data-theme="light"] .hover\:bg-white\/10:hover { background: rgba(20,15,45,0.07); }
  [data-theme="light"] .hover\:bg-white\/5:hover { background: rgba(20,15,45,0.04); }
  [data-theme="light"] .border-white\/10 { border-color: rgba(20,15,45,0.1); }
  [data-theme="light"] .border-white\/15 { border-color: rgba(20,15,45,0.13); }
  [data-theme="light"] .divide-white\/10 > * + * { border-color: rgba(20,15,45,0.1); }
  .c0-app::before{ content:""; position:fixed; inset:0; pointer-events:none; z-index:0;
    background:
      radial-gradient(60% 40% at 15% 0%, oklch(0.65 0.25 295 / 0.14), transparent 60%),
      radial-gradient(50% 35% at 85% 10%, oklch(0.75 0.18 210 / 0.10), transparent 60%),
      radial-gradient(45% 40% at 50% 100%, oklch(0.65 0.28 340 / 0.08), transparent 60%);
  }
  .font-display{ font-family:'Space Grotesk',sans-serif; }
  .font-mono2{ font-family:'JetBrains Mono',monospace; }
  .mono-label{ font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:var(--muted); }
  .glass{ background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.10); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); }
  .glass-strong{ background:rgba(16,14,28,0.85); border:1px solid rgba(255,255,255,0.14); backdrop-filter:blur(22px); -webkit-backdrop-filter:blur(22px); }
  .hub-card{ background:rgba(255,255,255,0.045); border:1px solid rgba(255,255,255,0.09); border-radius:18px; backdrop-filter:blur(14px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 10px 40px -18px rgba(0,0,0,0.8); transition: border-color .2s, transform .2s, box-shadow .2s; }
  .hub-card:hover{ border-color: oklch(0.65 0.25 295 / 0.5); transform: translateY(-2px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 44px -16px oklch(0.65 0.25 295 / 0.35); }
  .btn-primary{ position:relative; overflow:hidden; background: linear-gradient(100deg, var(--violet), var(--magenta)); color:#fff; font-weight:600;
    box-shadow: 0 0 22px -4px oklch(0.65 0.25 295 / 0.55), inset 0 1px 0 rgba(255,255,255,0.25); transition: filter .15s, transform .1s, box-shadow .2s; border:none; }
  .btn-primary::after{ content:""; position:absolute; top:0; left:-70%; width:45%; height:100%;
    background:linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent); transform:skewX(-20deg); transition:left .5s ease; }
  .btn-primary:hover::after{ left:130%; }
  .btn-primary:hover{ box-shadow: 0 0 30px -4px oklch(0.65 0.25 295 / 0.8), inset 0 1px 0 rgba(255,255,255,0.3); }
  @media (prefers-reduced-motion: reduce){ .btn-primary::after{ display:none; } }
  .btn-primary:hover{ filter:brightness(1.12); }
  .btn-primary:active{ transform:scale(0.98); }
  .btn-ghost-glass{ background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.14); color:var(--fg); transition: background .15s; }
  .btn-ghost-glass:hover{ background:rgba(255,255,255,0.12); }
  .text-grad{ background: linear-gradient(95deg, var(--violet), var(--cyan)); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .text-grad-price{ background: linear-gradient(95deg, oklch(0.8 0.2 295), oklch(0.85 0.15 210)); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .chip{ border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.04); color:var(--muted); transition: all .15s; cursor:pointer; }
  .chip:hover{ color:var(--fg); border-color:rgba(255,255,255,0.3); }
  .chip.on{ color:#fff; border-color: oklch(0.65 0.25 295 / 0.8); background: oklch(0.65 0.25 295 / 0.18); box-shadow:0 0 16px -4px oklch(0.65 0.25 295 / 0.6); }
  .chip.on-cyan{ color:#fff; border-color: oklch(0.75 0.18 210 / 0.8); background: oklch(0.75 0.18 210 / 0.14); box-shadow:0 0 16px -4px oklch(0.75 0.18 210 / 0.55); }
  .c0-input{ background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); color:var(--fg); outline:none; transition:border-color .15s, box-shadow .15s; }
  .c0-input:focus{ border-color: oklch(0.65 0.25 295 / 0.8); box-shadow:0 0 0 3px oklch(0.65 0.25 295 / 0.2); }
  .c0-input::placeholder{ color:rgba(255,255,255,0.35); }
  .scroll-x{ scrollbar-width:none; } .scroll-x::-webkit-scrollbar{ display:none; }
  .fadein{ animation:c0fade .35s ease both; }
  @keyframes c0fade{ from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:none;} }
  @keyframes c0spin{ to{ transform:rotate(360deg);} }
  @keyframes c0marquee{ from{ transform:translateX(0);} to{ transform:translateX(-50%);} }
  .ticker{ display:flex; gap:2.5rem; width:max-content; animation:c0marquee 32s linear infinite; }
  @media (prefers-reduced-motion: reduce){ .ticker{ animation:none; } }
  .spinner{ width:38px;height:38px;border-radius:50%;border:3px solid rgba(255,255,255,0.15);border-top-color:var(--violet); animation:c0spin .8s linear infinite; }
  @media (prefers-reduced-motion: reduce){ .fadein{animation:none;} .hub-card:hover{transform:none;} }
  button:focus-visible, a:focus-visible, input:focus-visible{ outline:2px solid var(--cyan); outline-offset:2px; }
  `}</style>
);

/* ================= MOCK DATA ================= */
const CATS = ["Currency", "Accounts", "Items", "Services"];

const GAMES_META = [
  { name: "OSRS", tag: "MMORPG", cur: "200M GP · main stack", unit: "GP", hue: 85 },
  { name: "WoW", tag: "MMORPG", cur: "1M Gold · Retail EU", unit: "Gold", hue: 45 },
  { name: "Fortnite", tag: "Battle Royale", cur: "13,500 V-Bucks top-up", unit: "V-Bucks", hue: 250 },
  { name: "Valorant", tag: "Tactical FPS", cur: "11,000 VP top-up", unit: "VP", hue: 350 },
  { name: "CS2", tag: "Tactical FPS", cur: "$100 trade balance", unit: "Balance", hue: 210 },
  { name: "League of Legends", tag: "MOBA", cur: "13,500 RP top-up", unit: "RP", hue: 150 },
  { name: "Roblox", tag: "Platform", cur: "10,000 Robux", unit: "Robux", hue: 25 },
  { name: "GTA 5 Online", tag: "Action", cur: "$100M cash drop", unit: "Cash", hue: 120 },
  { name: "Clash of Clans", tag: "Mobile", cur: "14,000 Gems pack", unit: "Gems", hue: 60 },
  { name: "EA FC 26", tag: "Sports", cur: "1M FC Coins · console", unit: "Coins", hue: 140 },
];
const GAMES = GAMES_META.map((g) => g.name);

const RARITY_STYLE = {
  Common:    { c: "var(--cyan)",    bg: "oklch(0.75 0.18 210 / 0.15)" },
  Rare:      { c: "var(--violet)",  bg: "oklch(0.65 0.25 295 / 0.18)" },
  Epic:      { c: "var(--magenta)", bg: "oklch(0.65 0.28 340 / 0.18)" },
  Legendary: { c: "var(--gold)",    bg: "oklch(0.8 0.16 85 / 0.16)" },
  Mythic:    { c: "oklch(0.72 0.24 25)", bg: "oklch(0.72 0.24 25 / 0.16)" },
};

const SELLERS = [
  { name: "VaultKeeper", rating: 4.9, sales: 2841 },
  { name: "CoinRush", rating: 4.7, sales: 9932 },
  { name: "AceForge", rating: 4.8, sales: 1204 },
  { name: "GoldWyrm", rating: 4.6, sales: 7742 },
  { name: "ClimbLab", rating: 4.9, sales: 5310 },
  { name: "LockerRoom", rating: 4.4, sales: 611 },
  { name: "PitchMarket", rating: 4.6, sales: 3308 },
  { name: "ApexSquad", rating: 4.7, sales: 940 },
];

const CAT_TEMPLATES = {
  Currency: [
    { t: (g, m) => m.cur, p: 42, r: "Common", del: "15m", d: "Delivered via in-game trade or top-up within 15 minutes. Region-free where supported." },
    { t: (g, m) => "Bulk " + m.unit + " · best rate on the floor", p: 96, r: "Common", del: "30m", tag: "-20%", off: true, d: "Large-volume order split into safe batches. Rate improves with quantity." },
  ],
  Accounts: [
    { t: (g) => "High-rank " + g + " account · full access", p: 189, r: "Rare", del: "1h", d: "Original email included, clean history, credentials handed over through escrow." },
    { t: (g) => "Stacked " + g + " account · rare unlocks", p: 640, r: "Legendary", del: "1h", tag: "Verified", d: "First-owner account with rare cosmetics and deep progression. Verified before release." },
  ],
  Items: [
    { t: (g) => "Rare " + g + " item bundle", p: 74, r: "Rare", del: "30m", d: "Curated bundle of tradeable items, delivered via in-game trade." },
    { t: (g) => "Limited " + g + " cosmetic", p: 320, r: "Mythic", del: "30m", tag: "Hot", d: "Out-of-rotation cosmetic with proof-of-ownership screenshots in the gallery." },
  ],
  Services: [
    { t: (g) => g + " rank boost (per tier)", p: 34, r: "Rare", del: "1–6d", d: "Verified booster, VPN + offline mode, transparent per-tier pricing." },
    { t: (g) => g + " pro carry session", p: 120, r: "Epic", del: "1–2d", d: "Duo or piloted session with a top-ladder player. Streamed on request." },
  ],
};

const LISTINGS = [];
GAMES_META.forEach((m, gi) => {
  CATS.forEach((cat, ci) => {
    CAT_TEMPLATES[cat].forEach((tpl, ti) => {
      const s = SELLERS[(gi + ci * 2 + ti) % SELLERS.length];
      const price = Math.round(tpl.p * (0.8 + ((gi * 7 + ci * 3 + ti) % 9) / 10) * 100) / 100;
      LISTINGS.push({
        id: "l-" + gi + "-" + ci + "-" + ti,
        title: tpl.t(m.name, m),
        game: m.name, cat, price, rarity: tpl.r,
        seller: s.name, rating: s.rating, sales: s.sales,
        stock: tpl.r === "Legendary" || tpl.r === "Mythic" ? 1 : 99,
        desc: tpl.d, del: tpl.del, tag: tpl.tag,
        oldPrice: tpl.off ? Math.round(price * 1.25 * 100) / 100 : undefined,
      });
    });
  });
});

const ONLINE = new Set(["VaultKeeper", "CoinRush", "ClimbLab", "PitchMarket", "AceForge"]);
const HIDDEN_GAMES = new Set(); // admin can hide games; in-memory for the demo

const BUYERS = ["kaz", "m4ko", "deni_z", "ghost", "pixl", "arlo", "nyx", "juno"];
const ACTIVITY = LISTINGS.filter((_, i) => i % 9 === 0).slice(0, 8)
  .map((l, i) => ({ id: i, txt: BUYERS[i % BUYERS.length] + " bought " + l.title + " · " + (2 + i * 3) + "m ago" }));

const POPULAR = GAMES_META.map((g, i) => ({ ...g, orders: 340 - i * 23 - (i % 3) * 11 }))
  .sort((a, b) => b.orders - a.orders).slice(0, 6);

const COACHES = [
  { id:"c1", name:"Nova", game:"Valorant", rate:35, rating:4.9, sessions:820, tag:"Radiant · ex-VCT analyst", blurb:"VOD review + aim routine design. I fix your crosshair placement in one session." },
  { id:"c2", name:"Mid-Diff", game:"League of Legends", rate:28, rating:4.8, sessions:1130, tag:"Challenger 1,100 LP", blurb:"Wave management, tempo, and roam timers. Mid/top specialist." },
  { id:"c3", name:"FlickGod", game:"CS2", rate:40, rating:4.9, sessions:645, tag:"FPL · 3k Elo Faceit", blurb:"Utility lineups, demo review, and duel discipline for MM → Faceit 10." },
  { id:"c4", name:"Boxfight", game:"Fortnite", rate:24, rating:4.7, sessions:512, tag:"FNCS finalist", blurb:"Piece control, box fighting, and endgame surge routing for ranked cups." },
  { id:"c5", name:"TopBins", game:"EA FC 26", rate:26, rating:4.8, sessions:433, tag:"Rank 1 Rivals · eChampions", blurb:"Meta formations, custom tactics, and finishing drills for Weekend League." },
  { id:"c6", name:"Sensei", game:"WoW", rate:30, rating:4.9, sessions:701, tag:"Gladiator · CE raider", blurb:"Arena comps, cooldown mapping, and mythic+ route planning." },
];

const AUCTIONS = [
  { id:"a1", title:"Karambit | Fade 98%", game:"CS2", bid:2140, bids:38, ends: 1000*60*47 },
  { id:"a2", title:"Gilded Champion Account", game:"League of Legends", bid:410, bids:17, ends: 1000*60*128 },
  { id:"a3", title:"OG Renegade Raider Locker", game:"Fortnite", bid:3320, bids:52, ends: 1000*60*15 },
  { id:"a4", title:"Maxed Ironman · Quest Cape", game:"OSRS", bid:980, bids:24, ends: 1000*60*260 },
];

const RANKS = ["Iron","Bronze","Silver","Gold","Platinum","Diamond","Ascendant","Immortal","Radiant"];

const INITIAL_ORDERS = [
  { id: "o1", title: "10,000 V-Bucks Top-Up", price: 54.9, status: "delivered", date: "Jun 24", seller: "CoinRush", game: "Fortnite", userIG: "Belal_FN", adminVerified: true, chat: [
    { from: "system", t: "Order placed — funds are in escrow." },
    { from: "buyer", t: "My in-game username is: Belal_FN" },
    { from: "seller", t: "Sent! ✅ Please check in game and confirm delivery." },
    { from: "system", t: "Delivery confirmed by buyer — escrow released to CoinRush." },
  ] },
  { id: "o2", title: "Immortal 3 → Radiant Boost", price: 320.0, status: "escrow", date: "Jun 29", seller: "AceForge", game: "Valorant", userIG: "", adminVerified: false, chat: [
    { from: "system", t: "Order placed — funds are in escrow. Next step: share your in-game username with the seller." },
    { from: "seller", t: "Hey! Thanks for your order 🤝 Drop your Riot ID below and we'll schedule the boost." },
  ] },
  { id: "o3", title: "200M OSRS GP", price: 96.0, status: "disputed", date: "Jun 18", seller: "CoinRush", game: "OSRS", userIG: "IronBelal", adminVerified: false, chat: [
    { from: "system", t: "Order placed — funds are in escrow." },
    { from: "buyer", t: "My in-game username is: IronBelal" },
    { from: "system", t: "Dispute opened — the resolution team and admin have been notified." },
  ] },
];

const INITIAL_TXNS = [
  { id:"t1", label:"Wallet top-up", amt:+500, date:"Jun 21" },
  { id:"t2", label:"Purchase · V-Bucks", amt:-54.90, date:"Jun 24" },
  { id:"t3", label:"Refund · disputed order", amt:+96.00, date:"Jun 26" },
];

const CURRENCIES = [
  { code: "USD", sym: "$", rate: 1 },
  { code: "GBP", sym: "£", rate: 0.79 },
  { code: "EUR", sym: "€", rate: 0.92 },
  { code: "CAD", sym: "C$", rate: 1.37 },
  { code: "AUD", sym: "A$", rate: 1.52 },
  { code: "AED", sym: "AED ", rate: 3.67 },
  { code: "INR", sym: "₹", rate: 83.4 },
];
let CUR = CURRENCIES[0]; // set per-render from App state; indicative rates, swap for a live FX API later
const fmt = (n) => CUR.sym + (n * CUR.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ================= SMALL PIECES ================= */
const Thumb = ({ text, size = "h-40", rounded = "rounded-t-2xl", font = "text-5xl" }) => (
  <div className={`${size} ${rounded} w-full flex items-center justify-center relative overflow-hidden`}
    style={{ background: "linear-gradient(135deg, oklch(0.3 0.12 295), oklch(0.2 0.08 250) 55%, oklch(0.25 0.1 340))" }}>
    <span className={`font-display font-bold ${font}`} style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 0 30px oklch(0.65 0.25 295 / 0.8)" }}>
      {text[0]}
    </span>
    <div className="absolute inset-0" style={{ background: "radial-gradient(60% 60% at 70% 20%, oklch(0.75 0.18 210 / 0.18), transparent)" }} />
  </div>
);

const CAT_ICON_PATHS = {
  Currency: (
    <g fill="rgba(255,255,255,0.92)">
      <ellipse cx="32" cy="42" rx="17" ry="7" />
      <ellipse cx="32" cy="33" rx="17" ry="7" opacity="0.85" />
      <ellipse cx="32" cy="24" rx="17" ry="7" opacity="0.7" />
    </g>
  ),
  Accounts: (
    <g fill="rgba(255,255,255,0.92)">
      <circle cx="32" cy="24" r="9" />
      <path d="M14 50c0-10 8-16 18-16s18 6 18 16z" />
    </g>
  ),
  Items: (
    <g fill="rgba(255,255,255,0.92)">
      <path d="M32 10 L50 26 L32 54 L14 26 Z" />
      <path d="M32 10 L32 54 M14 26 L50 26" stroke="rgba(0,0,0,0.25)" strokeWidth="2" fill="none" />
    </g>
  ),
  Services: (
    <g fill="rgba(255,255,255,0.92)">
      <path d="M36 8 L18 36 h10 L28 56 L46 26 h-10 Z" />
    </g>
  ),
};

function ItemArt({ l, size = "h-40", rounded = "rounded-t-2xl", iconScale = "w-14 h-14" }) {
  const meta = GAMES_META.find((g) => g.name === l.game);
  const hue = meta ? meta.hue : 295;
  if (l.img) {
    return <div className={`${size} w-full ${rounded} bg-center bg-cover`} style={{ backgroundImage: `url(${l.img})` }} role="img" aria-label={l.title} />;
  }
  return (
    <div className={`${size} w-full ${rounded} relative flex items-center justify-center overflow-hidden`}
      style={{ background: `linear-gradient(135deg, oklch(0.32 0.13 ${hue}), oklch(0.16 0.06 ${(hue + 80) % 360}) 60%, oklch(0.26 0.11 ${(hue + 40) % 360}))` }}>
      <svg viewBox="0 0 64 64" className={iconScale} style={{ filter: `drop-shadow(0 0 16px oklch(0.7 0.2 ${hue} / 0.85))` }}>
        {CAT_ICON_PATHS[l.cat] || CAT_ICON_PATHS.Items}
      </svg>
      <span className="absolute bottom-2 right-3 font-mono2 text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{l.game}</span>
    </div>
  );
}

function GameArt({ g, size = "h-24" }) {
  return (
    <div className={`${size} w-full rounded-t-2xl relative flex items-center justify-center overflow-hidden`}
      style={{ background: `linear-gradient(135deg, oklch(0.34 0.14 ${g.hue}), oklch(0.17 0.07 ${(g.hue + 70) % 360}))` }}>
      <span className="font-display font-bold text-4xl" style={{ color: "rgba(255,255,255,0.9)", textShadow: `0 0 24px oklch(0.7 0.2 ${g.hue} / 0.9)` }}>{g.name[0]}</span>
    </div>
  );
}

const RarityRibbon = ({ r }) => (
  <span className="font-mono2 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest"
    style={{ color: RARITY_STYLE[r].c, background: RARITY_STYLE[r].bg, border: `1px solid ${RARITY_STYLE[r].c}` }}>
    ◆ {r}
  </span>
);

const Stars = ({ n }) => (
  <span className="font-mono2 text-xs" style={{ color: "var(--gold)" }}>★ {n.toFixed(1)}</span>
);

/* ================= LISTING CARD ================= */
function ListingCapsule({ l, go, buy, addCart, watched, toggleWatch }) {
  return (
    <div className="hub-card overflow-hidden fadein flex flex-col">
      <button onClick={() => go({ page: "listing", id: l.id })} className="text-left w-full relative">
        <ItemArt l={l} />
        <span className="absolute top-2 left-2 font-mono2 text-[10px] px-2 py-0.5 rounded-md glass">{l.game}</span>
        {l.tag && (
          <span className="absolute top-2 right-2 font-mono2 text-[10px] px-2 py-0.5 rounded-full text-white"
            style={{ background: "linear-gradient(100deg,var(--violet),var(--magenta))", boxShadow: "0 0 12px -2px oklch(0.65 0.25 295 / 0.7)" }}>{l.tag}</span>
        )}
      </button>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <RarityRibbon r={l.rarity} />
          <button aria-label="watchlist" onClick={() => toggleWatch(l.id)}
            className="text-lg leading-none" style={{ color: watched ? "var(--magenta)" : "rgba(255,255,255,0.35)" }}>
            {watched ? "♥" : "♡"}
          </button>
        </div>
        <button onClick={() => go({ page: "listing", id: l.id })} className="text-left">
          <h3 className="font-display font-semibold text-sm leading-snug hover:underline">{l.title}</h3>
        </button>
        <div className="flex items-center gap-3 font-mono2 text-[11px]" style={{ color: "var(--muted)" }}>
          <span title="delivery time">⚡ {l.del}</span>
          <Stars n={l.rating} />
        </div>
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          <button className="hover:underline" onClick={() => go({ page: "game", game: l.game })}>{l.game}</button>
          {" · "}
          <button className="hover:underline" onClick={() => go({ page: "seller", name: l.seller })}>{l.seller}</button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono2 font-bold text-grad-price">{fmt(l.price)}
            {l.oldPrice && <span className="ml-1.5 text-[11px] line-through font-normal" style={{ color: "var(--muted)" }}>{fmt(l.oldPrice)}</span>}
          </span>
          <div className="flex gap-1.5">
            <button onClick={() => addCart(l)} className="btn-ghost-glass rounded-lg px-2.5 py-1.5 text-xs">+ Cart</button>
            <button onClick={() => buy(l)} className="btn-primary rounded-lg px-3 py-1.5 text-xs">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= PAGES ================= */
function Home({ go, buy, addCart, watch, toggleWatch, recent }) {
  const FEATURED = [
    { game: "Roblox", sub: "Be the first to get rare items at the best prices", label: "Featured game" },
    { game: "OSRS", sub: "GP, maxed accounts and quest services from verified sellers", label: "Trending" },
    { game: "Fortnite", sub: "V-Bucks top-ups and OG lockers, delivered in minutes", label: "Hot right now" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % FEATURED.length), 6000);
    return () => clearInterval(t);
  }, []);
  const f = FEATURED[idx];
  const featured = LISTINGS.filter((l) => l.rarity === "Legendary").slice(0, 4);
  const viewed = recent.map((id) => LISTINGS.find((l) => l.id === id)).filter(Boolean);
  return (
    <div className="fadein">
      <section className="hub-card overflow-hidden mb-4 relative" key={f.game}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, oklch(0.15 0.06 295) 0%, oklch(0.22 0.11 295) 40%, oklch(0.2 0.09 210) 75%, oklch(0.22 0.1 340) 100%)" }} />
        <div className="absolute -right-8 -bottom-20 font-display font-bold select-none pointer-events-none"
          style={{ fontSize: "280px", lineHeight: 1, color: "rgba(255,255,255,0.06)", textShadow: "0 0 90px oklch(0.65 0.25 295 / 0.45)" }}>{f.game[0]}</div>
        <div className="relative p-8 md:p-12 min-h-[280px] flex flex-col justify-center fadein" key={idx}>
          <div className="mono-label mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>{f.label}</div>
          <h1 className="font-display font-bold text-4xl md:text-6xl" style={{ color: "#fff" }}>{f.game}</h1>
          <p className="mt-3 max-w-md text-sm md:text-base" style={{ color: "rgba(255,255,255,0.75)" }}>{f.sub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => go({ page: "game", game: f.game })} className="btn-primary rounded-xl px-8 py-3.5 text-sm">Buy now</button>
            <button onClick={() => go({ page: "games" })} className="btn-ghost-glass rounded-xl px-6 py-3.5 text-sm" style={{ color: "#fff" }}>All games</button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3 mb-10">
        {FEATURED.map((x, i) => (
          <button key={x.game} onClick={() => setIdx(i)}
            className={`hub-card flex items-center gap-3 p-3 text-left transition ${i === idx ? "" : "opacity-60 hover:opacity-100"}`}
            style={i === idx ? { borderColor: "oklch(0.65 0.25 295 / 0.7)" } : undefined}>
            <span className="w-12 h-9 rounded-lg flex items-center justify-center font-display font-bold shrink-0"
              style={{ background: "linear-gradient(135deg,var(--violet),var(--cyan))", color: "#fff" }}>{x.game[0]}</span>
            <span className="text-sm font-semibold truncate">{x.game}</span>
          </button>
        ))}
      </div>

      <div className="glass rounded-xl overflow-hidden mb-10 py-2.5">
        <div className="ticker">
          {[...ACTIVITY, ...ACTIVITY].map((a, i) => (
            <span key={i} className="font-mono2 text-xs whitespace-nowrap" style={{ color: "var(--muted)" }}>
              <span style={{ color: "var(--success)" }}>●</span> {a.txt}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between mb-4">
        <h2 className="font-display font-semibold text-xl">Popular right now</h2>
        <button onClick={() => go({ page: "games" })} className="mono-label hover:text-white">All games →</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {POPULAR.filter((g) => !HIDDEN_GAMES.has(g.name)).map((g) => (
          <button key={g.name} onClick={() => go({ page: "game", game: g.name })} className="hub-card overflow-hidden text-left">
            <GameArt g={g} size="h-20" />
            <div className="p-3">
              <div className="font-display font-semibold text-sm truncate">{g.name}</div>
              <div className="mono-label mt-1" style={{ color: "var(--magenta)" }}>🔥 {g.orders} orders today</div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-end justify-between mb-4">
        <h2 className="font-display font-semibold text-xl">Featured drops</h2>
        <button onClick={() => go({ page: "marketplace" })} className="mono-label hover:text-white">View all →</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((l) => (
          <ListingCapsule key={l.id} l={l} go={go} buy={buy} addCart={addCart} watched={watch.has(l.id)} toggleWatch={toggleWatch} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
        <div className="hub-card p-6">
          <div className="mono-label mb-4">How it works</div>
          {[
            ["01", "Pick your game", "Search or browse — every game has its own currency, accounts, items and services sections."],
            ["02", "Pay into escrow", "Your money is held by Coin0p, never sent straight to the seller."],
            ["03", "Confirm delivery", "Check everything is right, hit confirm, and only then are funds released."],
          ].map(([k, t, d]) => (
            <div key={k} className="flex gap-4 py-3 border-b border-white/10 last:border-0">
              <span className="font-mono2 font-bold text-grad shrink-0">{k}</span>
              <div>
                <div className="font-display font-semibold text-sm">{t}</div>
                <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="hub-card p-6">
          <div className="mono-label mb-4">Top sellers this month</div>
          {[...SELLERS].sort((a, b) => b.sales - a.sales).slice(0, 5).map((s, i) => (
            <button key={s.name} onClick={() => go({ page: "seller", name: s.name })}
              className="w-full flex items-center gap-3 py-2.5 border-b border-white/10 last:border-0 text-left hover:bg-white/5 rounded-lg px-2 -mx-2">
              <span className="font-mono2 text-xs w-6" style={{ color: i === 0 ? "var(--gold)" : "var(--muted)" }}>#{i + 1}</span>
              <span className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0"
                style={{ background: "linear-gradient(135deg,var(--violet),var(--magenta))", color: "#fff" }}>{s.name[0]}</span>
              <span className="flex-1 text-sm font-semibold">{s.name}</span>
              <span className="font-mono2 text-xs" style={{ color: "var(--muted)" }}>{s.sales.toLocaleString()} sales</span>
              <span className="font-mono2 text-xs" style={{ color: "var(--gold)" }}>★ {s.rating.toFixed(1)}</span>
            </button>
          ))}
        </div>
      </div>

      {viewed.length > 0 && (
        <>
          <h2 className="font-display font-semibold text-xl mt-10 mb-4">Recently viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {viewed.map((l) => (
              <ListingCapsule key={l.id} l={l} go={go} buy={buy} addCart={addCart} watched={watch.has(l.id)} toggleWatch={toggleWatch} />
            ))}
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { t: "Auction House", d: "Coming soon — live bidding with anti-snipe timers, reserves, and escrow settlement.", p: "auction" },
          { t: "Rank Boosting", d: "Verified boosters, VPN-protected sessions, transparent per-tier pricing.", p: "boosting" },
          { t: "Rewards", d: "Every dollar traded earns XP toward fee discounts and priority support.", p: "rewards" },
        ].map((x) => (
          <button key={x.p} onClick={() => go({ page: x.p })} className="hub-card p-6 text-left">
            <div className="mono-label mb-2">Explore</div>
            <div className="font-display font-semibold text-lg">{x.t}</div>
            <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>{x.d}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <div className="hub-card p-6" style={{ borderColor: "oklch(0.8 0.16 85 / 0.35)" }}>
          <div className="text-2xl">🛡</div>
          <div className="font-display font-semibold text-lg mt-2">Money-back guarantee</div>
          <p className="text-sm mt-1.5" style={{ color: "var(--muted)" }}>Receive your order or get a refund — every payment is held in escrow with full trade protection.</p>
          <button onClick={() => go({ page: "policies" })} className="btn-ghost-glass rounded-lg px-4 py-2 text-xs mt-4">Learn more</button>
        </div>
        <div className="hub-card p-6" style={{ borderColor: "oklch(0.72 0.19 150 / 0.35)" }}>
          <div className="text-2xl">💬</div>
          <div className="font-display font-semibold text-lg mt-2">24/7 live support</div>
          <p className="text-sm mt-1.5" style={{ color: "var(--muted)" }}>Support works around the clock. Stuck on an order? Talk to us any time.</p>
          <button onClick={() => window.dispatchEvent(new Event("c0-open-chat"))} className="btn-primary rounded-lg px-4 py-2 text-xs mt-4">Chat now</button>
        </div>
        <div className="hub-card p-6" style={{ borderColor: "oklch(0.75 0.18 210 / 0.35)" }}>
          <div className="text-2xl">✓</div>
          <div className="font-display font-semibold text-lg mt-2">Verified sellers</div>
          <p className="text-sm mt-1.5" style={{ color: "var(--muted)" }}>Every seller passes identity verification before their first payout, and public reviews keep them honest.</p>
          <button onClick={() => go({ page: "policies" })} className="btn-ghost-glass rounded-lg px-4 py-2 text-xs mt-4">Seller rules</button>
        </div>
      </div>
    </div>
  );
}

function Marketplace({ go, buy, addCart, watch, toggleWatch }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [game, setGame] = useState("All");
  const cats = ["All", "Items", "Accounts", "Currency", "Services"];
  const results = useMemo(() =>
    LISTINGS.filter((l) =>
      (cat === "All" || l.cat === cat) &&
      (game === "All" || l.game === game) &&
      (q === "" || (l.title + l.game + l.seller).toLowerCase().includes(q.toLowerCase()))
    ), [q, cat, game]);

  return (
    <div className="fadein">
      <section className="hub-card p-8 mb-6">
        <div className="mono-label mb-2">Marketplace</div>
        <h1 className="font-display font-bold text-4xl md:text-5xl">The Floor</h1>
        <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>64,281 active listings across {GAMES.length} games</p>
      </section>

      <div className="flex gap-3 mb-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items, accounts, sellers…"
          className="c0-input flex-1 rounded-xl px-4 py-3 text-sm font-mono2" />
        <button className="btn-ghost-glass rounded-xl px-5 text-sm">Filters</button>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`chip rounded-full px-4 py-1.5 text-xs font-mono2 ${cat === c ? "on" : ""}`}>{c}</button>
        ))}
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto scroll-x pb-1">
        {["All", ...GAMES.filter((g) => !HIDDEN_GAMES.has(g))].map((g) => (
          <button key={g} onClick={() => setGame(g)} className={`chip rounded-full px-4 py-1.5 text-xs font-mono2 whitespace-nowrap ${game === g ? "on-cyan" : ""}`}>{g}</button>
        ))}
      </div>

      <div className="mono-label mb-3">{results.length} results</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {results.map((l) => (
          <ListingCapsule key={l.id} l={l} go={go} buy={buy} addCart={addCart} watched={watch.has(l.id)} toggleWatch={toggleWatch} />
        ))}
      </div>
      {results.length === 0 && (
        <div className="hub-card p-10 text-center">
          <div className="font-display text-lg">Nothing matches those filters</div>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Clear the search or pick another game to see live listings.</p>
        </div>
      )}
    </div>
  );
}

function ListingDetail({ id, go, buy, addCart, watch, toggleWatch }) {
  const l = LISTINGS.find((x) => x.id === id);
  if (!l) return <div className="hub-card p-10">Listing not found.</div>;
  const more = LISTINGS.filter((x) => x.seller === l.seller && x.id !== l.id).slice(0, 3);
  return (
    <div className="fadein grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="hub-card overflow-hidden">
          <ItemArt l={l} size="h-72" rounded="rounded-t-2xl" iconScale="w-24 h-24" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <RarityRibbon r={l.rarity} />
              <span className="mono-label">{l.cat} · {l.game}</span>
            </div>
            <h1 className="font-display font-bold text-3xl">{l.title}</h1>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{l.desc}</p>
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[["Stock", l.stock], ["Delivery", "~15 min"], ["Escrow", "Included"]].map(([k, v]) => (
                <div key={k} className="glass rounded-xl p-3 text-center">
                  <div className="mono-label">{k}</div>
                  <div className="font-mono2 text-sm mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hub-card p-6">
          <h2 className="font-display font-semibold text-lg mb-4">Recent reviews</h2>
          {[["ghostwrit3r", "Delivered in 9 minutes, exactly as described."], ["m4ko", "Smooth escrow release, seller answered instantly."], ["deni_z", "Second purchase from this seller — flawless again."]].map(([u, r]) => (
            <div key={u} className="border-b border-white/10 last:border-0 py-3">
              <div className="flex items-center gap-2 text-xs font-mono2"><Stars n={5.0} /><span style={{ color: "var(--muted)" }}>{u}</span></div>
              <p className="text-sm mt-1">{r}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="hub-card p-6 lg:sticky lg:top-24">
          <div className="mono-label">Price</div>
          <div className="font-mono2 font-bold text-3xl text-grad-price mt-1">{fmt(l.price)}</div>
          <button onClick={() => buy(l)} className="btn-primary w-full rounded-xl py-3 text-sm mt-5">Buy now</button>
          <button onClick={() => addCart(l)} className="btn-ghost-glass w-full rounded-xl py-3 text-sm mt-2">Add to cart</button>
          <button onClick={() => toggleWatch(l.id)} className="w-full rounded-xl py-3 text-sm mt-2 chip">
            {watch.has(l.id) ? "♥ Watching" : "♡ Add to watchlist"}
          </button>
          <div className="mono-label mt-5 mb-2">Seller</div>
          <button onClick={() => go({ page: "seller", name: l.seller })} className="glass rounded-xl p-3 w-full flex items-center gap-3 text-left hover:border-white/30">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold"
              style={{ background: "linear-gradient(135deg,var(--violet),var(--magenta))" }}>{l.seller[0]}</div>
            <div>
              <div className="text-sm font-semibold">{l.seller}</div>
              <div className="text-xs font-mono2" style={{ color: "var(--muted)" }}><Stars n={l.rating} /> · {l.sales.toLocaleString()} sales</div>
            </div>
          </button>
        </div>
        {more.length > 0 && (
          <div className="hub-card p-5">
            <div className="mono-label mb-3">More from {l.seller}</div>
            {more.map((m) => (
              <button key={m.id} onClick={() => go({ page: "listing", id: m.id })} className="flex justify-between items-center w-full py-2 text-left text-sm hover:underline">
                <span className="truncate pr-3">{m.title}</span>
                <span className="font-mono2 text-grad-price">{fmt(m.price)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SellerPage({ name, go, buy, addCart, watch, toggleWatch }) {
  const items = LISTINGS.filter((l) => l.seller === name);
  const meta = items[0] || { rating: 4.8, sales: 100 };
  return (
    <div className="fadein">
      <div className="hub-card overflow-hidden mb-6">
        <div className="h-32" style={{ background: "linear-gradient(100deg, oklch(0.35 0.14 295), oklch(0.25 0.1 210), oklch(0.3 0.13 340))" }} />
        <div className="p-6 flex flex-wrap items-center gap-4 -mt-12">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-bold text-3xl border border-white/20"
            style={{ background: "linear-gradient(135deg,var(--violet),var(--magenta))" }}>{name[0]}</div>
          <div className="pt-8">
            <h1 className="font-display font-bold text-2xl">{name}</h1>
            <div className="font-mono2 text-xs mt-1" style={{ color: "var(--muted)" }}>
              <Stars n={meta.rating} /> · {meta.sales.toLocaleString()} sales · member since 2023 · replies in ~4 min
            </div>
          </div>
        </div>
      </div>
      <h2 className="font-display font-semibold text-lg mb-4">{items.length} active listing{items.length !== 1 ? "s" : ""}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((l) => (
          <ListingCapsule key={l.id} l={l} go={go} buy={buy} addCart={addCart} watched={watch.has(l.id)} toggleWatch={toggleWatch} />
        ))}
      </div>
    </div>
  );
}

function Coaching({ buy }) {
  const [game, setGame] = useState("All");
  const list = COACHES.filter((c) => game === "All" || c.game === game);
  return (
    <div className="fadein">
      <section className="hub-card p-8 mb-6">
        <div className="mono-label mb-2">1-to-1 Coaching</div>
        <h1 className="font-display font-bold text-4xl">Level up with a pro</h1>
        <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>Live sessions with verified high-elo coaches. Pay per hour, escrow-protected.</p>
      </section>
      <div className="flex gap-2 mb-6 overflow-x-auto scroll-x">
        {["All", ...new Set(COACHES.map((c) => c.game))].map((g) => (
          <button key={g} onClick={() => setGame(g)} className={`chip rounded-full px-4 py-1.5 text-xs font-mono2 whitespace-nowrap ${game === g ? "on-cyan" : ""}`}>{g}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((c) => (
          <div key={c.id} className="hub-card p-6 flex flex-col fadein">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-xl"
                style={{ background: "linear-gradient(135deg,var(--cyan),var(--violet))" }}>{c.name[0]}</div>
              <div>
                <div className="font-display font-semibold">{c.name}</div>
                <div className="mono-label">{c.game}</div>
              </div>
            </div>
            <div className="font-mono2 text-xs mt-3" style={{ color: "var(--muted)" }}>{c.tag} · <Stars n={c.rating} /> · {c.sessions} sessions</div>
            <p className="text-sm mt-3 flex-1" style={{ color: "var(--muted)" }}>{c.blurb}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="font-mono2 font-bold text-grad-price">{fmt(c.rate)}<span className="text-xs font-normal" style={{ color: "var(--muted)" }}>/hr</span></span>
              <button onClick={() => buy({ id: c.id, title: `1hr coaching · ${c.name}`, game: c.game, seller: c.name, price: c.rate })}
                className="btn-primary rounded-lg px-4 py-2 text-xs">Book 1:1</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Auction() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="fadein max-w-3xl">
      <section className="hub-card p-8 md:p-12 mb-6 relative overflow-hidden">
        <div className="absolute -right-6 -top-10 font-display font-bold pointer-events-none select-none"
          style={{ fontSize: "180px", lineHeight: 1, color: "rgba(255,255,255,0.05)" }}>A</div>
        <span className="font-mono2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ color: "var(--cyan)", border: "1px solid var(--cyan)", background: "oklch(0.75 0.18 210 / 0.12)" }}>Coming soon</span>
        <h1 className="font-display font-bold text-4xl md:text-5xl mt-4">Auction House</h1>
        <p className="text-sm md:text-base mt-3 max-w-lg" style={{ color: "var(--muted)" }}>
          Live bidding on the rarest inventory on Coin0p. We're building it properly before we open the doors — here's what's coming.
        </p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          ["Live bidding", "Real-time bids with instant outbid notifications, on desktop and mobile."],
          ["Anti-snipe soft close", "Any bid in the final minute extends the timer, so auctions end fairly."],
          ["Reserve prices", "Sellers set a hidden minimum — no item sells below its worth."],
          ["Escrow settlement", "Winning bids settle through the same escrow that protects every Coin0p order."],
        ].map(([t, d]) => (
          <div key={t} className="hub-card p-5">
            <div className="font-display font-semibold">{t}</div>
            <p className="text-sm mt-1.5" style={{ color: "var(--muted)" }}>{d}</p>
          </div>
        ))}
      </div>
      <div className="hub-card p-6">
        <div className="mono-label mb-3">Get notified at launch</div>
        {sent ? (
          <div className="text-sm" style={{ color: "var(--success)" }}>✓ You're on the list — we'll email you when the Auction House opens.</div>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" type="email"
              className="c0-input flex-1 min-w-[220px] rounded-xl px-4 py-3 text-sm font-mono2" />
            <button onClick={() => email.includes("@") && setSent(true)} className="btn-primary rounded-xl px-6 py-3 text-sm">Notify me</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Boosting({ buy }) {
  const [from, setFrom] = useState(2);
  const [to, setTo] = useState(5);
  const price = Math.max(0, to - from) * 34;
  return (
    <div className="fadein">
      <section className="hub-card p-8 mb-6">
        <div className="mono-label mb-2">Rank boosting</div>
        <h1 className="font-display font-bold text-4xl">Climb calculator</h1>
        <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>Verified boosters · VPN + offline mode · per-tier flat pricing.</p>
      </section>
      <div className="hub-card p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-6">
          {[["Current rank", from, setFrom], ["Target rank", to, setTo]].map(([label, val, set]) => (
            <div key={label}>
              <div className="mono-label mb-2">{label}</div>
              <div className="flex flex-col gap-1.5">
                {RANKS.map((r, i) => (
                  <button key={r} onClick={() => set(i)} className={`chip rounded-lg px-3 py-1.5 text-xs font-mono2 text-left ${val === i ? "on" : ""}`}>{r}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="glass rounded-xl p-4 mt-6 flex items-center justify-between">
          <div>
            <div className="mono-label">Estimated price · {Math.max(0, to - from)} tiers</div>
            <div className="font-mono2 font-bold text-2xl text-grad-price">{fmt(price)}</div>
          </div>
          <button disabled={to <= from} onClick={() => buy({ id: "boost", title: `Boost · ${RANKS[from]} → ${RANKS[to]}`, game: "Valorant", seller: "ClimbLab", price })}
            className="btn-primary rounded-xl px-5 py-3 text-sm disabled:opacity-40">Start boost</button>
        </div>
      </div>
    </div>
  );
}

function Wallet({ wallet, topUp, txns }) {
  return (
    <div className="fadein max-w-2xl">
      <div className="hub-card p-8 mb-5">
        <div className="mono-label">Wallet balance</div>
        <div className="font-mono2 font-bold text-5xl text-grad-price mt-2">{fmt(wallet)}</div>
        <div className="flex gap-2 mt-6 flex-wrap">
          {[25, 50, 100, 250].map((a) => (
            <button key={a} onClick={() => topUp(a)} className="btn-ghost-glass rounded-xl px-5 py-2.5 text-sm font-mono2">+ ${a}</button>
          ))}
        </div>
      </div>
      <div className="hub-card p-6">
        <h2 className="font-display font-semibold text-lg mb-3">Transactions</h2>
        {txns.map((t) => (
          <div key={t.id} className="flex justify-between items-center border-b border-white/10 last:border-0 py-3 text-sm">
            <div>{t.label}<span className="mono-label ml-3">{t.date}</span></div>
            <span className="font-mono2" style={{ color: t.amt >= 0 ? "var(--success)" : "var(--magenta)" }}>
              {t.amt >= 0 ? "+" : "−"}{fmt(Math.abs(t.amt))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Orders({ orders, go }) {
  const [tab, setTab] = useState("all");
  const S = { escrow: ["In escrow", "var(--cyan)"], delivered: ["Delivered", "var(--success)"], disputed: ["Disputed", "var(--magenta)"] };
  const list = orders.filter((o) => tab === "all" || o.status === tab);
  return (
    <div className="fadein max-w-3xl">
      <h1 className="font-display font-bold text-3xl mb-5">Orders</h1>
      <div className="flex gap-2 mb-5">
        {["all", "escrow", "delivered", "disputed"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`chip rounded-full px-4 py-1.5 text-xs font-mono2 capitalize ${tab === t ? "on" : ""}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-3">
        {list.map((o) => (
          <div key={o.id} className="hub-card p-5 flex items-center justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <div className="font-display font-semibold text-sm truncate">{o.title}</div>
              <div className="mono-label mt-1">{o.date} · {o.seller || "seller"} · {o.id}{o.userIG ? " · to " + o.userIG : ""}</div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono2 text-sm text-grad-price">{fmt(o.price)}</span>
              <span className="font-mono2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full glass" style={{ color: S[o.status][1] }}>{S[o.status][0]}</span>
              <button onClick={() => go({ page: "order", id: o.id })} className="btn-primary rounded-lg px-4 py-2 text-xs">
                {o.status === "escrow" && !o.userIG ? "Share username →" : "Open chat"}
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && <div className="hub-card p-8 text-center text-sm" style={{ color: "var(--muted)" }}>No orders in this state yet.</div>}
      </div>
    </div>
  );
}

function Watchlist({ watch, go, buy, addCart, toggleWatch }) {
  const items = LISTINGS.filter((l) => watch.has(l.id));
  return (
    <div className="fadein">
      <h1 className="font-display font-bold text-3xl mb-5">Watchlist</h1>
      {items.length === 0 ? (
        <div className="hub-card p-10 text-center">
          <div className="font-display text-lg">Nothing saved yet</div>
          <p className="text-sm mt-1 mb-4" style={{ color: "var(--muted)" }}>Tap the ♡ on any listing to track it here.</p>
          <button onClick={() => go({ page: "marketplace" })} className="btn-primary rounded-xl px-6 py-3 text-sm">Browse the Floor</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((l) => (
            <ListingCapsule key={l.id} l={l} go={go} buy={buy} addCart={addCart} watched toggleWatch={toggleWatch} />
          ))}
        </div>
      )}
    </div>
  );
}

function SpinWheel({ topUp }) {
  const SEGS = ["+25 XP", "+$1", "+50 XP", "Nothing", "+100 XP", "5% fee off", "+200 XP", "+$5"];
  const COLORS = ["oklch(0.48 0.2 295)", "oklch(0.42 0.14 210)", "oklch(0.48 0.22 340)", "oklch(0.3 0.08 270)"];
  const [deg, setDeg] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [spent, setSpent] = useState(false);
  const spin = () => {
    if (spinning) return;
    const i = Math.floor(Math.random() * SEGS.length);
    const seg = 360 / SEGS.length;
    setSpinning(true); setResult(null);
    setDeg((d) => d - (d % 360) + 360 * 5 + (360 - (i * seg + seg / 2)));
    setTimeout(() => {
      setSpinning(false); setSpent(true);
      const prize = SEGS[i];
      setResult(prize);
      if (prize === "+$1") topUp && topUp(1);
      if (prize === "+$5") topUp && topUp(5);
    }, 4300);
  };
  const bg = "conic-gradient(" + SEGS.map((_, i) => `${COLORS[i % COLORS.length]} ${i * 45}deg ${(i + 1) * 45}deg`).join(",") + ")";
  return (
    <div className="hub-card p-6 flex flex-col items-center">
      <div className="mono-label mb-1 self-start">Daily spin</div>
      <div className="relative my-4" style={{ width: 220, height: 220 }}>
        <div className="absolute left-1/2 -top-1 -translate-x-1/2 z-10 text-xl" style={{ color: "var(--gold)", filter: "drop-shadow(0 0 6px var(--gold))" }}>▼</div>
        <div className="w-full h-full rounded-full relative"
          style={{ background: bg, border: "3px solid rgba(255,255,255,0.15)", boxShadow: "0 0 30px -8px oklch(0.65 0.25 295 / 0.7)",
            transform: `rotate(${deg}deg)`, transition: spinning ? "transform 4.2s cubic-bezier(0.12,0.8,0.2,1)" : "none" }}>
          {SEGS.map((s, i) => (
            <div key={s} className="absolute inset-0 flex justify-center" style={{ transform: `rotate(${i * 45 + 22.5}deg)` }}>
              <span className="mt-4 font-mono2 text-[9px] font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{s}</span>
            </div>
          ))}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center font-display font-bold text-sm">0p</div>
        </div>
      </div>
      {result && (
        <div className="text-sm mb-3 font-mono2" style={{ color: result === "Nothing" ? "var(--muted)" : "var(--success)" }}>
          {result === "Nothing" ? "No luck this time!" : `You won ${result}!${result.includes("$") ? " Added to wallet." : ""}`}
        </div>
      )}
      <button onClick={spin} disabled={spinning} className="btn-primary rounded-xl px-8 py-3 text-sm disabled:opacity-50 w-full max-w-[220px]">
        {spinning ? "Spinning…" : spent ? "Spin again (demo)" : "Spin the wheel"}
      </button>
      <div className="mono-label mt-3">One free spin per day at launch · demo allows re-spins</div>
    </div>
  );
}

function Rewards({ topUp }) {
  const xp = 3420, next = 5000;
  const tiers = [["Bronze", "0 XP", true], ["Silver", "1,000 XP", true], ["Gold", "5,000 XP", false], ["Obsidian", "15,000 XP", false]];
  const [done, setDone] = useState({ q1: true });
  const quests = [["q1", "Make a purchase", "+50 XP"], ["q2", "Leave a review", "+30 XP"], ["q3", "Watchlist 3 items", "+20 XP"], ["q4", "Refer a friend", "+200 XP"]];
  const perks = [["5% fee discount", "500 XP"], ["Priority support", "800 XP"], ["Animated avatar ring", "1,200 XP"], ["$5 wallet credit", "2,000 XP"]];
  return (
    <div className="fadein max-w-4xl">
      <div className="hub-card p-8 mb-5">
        <div className="mono-label">Rewards · Silver tier</div>
        <div className="font-display font-bold text-3xl mt-1">{xp.toLocaleString()} XP</div>
        <div className="h-3 rounded-full mt-4 overflow-hidden glass">
          <div className="h-full rounded-full" style={{ width: `${(xp / next) * 100}%`, background: "linear-gradient(90deg,var(--violet),var(--cyan))" }} />
        </div>
        <div className="mono-label mt-2">{(next - xp).toLocaleString()} XP to Gold · 1 XP per $1 traded</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SpinWheel topUp={topUp} />
        <div className="hub-card p-6">
          <div className="mono-label mb-3">Daily quests</div>
          {quests.map(([id, t, r]) => (
            <button key={id} onClick={() => setDone((d) => ({ ...d, [id]: !d[id] }))}
              className="w-full flex items-center gap-3 py-2.5 border-b border-white/10 last:border-0 text-left">
              <span className="w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0"
                style={done[id] ? { background: "oklch(0.72 0.19 150 / 0.25)", color: "var(--success)" } : { border: "1px solid rgba(255,255,255,0.25)" }}>
                {done[id] ? "✓" : ""}
              </span>
              <span className={`flex-1 text-sm ${done[id] ? "line-through opacity-50" : ""}`}>{t}</span>
              <span className="font-mono2 text-xs" style={{ color: "var(--cyan)" }}>{r}</span>
            </button>
          ))}
          <div className="mono-label mt-4 mb-2">Redeem shop</div>
          {perks.map(([t, cost]) => (
            <div key={t} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
              <span className="text-sm">{t}</span>
              <button className="btn-ghost-glass rounded-lg px-3 py-1.5 text-xs font-mono2">{cost}</button>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tiers.map(([t, req, hit]) => (
          <div key={t} className="hub-card p-4 text-center" style={{ opacity: hit ? 1 : 0.55 }}>
            <div className="font-display font-semibold">{t}</div>
            <div className="mono-label mt-1">{req}</div>
            <div className="font-mono2 text-xs mt-2" style={{ color: hit ? "var(--success)" : "var(--muted)" }}>{hit ? "Unlocked" : "Locked"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sell() {
  const [step, setStep] = useState(0);
  const steps = ["Game", "Category", "Details", "Price", "Publish"];
  const [form, setForm] = useState({ game: "", cat: "", title: "", price: "" });
  return (
    <div className="fadein max-w-2xl">
      <h1 className="font-display font-bold text-3xl mb-2">Create a listing</h1>
      <div className="flex gap-2 mb-6 flex-wrap">
        {steps.map((s, i) => (
          <span key={s} className={`chip rounded-full px-3 py-1 text-[10px] font-mono2 uppercase tracking-widest ${i === step ? "on" : ""}`}>{i + 1} · {s}</span>
        ))}
      </div>
      <div className="h-1.5 rounded-full glass overflow-hidden mb-6 max-w-md">
        <div className="h-full transition-all" style={{ width: `${(step / (steps.length - 1)) * 100}%`, background: "linear-gradient(90deg,var(--violet),var(--magenta))" }} />
      </div>
      <div className="hub-card p-6">
        {step === 0 && (<><div className="mono-label mb-3">Pick your game</div>
          <div className="flex flex-wrap gap-2">{GAMES.map((g) => (
            <button key={g} onClick={() => { setForm({ ...form, game: g }); setStep(1); }} className={`chip rounded-lg px-4 py-2 text-xs font-mono2 ${form.game === g ? "on" : ""}`}>{g}</button>))}
          </div></>)}
        {step === 1 && (<><div className="mono-label mb-3">Category</div>
          <div className="flex flex-wrap gap-2">{["Items", "Accounts", "Currency", "Services"].map((c) => (
            <button key={c} onClick={() => { setForm({ ...form, cat: c }); setStep(2); }} className={`chip rounded-lg px-4 py-2 text-xs font-mono2 ${form.cat === c ? "on" : ""}`}>{c}</button>))}
          </div></>)}
        {step === 2 && (<><div className="mono-label mb-3">Title & description</div>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. AWP | Dragon Lore (FT)" className="c0-input w-full rounded-xl px-4 py-3 text-sm font-mono2 mb-3" />
          <button disabled={!form.title} onClick={() => setStep(3)} className="btn-primary rounded-xl px-5 py-2.5 text-sm disabled:opacity-40">Continue</button></>)}
        {step === 3 && (<><div className="mono-label mb-3">Price (USD)</div>
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value.replace(/[^0-9.]/g, "") })} placeholder="0.00" className="c0-input w-full rounded-xl px-4 py-3 text-sm font-mono2 mb-3" />
          <div className="mono-label mb-3">You receive {form.price ? fmt(Number(form.price) * 0.92) : "$0.00"} after 8% fee</div>
          <button disabled={!form.price} onClick={() => setStep(4)} className="btn-primary rounded-xl px-5 py-2.5 text-sm disabled:opacity-40">Continue</button></>)}
        {step === 4 && (<div className="text-center py-6">
          <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-2xl" style={{ background: "oklch(0.72 0.19 150 / 0.2)", color: "var(--success)" }}>✓</div>
          <div className="font-display font-semibold text-xl mt-4">Listing published</div>
          <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>{form.title || "Your item"} · {form.game} · {form.price ? fmt(Number(form.price)) : ""}</p>
          <button onClick={() => { setStep(0); setForm({ game: "", cat: "", title: "", price: "" }); }} className="btn-ghost-glass rounded-xl px-5 py-2.5 text-sm mt-5">List another</button>
        </div>)}
      </div>
    </div>
  );
}

function Checkout({ cart, setQty, removeItem, buyCart, go }) {
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const fee = sub > 0 ? sub * 0.029 + 0.3 : 0;
  return (
    <div className="fadein max-w-3xl">
      <h1 className="font-display font-bold text-3xl mb-5">Checkout</h1>
      {cart.length === 0 ? (
        <div className="hub-card p-10 text-center">
          <div className="font-display text-lg">Your cart is empty</div>
          <button onClick={() => go({ page: "marketplace" })} className="btn-primary rounded-xl px-6 py-3 text-sm mt-4">Browse the Floor</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-3">
            {cart.map((i) => (
              <div key={i.id} className="hub-card p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg,var(--violet),var(--magenta))" }}>{i.title[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{i.title}</div>
                  <div className="mono-label mt-0.5">{i.game} · {i.seller}</div>
                </div>
                <div className="flex items-center gap-1.5 font-mono2 text-sm">
                  <button onClick={() => setQty(i.id, i.qty - 1)} className="btn-ghost-glass rounded-md w-7 h-7">−</button>
                  <span className="w-6 text-center">{i.qty}</span>
                  <button onClick={() => setQty(i.id, i.qty + 1)} className="btn-ghost-glass rounded-md w-7 h-7">+</button>
                </div>
                <span className="font-mono2 text-sm text-grad-price w-20 text-right">{fmt(i.price * i.qty)}</span>
                <button onClick={() => removeItem(i.id)} aria-label="remove" className="text-white/40 hover:text-white">✕</button>
              </div>
            ))}
          </div>
          <div className="hub-card p-6 h-fit">
            <div className="flex justify-between text-sm py-1"><span style={{ color: "var(--muted)" }}>Subtotal</span><span className="font-mono2">{fmt(sub)}</span></div>
            <div className="flex justify-between text-sm py-1"><span style={{ color: "var(--muted)" }}>Fees (2.9% + $0.30 — waived if you pay by wallet)</span><span className="font-mono2">{fmt(fee)}</span></div>
            <div className="border-t border-white/10 mt-2 pt-3 flex justify-between">
              <span className="font-display font-semibold">Total</span>
              <span className="font-mono2 font-bold text-grad-price">{fmt(sub + fee)}</span>
            </div>
            <button onClick={buyCart} className="btn-primary w-full rounded-xl py-3 text-sm mt-4">Complete purchase</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= BUY NOW MODAL ================= */
function BuyNowModal({ item, close, wallet, topUp, charge, onSuccess, go }) {
  const [step, setStep] = useState("details");
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ num: "", exp: "", cvc: "", name: "", email: "", country: "GB" });
  const [orderId, setOrderId] = useState(null);
  const fee = method === "wallet" ? 0 : item.price * 0.029 + 0.3;
  const total = item.price + fee;
  const fmtCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExp = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + " / " + d.slice(2) : d; };
  const cardValid = card.num.replace(/\s/g, "").length === 16 && card.exp.replace(/\D/g, "").length === 4 && card.cvc.length >= 3 && card.name.trim().length > 1 && card.email.includes("@");

  useEffect(() => {
    const h = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [close]);

  const pay = () => {
    if (method === "wallet" && wallet < total) return;
    setStep("processing");
    setTimeout(() => {
      if (method === "wallet") charge(total, item.title);
      const oid = onSuccess(item, total);
      setOrderId(oid || null);
      setStep("success");
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(4,3,10,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && step !== "processing" && close()}>
      <div className="glass-strong rounded-2xl w-full max-w-md p-6 fadein max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 font-display font-semibold"><span style={{ color: "var(--success)" }}>🔒</span> Secure Checkout</div>
          {step !== "processing" && <button onClick={close} aria-label="close" className="text-white/50 hover:text-white text-lg">✕</button>}
        </div>

        {step === "details" && (<>
          <div className="glass rounded-xl p-3 flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center font-display font-bold shrink-0"
              style={{ background: "linear-gradient(135deg,var(--violet),var(--magenta))" }}>{item.title[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{item.title}</div>
              <div className="mono-label mt-0.5">{item.game} · {item.seller}</div>
            </div>
            <span className="font-mono2 text-sm">{fmt(item.price)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <button onClick={() => setMethod("card")} className={`chip rounded-xl py-2.5 text-xs font-mono2 ${method === "card" ? "on" : ""}`}>💳 Card</button>
            <button onClick={() => setMethod("paypal")} className={`chip rounded-xl py-2.5 text-xs font-mono2 ${method === "paypal" ? "on" : ""}`}>
              <span style={{ color: "#009cde", fontWeight: 700 }}>Pay</span><span style={{ color: "#003087", fontWeight: 700 }}>Pal</span>
            </button>
            <button onClick={() => setMethod("gpay")} className={`chip rounded-xl py-2.5 text-xs font-mono2 ${method === "gpay" ? "on" : ""}`}>
              <span className="inline-flex items-center gap-1.5"><GoogleG /> Pay</span>
            </button>
            <button onClick={() => setMethod("wallet")} className={`chip rounded-xl py-2.5 text-xs font-mono2 ${method === "wallet" ? "on" : ""}`}>Wallet · {fmt(wallet)} <span style={{ color: "var(--success)" }}>· 0 fees</span></button>
          </div>

          {method === "card" && (
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between px-1">
                <span className="mono-label">Card details</span>
                <span className="flex gap-1.5">
                  {["VISA", "MC", "AMEX"].map((b) => (
                    <span key={b} className="font-mono2 text-[9px] px-1.5 py-0.5 rounded glass" style={{ color: "var(--muted)" }}>{b}</span>
                  ))}
                </span>
              </div>
              <input value={card.email} onChange={(e) => setCard({ ...card, email: e.target.value })} type="email" placeholder="Email for receipt" className="c0-input w-full rounded-xl px-4 py-2.5 text-sm font-mono2" />
              <input value={card.num} onChange={(e) => setCard({ ...card, num: fmtCard(e.target.value) })} inputMode="numeric" placeholder="1234 5678 9012 3456" className="c0-input w-full rounded-xl px-4 py-2.5 text-sm font-mono2" />
              <div className="grid grid-cols-2 gap-2">
                <input value={card.exp} onChange={(e) => setCard({ ...card, exp: fmtExp(e.target.value) })} inputMode="numeric" placeholder="MM / YY" className="c0-input rounded-xl px-4 py-2.5 text-sm font-mono2" />
                <input value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} inputMode="numeric" placeholder="CVC" className="c0-input rounded-xl px-4 py-2.5 text-sm font-mono2" />
              </div>
              <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="Name on card" className="c0-input w-full rounded-xl px-4 py-2.5 text-sm font-mono2" />
              <select value={card.country} onChange={(e) => setCard({ ...card, country: e.target.value })} aria-label="country"
                className="c0-input w-full rounded-xl px-4 py-2.5 text-sm font-mono2">
                {[["GB", "United Kingdom"], ["US", "United States"], ["DE", "Germany"], ["FR", "France"], ["CA", "Canada"], ["AU", "Australia"], ["AE", "UAE"], ["IN", "India"]].map(([v, l]) => (
                  <option key={v} value={v} style={{ background: "#12101f" }}>{l}</option>
                ))}
              </select>
            </div>
          )}
          {method === "paypal" && (
            <div className="glass rounded-xl p-4 mb-4 text-sm" style={{ color: "var(--muted)" }}>
              You'll be securely redirected to <span style={{ color: "#009cde", fontWeight: 700 }}>Pay</span><span style={{ color: "#003087", fontWeight: 700 }}>Pal</span> to approve {fmt(total)}. No card details are entered on Coin0p.
            </div>
          )}
          {method === "gpay" && (
            <div className="glass rounded-xl p-4 mb-4 text-sm flex items-center gap-2" style={{ color: "var(--muted)" }}>
              <GoogleG /> <span>Google Pay will open to confirm {fmt(total)} with your saved card — one tap, no typing.</span>
            </div>
          )}
          {method === "wallet" && (wallet < total ? (
            <div className="glass rounded-xl p-3 mb-4 text-sm flex justify-between items-center">
              <span style={{ color: "var(--magenta)" }}>Insufficient balance</span>
              <button onClick={() => topUp(50)} className="font-mono2 text-xs underline" style={{ color: "var(--cyan)" }}>Top up $50</button>
            </div>
          ) : (
            <div className="glass rounded-xl p-3 mb-4 text-sm" style={{ color: "var(--muted)" }}>
              Paying from wallet — <span style={{ color: "var(--success)" }}>no processing fee</span>. Remaining after purchase: {fmt(wallet - total)}
            </div>
          ))}

          <div className="text-sm space-y-1 mb-4">
            <div className="flex justify-between" style={{ color: "var(--muted)" }}><span>Subtotal</span><span className="font-mono2">{fmt(item.price)}</span></div>
            <div className="flex justify-between" style={{ color: "var(--muted)" }}><span>{method === "wallet" ? "Processing fee — waived (wallet)" : "Processing (2.9% + $0.30)"}</span><span className="font-mono2" style={method === "wallet" ? { color: "var(--success)" } : undefined}>{method === "wallet" ? "FREE" : fmt(fee)}</span></div>
            <div className="flex justify-between font-semibold pt-1 border-t border-white/10"><span>Total</span><span className="font-mono2 text-grad-price">{fmt(total)}</span></div>
          </div>
          <button onClick={pay} disabled={(method === "wallet" && wallet < total) || (method === "card" && !cardValid)} className="btn-primary w-full rounded-xl py-3 text-sm disabled:opacity-40">
            Pay {fmt(total)}{method === "paypal" ? " with PayPal" : method === "gpay" ? " with Google Pay" : method === "wallet" ? " from wallet" : ""}
          </button>
          <div className="mono-label text-center mt-3">Funds held in escrow until delivery is confirmed</div>
          <div className="mono-label text-center mt-1.5" style={{ opacity: 0.7 }}>Payments by Coin0p Pay · Stripe-ready · demo mode, no card is charged</div>
        </>)}

        {step === "processing" && (
          <div className="py-12 flex flex-col items-center gap-4">
            <div className="spinner" />
            <div className="font-mono2 text-sm" style={{ color: "var(--muted)" }}>Processing payment…</div>
          </div>
        )}

        {step === "success" && (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl"
              style={{ background: "oklch(0.72 0.19 150 / 0.18)", color: "var(--success)" }}>✓</div>
            <div className="font-display font-semibold text-xl mt-4">Payment complete</div>
            <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
              {fmt(total)} is now in escrow. Next step: open the order chat and share your in-game username with the seller so they can deliver.
            </p>
            <div className="flex gap-2 justify-center mt-6">
              <button onClick={close} className="btn-ghost-glass rounded-xl px-5 py-2.5 text-sm">Close</button>
              {orderId ? (
                <button onClick={() => { close(); go({ page: "order", id: orderId }); }} className="btn-primary rounded-xl px-5 py-2.5 text-sm">Go to order chat →</button>
              ) : (
                <button onClick={() => { close(); go({ page: "orders" }); }} className="btn-primary rounded-xl px-5 py-2.5 text-sm">View orders</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= GAME PAGES ================= */
function GameSearch({ go }) {
  const [q, setQ] = useState("");
  const matches = q ? GAMES_META.filter((g) => !HIDDEN_GAMES.has(g.name) && g.name.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div className="relative">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your game — OSRS, Fortnite, Roblox…"
        className="c0-input w-full rounded-xl px-4 py-3.5 text-sm font-mono2" aria-label="Search games" />
      {q !== "" && (
        <div className="absolute left-0 right-0 mt-2 glass-strong rounded-xl overflow-hidden z-30">
          {matches.map((g) => (
            <button key={g.name} onClick={() => go({ page: "game", game: g.name })}
              className="w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-white/10">
              <span className="font-display font-semibold">{g.name}</span>
              <span className="mono-label">{g.tag}</span>
            </button>
          ))}
          {matches.length === 0 && (
            <div className="px-4 py-3 text-sm" style={{ color: "var(--muted)" }}>
              Not live yet — <button onClick={() => go({ page: "games" })} className="underline">browse all games</button>. New titles are added regularly.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GamesDirectory({ go }) {
  const [q, setQ] = useState("");
  const list = GAMES_META.filter((g) => !HIDDEN_GAMES.has(g.name) && (g.name + " " + g.tag).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fadein">
      <section className="hub-card p-8 mb-6">
        <div className="mono-label mb-2">Games</div>
        <h1 className="font-display font-bold text-4xl md:text-5xl">Pick your game</h1>
        <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
          {GAMES.length} games live at launch — more added every month. Each game has its own currency, accounts, items and services sections.
        </p>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search games…"
          className="c0-input w-full max-w-xl rounded-xl px-4 py-3 text-sm font-mono2 mt-5" />
      </section>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {list.map((g) => {
          const n = LISTINGS.filter((l) => l.game === g.name).length;
          return (
            <button key={g.name} onClick={() => go({ page: "game", game: g.name })} className="hub-card overflow-hidden text-left fadein">
              <GameArt g={g} />
              <div className="p-3">
                <div className="font-display font-semibold text-sm">{g.name}</div>
                <div className="mono-label mt-1">{g.tag} · {n} offers</div>
              </div>
            </button>
          );
        })}
        {list.length === 0 && (
          <div className="hub-card p-8 col-span-full text-center">
            <div className="font-display">"{q}" isn't live yet</div>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>New games are added regularly — clear the search to see what's live now.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function OfferRow({ l, go, buy, addCart, watched, toggleWatch }) {
  const online = ONLINE.has(l.seller);
  return (
    <div className="glass rounded-xl p-3 flex items-center gap-3 hover:bg-white/10 transition fadein">
      <button onClick={() => go({ page: "seller", name: l.seller })} className="flex items-center gap-2.5 w-40 md:w-44 shrink-0 text-left">
        <span className="relative w-9 h-9 rounded-full flex items-center justify-center font-display font-bold shrink-0"
          style={{ background: "linear-gradient(135deg,var(--violet),var(--magenta))" }}>
          {l.seller[0]}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
            style={{ background: online ? "var(--success)" : "rgba(255,255,255,0.25)", border: "2px solid oklch(0.1 0.02 270)", boxShadow: online ? "0 0 6px var(--success)" : "none" }} />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-semibold truncate hover:underline">{l.seller}</span>
          <span className="font-mono2 text-[10px]" style={{ color: "var(--gold)" }}>
            ★ {l.rating.toFixed(1)} <span style={{ color: "var(--muted)" }}>({l.sales.toLocaleString()})</span>
          </span>
        </span>
      </button>
      <button onClick={() => go({ page: "listing", id: l.id })} className="flex-1 min-w-0 text-left">
        <span className="block text-sm font-medium truncate hover:underline">
          {l.title}{l.tag && <span className="ml-2 font-mono2 text-[9px] px-1.5 py-0.5 rounded-full align-middle"
            style={{ background: "linear-gradient(100deg,var(--violet),var(--magenta))" }}>{l.tag}</span>}
        </span>
        <span className="font-mono2 text-[10px]" style={{ color: "var(--muted)" }}>⚡ {l.del} delivery · ◆ {l.rarity} · stock {l.stock}</span>
      </button>
      <span className="font-mono2 font-bold text-sm text-grad-price w-24 text-right shrink-0">
        {fmt(l.price)}
        {l.oldPrice && <span className="block text-[10px] line-through font-normal" style={{ color: "var(--muted)" }}>{fmt(l.oldPrice)}</span>}
      </span>
      <div className="hidden sm:flex gap-1.5 shrink-0">
        <button aria-label="watchlist" onClick={() => toggleWatch(l.id)} className="btn-ghost-glass rounded-lg w-8 h-8 text-sm"
          style={watched ? { color: "var(--magenta)" } : undefined}>{watched ? "♥" : "♡"}</button>
        <button onClick={() => addCart(l)} className="btn-ghost-glass rounded-lg px-2.5 h-8 text-xs">+ Cart</button>
        <button onClick={() => buy(l)} className="btn-primary rounded-lg px-3.5 h-8 text-xs">Buy</button>
      </div>
      <button onClick={() => buy(l)} className="sm:hidden btn-primary rounded-lg px-3 h-8 text-xs shrink-0">Buy</button>
    </div>
  );
}

function GamePage({ name, initialCat, go, buy, addCart, watch, toggleWatch }) {
  const meta = GAMES_META.find((g) => g.name === name);
  const [open, setOpen] = useState(() => ({ [initialCat || "Currency"]: true }));
  const [sort, setSort] = useState("price-asc");
  const [onlineOnly, setOnlineOnly] = useState(false);
  if (!meta || HIDDEN_GAMES.has(name)) return <div className="hub-card p-10">This game is not available right now.</div>;
  const all = LISTINGS.filter((l) => l.game === name);
  const prep = (items) => {
    let out = onlineOnly ? items.filter((l) => ONLINE.has(l.seller)) : [...items];
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    if (sort === "rating") out.sort((a, b) => b.rating - a.rating);
    return out;
  };
  return (
    <div className="fadein">
      <div className="mono-label mb-3">
        <button onClick={() => go({ page: "home" })} className="hover:text-white">Home</button>
        {" / "}
        <button onClick={() => go({ page: "games" })} className="hover:text-white">Games</button>
        {" / "}<span style={{ color: "var(--fg)" }}>{name}</span>
      </div>
      <section className="hub-card p-8 mb-4 flex flex-wrap items-center gap-6">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-bold text-4xl shrink-0"
          style={{ background: "linear-gradient(135deg,var(--violet),var(--magenta))" }}>{name[0]}</div>
        <div>
          <div className="mono-label">{meta.tag} · {all.length} offers · escrow on every order</div>
          <h1 className="font-display font-bold text-4xl mt-1">{name}</h1>
        </div>
        <button onClick={() => go({ page: "games" })} className="btn-ghost-glass rounded-xl px-4 py-2 text-xs ml-auto">← All games</button>
      </section>

      <div className="hub-card px-4 py-3 mb-4 flex items-center gap-4 flex-wrap">
        <span className="mono-label">Sort & filter</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="sort offers"
          className="c0-input rounded-lg px-3 py-1.5 text-xs font-mono2">
          <option value="price-asc" style={{ background: "#12101f" }}>Price: low → high</option>
          <option value="price-desc" style={{ background: "#12101f" }}>Price: high → low</option>
          <option value="rating" style={{ background: "#12101f" }}>Seller rating</option>
        </select>
        <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
          <input type="checkbox" checked={onlineOnly} onChange={(e) => setOnlineOnly(e.target.checked)} className="accent-current" style={{ accentColor: "oklch(0.65 0.25 295)" }} />
          <span style={{ color: "var(--muted)" }}>Online sellers only</span>
        </label>
        <span className="mono-label ml-auto hidden sm:block">{prep(all).length} of {all.length} offers shown</span>
      </div>

      <div className="space-y-4">
        {CATS.map((cat) => {
          const items = prep(all.filter((l) => l.cat === cat));
          const isOpen = !!open[cat];
          return (
            <div key={cat} className="hub-card overflow-hidden">
              <button onClick={() => setOpen((o) => ({ ...o, [cat]: !o[cat] }))}
                aria-expanded={isOpen} className="w-full flex items-center justify-between px-6 py-4 text-left">
                <div className="flex items-center gap-3">
                  <span className="font-display font-semibold text-lg">{cat}</span>
                  <span className="mono-label">{items.length} offers</span>
                </div>
                <span className="font-mono2 text-xs" style={{ color: "var(--cyan)" }}>{isOpen ? "▾ Hide" : "▸ Show"}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-2 fadein">
                  {items.map((l) => (
                    <OfferRow key={l.id} l={l} go={go} buy={buy} addCart={addCart} watched={watch.has(l.id)} toggleWatch={toggleWatch} />
                  ))}
                  {items.length === 0 && (
                    <div className="glass rounded-xl p-6 text-center text-sm" style={{ color: "var(--muted)" }}>
                      No {onlineOnly ? "online " : ""}sellers in this section right now — try clearing the filter.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GlobalSearch({ go }) {
  const [q, setQ] = useState("");
  const ql = q.toLowerCase();
  const gm = q ? GAMES_META.filter((g) => !HIDDEN_GAMES.has(g.name) && g.name.toLowerCase().includes(ql)).slice(0, 4) : [];
  const lm = q ? LISTINGS.filter((l) => l.title.toLowerCase().includes(ql)).slice(0, 4) : [];
  const sm = q ? SELLERS.filter((s) => s.name.toLowerCase().includes(ql)).slice(0, 3) : [];
  const pick = (r) => { setQ(""); go(r); };
  return (
    <div className="relative w-full">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">⌕</span>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items, sellers, games…"
        className="c0-input w-full rounded-xl pl-10 pr-14 py-2.5 text-sm" aria-label="Search" />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono2 text-[10px] px-1.5 py-0.5 rounded glass pointer-events-none" style={{ color: "var(--muted)" }}>⌘K</span>
      {q !== "" && (
        <div className="absolute left-0 right-0 mt-2 glass-strong rounded-xl overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
          {gm.length > 0 && <div className="mono-label px-4 pt-3 pb-1">Games</div>}
          {gm.map((g) => (
            <button key={g.name} onClick={() => pick({ page: "game", game: g.name })}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-white/10">
              <span className="font-display font-semibold">{g.name}</span><span className="mono-label">{g.tag}</span>
            </button>
          ))}
          {lm.length > 0 && <div className="mono-label px-4 pt-3 pb-1">Listings</div>}
          {lm.map((l) => (
            <button key={l.id} onClick={() => pick({ page: "listing", id: l.id })}
              className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-left hover:bg-white/10">
              <span className="truncate">{l.title}</span><span className="font-mono2 text-grad-price shrink-0">{fmt(l.price)}</span>
            </button>
          ))}
          {sm.length > 0 && <div className="mono-label px-4 pt-3 pb-1">Sellers</div>}
          {sm.map((s) => (
            <button key={s.name} onClick={() => pick({ page: "seller", name: s.name })}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-white/10">
              <span className="font-semibold">{s.name}</span><span className="font-mono2 text-xs" style={{ color: "var(--gold)" }}>★ {s.rating.toFixed(1)}</span>
            </button>
          ))}
          {gm.length + lm.length + sm.length === 0 && (
            <div className="px-4 py-3 text-sm" style={{ color: "var(--muted)" }}>
              No matches — <button onClick={() => pick({ page: "games" })} className="underline">browse all games</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CatNav({ go }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="relative border-t border-white/10" onMouseLeave={() => setOpen(null)}>
      <div className="max-w-7xl mx-auto px-4 h-11 flex items-center gap-1">
        {CATS.map((c) => (
          <button key={c} onClick={() => setOpen(open === c ? null : c)} aria-expanded={open === c}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${open === c ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}>
            {c} <span className="text-[9px]" style={{ color: "var(--cyan)" }}>{open === c ? "▴" : "▾"}</span>
          </button>
        ))}
        <button onClick={() => go({ page: "coaching" })} className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-white">Coaching</button>
        <button onClick={() => go({ page: "auction" })} className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-white flex items-center gap-1.5">Auction
          <span className="font-mono2 text-[9px] px-1.5 py-0.5 rounded-full" style={{ color: "var(--cyan)", border: "1px solid var(--cyan)" }}>SOON</span>
        </button>
        <div className="flex-1" />
        <span className="mono-label hidden md:block">24/7 live support · escrow on every order</span>
        <button onClick={() => go({ page: "sell" })} className="btn-primary rounded-lg px-4 py-1.5 text-xs ml-3">Start selling</button>
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-full glass-strong border-t border-white/10 fadein z-40 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-5">
            <div className="mono-label mb-3">{open} · pick a game</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {GAMES_META.filter((g) => !HIDDEN_GAMES.has(g.name)).map((g) => (
                <button key={g.name} onClick={() => { setOpen(null); go({ page: "game", game: g.name, cat: open }); }}
                  className="glass rounded-xl px-3 py-2.5 text-left hover:bg-white/10 transition flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold shrink-0 text-sm"
                    style={{ background: "linear-gradient(135deg,var(--violet),var(--magenta))" }}>{g.name[0]}</span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium truncate">{g.name}</span>
                    <span className="mono-label">{g.tag}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Welcome({ close, curCode, setCurCode }) {
  const [adult, setAdult] = useState(false);
  useEffect(() => {
    const h = (e) => e.key === "Enter" && adult && close();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [close, adult]);
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: "radial-gradient(80% 60% at 50% 0%, oklch(0.18 0.08 295), oklch(0.07 0.02 270) 70%)" }}>
      <div className="glass-strong rounded-3xl max-w-lg w-full p-8 md:p-10 text-center fadein my-auto">
        <div className="font-display font-bold text-4xl md:text-5xl">Coin<span className="text-grad">0p</span></div>
        <div className="mono-label mt-3">The professional marketplace for gamers</div>
        <p className="text-sm mt-4" style={{ color: "var(--muted)" }}>
          Currency, accounts, items, boosting and coaching across {GAMES.length} games — every order protected by escrow until you confirm delivery.
        </p>
        <div className="grid grid-cols-3 gap-2 mt-6">
          {[["🛡", "Escrow on every order"], ["✓", "Verified sellers"], ["24/7", "Live support"]].map(([i, t]) => (
            <div key={t} className="glass rounded-xl p-3">
              <div className="font-display font-bold" style={{ color: "var(--cyan)" }}>{i}</div>
              <div className="text-[11px] mt-1" style={{ color: "var(--muted)" }}>{t}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          <span className="mono-label">Show prices in</span>
          <select value={curCode} onChange={(e) => setCurCode(e.target.value)} aria-label="currency"
            className="c0-input rounded-lg px-3 py-1.5 text-xs font-mono2">
            {CURRENCIES.map((c) => <option key={c.code} value={c.code} style={{ background: "#12101f" }}>{c.code} · {c.sym.trim()}</option>)}
          </select>
        </div>
        <label className="mt-6 flex items-start gap-2.5 text-left text-xs cursor-pointer select-none max-w-sm mx-auto" style={{ color: "var(--muted)" }}>
          <input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} className="mt-0.5" style={{ accentColor: "oklch(0.65 0.25 295)" }} />
          <span>I confirm I am 18 or older and accept the <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.</span>
        </label>
        <button onClick={() => adult && close()} disabled={!adult} className="btn-primary rounded-xl px-10 py-3.5 text-sm mt-4 w-full disabled:opacity-40">Enter Coin0p</button>
        <div className="mono-label mt-4">Demo build · FX rates indicative · no real payments taken</div>
      </div>
    </div>
  );
}

function Policies() {
  const SECTIONS = [
    ["Terms of Service", [
      "Coin0p is a marketplace intermediary: we connect buyers with independent third-party sellers and hold every payment in escrow until the buyer confirms delivery. We are not the seller of listed goods.",
      "Buyers pay a processing fee of 2.9% + $0.30 per order. Sellers pay an 8% commission on completed sales. Fees are shown before you pay and never charged on refunded orders.",
      "You must be 18 or older (or the age of majority in your region) to trade on Coin0p. One account per person; accounts are non-transferable.",
    ]],
    ["Buyer Protection & Refunds", [
      "Your payment is held in escrow and is only released to the seller after you confirm delivery, or automatically 48 hours after the seller marks the order delivered if you don't respond.",
      "If your order is not delivered, is materially different from the listing, or the account/item is reclaimed within the protection window, you are entitled to a full refund to your original payment method or Coin0p wallet.",
      "Open a dispute within 72 hours of the delivery mark. Keep all communication in the order chat — off-platform messages can't be used as evidence.",
    ]],
    ["Seller Rules & Verification", [
      "All sellers must complete identity verification (KYC) before receiving their first payout. Payouts are processed to verified accounts only.",
      "Listings must be accurate: real screenshots, honest descriptions, correct delivery estimates. Repeated late delivery, misdescription, or cancellation lowers seller rank and can lead to suspension.",
      "Taking deals off-platform, asking buyers to pay outside escrow, or contacting buyers to trade privately is strictly prohibited and results in a permanent ban.",
    ]],
    ["Prohibited Items & Conduct", [
      "Prohibited: stolen or recovered accounts, items obtained through fraud or chargebacks, cheats/hacks/exploits, phishing tools, and anything illegal in the buyer's or seller's jurisdiction.",
      "Harassment, hate speech, threats, or abuse toward any user or staff member — in listings, reviews, or chat — leads to removal and account action.",
      "Review manipulation (fake purchases, incentivised reviews, review bombing competitors) is prohibited for buyers and sellers alike.",
    ]],
    ["Delivery & Escrow Logistics", [
      "Currency: delivered by in-game trade or top-up, typically within the listing's stated window (most within 15–30 minutes).",
      "Accounts: credentials are handed over through the order chat; buyers should immediately change the password and recovery email before confirming delivery.",
      "Services (boosting/coaching): delivery windows are longer and progress is tracked in the order. Escrow releases when the agreed result is reached and confirmed.",
    ]],
    ["Disputes & Enforcement", [
      "Disputes are reviewed by the Coin0p resolution team using order chat, delivery evidence, and listing content. Both sides may submit evidence; decisions are made within 5 business days.",
      "Enforcement is progressive — warning, listing removal, temporary suspension, permanent ban — except for fraud, prohibited items, or off-platform dealing, which result in immediate permanent bans.",
      "Important: buying and selling in-game goods may breach the terms of service of the game in question and can carry account risk. Sellers and buyers are responsible for understanding the rules of each game.",
    ]],
    ["Privacy Policy (UK GDPR)", [
      "What we collect: account details (email, username), order and payment records, identity documents for seller verification (processed by our payment partner, not stored by Coin0p), device and usage data, and order-chat messages.",
      "Why (lawful bases): to perform our contract with you (orders, escrow, payouts), to meet legal obligations (fraud prevention, AML, tax records), and with your consent for optional analytics and marketing.",
      "Sharing: payment processing partners, identity-verification providers, fraud-prevention services, and authorities where the law requires. We never sell personal data.",
      "Your rights: access, correction, erasure, restriction, portability, and objection. Contact privacy@coin0p.example to exercise them; you may also complain to the ICO (ico.org.uk). Data is retained only as long as needed for the purposes above or as law requires.",
    ]],
    ["Cookie Policy", [
      "Essential cookies keep you signed in, remember your cart, currency and consent choices — the site cannot work without them.",
      "Optional analytics cookies help us understand what to improve. They are set only if you choose Accept all in the consent banner, and you can change your choice at any time from this page.",
    ]],
    ["Age, KYC & Anti-Money-Laundering", [
      "Coin0p is strictly 18+. You confirm your age when entering the site and we may request proof where the law or our payment partners require it.",
      "Sellers complete identity verification (KYC) through our regulated payment partner before any payout. We monitor transactions for fraud and money-laundering patterns, screen against sanctions lists, and report suspicious activity where legally required.",
      "Wallet balances are payment credits held for trading on Coin0p — they are not a bank deposit and are not interest-bearing.",
    ]],
    ["Governing Law & Liability", [
      "These terms are governed by the laws of England and Wales, and disputes are subject to the courts of England and Wales. Nothing in these terms affects your statutory rights as a consumer, including under the Consumer Rights Act 2015.",
      "Coin0p is an intermediary; to the extent permitted by law, our liability for any order is limited to the amount you paid for that order. We are not liable for actions taken by game publishers against accounts traded in breach of their terms.",
      "Coin0p is not affiliated with, endorsed by, or sponsored by any game publisher. All game names and trademarks belong to their respective owners and are used for identification only.",
    ]],
    ["Complaints", [
      "Start with 24/7 live support — most issues resolve there. If not, email complaints@coin0p.example with your order ID; we acknowledge within 2 business days and aim to resolve within 14.",
      "If you remain unhappy after our final response, you may be able to refer the matter to an approved alternative dispute resolution (ADR) provider. Your right to go to court is unaffected.",
    ]],
  ];
  const [open, setOpen] = useState({ 0: true });
  return (
    <div className="fadein max-w-3xl">
      <section className="hub-card p-8 mb-6">
        <div className="mono-label mb-2">Rules & Policies</div>
        <h1 className="font-display font-bold text-4xl">Rules, policies & legal</h1>
        <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
          The rules that keep the marketplace safe for buyers and sellers. Plain English, no tricks.
        </p>
      </section>
      <div className="space-y-3">
        {SECTIONS.map(([title, paras], i) => (
          <div key={title} className="hub-card overflow-hidden">
            <button onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))} aria-expanded={!!open[i]}
              className="w-full flex items-center justify-between px-6 py-4 text-left">
              <span className="font-display font-semibold">{title}</span>
              <span className="font-mono2 text-xs" style={{ color: "var(--cyan)" }}>{open[i] ? "▾" : "▸"}</span>
            </button>
            {open[i] && (
              <div className="px-6 pb-5 space-y-3 fadein">
                {paras.map((p, j) => <p key={j} className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p}</p>)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mono-label mt-5">Template policies for the demo — have a solicitor review before launch (incl. UK GDPR, Consumer Rights Act 2015, ICO registration).</div>
    </div>
  );
}

function Admin({ wallet, setWallet, clearCart, resetWatch, ordersCount, cartCount, bump, orders, verifyOrder, go }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [em, setEm] = useState("");
  const [game, setGame] = useState(GAMES[0]);
  const [walletIn, setWalletIn] = useState("");
  const [saved, setSaved] = useState(false);
  const ADMIN_EMAIL = "sorafluxt@gmail.com";
  const ok = em.trim().toLowerCase() === ADMIN_EMAIL && pw === "admin123";
  if (!authed) {
    return (
      <div className="fadein max-w-sm mx-auto mt-16">
        <div className="hub-card p-8 text-center">
          <div className="mono-label mb-2">Restricted</div>
          <h1 className="font-display font-bold text-2xl">Admin console</h1>
          <input value={em} onChange={(e) => setEm(e.target.value)} type="email" placeholder="Admin email"
            className="c0-input w-full rounded-xl px-4 py-3 text-sm font-mono2 mt-5" />
          <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" placeholder="Passcode"
            onKeyDown={(e) => e.key === "Enter" && ok && setAuthed(true)}
            className="c0-input w-full rounded-xl px-4 py-3 text-sm font-mono2 mt-2" />
          <button onClick={() => ok && setAuthed(true)} disabled={!ok} className="btn-primary w-full rounded-xl py-3 text-sm mt-3 disabled:opacity-40">Unlock</button>
          {em && pw && !ok && <div className="font-mono2 text-xs mt-3" style={{ color: "var(--magenta)" }}>Email or passcode not recognised</div>}
          <div className="mono-label mt-4">Admin account: SoraFluxT@gmail.com · demo passcode admin123 · real auth (email login + 2FA) comes with the backend</div>
        </div>
      </div>
    );
  }
  const items = LISTINGS.filter((l) => l.game === game);
  const edit = (l, k, v) => { l[k] = k === "price" ? (Number(v) || 0) : v; bump(); setSaved(true); setTimeout(() => setSaved(false), 1200); };
  return (
    <div className="fadein">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-display font-bold text-3xl">Admin console</h1>
        <span className="font-mono2 text-[10px] px-2 py-0.5 rounded-full" style={{ color: "var(--magenta)", border: "1px solid var(--magenta)" }}>STAFF ONLY</span>
        {saved && <span className="font-mono2 text-xs" style={{ color: "var(--success)" }}>✓ saved</span>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[["Orders", ordersCount], ["Cart items", cartCount], ["Live games", GAMES.length - HIDDEN_GAMES.size], ["Listings", LISTINGS.length]].map(([k, v]) => (
          <div key={k} className="hub-card p-4 text-center">
            <div className="font-mono2 font-bold text-2xl text-grad-price">{v}</div>
            <div className="mono-label mt-1">{k}</div>
          </div>
        ))}
      </div>

      <div className="hub-card p-6 mb-4">
        <div className="mono-label mb-3">Transaction log · every trade recorded · verify once you have checked the order chat</div>
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {orders.map((o) => (
            <div key={o.id} className="glass rounded-xl p-3 flex items-center gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{o.title}</div>
                <div className="mono-label mt-0.5">{o.id} · {o.date} · seller: {o.seller || "—"} · buyer IG: {o.userIG || "not shared"} · {o.chat ? o.chat.length : 0} messages</div>
              </div>
              <span className="font-mono2 text-sm text-grad-price">{fmt(o.price)}</span>
              <span className="font-mono2 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full glass"
                style={{ color: o.status === "delivered" ? "var(--success)" : o.status === "disputed" ? "var(--magenta)" : "var(--cyan)" }}>{o.status}</span>
              <button onClick={() => go({ page: "order", id: o.id })} className="btn-ghost-glass rounded-lg px-3 py-1.5 text-xs">Audit chat</button>
              <button onClick={() => verifyOrder(o.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono2 ${o.adminVerified ? "" : "btn-primary"}`}
                style={o.adminVerified ? { background: "oklch(0.72 0.19 150 / 0.2)", color: "var(--success)", border: "1px solid oklch(0.72 0.19 150 / 0.5)" } : undefined}>
                {o.adminVerified ? "✓ Verified" : "Verify"}
              </button>
            </div>
          ))}
          {orders.length === 0 && <div className="text-sm p-4" style={{ color: "var(--muted)" }}>No transactions yet.</div>}
        </div>
      </div>

      <div className="hub-card p-6 mb-4">
        <div className="mono-label mb-3">Game visibility · hide a game to pull it from the whole site</div>
        <div className="flex flex-wrap gap-2">
          {GAMES.map((g) => {
            const hidden = HIDDEN_GAMES.has(g);
            return (
              <button key={g} onClick={() => { hidden ? HIDDEN_GAMES.delete(g) : HIDDEN_GAMES.add(g); bump(); }}
                className={`chip rounded-full px-4 py-1.5 text-xs font-mono2 ${hidden ? "" : "on"}`}
                style={hidden ? { textDecoration: "line-through", opacity: 0.6 } : undefined}>
                {g} {hidden ? "· hidden" : "· live"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="hub-card p-6 mb-4">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="mono-label">Listings editor</div>
          <select value={game} onChange={(e) => setGame(e.target.value)} className="c0-input rounded-lg px-3 py-1.5 text-xs font-mono2">
            {GAMES.map((g) => <option key={g} value={g} style={{ background: "#12101f" }}>{g}</option>)}
          </select>
          <span className="mono-label ml-auto">Edits apply live · image URL overrides the generated icon</span>
        </div>
        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {items.map((l) => (
            <div key={l.id} className="glass rounded-xl p-3 grid grid-cols-1 md:grid-cols-[1fr_110px_90px_1fr] gap-2 items-center">
              <input defaultValue={l.title} onBlur={(e) => edit(l, "title", e.target.value)} aria-label="title"
                className="c0-input rounded-lg px-3 py-2 text-xs" />
              <input defaultValue={l.price} onBlur={(e) => edit(l, "price", e.target.value)} aria-label="price USD" inputMode="decimal"
                className="c0-input rounded-lg px-3 py-2 text-xs font-mono2" />
              <input defaultValue={l.tag || ""} onBlur={(e) => edit(l, "tag", e.target.value)} placeholder="tag" aria-label="tag"
                className="c0-input rounded-lg px-3 py-2 text-xs font-mono2" />
              <input defaultValue={l.img || ""} onBlur={(e) => edit(l, "img", e.target.value)} placeholder="https://image-url…" aria-label="image url"
                className="c0-input rounded-lg px-3 py-2 text-xs font-mono2" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="hub-card p-6">
          <div className="mono-label mb-3">FX rates (per 1 USD) · indicative, editable for testing</div>
          {CURRENCIES.map((c) => (
            <div key={c.code} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
              <span className="font-mono2 text-sm w-14">{c.code}</span>
              <input defaultValue={c.rate} onBlur={(e) => { c.rate = Number(e.target.value) || c.rate; bump(); }}
                aria-label={c.code + " rate"} inputMode="decimal"
                className="c0-input rounded-lg px-3 py-1.5 text-xs font-mono2 w-28" disabled={c.code === "USD"} />
              <span className="mono-label">{c.sym.trim()}</span>
            </div>
          ))}
        </div>
        <div className="hub-card p-6">
          <div className="mono-label mb-3">Test tools</div>
          <div className="flex gap-2 mb-3">
            <input value={walletIn} onChange={(e) => setWalletIn(e.target.value)} placeholder="Set wallet (USD)" inputMode="decimal"
              className="c0-input flex-1 rounded-lg px-3 py-2 text-xs font-mono2" />
            <button onClick={() => { const v = Number(walletIn); if (!Number.isNaN(v)) setWallet(v); setWalletIn(""); }}
              className="btn-primary rounded-lg px-4 text-xs">Apply</button>
          </div>
          <div className="mono-label mb-3">Current wallet: {fmt(wallet)}</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={clearCart} className="btn-ghost-glass rounded-lg px-4 py-2 text-xs">Empty cart</button>
            <button onClick={resetWatch} className="btn-ghost-glass rounded-lg px-4 py-2 text-xs">Reset watchlist</button>
          </div>
          <div className="mono-label mt-4">Changes are in-memory for the demo — the backend will persist them properly.</div>
        </div>
      </div>
    </div>
  );
}

function SideNav({ go, P, wallet }) {
  const [openCat, setOpenCat] = useState(null);
  const ICONS = { games: "🎮", marketplace: "🏪", auction: "🔨", boosting: "⚡", coaching: "🎯", sell: "🏷", rewards: "🎁", orders: "📦", watchlist: "♡", wallet: "💳", "seller-dash": "📊", policies: "📜" };
  const Item = ({ label, p, right }) => (
    <button onClick={() => go({ page: p })}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${P === p ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
      style={P === p ? { boxShadow: "inset 2px 0 0 oklch(0.65 0.25 295)" } : undefined}>
      <span className="text-xs w-4 text-center opacity-80">{ICONS[p] || "·"}</span>
      <span className="flex-1 text-left">{label}</span>
      {right && <span className="font-mono2 text-[10px]" style={{ color: "var(--cyan)" }}>{right}</span>}
    </button>
  );
  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-28 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
        <div className="glass rounded-2xl p-2">
          <div className="mono-label mb-1 px-3 pt-2">Navigate</div>
          {NAV.map(([label, p]) => <Item key={p} label={label} p={p} />)}
        </div>
        <div className="glass rounded-2xl p-2">
          <div className="mono-label mb-1 px-3 pt-2">Browse</div>
          {CATS.map((c) => (
            <div key={c}>
              <button onClick={() => setOpenCat(openCat === c ? null : c)} aria-expanded={openCat === c}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5">
                {c}
                <span className="font-mono2 text-[10px]" style={{ color: "var(--cyan)" }}>{openCat === c ? "▾" : "▸"}</span>
              </button>
              {openCat === c && (
                <div className="ml-3 pl-2 border-l border-white/10 fadein">
                  {GAMES_META.filter((g) => !HIDDEN_GAMES.has(g.name)).map((g) => (
                    <button key={g.name} onClick={() => go({ page: "game", game: g.name, cat: c })}
                      className="block w-full text-left px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 truncate">{g.name}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="glass rounded-2xl p-2">
          <div className="mono-label mb-1 px-3 pt-2">My account</div>
          {ACCOUNT.map(([label, p]) => <Item key={p} label={label} p={p} right={p === "wallet" ? fmt(wallet) : undefined} />)}
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="mono-label">Your rank</div>
          <div className="font-display font-bold text-xl mt-1" style={{ color: "var(--cyan)" }}>
            Platinum <span className="font-mono2 text-xs align-middle" style={{ color: "var(--muted)" }}>IV</span>
          </div>
          <div className="h-1.5 rounded-full glass overflow-hidden mt-3">
            <div className="h-full" style={{ width: "62%", background: "linear-gradient(90deg,var(--violet),var(--cyan))" }} />
          </div>
          <div className="flex justify-between mono-label mt-1.5"><span>XP 3,120</span><span>5,000</span></div>
        </div>
      </div>
    </aside>
  );
}

function SellerDash({ bump }) {
  const seed = (name) => LISTINGS.filter((l) => l.seller === name).slice(0, 5).map((l, i) => ({
    id: "so-" + name + "-" + i, title: l.title, buyer: BUYERS[(i + 2) % BUYERS.length], price: l.price,
    status: i < 2 ? "pending" : "delivered", date: i < 2 ? "Today" : "Jun " + (24 + i),
  }));
  const [me, setMe] = useState("VaultKeeper");
  const [sOrders, setSOrders] = useState(() => seed("VaultKeeper"));
  const [paid, setPaid] = useState(false);
  useEffect(() => { setSOrders(seed(me)); setPaid(false); }, [me]);
  const meta = SELLERS.find((s) => s.name === me) || { rating: 0, sales: 0 };
  const mine = LISTINGS.filter((l) => l.seller === me);
  const pending = sOrders.filter((o) => o.status === "pending");
  const escrow = pending.reduce((s, o) => s + o.price, 0) * 0.92;
  const available = sOrders.filter((o) => o.status === "delivered").reduce((s, o) => s + o.price, 0) * 0.92;
  const mark = (id) => setSOrders((os) => os.map((o) => (o.id === id ? { ...o, status: "delivered" } : o)));
  return (
    <div className="fadein">
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h1 className="font-display font-bold text-3xl">Seller dashboard</h1>
        <span className="mono-label">viewing as</span>
        <select value={me} onChange={(e) => setMe(e.target.value)} aria-label="seller POV"
          className="c0-input rounded-lg px-3 py-1.5 text-xs font-mono2">
          {SELLERS.map((s) => <option key={s.name} value={s.name} style={{ background: "#12101f" }}>{s.name}</option>)}
        </select>
        <span className="font-mono2 text-[10px] px-2 py-0.5 rounded-full ml-auto" style={{ color: "var(--cyan)", border: "1px solid var(--cyan)" }}>DEMO POV · real auth via backend</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[["Available payout", fmt(available)], ["In escrow", fmt(escrow)], ["Rating", "★ " + meta.rating.toFixed(1)], ["Lifetime sales", meta.sales.toLocaleString()]].map(([k, v]) => (
          <div key={k} className="hub-card p-4 text-center">
            <div className="font-mono2 font-bold text-xl text-grad-price">{v}</div>
            <div className="mono-label mt-1">{k}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="hub-card p-6">
            <div className="mono-label mb-3">Orders to fulfil · {pending.length} pending</div>
            {sOrders.map((o) => (
              <div key={o.id} className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{o.title}</div>
                  <div className="mono-label mt-0.5">buyer: {o.buyer} · {o.date}</div>
                </div>
                <span className="font-mono2 text-sm text-grad-price">{fmt(o.price)}</span>
                {o.status === "pending" ? (
                  <button onClick={() => mark(o.id)} className="btn-primary rounded-lg px-4 py-2 text-xs">Mark delivered</button>
                ) : (
                  <span className="font-mono2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full glass" style={{ color: "var(--success)" }}>Delivered</span>
                )}
              </div>
            ))}
          </div>

          <div className="hub-card p-6">
            <div className="mono-label mb-3">My listings · {mine.length} live · edit price inline</div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {mine.map((l) => (
                <div key={l.id} className="glass rounded-xl p-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{l.title}</div>
                    <div className="mono-label mt-0.5">{l.game} · {l.cat} · stock {l.stock}</div>
                  </div>
                  <span className="mono-label">USD</span>
                  <input defaultValue={l.price} onBlur={(e) => { l.price = Number(e.target.value) || l.price; bump(); }}
                    aria-label="price" inputMode="decimal" className="c0-input rounded-lg px-3 py-1.5 text-xs font-mono2 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="hub-card p-6">
            <div className="mono-label">Payouts</div>
            <div className="font-mono2 font-bold text-3xl text-grad-price mt-2">{fmt(available)}</div>
            <div className="mono-label mt-1">after 8% commission · escrow releases excluded</div>
            {paid ? (
              <div className="text-sm mt-4" style={{ color: "var(--success)" }}>✓ Payout requested — funds arrive in 1–3 business days once Stripe Connect is live.</div>
            ) : (
              <button onClick={() => setPaid(true)} disabled={available <= 0} className="btn-primary w-full rounded-xl py-3 text-sm mt-4 disabled:opacity-40">Request payout</button>
            )}
            <div className="mono-label mt-4">KYC verification required before first payout.</div>
          </div>
          <div className="hub-card p-6">
            <div className="mono-label mb-2">Seller health</div>
            {[["Response time", "~4 min"], ["Delivery on time", "98.4%"], ["Dispute rate", "0.6%"], ["Cancellations", "1.1%"]].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-white/10 last:border-0 text-sm">
                <span style={{ color: "var(--muted)" }}>{k}</span><span className="font-mono2">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (this.state.err) {
      return (
        <div className="hub-card p-10 text-center fadein">
          <div className="font-display font-bold text-xl">Something glitched on this page</div>
          <p className="text-sm mt-2 font-mono2" style={{ color: "var(--muted)" }}>{String(this.state.err.message || this.state.err)}</p>
          <button onClick={() => this.setState({ err: null })} className="btn-primary rounded-xl px-6 py-3 text-sm mt-5">Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function SupportChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ from: "bot", t: "Hey! I'm the Coin0p assistant. Pick a question or type your own." }]);
  const [inp, setInp] = useState("");
  useEffect(() => {
    const h = () => setOpen(true);
    window.addEventListener("c0-open-chat", h);
    return () => window.removeEventListener("c0-open-chat", h);
  }, []);
  const CANNED = {
    "How fast is delivery?": "Most currency orders arrive in 15–30 minutes and accounts within an hour — every listing shows its ⚡ delivery estimate.",
    "How do refunds work?": "Your money sits in escrow until you confirm delivery. Not delivered or not as described? Open a dispute within 72 hours for a full refund.",
    "How do I become a seller?": "Head to Start selling, create your first listing, then complete identity verification before your first payout.",
  };
  const send = (text) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "me", t: text }]);
    setInp("");
    setTimeout(() => setMsgs((m) => [...m, { from: "bot", t: CANNED[text] || "Thanks! A human agent will pick this up — live 24/7 support connects once the backend is wired in." }]), 600);
  };
  return (
    <>
      <button onClick={() => setOpen(!open)} aria-label="support chat"
        className="fixed bottom-5 right-5 z-50 w-13 h-13 rounded-full flex items-center justify-center text-xl"
        style={{ width: 52, height: 52, background: "linear-gradient(135deg,var(--violet),var(--magenta))", boxShadow: "0 0 24px -4px oklch(0.65 0.25 295 / 0.8)" }}>
        {open ? "✕" : "💬"}
      </button>
      {open && (
        <div className="fixed bottom-20 right-5 z-50 glass-strong rounded-2xl w-80 max-w-[calc(100vw-2.5rem)] flex flex-col fadein overflow-hidden" style={{ height: 420 }}>
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--success)", boxShadow: "0 0 6px var(--success)" }} />
            <span className="font-display font-semibold text-sm">Coin0p Support</span>
            <span className="mono-label ml-auto">24/7</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${m.from === "me" ? "ml-auto" : ""}`}
                style={m.from === "me" ? { background: "linear-gradient(100deg,var(--violet),var(--magenta))" } : { background: "rgba(255,255,255,0.07)" }}>
                {m.t}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {Object.keys(CANNED).map((q) => (
                <button key={q} onClick={() => send(q)} className="chip rounded-full px-2.5 py-1 text-[10px] font-mono2">{q}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(inp)}
                placeholder="Type a message…" className="c0-input flex-1 rounded-lg px-3 py-2 text-xs" />
              <button onClick={() => send(inp)} className="btn-primary rounded-lg px-3 text-xs">Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CookieBanner({ go, onChoice }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-white/15 fadein">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center gap-3 flex-wrap">
        <p className="text-xs flex-1 min-w-[240px]" style={{ color: "var(--muted)" }}>
          🍪 We use essential cookies to run Coin0p and optional analytics cookies to improve it — see the{" "}
          <button onClick={() => go({ page: "policies" })} className="underline hover:text-white">Cookie Policy</button>.
        </p>
        <button onClick={() => onChoice("essential")} className="btn-ghost-glass rounded-lg px-4 py-2 text-xs">Essential only</button>
        <button onClick={() => onChoice("all")} className="btn-primary rounded-lg px-4 py-2 text-xs">Accept all</button>
      </div>
    </div>
  );
}

function OrderChat({ id, orders, updateOrder, go, setToast }) {
  const o = orders.find((x) => x.id === id);
  const [inp, setInp] = useState("");
  const [ig, setIg] = useState("");
  if (!o) return (
    <div className="hub-card p-10 text-center fadein">
      <div className="font-display text-lg">Order not found</div>
      <button onClick={() => go({ page: "orders" })} className="btn-primary rounded-xl px-6 py-3 text-sm mt-4">My orders</button>
    </div>
  );
  const online = ONLINE.has(o.seller);
  const S = { escrow: ["In escrow", "var(--cyan)"], delivered: ["Delivered", "var(--success)"], disputed: ["Disputed", "var(--magenta)"] };
  const sellerReply = (t, delay = 1200) => setTimeout(() => updateOrder(id, (x) => ({ ...x, chat: [...x.chat, { from: "seller", t }] })), delay);
  const send = () => {
    if (!inp.trim()) return;
    const text = inp.trim();
    updateOrder(id, (x) => ({ ...x, chat: [...x.chat, { from: "buyer", t: text }] }));
    setInp("");
    if (o.status === "escrow") sellerReply("Got it 👍 (simulated reply — real seller chat connects with the backend)");
  };
  const submitIG = () => {
    const name = ig.trim();
    if (!name) return;
    updateOrder(id, (x) => ({ ...x, userIG: name, chat: [...x.chat,
      { from: "buyer", t: "My in-game username is: " + name },
      { from: "system", t: "Username shared with the seller. Waiting for delivery…" }] }));
    sellerReply("Perfect — sending to '" + name + "' now. Keep an eye in game ⚡");
    setTimeout(() => updateOrder(id, (x) => x.status === "escrow" ? ({ ...x, chat: [...x.chat, { from: "seller", t: "Sent! ✅ Please check in game, then hit Confirm delivery to release the escrow." }] }) : x), 3800);
    setIg("");
  };
  const confirm = () => {
    updateOrder(id, (x) => ({ ...x, status: "delivered", chat: [...x.chat, { from: "system", t: "Delivery confirmed by buyer — escrow released to " + o.seller + ". Thanks for trading on Coin0p!" }] }));
    setToast("Escrow released ✓");
  };
  const dispute = () => {
    updateOrder(id, (x) => ({ ...x, status: "disputed", chat: [...x.chat, { from: "system", t: "Dispute opened — the resolution team and admin have been notified. Keep all evidence in this chat." }] }));
    setToast("Dispute opened — admin notified");
  };
  const steps = [
    ["Share your in-game username", !!o.userIG],
    ["Seller delivers your order", o.chat.some((m) => m.from === "seller" && m.t.startsWith("Sent!")) || o.status !== "escrow"],
    ["Confirm delivery to release escrow", o.status === "delivered"],
  ];
  return (
    <div className="fadein">
      <div className="mono-label mb-3">
        <button onClick={() => go({ page: "orders" })} className="hover:text-white">Orders</button>
        {" / "}<span style={{ color: "var(--fg)" }}>{o.id}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 hub-card flex flex-col overflow-hidden" style={{ minHeight: 480 }}>
          <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
            <span className="relative w-9 h-9 rounded-full flex items-center justify-center font-display font-bold shrink-0"
              style={{ background: "linear-gradient(135deg,var(--violet),var(--magenta))", color: "#fff" }}>
              {o.seller[0]}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                style={{ background: online ? "var(--success)" : "rgba(255,255,255,0.25)", border: "2px solid var(--bg)" }} />
            </span>
            <div className="min-w-0">
              <button onClick={() => go({ page: "seller", name: o.seller })} className="text-sm font-semibold hover:underline">{o.seller}</button>
              <div className="mono-label">{online ? "online now" : "replies in ~1h"} · order chat is your evidence — keep everything here</div>
            </div>
            <span className="font-mono2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full glass ml-auto shrink-0" style={{ color: S[o.status][1] }}>{S[o.status][0]}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ maxHeight: 420 }}>
            {o.chat.map((m, i) => m.from === "system" ? (
              <div key={i} className="text-center">
                <span className="inline-block font-mono2 text-[10px] px-3 py-1.5 rounded-full glass" style={{ color: "var(--muted)" }}>{m.t}</span>
              </div>
            ) : (
              <div key={i} className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.from === "buyer" ? "ml-auto" : ""}`}
                style={m.from === "buyer" ? { background: "linear-gradient(100deg,var(--violet),var(--magenta))", color: "#fff" } : { background: "rgba(128,128,160,0.15)" }}>
                <div className="mono-label mb-0.5" style={{ color: m.from === "buyer" ? "rgba(255,255,255,0.7)" : undefined }}>{m.from === "buyer" ? "You" : o.seller}</div>
                {m.t}
              </div>
            ))}
          </div>
          {!o.userIG && o.status === "escrow" && (
            <div className="p-4 border-t border-white/10" style={{ background: "oklch(0.65 0.25 295 / 0.08)" }}>
              <div className="mono-label mb-2">Step 1 · share your in-game username so {o.seller} can deliver ({o.game})</div>
              <div className="flex gap-2">
                <input value={ig} onChange={(e) => setIg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitIG()}
                  placeholder={"Your " + o.game + " username"} className="c0-input flex-1 rounded-xl px-4 py-2.5 text-sm font-mono2" />
                <button onClick={submitIG} className="btn-primary rounded-xl px-5 text-sm">Share</button>
              </div>
            </div>
          )}
          <div className="p-4 border-t border-white/10 flex gap-2">
            <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Message the seller…" className="c0-input flex-1 rounded-xl px-4 py-2.5 text-sm" />
            <button onClick={send} className="btn-primary rounded-xl px-5 text-sm">Send</button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="hub-card p-5">
            <div className="mono-label">Order</div>
            <div className="font-display font-semibold mt-1">{o.title}</div>
            <div className="mono-label mt-1">{o.game} · {o.date} · {o.id}</div>
            <div className="font-mono2 font-bold text-2xl text-grad-price mt-3">{fmt(o.price)}</div>
            {o.userIG && <div className="mono-label mt-2">Delivering to: <span style={{ color: "var(--cyan)" }}>{o.userIG}</span></div>}
          </div>
          <div className="hub-card p-5">
            <div className="mono-label mb-3">Next steps</div>
            {steps.map(([t, done], i) => (
              <div key={i} className="flex items-start gap-2.5 py-2 border-b border-white/10 last:border-0">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono2 shrink-0 mt-0.5"
                  style={done ? { background: "oklch(0.72 0.19 150 / 0.25)", color: "var(--success)" } : { border: "1px solid rgba(128,128,160,0.4)", color: "var(--muted)" }}>
                  {done ? "✓" : i + 1}
                </span>
                <span className={`text-sm ${done ? "opacity-60" : ""}`}>{t}</span>
              </div>
            ))}
          </div>
          {o.status === "escrow" && (
            <div className="hub-card p-5">
              <button onClick={confirm} className="btn-primary w-full rounded-xl py-3 text-sm">Confirm delivery · release escrow</button>
              <button onClick={dispute} className="btn-ghost-glass w-full rounded-xl py-2.5 text-xs mt-2" style={{ color: "var(--magenta)" }}>Report a problem</button>
              <div className="mono-label mt-3">Only confirm once you have received and secured your order. Auto-confirms 48h after the seller marks delivered.</div>
            </div>
          )}
          {o.status === "disputed" && (
            <div className="hub-card p-5" style={{ borderColor: "oklch(0.65 0.28 340 / 0.5)" }}>
              <div className="mono-label" style={{ color: "var(--magenta)" }}>Dispute in progress</div>
              <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>The resolution team and admin have this order. Decision within 5 business days — funds stay locked in escrow until then.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.7 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/>
    <path fill="#FBBC05" d="M10.4 28.7a14.5 14.5 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6z"/>
    <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.4-5.5l-7.5-5.8c-2.1 1.4-4.8 2.3-7.9 2.3-6.3 0-11.7-3.7-13.6-9.3l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/>
  </svg>
);

function AuthModal({ close, onLogin }) {
  const [mode, setMode] = useState("choose");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  useEffect(() => {
    const h = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [close]);
  const finish = (via) => {
    const em = email.trim().toLowerCase();
    if (!em.includes("@")) return;
    const nm = name.trim() || em.split("@")[0];
    onLogin({ name: nm, email: em, via });
  };
  return (
    <div className="fixed inset-0 z-[58] flex items-center justify-center p-4" style={{ background: "rgba(4,3,10,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="glass-strong rounded-2xl w-full max-w-sm p-7 fadein">
        {mode === "choose" && (<>
          <div className="text-center mb-6">
            <div className="font-display font-bold text-2xl">Sign in to Coin<span className="text-grad">0p</span></div>
            <div className="mono-label mt-2">Log in to buy, sell and message sellers</div>
          </div>
          <button onClick={() => setMode("google")}
            className="w-full flex items-center justify-center gap-3 rounded-xl py-3 text-sm font-semibold"
            style={{ background: "#fff", color: "#1f1f1f", border: "1px solid rgba(0,0,0,0.15)" }}>
            <GoogleG /> Continue with Google
          </button>
          <div className="flex items-center gap-3 my-4">
            <span className="flex-1 h-px" style={{ background: "rgba(128,128,160,0.3)" }} />
            <span className="mono-label">or</span>
            <span className="flex-1 h-px" style={{ background: "rgba(128,128,160,0.3)" }} />
          </div>
          <button onClick={() => setMode("email")} className="btn-ghost-glass w-full rounded-xl py-3 text-sm">Continue with email</button>
          <div className="mono-label text-center mt-5">Demo sign-in — real Google OAuth &amp; 2FA connect via the backend</div>
        </>)}

        {mode === "google" && (
          <div className="rounded-xl p-6 -m-1" style={{ background: "#fff", color: "#1f1f1f" }}>
            <div className="flex justify-center mb-3"><GoogleG /></div>
            <div className="text-center font-semibold text-lg" style={{ fontFamily: "Inter, sans-serif" }}>Sign in with Google</div>
            <div className="text-center text-xs mt-1" style={{ color: "#5f6368" }}>to continue to <span style={{ color: "#1a73e8" }}>Coin0p</span></div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email or phone"
              className="w-full rounded-lg px-4 py-3 text-sm mt-5" style={{ border: "1px solid #dadce0", outline: "none", color: "#1f1f1f", background: "#fff" }} />
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (shown to sellers)"
              className="w-full rounded-lg px-4 py-3 text-sm mt-2" style={{ border: "1px solid #dadce0", outline: "none", color: "#1f1f1f", background: "#fff" }} />
            <div className="flex items-center justify-between mt-5">
              <button onClick={() => setMode("choose")} className="text-sm font-semibold" style={{ color: "#1a73e8" }}>Back</button>
              <button onClick={() => finish("google")} disabled={!email.includes("@")}
                className="rounded-full px-6 py-2.5 text-sm font-semibold disabled:opacity-40" style={{ background: "#1a73e8", color: "#fff" }}>Continue</button>
            </div>
            <div className="text-[10px] text-center mt-4" style={{ color: "#5f6368" }}>Simulated Google screen — real OAuth requires backend client ID</div>
          </div>
        )}

        {mode === "email" && (<>
          <div className="font-display font-bold text-xl text-center mb-5">Continue with email</div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Display name"
            className="c0-input w-full rounded-xl px-4 py-3 text-sm mb-2" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"
            className="c0-input w-full rounded-xl px-4 py-3 text-sm mb-2" />
          <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" placeholder="Password"
            onKeyDown={(e) => e.key === "Enter" && finish("email")}
            className="c0-input w-full rounded-xl px-4 py-3 text-sm mb-4" />
          <button onClick={() => finish("email")} disabled={!email.includes("@")} className="btn-primary w-full rounded-xl py-3 text-sm disabled:opacity-40">Sign in / create account</button>
          <button onClick={() => setMode("choose")} className="w-full text-center mono-label mt-4 hover:text-white">← Other options</button>
        </>)}
      </div>
    </div>
  );
}

/* ================= SHELL + APP ================= */
const NAV = [
  ["Games", "games"], ["Marketplace", "marketplace"], ["Auction", "auction"], ["Boosting", "boosting"],
  ["Coaching", "coaching"], ["Sell", "sell"], ["Rewards", "rewards"],
];
const ACCOUNT = [["Orders", "orders"], ["Watchlist", "watchlist"], ["Wallet", "wallet"], ["Seller dashboard", "seller-dash"], ["Rules & Policies", "policies"]];

export default function App() {
  const [route, setRoute] = useState({ page: "home" });
  const [cart, setCart] = useState([]);
  const [wallet, setWallet] = useState(1284.5);
  const [watch, setWatch] = useState(new Set());
  const [recent, setRecent] = useState([]);
  const [buyItem, setBuyItem] = useState(null);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [txns, setTxns] = useState(INITIAL_TXNS);
  const [menu, setMenu] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [toast, setToast] = useState(null);
  const [curCode, setCurCode] = useState("USD");
  const [welcome, setWelcome] = useState(true);
  const [cookies, setCookies] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingBuy, setPendingBuy] = useState(null);
  const [uMenu, setUMenu] = useState(false);
  const [, force] = useState(0);
  const bump = () => force((x) => x + 1);
  CUR = CURRENCIES.find((c) => c.code === curCode) || CURRENCIES[0];

  // --- localStorage persistence (repo version) ---
  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem("coin0p-cart") || "null");
      const w = JSON.parse(localStorage.getItem("coin0p-wallet") || "null");
      const wl = JSON.parse(localStorage.getItem("coin0p-watch") || "null");
      const cc = localStorage.getItem("coin0p-currency");
      const ck = localStorage.getItem("coin0p-cookies");
      const th = localStorage.getItem("coin0p-theme");
      const us = JSON.parse(localStorage.getItem("coin0p-user") || "null");
      if (Array.isArray(c)) setCart(c);
      if (typeof w === "number") setWallet(w);
      if (Array.isArray(wl)) setWatch(new Set(wl));
      if (cc) setCurCode(cc);
      if (ck) setCookies(ck);
      if (th) setTheme(th);
      if (us && us.email) setUser(us);
      if (localStorage.getItem("coin0p-welcomed")) setWelcome(false);
    } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("coin0p-cart", JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { try { localStorage.setItem("coin0p-wallet", JSON.stringify(wallet)); } catch {} }, [wallet]);
  useEffect(() => { try { localStorage.setItem("coin0p-watch", JSON.stringify([...watch])); } catch {} }, [watch]);
  useEffect(() => { try { localStorage.setItem("coin0p-currency", curCode); } catch {} }, [curCode]);
  useEffect(() => { try { localStorage.setItem("coin0p-theme", theme); } catch {} }, [theme]);
  useEffect(() => { try { user ? localStorage.setItem("coin0p-user", JSON.stringify(user)) : localStorage.removeItem("coin0p-user"); } catch {} }, [user]);
  useEffect(() => { if (cookies) try { localStorage.setItem("coin0p-cookies", cookies); } catch {} }, [cookies]);
  useEffect(() => { if (!welcome) try { localStorage.setItem("coin0p-welcomed", "1"); } catch {} }, [welcome]);

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2200); return () => clearTimeout(t); } }, [toast]);

  const go = useCallback((r) => {
    if (r.page === "listing") setRecent((prev) => [r.id, ...prev.filter((x) => x !== r.id)].slice(0, 4));
    setRoute(r); setMenu(false); window.scrollTo({ top: 0 });
  }, []);
  const addCart = (l) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === l.id);
      return ex ? c.map((i) => (i.id === l.id ? { ...i, qty: i.qty + 1 } : i)) : [...c, { ...l, qty: 1 }];
    });
    setToast("Added to cart");
  };
  const setQty = (id, q) => setCart((c) => q <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty: q } : i)));
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const toggleWatch = (id) => setWatch((w) => { const n = new Set(w); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const topUp = (a) => { setWallet((w) => w + a); setTxns((t) => [{ id: "t" + Date.now(), label: "Wallet top-up", amt: +a, date: "Today" }, ...t]); setToast(`Wallet topped up +$${a}`); };
  const charge = (amt, label) => { setWallet((w) => w - amt); setTxns((t) => [{ id: "t" + Date.now(), label: "Purchase · " + label, amt: -amt, date: "Today" }, ...t]); };
  const newChat = () => ([
    { from: "system", t: "Order placed — funds are in escrow. Next step: share your in-game username with the seller." },
    { from: "seller", t: "Hey! Thanks for your order 🤝 Drop your in-game username below and I will get it sent over." },
  ]);
  const onSuccess = (item, total) => {
    const id = "o" + Date.now();
    setOrders((o) => [{ id, title: item.title, price: total, status: "escrow", date: "Today", seller: item.seller, game: item.game, userIG: "", adminVerified: false, chat: newChat() }, ...o]);
    setCart((c) => c.filter((i) => i.id !== item.id));
    return id;
  };
  const updateOrder = (id, fn) => setOrders((os) => os.map((o) => (o.id === id ? fn({ ...o }) : o)));
  const verifyOrder = (id) => updateOrder(id, (x) => ({ ...x, adminVerified: !x.adminVerified }));
  const buy = (item) => {
    if (user) setBuyItem(item);
    else { setPendingBuy(item); setAuthOpen(true); }
  };
  const onLogin = (u) => {
    setUser(u); setAuthOpen(false); setUMenu(false);
    setToast("Welcome, " + u.name.split(" ")[0] + "! 👋");
    if (pendingBuy) { setBuyItem(pendingBuy); setPendingBuy(null); }
  };
  const logout = () => { setUser(null); setUMenu(false); setToast("Signed out"); };
  const buyCart = () => {
    if (!user) { setAuthOpen(true); return; }
    if (cart.length === 0) return;
    const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
    setBuyItem({ id: "cart", title: `Cart · ${cart.reduce((s, i) => s + i.qty, 0)} items`, game: "Multiple", seller: "Multiple sellers", price: sub, isCart: true });
  };
  const cartSuccess = (item, total) => {
    if (item.isCart) {
      setOrders((o) => [...cart.map((i) => ({ id: "o" + i.id + Date.now(), title: i.title, price: i.price * i.qty, status: "escrow", date: "Today", seller: i.seller, game: i.game, userIG: "", adminVerified: false, chat: newChat() })), ...o]);
      setCart([]);
      return null;
    }
    return onSuccess(item, total);
  };

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const P = route.page;

  return (
    <div className="c0-app" data-theme={theme}>
      <GlobalStyle />
      <a href="#main" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[70] glass-strong rounded-lg px-4 py-2 text-sm">Skip to content</a>
      <div className="relative z-10">
        {/* NAV */}
        <header className="sticky top-0 z-40 glass-strong">
          <div className="h-0.5" style={{ background: "linear-gradient(90deg,var(--violet),var(--cyan),var(--magenta))" }} />
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
            <button onClick={() => go({ page: "home" })} className="font-display font-bold text-2xl tracking-tight shrink-0">
              Coin<span className="text-grad">0p</span>
            </button>
            <span className="hidden xl:flex items-center gap-1.5 mono-label shrink-0" style={{ color: "var(--success)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--success)", boxShadow: "0 0 8px var(--success)" }} />ONLINE
            </span>
            <div className="flex-1 max-w-2xl mx-auto hidden sm:block"><GlobalSearch go={go} /></div>
            <div className="flex-1 sm:hidden" />
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="toggle theme"
              className="hidden sm:flex btn-ghost-glass rounded-full w-9 h-9 items-center justify-center">{theme === "dark" ? "☀️" : "🌙"}</button>
            <select value={curCode} onChange={(e) => setCurCode(e.target.value)} aria-label="currency"
              className="hidden md:block c0-input rounded-full px-3 py-1.5 text-xs font-mono2">
              {CURRENCIES.map((c) => <option key={c.code} value={c.code} style={{ background: "#12101f" }}>{c.code} {c.sym.trim()}</option>)}
            </select>
            <button onClick={() => go({ page: "wallet" })} className="hidden md:flex btn-ghost-glass rounded-full px-4 py-1.5 text-xs font-mono2 items-center gap-2">
              <span style={{ color: "var(--cyan)" }}>◈</span> {fmt(wallet)}
            </button>
            <button onClick={() => go({ page: "checkout" })} aria-label="cart" className="relative btn-ghost-glass rounded-full w-9 h-9 flex items-center justify-center">
              🛒{count > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-mono2 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,var(--violet),var(--magenta))" }}>{count}</span>}
            </button>
            <button onClick={() => go({ page: "watchlist" })} aria-label="watchlist" className="hidden sm:flex btn-ghost-glass rounded-full w-9 h-9 items-center justify-center">♡</button>
            <button onClick={() => setToast("Notifications arrive with the backend 🔔")} aria-label="notifications" className="hidden sm:flex btn-ghost-glass rounded-full w-9 h-9 items-center justify-center">🔔</button>
            <button onClick={() => go({ page: "sell" })} className="hidden sm:flex btn-primary rounded-full px-4 py-1.5 text-xs items-center">+ Sell</button>
            {user ? (
              <div className="relative shrink-0">
                <button onClick={() => setUMenu(!uMenu)} aria-label="account" className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm"
                  style={{ background: "linear-gradient(135deg,var(--cyan),var(--violet))", color: "#fff", boxShadow: "0 0 12px -2px oklch(0.75 0.18 210 / 0.7)" }}>
                  {user.name[0].toUpperCase()}
                </button>
                {uMenu && (
                  <div className="absolute right-0 top-11 glass-strong rounded-xl w-56 overflow-hidden fadein z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="text-sm font-semibold truncate">{user.name}</div>
                      <div className="mono-label truncate">{user.email}{user.via === "google" ? " · Google" : ""}</div>
                    </div>
                    {[["My orders", "orders"], ["Seller dashboard", "seller-dash"], ["Wallet", "wallet"]].map(([l, p]) => (
                      <button key={p} onClick={() => { setUMenu(false); go({ page: p }); }} className="block w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/10">{l}</button>
                    ))}
                    <button onClick={logout} className="block w-full text-left px-4 py-2.5 text-sm border-t border-white/10" style={{ color: "var(--magenta)" }}>Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="btn-primary rounded-full px-4 py-1.5 text-xs shrink-0">Sign in</button>
            )}
            <button onClick={() => setMenu(!menu)} aria-label="menu" className="lg:hidden btn-ghost-glass rounded-lg w-9 h-9">☰</button>
          </div>
          <div className="hidden lg:block"><CatNav go={go} /></div>
          {menu && (
            <div className="lg:hidden border-t border-white/10 px-4 py-3 fadein">
              <div className="mb-3 sm:hidden"><GlobalSearch go={go} /></div>
              <div className="grid grid-cols-2 gap-1">
                {[...NAV, ...ACCOUNT].map(([label, p]) => (
                  <button key={p} onClick={() => go({ page: p })} className="text-left px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10">{label}</button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* BODY */}
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
          <SideNav go={go} P={P} wallet={wallet} />

          <main id="main" className="flex-1 min-w-0">
            <ErrorBoundary>
            {P === "home" && <Home go={go} buy={buy} addCart={addCart} watch={watch} toggleWatch={toggleWatch} recent={recent} />}
            {P === "games" && <GamesDirectory go={go} />}
            {P === "game" && <GamePage key={route.game + "-" + (route.cat || "")} name={route.game} initialCat={route.cat} go={go} buy={buy} addCart={addCart} watch={watch} toggleWatch={toggleWatch} />}
            {P === "marketplace" && <Marketplace go={go} buy={buy} addCart={addCart} watch={watch} toggleWatch={toggleWatch} />}
            {P === "listing" && <ListingDetail id={route.id} go={go} buy={buy} addCart={addCart} watch={watch} toggleWatch={toggleWatch} />}
            {P === "seller" && <SellerPage name={route.name} go={go} buy={buy} addCart={addCart} watch={watch} toggleWatch={toggleWatch} />}
            {P === "coaching" && <Coaching buy={buy} />}
            {P === "auction" && <Auction now={now} />}
            {P === "boosting" && <Boosting buy={buy} />}
            {P === "sell" && <Sell />}
            {P === "wallet" && <Wallet wallet={wallet} topUp={topUp} txns={txns} />}
            {P === "orders" && <Orders orders={orders} go={go} />}
            {P === "watchlist" && <Watchlist watch={watch} go={go} buy={buy} addCart={addCart} toggleWatch={toggleWatch} />}
            {P === "rewards" && <Rewards topUp={topUp} />}
            {P === "checkout" && <Checkout cart={cart} setQty={setQty} removeItem={removeItem} buyCart={buyCart} go={go} />}
            {P === "policies" && <Policies />}
            {P === "admin" && <Admin wallet={wallet} setWallet={setWallet} clearCart={() => setCart([])} resetWatch={() => setWatch(new Set())} ordersCount={orders.length} cartCount={count} bump={bump} orders={orders} verifyOrder={verifyOrder} go={go} />}
            {P === "seller-dash" && <SellerDash bump={bump} />}
            {P === "order" && <OrderChat id={route.id} orders={orders} updateOrder={updateOrder} go={go} setToast={setToast} />}
            </ErrorBoundary>
          </main>
        </div>

        <footer className="border-t border-white/10 mt-10">
          <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="font-display font-bold text-lg">Coin<span className="text-grad">0p</span></div>
              <div className="mono-label mt-2">Escrow-protected trading for gamers</div>
            </div>
            <div>
              <div className="mono-label mb-3">Marketplace</div>
              {[["All games", "games"], ["The Floor", "marketplace"], ["Start selling", "sell"], ["Seller dashboard", "seller-dash"], ["Rewards", "rewards"]].map(([l, p]) => (
                <button key={p} onClick={() => go({ page: p })} className="block text-sm py-1 text-white/60 hover:text-white">{l}</button>
              ))}
            </div>
            <div>
              <div className="mono-label mb-3">Trust & rules</div>
              {["Terms of Service", "Privacy (GDPR)", "Cookie Policy", "Buyer Protection", "Seller Rules"].map((l) => (
                <button key={l} onClick={() => go({ page: "policies" })} className="block text-sm py-1 text-white/60 hover:text-white">{l}</button>
              ))}
            </div>
            <div>
              <div className="mono-label mb-3">Company</div>
              <button onClick={() => go({ page: "policies" })} className="block text-sm py-1 text-white/60 hover:text-white">How we police the market</button>
              <button onClick={() => go({ page: "admin" })} className="block text-sm py-1 text-white/60 hover:text-white">Staff console</button>
              <div className="mono-label mt-3">Demo build · no real payments</div>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-2">
              {["VISA", "Mastercard", "AMEX", "PayPal", "Apple Pay", "G Pay", "+12 more"].map((b) => (
                <span key={b} className="font-mono2 text-[10px] px-2.5 py-1 rounded glass" style={{ color: "var(--muted)" }}>{b}</span>
              ))}
              <span className="mono-label ml-auto">© 2026 Coin0p Ltd (placeholder) · England & Wales · Demo — no real payments taken</span>
            </div>
          </div>
        </footer>
      </div>

      {buyItem && (
        <BuyNowModal item={buyItem} close={() => setBuyItem(null)} wallet={wallet} topUp={topUp} charge={charge} onSuccess={cartSuccess} go={go} />
      )}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-strong rounded-full px-5 py-2.5 text-sm font-mono2 fadein">{toast}</div>
      )}
      <SupportChat />
      {authOpen && <AuthModal close={() => { setAuthOpen(false); setPendingBuy(null); }} onLogin={onLogin} />}
      {cookies === null && !welcome && <CookieBanner go={go} onChoice={setCookies} />}
      {welcome && <Welcome close={() => setWelcome(false)} curCode={curCode} setCurCode={setCurCode} />}
    </div>
  );
}
