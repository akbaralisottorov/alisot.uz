import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { ArticleRepository } from "./src/repositories/articleRepository";
import { UserRepository } from "./src/repositories/userRepository";
import crypto from "crypto";
import multer from "multer";
import fs from "fs";

import { Feed } from "feed";

import { BookRepository, BookCategoryRepository } from "./src/repositories/bookRepository";
import { GardenRepository } from "./src/repositories/gardenRepository";

import { getEmbedding } from "./src/lib/openai";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.ADMIN_PASSWORD || "fallback_admin_secret_key_123";

// Lightweight JWT sign (HS256)
function signJwt(payload: any): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${data}`)
    .digest("base64url");
  return `${header}.${data}.${signature}`;
}

// Lightweight JWT verify (HS256)
function verifyJwt(token: string): any {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, data, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${data}`)
      .digest("base64url");
    if (signature !== expectedSignature) return null;
    return JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

// Cookie parser helper
function getCookie(req: any, name: string): string | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((c: string) => c.trim());
  for (const cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

// Authentication middleware
const authMiddleware = (req: any, res: any, next: any) => {
  const token = getCookie(req, "admin_token");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }
  const payload = verifyJwt(token);
  if (!payload || payload.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
  next();
};

// Create public/uploads directory if it doesn't exist
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = crypto.randomUUID();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueId}${ext}`);
  }
});

const upload = multer({ storage });

// Serve public uploads statically
app.use("/uploads", express.static(uploadDir));

// Apply authentication check to all /api/admin/* routes except login and logout
app.use("/api/admin", (req, res, next) => {
  if (req.path === "/login" || req.path === "/logout") {
    return next();
  }
  authMiddleware(req, res, next);
});

// Image upload endpoint (protected)
app.post("/api/upload", authMiddleware, upload.single("file"), (req: any, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Fayl yuklanmadi" });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Admin login endpoint
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  
  if (password === adminPassword) {
    const token = signJwt({ role: "admin" });
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    return res.json({ success: true });
  } else {
    return res.status(401).json({ error: "Parol noto'g'ri" });
  }
});

// Admin logout endpoint
app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  res.json({ success: true });
});

app.post("/api/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });
    
    const embedding = await getEmbedding(query);
    const vectorString = `[${embedding.join(',')}]`;

    // We handle missing DB/SQL errors safely by checking if PRISMA is connected to postgres with vector extension
    if (process.env.DATABASE_URL?.includes("postgres")) {
        const articles = await prisma.$queryRaw`
          SELECT id, title, slug, excerpt, 'article' as type, 
                1 - (embedding <=> ${vectorString}::vector) as similarity
          FROM "Article" 
          WHERE status = 'PUBLISHED' AND embedding IS NOT NULL
          ORDER BY similarity DESC
          LIMIT 3
        `;

        const gardenNotes = await prisma.$queryRaw`
          SELECT id, title, slug, substring(content, 1, 100) as excerpt, 'garden' as type,
                1 - (embedding <=> ${vectorString}::vector) as similarity
          FROM "GardenNote"
          WHERE embedding IS NOT NULL
          ORDER BY similarity DESC
          LIMIT 3
        `;

        const books = await prisma.$queryRaw`
          SELECT id, title, slug, summary as excerpt, 'book' as type,
                1 - (embedding <=> ${vectorString}::vector) as similarity
          FROM "Book"
          WHERE embedding IS NOT NULL
          ORDER BY similarity DESC
          LIMIT 3
        `;
        
        const projects = await prisma.$queryRaw`
          SELECT id, title, slug, description as excerpt, 'project' as type,
                1 - (embedding <=> ${vectorString}::vector) as similarity
          FROM "Project"
          WHERE embedding IS NOT NULL
          ORDER BY similarity DESC
          LIMIT 3
        `;

        const allResults = [...(articles as any[]), ...(gardenNotes as any[]), ...(books as any[]), ...(projects as any[])]
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 10);
          
        return res.json(allResults);
    }
    
    // Fallback if Postgres isn't properly configured yet to prevent crashing
    res.json([]);
  } catch (e: any) {
    console.error("Search error:", e);
    res.status(500).json({ error: "Search failed" });
  }
});

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/articles", async (req, res) => {
  try {
    const articles = await ArticleRepository.getPublishedArticles();
    res.json(articles);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch articles", details: e.message || String(e) });
  }
});

app.get("/api/articles/:slug", async (req, res) => {
  try {
    const article = await ArticleRepository.getArticleBySlug(req.params.slug);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json(article);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch article", details: e.message || String(e) });
  }
});

const getAppUrl = () => process.env.APP_URL || `http://localhost:${process.env.PORT || 3000}`;

