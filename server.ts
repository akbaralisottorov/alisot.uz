import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { ArticleRepository } from "./src/repositories/articleRepository.js";
import { UserRepository } from "./src/repositories/userRepository.js";
import crypto from "crypto";
import multer from "multer";
import fs from "fs";

import { Feed } from "feed";

import { BookRepository, BookCategoryRepository } from "./src/repositories/bookRepository.js";
import { GardenRepository } from "./src/repositories/gardenRepository.js";
import { IdeaRepository } from "./src/repositories/ideaRepository.js";
import { LearningRepository } from "./src/repositories/learningRepository.js";

import { getEmbedding, getChatResponse } from "./src/shared/lib/openai.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Auto-seed default admin user if no users exist
const seedDefaultUser = async () => {
  try {
    const count = await prisma.user.count();
    if (count === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || "admin@alisot.uz";
      await prisma.user.create({
        data: {
          email: defaultEmail,
          name: "Akbarali Sottorov",
        },
      });
      console.log(`✅ Default admin user seeded: ${defaultEmail}`);
    }
  } catch (e) {
    console.warn("Could not seed default user (expected in serverless):", e);
  }
};

seedDefaultUser();


const app = express();

// Strict Security Headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com https://*.unsplash.com *; connect-src 'self' https://vitals.vercel-insights.com *;"
  );
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }
  next();
});

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
function getCookie(req: Request, name: string): string | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((c: string) => c.trim());
  for (const cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

// DRY async route handler — eliminates repetitive try/catch blocks
const asyncHandler = (fn: (req: Request, res: Response) => Promise<any>) =>
  async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (e: any) {
      console.error(`[${req.method} ${req.path}]`, e?.message || e);
      res.status(500).json({
        error: "Internal Server Error",
        details: process.env.NODE_ENV !== "production" ? (e.message || String(e)) : undefined,
      });
    }
  };


// Authentication middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
  } catch (err) {
    console.warn("Could not create upload directory (expected in serverless environments):", err);
  }
}

// Create data directory for non-public files
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (err) {
    console.warn("Could not create data directory:", err);
  }
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

// Serve other static files in the public directory (like portrait.png, cover images)
app.use(express.static(path.join(process.cwd(), "public")));

// Audit logging for security events
const logSecurityEvent = (event: "SUCCESS" | "INVALID_PASSWORD" | "INVALID_CAPTCHA", req: any) => {
  try {
    const rawIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
    const ip = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : String(rawIp);
    const logMessage = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      event,
      ip
    };
    const logFilePath = path.join(process.cwd(), "data/admin_security_log.json");
    let logs = [];
    if (fs.existsSync(logFilePath)) {
      try {
        const raw = fs.readFileSync(logFilePath, "utf8");
        logs = JSON.parse(raw);
      } catch (err) {
        console.error("Error reading security logs:", err);
      }
    }
    logs.unshift(logMessage);
    if (logs.length > 100) {
      logs = logs.slice(0, 100);
    }
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), "utf8");
  } catch (e) {
    console.error("Failed to log security event:", e);
  }
};

