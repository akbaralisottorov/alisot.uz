# alisot.uz — Personal Portfolio & Digital Workspace

A production-ready, highly optimized personal website and digital portfolio designed and built for **Akbarali Sottorov** (Brand Strategy, Marketing, and Behavioral Economics specialist). 

This project is built using a modern full-stack architecture featuring **React + Vite (Frontend)**, **Express (Backend Server)**, **Prisma ORM + PostgreSQL (Database)**, and fully refactored to align with the **Feature-Sliced Design (FSD)** methodology.

---

## 🌟 Key Features & Engineering Highlights

- **📐 Feature-Sliced Design (FSD)**: Restructured code base dividing layers cleanly into `app`, `providers`, `widgets`, `features`, and `shared` to scale features independently.
- **🌐 Lightweight Multi-Language (i18n)**: Custom hook-based translation system supporting English, Russian, and Uzbek, without third-party i18n overhead.
- **🧠 AI Semantic Search**: Fully integrated search engine utilizing OpenAI embeddings to compute cosine similarity against articles, books, and digital garden nodes.
- **🌱 Interactive Digital Garden**: Linked ideas, concepts, and notes modeled in a graphical network visualized with `d3` force-directed simulations.
- **📚 Personal Library Shelf**: Interactive tracking of read and currently reading books, complete with summaries, ratings, and favorite quotes.
- **📊 Real-time Workspace Analytics**: Dashboard tracking KPIs, published contents trends, reading progresses, and security logs.
- **🔒 Advanced Security & Captcha Protection**: Custom session handling using lightweight JWT tokens, Math-based captcha challenge, and automated security audit logs for admin actions.

---

## 📁 Repository Directory Structure (FSD)

```text
├── prisma/                  # Prisma Database schema and seed data
├── src/
│   ├── app/                 # Routing, page layouts, and page entry views
│   │   ├── layout.tsx       # Global layout containing Navigation, Footer
│   │   ├── page.tsx         # Modular home page rendering widget layers
│   │   └── ...              # Sub-pages: /about, /books, /garden, /uses, /admin
│   ├── providers/           # App-wide contexts (Theme, Analytics)
│   ├── widgets/             # Large page layout components (Hero, Contact, Projects)
│   ├── features/            # Interactive user actions (SubscribeForm, SemanticSearch, RichEditor)
│   ├── shared/              # Reusable UI, hooks, constants, utils, and lib wrappers
│   │   ├── components/      # UI components (animations, mode-toggle, SEO)
│   │   ├── ui/              # Base UI components (Button, Input, Badge, Table)
│   │   ├── lib/             # Shared library wrappers (Prisma client, i18n, OpenAI helper)
│   │   ├── hooks/           # Reusable react hooks (useReadingProgress, useHomeData)
│   │   ├── config/          # Central configuration settings (site metadata, analytics)
│   │   └── styles/          # Tailwind/CSS global configuration sheets
│   ├── tests/               # Unit and integration test suites
│   ├── App.tsx              # App router entry point and global Error Boundary wrapper
│   └── main.tsx             # Vite mount entry point
├── server.ts                # Express backend application server (API endpoints)
├── vercel.json              # Serverless configuration for deployment
└── package.json             # Core dependency packages and execution scripts
```

---

## ⚙️ Environment Variables (`.env`)

Configure the following environment variables in your `.env` file:

```env
# Database
DATABASE_URL="postgresql://username:password@ep-host.region.neon.tech/neondb?sslmode=require"

# Third-party Integrations
OPENAI_API_KEY="sk-proj-..."
GEMINI_API_KEY="AIzaSy..."

# Authentication & Admin
ADMIN_PASSWORD="your-secure-admin-password"
ADMIN_EMAIL="admin@alisot.uz"
APP_URL="http://localhost:3000"

# Analytics (Optional)
VITE_GA_TRACKING_ID="G-..."
VITE_POSTHOG_KEY="phc_..."
VITE_POSTHOG_HOST="https://us.i.posthog.com"
VITE_PLAUSIBLE_DOMAIN="alisot.uz"
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: v18 or higher
- **PostgreSQL Database** (e.g. Docker container or a free [Neon.tech](https://neon.tech) cloud database)

### Installation Steps

1. **Clone the repository** and install dependencies:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory by copying the template:
   ```bash
   cp .env.example .env
   ```

3. **Push Prisma Schema & Seed Database**:
   Push the schema to your local/cloud PostgreSQL instance and seed the initial categories and books:
   ```bash
   npx prisma db push
   ```
   *Note: In local mode, you can also run the seed script to create initial data:*
   ```bash
   npx prisma db seed
   ```

4. **Run the developer environment**:
   ```bash
   npm run dev
   ```
   Your app will be running locally at [http://localhost:3000](http://localhost:3000).

---

## 🧪 Verification & Checks

The codebase is fully equipped with strict linting and unit tests to prevent regressions.

- **Typescript Compilation & Linting**:
  ```bash
  npm run lint
  ```
- **Run Unit Tests**:
  ```bash
  npm run test
  ```
- **Production Build Check**:
  ```bash
  npm run build
  ```

---

## 🌐 Production Deployment Guide

The application is fully pre-configured for a serverless runtime on **Vercel** and database hosting on **Neon**.

### Step 1: Connect Database on Neon
1. Create a database project on [Neon.tech](https://neon.tech).
2. Copy the **Connection String** with SSL required.
3. Replace the `DATABASE_URL` in your `.env` and Vercel dashboard.

### Step 2: Deploy to Vercel
The Express server compiles into a serverless function via `vercel.json` and imports everything cleanly.
1. Connect your repository to **Vercel**.
2. Add all env parameters listed in the `.env` section to **Vercel Settings > Environment Variables**.
3. Trigger a deployment. Vercel will automatically generate the Prisma Client, compile the React assets, and deploy the backend functions.

### Step 3: Run Seed on Production Database
Run database initialization from your local machine to populate the live database:
```bash
# Push schema structure
npx prisma db push

# Seed categories, initial admin user, and data
npx prisma db seed
```