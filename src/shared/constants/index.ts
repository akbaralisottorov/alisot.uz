// ─── Article Status ──────────────────────────────────────────────
export const ArticleStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
} as const;

export type ArticleStatus = typeof ArticleStatus[keyof typeof ArticleStatus];

// ─── Book Status ──────────────────────────────────────────────────
export const BookStatus = {
  WANT_TO_READ: "WANT_TO_READ",
  READING: "READING",
  COMPLETED: "COMPLETED",
} as const;

export type BookStatus = typeof BookStatus[keyof typeof BookStatus];

// ─── Garden Note Status ───────────────────────────────────────────
export const GardenStatus = {
  SEEDLING: "SEEDLING",
  INCUBATOR: "INCUBATOR",
  EVERGREEN: "EVERGREEN",
} as const;

export type GardenStatus = typeof GardenStatus[keyof typeof GardenStatus];

// ─── App Constants ────────────────────────────────────────────────
export const APP_AUTHOR = "Akbarali Sottorov";
export const APP_EMAIL = "akbaraliy.phone@gmail.com";
export const APP_SITE = "alisot.uz";
export const APP_TITLE = "Akbarali Sottorov — Digital Home";
export const DEFAULT_LANG = "uz";
export const SUPPORTED_LANGS = ["uz", "en", "ru"] as const;

// ─── API Routes ───────────────────────────────────────────────────
export const API_ROUTES = {
  articles: "/api/articles",
  books: "/api/books",
  garden: "/api/garden",
  search: "/api/search",
  contact: "/api/contact",
  subscribe: "/api/subscribe",
  upload: "/api/upload",
  admin: {
    login: "/api/admin/login",
    challenge: "/api/admin/login-challenge",
    logout: "/api/admin/logout",
    articles: "/api/admin/articles",
    books: "/api/admin/books",
    garden: "/api/admin/garden",
    subscribers: "/api/admin/subscribers",
    analytics: "/api/admin/analytics",
    securityLogs: "/api/admin/security-logs",
  },
  users: "/api/users",
} as const;