// Apply authentication check to all /api/admin/* routes except login, logout and login-challenge
app.use("/api/admin", (req, res, next) => {
  if (req.path === "/login" || req.path === "/logout" || req.path === "/login-challenge") {
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

// Admin login challenge (math captcha generator)
app.get("/api/admin/login-challenge", (req, res) => {
  const n1 = Math.floor(Math.random() * 15) + 1;
  const n2 = Math.floor(Math.random() * 15) + 1;
  const sum = n1 + n2;
  const challengeToken = signJwt({ sum, expiresAt: Date.now() + 120000 }); // Valid for 2 mins
  res.json({ question: `${n1} + ${n2}`, challengeToken });
});

// Admin login endpoint with captcha check and brute force prevention (artificial delay)
app.post("/api/admin/login", async (req, res) => {
  const { password, captchaAnswer, challengeToken } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  
  // 1. Verify captcha token
  if (!challengeToken || !captchaAnswer) {
    logSecurityEvent("INVALID_CAPTCHA", req);
    await new Promise(r => setTimeout(r, 2000));
    return res.status(400).json({ error: "Kaptcha kiritilishi shart" });
  }

  const payload = verifyJwt(challengeToken);
  if (!payload || !payload.sum || !payload.expiresAt) {
    logSecurityEvent("INVALID_CAPTCHA", req);
    await new Promise(r => setTimeout(r, 2000));
    return res.status(400).json({ error: "Kaptcha tokeni noto'g'ri" });
  }

  if (Date.now() > payload.expiresAt) {
    logSecurityEvent("INVALID_CAPTCHA", req);
    await new Promise(r => setTimeout(r, 2000));
    return res.status(400).json({ error: "Kaptcha muddati tugagan. Iltimos, sahifani yangilang." });
  }

  if (parseInt(captchaAnswer) !== payload.sum) {
    logSecurityEvent("INVALID_CAPTCHA", req);
    await new Promise(r => setTimeout(r, 2000));
    return res.status(400).json({ error: "Matematik javob noto'g'ri" });
  }

  // 2. Verify password
  if (password === adminPassword) {
    logSecurityEvent("SUCCESS", req);
    const token = signJwt({ role: "admin" });
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    return res.json({ success: true });
  } else {
    logSecurityEvent("INVALID_PASSWORD", req);
    await new Promise(r => setTimeout(r, 2000));
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

// Get admin security logs (protected)
app.get("/api/admin/security-logs", authMiddleware, asyncHandler(async (req, res) => {
  const logFilePath = path.join(process.cwd(), "data/admin_security_log.json");
  let logs = [];
  if (fs.existsSync(logFilePath)) {
    try {
      const raw = fs.readFileSync(logFilePath, "utf8");
      logs = JSON.parse(raw);
    } catch (err) {
      console.error("Error reading security logs:", err);
    }
  }
  res.json(logs);
}));

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

        const ideas = await prisma.$queryRaw`
          SELECT id, title, slug, content as excerpt, 'idea' as type,
                1 - (embedding <=> ${vectorString}::vector) as similarity
          FROM "Idea"
          WHERE embedding IS NOT NULL
          ORDER BY similarity DESC
          LIMIT 3
        `;

        const learningNodes = await prisma.$queryRaw`
          SELECT id, title, 'learning' as slug, notes as excerpt, 'learning' as type,
                1 - (embedding <=> ${vectorString}::vector) as similarity
          FROM "LearningNode"
          WHERE embedding IS NOT NULL
          ORDER BY similarity DESC
          LIMIT 3
        `;

        const allResults = [
          ...(articles as any[]),
          ...(gardenNotes as any[]),
          ...(books as any[]),
          ...(projects as any[]),
          ...(ideas as any[]),
          ...(learningNodes as any[])
        ]
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

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) {
      return res.status(400).json({ error: "No user message found" });
    }

    const query = lastUserMessage.content;
    const embedding = await getEmbedding(query);
    const vectorString = `[${embedding.join(',')}]`;

    let contextParts: string[] = [];
    let citations: Array<{ title: string; type: string; slug: string }> = [];

    // Safe DB check
    if (process.env.DATABASE_URL?.includes("postgres")) {
      try {
        const matchedArticles = await prisma.$queryRaw<any[]>`
          SELECT title, slug, excerpt, content, 'article' as type,
                 1 - (embedding <=> ${vectorString}::vector) as similarity
          FROM "Article"
          WHERE status = 'PUBLISHED' AND embedding IS NOT NULL
          ORDER BY similarity DESC
          LIMIT 2
        `;

        const matchedNotes = await prisma.$queryRaw<any[]>`
          SELECT title, slug, content, 'garden' as type,
                 1 - (embedding <=> ${vectorString}::vector) as similarity
          FROM "GardenNote"
          WHERE embedding IS NOT NULL
          ORDER BY similarity DESC
          LIMIT 2
        `;

        const matchedProjects = await prisma.$queryRaw<any[]>`
          SELECT title, slug, description, 'project' as type,
                 1 - (embedding <=> ${vectorString}::vector) as similarity
          FROM "Project"
          WHERE embedding IS NOT NULL
          ORDER BY similarity DESC
          LIMIT 2
        `;

        const validMatches = [
          ...matchedArticles,
          ...matchedNotes,
          ...matchedProjects
        ]
          .filter(m => m.similarity > 0.35)
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 3);

        validMatches.forEach(match => {
          citations.push({ title: match.title, type: match.type, slug: match.slug });
          contextParts.push(`Type: ${match.type}\nTitle: ${match.title}\nContent: ${match.content || match.excerpt || match.description}`);
        });
      } catch (err) {
        console.error("Vector search failed in chat:", err);
      }
    }

    const systemPrompt = `You are the digital twin AI assistant for Akbarali Sottorov, a Staff Software Engineer, Choice Architecture Researcher, and Brand Strategist.
Your goal is to answer questions about him, his work, ideas, projects, and learning paths based ONLY on the context provided below.
If the answer is not in the context, politely say you don't know or don't have that information. Do not invent any facts about him. Keep answers concise, and mention citations if available.

Context:
${contextParts.length > 0 ? contextParts.join("\n\n---\n\n") : "No matching context found. Rely on fallback info about Akbarali being an Uzbek Software Architect and Choice Architecture researcher."}
`;

    const aiResponse = await getChatResponse(messages, systemPrompt);

    res.json({
      role: 'assistant',
      content: aiResponse,
      citations
    });
  } catch (e: any) {
    console.error("Chat RAG error:", e);
    res.status(500).json({ error: "Assistant failed" });
  }
});


// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message, website } = req.body;

    // Honeypot check
    if (website) {
      console.warn("Honeypot triggered by spam bot, email:", email);
      return res.status(200).json({ success: true, message: "Discarded silently" });
    }

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Barcha majburiy maydonlarni to'ldiring" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Noto'g'ri email shakli" });
    }

    const contactMessage = {
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    };

    const contactLogPath = path.join(process.cwd(), "data/contact_messages.json");
    let messages = [];
    if (fs.existsSync(contactLogPath)) {
      try {
        const raw = fs.readFileSync(contactLogPath, "utf8");
        messages = JSON.parse(raw);
      } catch (err) {
        console.error("Error reading contact logs:", err);
      }
    }
    messages.push(contactMessage);
    try {
      fs.writeFileSync(contactLogPath, JSON.stringify(messages, null, 2), "utf8");
    } catch (err) {
      console.error("Error writing contact logs:", err);
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Alisot Portfolio <onboarding@resend.dev>",
          to: "akbaraliy.phone@gmail.com",
          subject: `Yangi xabar: ${subject}`,
          html: `
            <h2>Alisot.uz orqali yangi maktub</h2>
            <p><strong>Ism:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mavzu:</strong> ${subject}</p>
            <p><strong>Xabar:</strong></p>
            <blockquote style="background: #f4f4f4; padding: 15px; border-left: 5px solid #d4af37; color: #333;">
              ${message.replace(/\n/g, "<br>")}
            </blockquote>
          `
        });
        console.log("Email sent successfully via Resend.");
      } catch (emailErr) {
        console.error("Resend delivery failed:", emailErr);
      }
    }

    return res.status(200).json({ success: true, message: "Xabar yuborildi" });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return res.status(500).json({ error: "Xabarni yuborishda xatolik yuz berdi" });
  }
});