app.get("/robots.txt", (req, res) => {
  const sitemapUrl = `${getAppUrl()}/sitemap.xml`;
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${sitemapUrl}`;
  res.type("text/plain");
  res.send(robots);
});

app.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl = getAppUrl();
    const articles = await ArticleRepository.getPublishedArticles();
    const books = await BookRepository.getBooks({});
    const notes = await GardenRepository.getNotes({});

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // Homepage
    sitemap += `  <url>\n    <loc>${baseUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    
    // Article Detail Pages (priority: 0.9)
    articles.forEach(article => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}/article/${article.slug}</loc>\n`;
      sitemap += `    <lastmod>${new Date(article.updatedAt).toISOString()}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.9</priority>\n`;
      sitemap += `  </url>\n`;
    });

    // Books Hub (priority: 0.7)
    sitemap += `  <url>\n    <loc>${baseUrl}/books</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;

    // Book Detail Pages (priority: 0.7)
    books.forEach(book => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}/books/${book.slug}</loc>\n`;
      sitemap += `    <lastmod>${new Date(book.updatedAt).toISOString()}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.7</priority>\n`;
      sitemap += `  </url>\n`;
    });

    // Garden Hub (priority: 0.6)
    sitemap += `  <url>\n    <loc>${baseUrl}/garden</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;

    // Garden Note Detail Pages (priority: 0.6)
    notes.forEach(note => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}/garden/${note.slug}</loc>\n`;
      sitemap += `    <lastmod>${new Date(note.updatedAt).toISOString()}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.6</priority>\n`;
      sitemap += `  </url>\n`;
    });
    
    sitemap += `</urlset>`;
    res.type("application/xml");
    res.send(sitemap);
  } catch (e) {
    console.error("Sitemap generation error:", e);
    res.status(500).end();
  }
});

app.get("/rss.xml", async (req, res) => {
  try {
    const articles = await ArticleRepository.getPublishedArticles();
    const baseUrl = getAppUrl();
    
    const feed = new Feed({
      title: "Alisot - Marketing & Brend Strategiyasi",
      description: "Akbarali Sottorov — Marketing strategy va brand communications mutaxassisining portfolio va blog sahifasi.",
      id: baseUrl,
      link: baseUrl,
      language: "en",
      image: `${baseUrl}/favicon.ico`,
      favicon: `${baseUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Akbarali Sottorov`,
      author: {
        name: "Akbarali Sottorov",
        email: "akbaraliy.phone@gmail.com",
        link: baseUrl
      }
    });

    articles.forEach(article => {
      feed.addItem({
        title: article.seoTitle || article.title,
        id: `${baseUrl}/article/${article.slug}`,
        link: `${baseUrl}/article/${article.slug}`,
        description: article.seoDescription || article.excerpt || article.content.substring(0, 150) + "...",
        content: article.content,
        author: [
          {
            name: article.author?.name || "Admin",
            email: article.author?.email || "",
            link: baseUrl
          }
        ],
        date: new Date(article.createdAt),
        image: article.coverImage || undefined
      });
    });

    res.type("application/xml");
    res.send(feed.rss2());
  } catch (e) {
    res.status(500).end();
  }
});

// Admin routes for overriding server actions
app.get("/api/admin/articles", async (req, res) => {
  try {
    const articles = await ArticleRepository.getAllArticles();
    res.json(articles);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch articles", details: e.message || String(e) });
  }
});

app.post("/api/admin/articles", async (req, res) => {
  try {
    const { title, slug, excerpt, content, coverImage, status, featured, seoTitle, seoDescription, authorId } = req.body;
    const newArticle = await ArticleRepository.createArticle({
      title, slug, excerpt, content, coverImage, status, featured, seoTitle, seoDescription,
      author: { connect: { id: authorId } }
    });
    res.json(newArticle);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to create article", details: e.message || String(e) });
  }
});

app.put("/api/admin/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, coverImage, status, featured, seoTitle, seoDescription } = req.body;
    const updatedArticle = await ArticleRepository.updateArticle(id, {
      title, slug, excerpt, content, coverImage, status, featured, seoTitle, seoDescription,
    });
    res.json(updatedArticle);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to update article", details: e.message || String(e) });
  }
});

app.delete("/api/admin/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ArticleRepository.deleteArticle(id);
    res.json({ success: true });
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to delete article", details: e.message || String(e) });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await UserRepository.getAllUsers();
    res.json(users);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch users", details: e.message || String(e) });
  }
});

app.get("/api/admin/analytics", async (req, res) => {
  try {
    // Calculate real counts from DB
    const totalArticles = await prisma.article.count();
    const publishedArticles = await prisma.article.count({ where: { status: 'PUBLISHED' } });
    const totalBooks = await prisma.book.count();
    const readingBooks = await prisma.book.count({ where: { status: 'READING' } });
    const totalGardenNotes = await prisma.gardenNote.count();
    const evergreenNotes = await prisma.gardenNote.count({ where: { status: 'EVERGREEN' } });
    const totalProjects = await prisma.project.count();
    const totalUsers = await prisma.user.count();

    // Top published articles for table
    const topContent = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      select: { title: true, createdAt: true },
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      kpis: {
        totalArticles,
        publishedArticles,
        totalBooks,
        readingBooks,
        totalGardenNotes,
        evergreenNotes,
        totalProjects,
        totalUsers
      },
      recentContent: topContent
    });
  } catch (e: any) {
    console.log("Error fetching analytics:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch real-time analytics" });
  }
});

// --- Book Routes ---

app.get("/api/books", async (req, res) => {
  try {
    const { search, status, category } = req.query;
    const books = await BookRepository.getBooks({ 
      search: search as string, 
      status: status as string,
      category: category as string
    });
    res.json(books);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch books", details: e.message || String(e) });
  }
});

app.get("/api/book-categories", async (req, res) => {
  try {
    const categories = await BookCategoryRepository.getCategories();
    res.json(categories);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch book categories" });
  }
});

app.get("/api/books/:slug", async (req, res) => {
  try {
    const book = await BookRepository.getBookBySlug(req.params.slug);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch book", details: e.message || String(e) });
  }
});

app.post("/api/admin/books", async (req, res) => {
  try {
    const data = req.body;
    const newBook = await BookRepository.createBook(data);
    res.json(newBook);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to create book", details: e.message || String(e) });
  }
});

app.put("/api/admin/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedBook = await BookRepository.updateBook(id, data);
    res.json(updatedBook);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to update book", details: e.message || String(e) });
  }
});

app.delete("/api/admin/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BookRepository.deleteBook(id);
    res.json({ success: true });
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to delete book", details: e.message || String(e) });
  }
});

// --- Garden Routes ---

app.get("/api/garden", async (req, res) => {
  try {
    const { search, tag, status } = req.query;
    const notes = await GardenRepository.getNotes({ 
      search: search as string, 
      tag: tag as string,
      status: status as string 
    });
    res.json(notes);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch garden notes", details: e.message || String(e) });
  }
});

app.get("/api/garden/:slug", async (req, res) => {
  try {
    const note = await GardenRepository.getNoteBySlug(req.params.slug);
    if (!note) return res.status(404).json({ error: "Garden note not found" });
    res.json(note);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch garden note", details: e.message || String(e) });
  }
});

app.post("/api/admin/garden", async (req, res) => {
  try {
    const data = req.body;
    const newNote = await GardenRepository.createNote(data);
    res.json(newNote);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to create garden note", details: e.message || String(e) });
  }
});

app.put("/api/admin/garden/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedNote = await GardenRepository.updateNote(id, data);
    res.json(updatedNote);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to update garden note", details: e.message || String(e) });
  }
});

app.delete("/api/admin/garden/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await GardenRepository.deleteNote(id);
    res.json({ success: true });
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to delete garden note", details: e.message || String(e) });
  }
});

// Dev / Local Start Configuration
if (!process.env.VERCEL) {
  const startLocalServer = async () => {
    const PORT = process.env.PORT || 3000;
    
    // Vite middleware for development
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*all', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`Server running locally on http://localhost:${PORT}`);
    });
  };
  
  startLocalServer();
}

export default app;
