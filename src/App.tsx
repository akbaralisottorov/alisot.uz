/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, lazy, Suspense } from "react";
import Layout from "./app/layout";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { PageTransition, ScrollRestoration } from "@/shared/components/animations";
import { AnalyticsProvider } from "@/providers/analytics-provider";
import { ErrorBoundary } from "@/shared/components/error-boundary";

// Lazy-loaded route components
const Page = lazy(() => import("./app/page"));
const AboutPage = lazy(() => import("./app/about/page"));
const UsesPage = lazy(() => import("./app/uses/page"));
const AdminDashboard = lazy(() => import("./app/admin/page"));
const ArticlePage = lazy(() => import("./app/article/ArticlePage"));
const BooksPage = lazy(() => import("./app/books/page"));
const BookPage = lazy(() => import("./app/books/BookPage"));
const GardenPage = lazy(() => import("./app/garden/page"));
const GardenNotePage = lazy(() => import("./app/garden/GardenNotePage"));
const ProjectsPage = lazy(() => import("./app/projects/page"));
const ProjectPage = lazy(() => import("./app/projects/ProjectPage"));
const WritingPage = lazy(() => import("./app/writing/page"));
const NowPage = lazy(() => import("./app/now/page"));
const TimelinePage = lazy(() => import("./app/timeline/page"));
const LearningPage = lazy(() => import("./app/learning/page"));
const IdeasPage = lazy(() => import("./app/ideas/page"));
const TagPage = lazy(() => import("./app/tags/TagPage"));
const CategoryPage = lazy(() => import("./app/categories/CategoryPage"));
const NewsletterPage = lazy(() => import("./app/newsletter/page"));
const NotFoundPage = lazy(() => import("@/shared/components/not-found").then(module => ({ default: module.NotFoundPage })));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-muted-foreground bg-background">Yuklanmoqda...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Base routes */}
          <Route path="/" element={<PageTransition><Page /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/uses" element={<PageTransition><UsesPage /></PageTransition>} />
          <Route path="/article/:slug" element={<PageTransition><ArticlePage /></PageTransition>} />
          <Route path="/books" element={<PageTransition><BooksPage /></PageTransition>} />
          <Route path="/books/:slug" element={<PageTransition><BookPage /></PageTransition>} />
          <Route path="/garden" element={<PageTransition><GardenPage /></PageTransition>} />
          <Route path="/garden/:slug" element={<PageTransition><GardenNotePage /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/projects/:slug" element={<PageTransition><ProjectPage /></PageTransition>} />
          <Route path="/writing" element={<PageTransition><WritingPage /></PageTransition>} />
          <Route path="/now" element={<PageTransition><NowPage /></PageTransition>} />
          <Route path="/timeline" element={<PageTransition><TimelinePage /></PageTransition>} />
          <Route path="/learning" element={<PageTransition><LearningPage /></PageTransition>} />
          <Route path="/ideas" element={<PageTransition><IdeasPage /></PageTransition>} />
          <Route path="/tags/:name" element={<PageTransition><TagPage /></PageTransition>} />
          <Route path="/categories/:name" element={<PageTransition><CategoryPage /></PageTransition>} />
          <Route path="/newsletter" element={<PageTransition><NewsletterPage /></PageTransition>} />

          {/* Localized routes */}
          <Route path="/:lang" element={<PageTransition><Page /></PageTransition>} />
          <Route path="/:lang/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/:lang/uses" element={<PageTransition><UsesPage /></PageTransition>} />
          <Route path="/:lang/article/:slug" element={<PageTransition><ArticlePage /></PageTransition>} />
          <Route path="/:lang/books" element={<PageTransition><BooksPage /></PageTransition>} />
          <Route path="/:lang/books/:slug" element={<PageTransition><BookPage /></PageTransition>} />
          <Route path="/:lang/garden" element={<PageTransition><GardenPage /></PageTransition>} />
          <Route path="/:lang/garden/:slug" element={<PageTransition><GardenNotePage /></PageTransition>} />
          <Route path="/:lang/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/:lang/projects/:slug" element={<PageTransition><ProjectPage /></PageTransition>} />
          <Route path="/:lang/writing" element={<PageTransition><WritingPage /></PageTransition>} />
          <Route path="/:lang/now" element={<PageTransition><NowPage /></PageTransition>} />
          <Route path="/:lang/timeline" element={<PageTransition><TimelinePage /></PageTransition>} />
          <Route path="/:lang/learning" element={<PageTransition><LearningPage /></PageTransition>} />
          <Route path="/:lang/ideas" element={<PageTransition><IdeasPage /></PageTransition>} />
          <Route path="/:lang/tags/:name" element={<PageTransition><TagPage /></PageTransition>} />
          <Route path="/:lang/categories/:name" element={<PageTransition><CategoryPage /></PageTransition>} />
          <Route path="/:lang/newsletter" element={<PageTransition><NewsletterPage /></PageTransition>} />

          {/* Admin routes */}
          <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="/admin/articles/new" element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="/admin/articles/:id/edit" element={<PageTransition><AdminDashboard /></PageTransition>} />

          {/* Fallback route */}
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <ErrorBoundary>
      <div className="cursor-glow" ref={cursorRef} />
      <BrowserRouter>
        <ScrollRestoration />
        <AnalyticsProvider>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </AnalyticsProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