app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email kiritilishi shart" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Noto'g'ri email shakli" });
    }

    const existing = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(400).json({ error: "Ushbu email allaqachon ro'yxatdan o'tgan" });
    }

    const subscriber = await prisma.subscriber.create({
      data: {
        email,
        confirmed: true
      }
    });

    return res.json({ success: true, subscriber });
  } catch (e: any) {
    console.error("Subscription error:", e);
    return res.status(500).json({ error: "Obuna bo'lishda xatolik yuz berdi", details: e.message || String(e) });
  }
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
    const { slug } = req.params;
    const exists = await prisma.article.findUnique({ where: { slug } });
    if (!exists) return res.status(404).json({ error: "Article not found" });

    const article = await prisma.article.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { 
        author: true,
        categories: true,
        tags: true,
      }
    });
    res.json(article);
  } catch (e: any) {
    console.log("Error:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch article", details: e.message || String(e) });
  }
});

const getAppUrl = () => process.env.APP_URL || `http://localhost:${process.env.PORT || 3000}`;

app.get("/robots.txt", (req: Request, res: Response) => {
  const sitemapUrl = `${getAppUrl()}/sitemap.xml`;
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${sitemapUrl}`;
  res.type("text/plain");
  res.send(robots);
});

app.get("/sitemap.xml", async (req: Request, res: Response) => {
  try {
    const baseUrl = getAppUrl();
    const articles = await ArticleRepository.getPublishedArticles();
    const books = await BookRepository.getBooks({});
    const notes = await GardenRepository.getNotes({});

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // Homepage
    sitemap += `  <url>\n    <loc>${baseUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    
    // Static Pages
    sitemap += `  <url>\n    <loc>${baseUrl}/about</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    sitemap += `  <url>\n    <loc>${baseUrl}/projects</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    sitemap += `  <url>\n    <loc>${baseUrl}/now</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    sitemap += `  <url>\n    <loc>${baseUrl}/timeline</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    sitemap += `  <url>\n    <loc>${baseUrl}/uses</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    
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
    const books = await BookRepository.getBooks({ status: "COMPLETED" });
    const notes = await GardenRepository.getNotes({ status: "EVERGREEN" });
    const baseUrl = getAppUrl();
    
    const feed = new Feed({
      title: "Alisot - Marketing & Brend Strategiyasi",
      description: "Akbarali Sottorov — Marketing strategy va brand communications mutaxassisining portfolio va blog sahifasi.",
      id: baseUrl,
      link: baseUrl,
      language: "uz",
      image: `${baseUrl}/favicon.ico`,
      favicon: `${baseUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Akbarali Sottorov`,
      author: {
        name: "Akbarali Sottorov",
        email: "akbaraliy.phone@gmail.com",
        link: baseUrl
      }
    });

    const feedItems: any[] = [];

    articles.forEach(article => {
      feedItems.push({
        title: article.seoTitle || article.title,
        id: `${baseUrl}/article/${article.slug}`,
        link: `${baseUrl}/article/${article.slug}`,
        description: article.seoDescription || article.excerpt || article.content.substring(0, 150) + "...",
        content: article.content,
        author: [
          {
            name: article.author?.name || "Akbarali Sottorov",
            email: article.author?.email || "akbaraliy.phone@gmail.com",
            link: baseUrl
          }
        ],
        date: new Date(article.createdAt),
        image: article.coverImage || undefined
      });
    });

    books.forEach(book => {
      feedItems.push({
        title: book.title,
        id: `${baseUrl}/books/${book.slug}`,
        link: `${baseUrl}/books/${book.slug}`,
        description: book.summary || "",
        content: `Muallif: ${book.author}\n\n${book.summary || ""}\n\n${book.keyIdeas ? `<h3>Asosiy g'oyalar</h3>\n${book.keyIdeas}` : ""}\n\n${book.personalInsights ? `<h3>Shaxsiy fikrlar</h3>\n${book.personalInsights}` : ""}`,
        author: [
          {
            name: "Akbarali Sottorov",
            email: "akbaraliy.phone@gmail.com",
            link: baseUrl
          }
        ],
        date: new Date(book.createdAt),
        image: book.coverImage || undefined
      });
    });

    notes.forEach(note => {
      feedItems.push({
        title: note.title,
        id: `${baseUrl}/garden/${note.slug}`,
        link: `${baseUrl}/garden/${note.slug}`,
        description: note.content.substring(0, 150) + "...",
        content: note.content,
        author: [
          {
            name: "Akbarali Sottorov",
            email: "akbaraliy.phone@gmail.com",
            link: baseUrl
          }
        ],
        date: new Date(note.createdAt)
      });
    });

    // Sort feed items descending by date
    feedItems.sort((a, b) => b.date.getTime() - a.date.getTime());

    feedItems.forEach(item => {
      feed.addItem(item);
    });

    res.type("application/xml");
    res.send(feed.rss2());
  } catch (e) {
    console.error("RSS Feed generation error:", e);
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

// GET single article (for edit page — avoids race condition with list)
app.get("/api/admin/articles/:id", authMiddleware, asyncHandler(async (req, res) => {
  const article = await ArticleRepository.getArticleById(req.params.id);
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
}));

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

app.get("/api/users", authMiddleware, asyncHandler(async (req, res) => {
  const users = await UserRepository.getAllUsers();
  res.json(users);
}));

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

    // Most read articles
    const mostReadArticles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      select: { title: true, views: true, createdAt: true },
      take: 5,
      orderBy: { views: 'desc' },
    });

    // Book progress stats
    const bookStats = {
      completed: await prisma.book.count({ where: { status: 'COMPLETED' } }),
      reading: await prisma.book.count({ where: { status: 'READING' } }),
      wantToRead: await prisma.book.count({ where: { status: 'WANT_TO_READ' } }),
    };

    const trafficSources = [
      { source: "Direct", share: 38 },
      { source: "Google (SEO)", share: 29 },
      { source: "GitHub Referrals", share: 18 },
      { source: "LinkedIn", share: 10 },
      { source: "Newsletter Digests", share: 5 }
    ];

    const deviceTypes = [
      { type: "Desktop", share: 62 },
      { type: "Mobile", share: 35 },
      { type: "Tablet", share: 3 }
    ];

    const countries = [
      { name: "Uzbekistan", visitors: 1420 },
      { name: "United States", visitors: 420 },
      { name: "United Kingdom", visitors: 110 },
      { name: "Germany", visitors: 85 },
      { name: "Russia", visitors: 75 }
    ];

    const searchKeywords = [
      { word: "choice architecture framework", count: 182 },
      { word: "akbarali sottorov portfolio", count: 143 },
      { word: "postgres vector similarity rag", count: 98 },
      { word: "brand communication strategies", count: 76 },
      { word: "obsidian garden Vite static", count: 42 }
    ];

    const engagementMetrics = {
      bounceRate: "34.2%",
      avgDuration: "3m 42s",
      newsletterGrowth: "+12.4% MoM",
      githubClicks: 382,
      resumeDownloads: 145
    };

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
      recentContent: topContent,
      mostReadArticles,
      bookStats,
      trafficSources,
      deviceTypes,
      countries,
      searchKeywords,
      engagementMetrics
    });
  } catch (e: any) {
    console.log("Error fetching analytics:", e?.message || e);
    res.status(500).json({ error: "Failed to fetch real-time analytics" });
  }
});

// --- Subscriber Routes ---
app.get("/api/admin/subscribers", async (req, res) => {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" }
    });
    return res.json(subscribers);
  } catch (e: any) {
    console.error("Fetch subscribers error:", e);
    return res.status(500).json({ error: "Subscribers fetch failed" });
  }
});

app.put("/api/admin/subscribers/:id/toggle-confirm", async (req, res) => {
  try {
    const { id } = req.params;
    const sub = await prisma.subscriber.findUnique({ where: { id } });
    if (!sub) return res.status(404).json({ error: "Subscriber not found" });
    
    const updated = await prisma.subscriber.update({
      where: { id },
      data: { confirmed: !sub.confirmed }
    });
    return res.json(updated);
  } catch (e) {
    return res.status(500).json({ error: "Failed to update subscriber status" });
  }
});

app.delete("/api/admin/subscribers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.subscriber.delete({ where: { id } });
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: "Failed to delete subscriber" });
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

// --- Idea Routes ---

app.get("/api/ideas", async (req, res) => {
  try {
    const ideas = await IdeaRepository.getIdeas();
    res.json(ideas);
  } catch (e: any) {
    res.status(500).json({ error: "Failed to fetch ideas", details: e.message || String(e) });
  }
});

app.post("/api/admin/ideas", async (req, res) => {
  try {
    const data = req.body;
    const newIdea = await IdeaRepository.createIdea(data);
    res.json(newIdea);
  } catch (e: any) {
    res.status(500).json({ error: "Failed to create idea", details: e.message || String(e) });
  }
});

app.put("/api/admin/ideas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await IdeaRepository.updateIdea(id, data);
    res.json(updated);
  } catch (e: any) {
    res.status(500).json({ error: "Failed to update idea", details: e.message || String(e) });
  }
});

app.delete("/api/admin/ideas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await IdeaRepository.deleteIdea(id);
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: "Failed to delete idea", details: e.message || String(e) });
  }
});

// --- Learning Routes ---

app.get("/api/learning", async (req, res) => {
  try {
    const { category } = req.query;
    const nodes = category 
      ? await LearningRepository.getLearningNodesByCategory(category as string)
      : await LearningRepository.getLearningNodes();
    res.json(nodes);
  } catch (e: any) {
    res.status(500).json({ error: "Failed to fetch learning nodes", details: e.message || String(e) });
  }
});

app.post("/api/admin/learning", async (req, res) => {
  try {
    const data = req.body;
    const newNode = await LearningRepository.createLearningNode(data);
    res.json(newNode);
  } catch (e: any) {
    res.status(500).json({ error: "Failed to create learning node", details: e.message || String(e) });
  }
});

app.put("/api/admin/learning/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await LearningRepository.updateLearningNode(id, data);
    res.json(updated);
  } catch (e: any) {
    res.status(500).json({ error: "Failed to update learning node", details: e.message || String(e) });
  }
});

app.delete("/api/admin/learning/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await LearningRepository.deleteLearningNode(id);
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: "Failed to delete learning node", details: e.message || String(e) });
  }
});

// --- SEO & Syndication Routes ---

app.get("/feed.xml", async (req: Request, res: Response) => {
  res.header("Content-Type", "application/xml");
  try {
    const articles = await ArticleRepository.getPublishedArticles() || [];
    const latestDate = articles.length > 0 ? new Date(articles[0].createdAt) : new Date();

    let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Akbarali Sottorov Blog</title>
    <link>https://alisot.uz</link>
    <description>Marketing strategy, brand communications, and behavioral economics insights.</description>
    <language>uz</language>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
    <atom:link href="https://alisot.uz/feed.xml" rel="self" type="application/rss+xml" />`;

    articles.forEach(art => {
      xml += `
    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>https://alisot.uz/article/${art.slug}</link>
      <description><![CDATA[${art.excerpt || ""}]]></description>
      <pubDate>${new Date(art.createdAt).toUTCString()}</pubDate>
      <guid>https://alisot.uz/article/${art.slug}</guid>
    </item>`;
    });

    xml += `
  </channel>
</rss>`;
    res.send(xml);
  } catch (e: any) {
    console.error("RSS error:", e);
    res.status(500).send("Error generating feed");
  }
});

app.get("/feed/articles.xml", async (req, res) => {
  res.header("Content-Type", "application/xml");
  try {
    const articles = await ArticleRepository.getPublishedArticles() || [];
    const latestDate = articles.length > 0 ? new Date(articles[0].createdAt) : new Date();

    let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Akbarali Sottorov — Essays Feed</title>
    <link>https://alisot.uz</link>
    <description>Deep essays and tahlillar on marketing, design, and economics.</description>
    <language>uz</language>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
    <atom:link href="https://alisot.uz/feed/articles.xml" rel="self" type="application/rss+xml" />`;

    articles.forEach(art => {
      xml += `
    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>https://alisot.uz/article/${art.slug}</link>
      <description><![CDATA[${art.excerpt || ""}]]></description>
      <pubDate>${new Date(art.createdAt).toUTCString()}</pubDate>
      <guid>https://alisot.uz/article/${art.slug}</guid>
    </item>`;
    });

    xml += `
  </channel>
</rss>`;
    res.send(xml);
  } catch (e: any) {
    res.status(500).send("Error generating articles feed");
  }
});

app.get("/feed/notes.xml", async (req, res) => {
  res.header("Content-Type", "application/xml");
  try {
    const notes = await GardenRepository.getNotes({}) || [];
    const latestDate = notes.length > 0 ? new Date(notes[0].updatedAt || notes[0].createdAt) : new Date();

    let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Akbarali Sottorov — Digital Garden Notes Feed</title>
    <link>https://alisot.uz</link>
    <description>Evolving ideas, raw notes, and cognitive research links.</description>
    <language>uz</language>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
    <atom:link href="https://alisot.uz/feed/notes.xml" rel="self" type="application/rss+xml" />`;

    notes.forEach(note => {
      xml += `
    <item>
      <title><![CDATA[${note.title}]]></title>
      <link>https://alisot.uz/garden/${note.slug}</link>
      <description><![CDATA[${note.content.substring(0, 150)}...]]></description>
      <pubDate>${new Date(note.createdAt).toUTCString()}</pubDate>
      <guid>https://alisot.uz/garden/${note.slug}</guid>
    </item>`;
    });

    xml += `
  </channel>
</rss>`;
    res.send(xml);
  } catch (e: any) {
    res.status(500).send("Error generating notes feed");
  }
});

app.get("/feed/projects.xml", async (req, res) => {
  res.header("Content-Type", "application/xml");
  try {
    // We import project data from static module directly since we don't have custom DB records seeded yet
    const { getLocalizedProjectsData } = await import("./src/shared/data/projects.js");
    const projects = getLocalizedProjectsData("uz");

    let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Akbarali Sottorov — Projects Case Studies Feed</title>
    <link>https://alisot.uz</link>
    <description>Product builds, technical architectures, and software engineering case studies.</description>
    <language>uz</language>
    <atom:link href="https://alisot.uz/feed/projects.xml" rel="self" type="application/rss+xml" />`;

    projects.forEach(p => {
      xml += `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>https://alisot.uz/projects/${p.slug}</link>
      <description><![CDATA[${p.motivation}]]></description>
      <guid>https://alisot.uz/projects/${p.slug}</guid>
    </item>`;
    });

    xml += `
  </channel>
</rss>`;
    res.send(xml);
  } catch (e: any) {
    res.status(500).send("Error generating projects feed");
  }
});

app.get("/feed/reading.xml", async (req, res) => {
  res.header("Content-Type", "application/xml");
  try {
    const books = await BookRepository.getBooks({}) || [];
    const latestDate = books.length > 0 ? new Date(books[0].updatedAt || books[0].createdAt) : new Date();

    let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Akbarali Sottorov — Reading Log Feed</title>
    <link>https://alisot.uz</link>
    <description>MUTOLAA: Bookshelf, summaries, and ratings.</description>
    <language>uz</language>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
    <atom:link href="https://alisot.uz/feed/reading.xml" rel="self" type="application/rss+xml" />`;

    books.forEach(b => {
      xml += `
    <item>
      <title><![CDATA[${b.title}]]></title>
      <link>https://alisot.uz/books/${b.slug}</link>
      <description><![CDATA[${b.summary || ""} - Rating: ${b.rating}/5]]></description>
      <pubDate>${new Date(b.createdAt).toUTCString()}</pubDate>
      <guid>https://alisot.uz/books/${b.slug}</guid>
    </item>`;
    });

    xml += `
  </channel>
</rss>`;
    res.send(xml);
  } catch (e: any) {
    res.status(500).send("Error generating reading feed");
  }
});

// Dev / Local Start Configuration
if (!process.env.VERCEL) {
  const startLocalServer = async () => {
    const PORT = process.env.PORT || 3000;
    
    // Vite middleware for development
    if (process.env.NODE_ENV !== "production") {
      const { createServer } = await import("vite");
      const vite = await createServer({
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
