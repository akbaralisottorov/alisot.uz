import { useState, useEffect } from "react";
import { API_ROUTES } from "@/shared/constants";
import { Article, Book } from "@/shared/types";

export type { Article, Book };

export function useHomeData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const [articlesRes, booksRes] = await Promise.all([
          fetch(API_ROUTES.articles),
          fetch(API_ROUTES.books),
        ]);

        if (!active) return;

        if (!articlesRes.ok || !booksRes.ok) {
          throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
        }

        const articlesData = await articlesRes.json();
        const booksData = await booksRes.json();

        if (active) {
          if (Array.isArray(articlesData)) {
            setArticles(articlesData);
          }
          if (Array.isArray(booksData)) {
            setBooks(booksData);
          }
        }
      } catch (err: any) {
        if (active) {
          setError(err.message || "Tizimda xatolik");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  return { articles, books, loading, error };
}
