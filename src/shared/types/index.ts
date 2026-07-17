export type Language = "uz" | "en" | "ru";

export const ArticleStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
} as const;

export type ArticleStatus = typeof ArticleStatus[keyof typeof ArticleStatus];

export const BookStatus = {
  WANT_TO_READ: "WANT_TO_READ",
  READING: "READING",
  COMPLETED: "COMPLETED",
} as const;

export type BookStatus = typeof BookStatus[keyof typeof BookStatus];

export const GardenStatus = {
  SEEDLING: "SEEDLING",
  INCUBATOR: "INCUBATOR",
  EVERGREEN: "EVERGREEN",
} as const;

export type GardenStatus = typeof GardenStatus[keyof typeof GardenStatus];

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  status: ArticleStatus;
  featured: boolean;
  views?: number | null;
  authorId?: string | null;
  author?: User | null;
  categories?: Category[];
  tags?: Tag[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt?: string;
  updatedAt?: string;
  // UI fallback/mock properties
  category?: string;
  readTime?: string;
}

export interface BookCategory {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  slug: string;
  coverImage?: string | null;
  rating?: number | null;
  status: BookStatus;
  progress?: number | null;
  summary?: string | null;
  keyIdeas?: string | null;
  favoriteQuotes?: string | null;
  personalInsights?: string | null;
  categoryId?: string | null;
  category?: BookCategory | null;
  createdAt?: string;
  updatedAt?: string;
  // UI fallback/mock properties
  favoriteQuote?: string;
  lessonsLearned?: string;
  changedThinking?: string;
  relatedArticles?: { title: string; slug: string }[];
}

export interface GardenNote {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags?: string | null;
  status: GardenStatus;
  linkedNodes: GardenNote[];
  backlinks: GardenNote[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags?: string | null;
  link?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
  confirmed: boolean;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  event: "SUCCESS" | "INVALID_PASSWORD" | "INVALID_CAPTCHA";
  ip: string;
}

export interface Idea {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  priority: string;
  tags?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LearningNode {
  id: string;
  category: string;
  title: string;
  progress: number;
  notes: string;
  resources?: string | null;
  takeaways?: string | null;
  links?: string | null;
  createdAt: string;
  updatedAt: string;
}
