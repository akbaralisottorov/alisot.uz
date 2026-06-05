/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, lazy, Suspense } from "react";
import Layout from "./app/layout";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { PageTransition } from "./components/animations";
import { AnalyticsProvider } from "./components/analytics-provider";

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

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-muted-foreground bg-background">Yuklanmoqda...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} {...{ key: location.pathname } as any}>
          <Route path="/" element={<PageTransition><Page /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/uses" element={<PageTransition><UsesPage /></PageTransition>} />
          <Route path="/article/:slug" element={<PageTransition><ArticlePage /></PageTransition>} />
          <Route path="/books" element={<PageTransition><BooksPage /></PageTransition>} />
          <Route path="/books/:slug" element={<PageTransition><BookPage /></PageTransition>} />
          <Route path="/garden" element={<PageTransition><GardenPage /></PageTransition>} />
          <Route path="/garden/:slug" element={<PageTransition><GardenNotePage /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="/admin/articles/new" element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="/admin/articles/:id/edit" element={<PageTransition><AdminDashboard /></PageTransition>} />
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
    <>
      <div className="cursor-glow" ref={cursorRef} />
      <BrowserRouter>
        <AnalyticsProvider>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </AnalyticsProvider>
      </BrowserRouter>
    </>
  );
}

