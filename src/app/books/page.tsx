import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { BookOpen, Search, Filter, Star } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Badge } from "@/shared/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { Book, BookCategory } from "@/shared/types";

export default function BooksPage() {
  const { t, langPrefix } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchInput = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "ALL";
  const categoryFilter = searchParams.get("category") || "ALL";

  useEffect(() => {
    fetch("/api/book-categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    let url = "/api/books?";
    if (searchInput) url += `search=${encodeURIComponent(searchInput)}&`;
    if (statusFilter && statusFilter !== "ALL") url += `status=${encodeURIComponent(statusFilter)}&`;
    if (categoryFilter && categoryFilter !== "ALL") url += `category=${encodeURIComponent(categoryFilter)}&`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          setBooks([]);
        }
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [searchInput, statusFilter, categoryFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set("search", val);
    else newParams.delete("search");
    setSearchParams(newParams);
  };

  const handleStatusFilter = (val: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (val !== "ALL") newParams.set("status", val);
    else newParams.delete("status");
    setSearchParams(newParams);
  };

  const handleCategoryFilter = (val: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (val !== "ALL") newParams.set("category", val);
    else newParams.delete("category");
    setSearchParams(newParams);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-12 px-6 md:px-12 text-left selection:bg-gold/25 selection:text-foreground">
      <SEO title={`${t("nav.library")} - Akbarali Sottorov`} description={t("libraryPage.desc")} />
      
      {/* Header */}
      <FadeIn className="space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold uppercase tracking-widest w-max">
          <BookOpen className="w-4 h-4" />
          <span>{t("libraryPage.badge")}</span>
        </div>
        <h1 className="font-heading font-extrabold text-4xl md:text-[54px] leading-tight text-foreground">
          {t("libraryPage.title")}
        </h1>
        <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed">
          {t("libraryPage.desc")}
        </p>
      </FadeIn>

      {/* Filters and Search */}
      <FadeIn delay={0.1} className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input 
            placeholder={t("library.search")}
            className="pl-12 bg-white dark:bg-card border-border hover:border-gold/40 focus-ring h-12 rounded-[16px] text-sm"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        
        {/* Status Filter */}
        <div className="w-full md:w-52">
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="h-12 bg-white dark:bg-card border-border rounded-[16px] text-sm focus-ring">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted" />
                <SelectValue placeholder={t("currently.status")} />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-card border border-border rounded-[16px]">
              <SelectItem value="ALL">{t("library.status_all")}</SelectItem>
              <SelectItem value="READING">{t("library.status_reading")}</SelectItem>
              <SelectItem value="COMPLETED">{t("library.status_completed")}</SelectItem>
              <SelectItem value="WANT_TO_READ">{t("library.status_planned")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-56">
          <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
            <SelectTrigger className="h-12 bg-white dark:bg-card border-border rounded-[16px] text-sm focus-ring">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted" />
                <SelectValue placeholder="Kategoriya" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-card border border-border rounded-[16px]">
              <SelectItem value="ALL">{t("library.cat_all")}</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FadeIn>

      {loading ? (
        <div className="flex justify-center py-20 text-muted-foreground font-medium">{t("library.loading")}</div>
      ) : books.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-white dark:bg-card border border-border border-dashed rounded-[24px]">
          {t("library.empty")}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {books.map((book) => (
            <StaggerItem key={book.id}>
              <Link 
                to={`${langPrefix}/books/${book.slug}`} 
                className="group flex flex-col bg-white dark:bg-card border border-border rounded-[24px] overflow-hidden hover:border-gold hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 h-full p-6 text-left focus-ring"
              >
                <div className="aspect-[2/3] w-full bg-background rounded-[16px] overflow-hidden border border-border relative p-1 bg-white">
                  {book.coverImage ? (
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      loading="lazy" 
                      className="w-full h-full object-cover rounded-lg group-hover:scale-[1.01] transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}
                  
                  {/* Floating badge details */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {book.status === "READING" && (
                      <Badge className="bg-gold text-white border-none shadow-sm font-bold text-[10px] tracking-widest uppercase">
                        {t("library.status_reading")}
                      </Badge>
                    )}
                    {book.status === "COMPLETED" && (
                      <Badge className="bg-success text-white border-none shadow-sm font-bold text-[10px] tracking-widest uppercase">
                        {t("library.status_completed")}
                      </Badge>
                    )}
                  </div>

                  {book.rating && (
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-gold text-[11px] font-bold flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{book.rating}/5</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-[20px] text-foreground leading-snug group-hover:text-gold transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 font-sans">{t("library.by")} {book.author}</p>
                    
                    {book.summary && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                        {book.summary}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-auto pt-3 border-t border-border/50">
                    {book.status === "READING" && book.progress > 0 && (
                      <div className="w-full">
                        <div className="flex justify-between text-[10px] text-muted font-bold tracking-wider uppercase mb-1">
                          <span>{t("library.progress")}</span>
                          <span className="text-gold">{book.progress}%</span>
                        </div>
                        <div className="w-full bg-background border border-border h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gold h-full rounded-full" style={{ width: `${book.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                    {book.status !== "READING" && (
                      <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-muted-foreground uppercase group-hover:text-gold transition-colors">
                        <span>{t("library.read_notes")}</span>
                        <span>&rarr;</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
