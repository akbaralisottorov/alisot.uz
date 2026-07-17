import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { Search, Filter, BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { Article } from "@/shared/types";
import { api } from "@/shared/lib/api";

export default function WritingPage() {
  const { t, langPrefix, currentLang } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchInput = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "ALL";

  useEffect(() => {
    setLoading(true);
    api.get<Article[]>("/api/articles")
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    articles.forEach(art => {
      if (art.category) cats.add(art.category);
      if (art.categories) {
        art.categories.forEach(c => cats.add(c.name));
      }
    });
    return Array.from(cats);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesSearch = 
        art.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchInput.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === "ALL" ||
        art.category === categoryFilter ||
        art.categories?.some(c => c.name === categoryFilter);

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchInput, categoryFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set("search", val);
    else newParams.delete("search");
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
      <SEO 
        title={currentLang === "uz" ? "Maqolalar va Tahlillar — Akbarali Sottorov" : currentLang === "en" ? "Articles & Essays — Akbarali Sottorov" : "Статьи и Эссе — Акбарали Сотторов"} 
        description={currentLang === "uz" ? "Brend strategiyasi, xulq-atvor iqtisodiyoti va brend kommunikatsiyalari bo'yicha tahliliy maqolalar." : "Analytical articles on brand strategy, behavioral economics, and brand communications."} 
      />
      
      {/* Header */}
      <FadeIn className="space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold uppercase tracking-widest w-max">
          <BookOpen className="w-4 h-4" />
          <span>{currentLang === "uz" ? "Yozma Ishlar" : currentLang === "en" ? "WRITING & ESSAYS" : "СТАТЬИ И ПУБЛИКАЦИИ"}</span>
        </div>
        <h1 className="font-heading font-extrabold text-4xl md:text-[54px] leading-tight text-foreground">
          {currentLang === "uz" ? "Maqolalar & Tahlillar" : currentLang === "en" ? "Articles & Essays" : "Статьи & Аналитика"}
        </h1>
        <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed">
          {currentLang === "uz" 
            ? "Marketing strategiyasi, iste'molchilarning tanlov arxitekturasi hamda xulq-atvor iqtisodiyoti mavzusidagi tahlillar."
            : currentLang === "en"
            ? "Deep dives and research essays focusing on choice architecture, brand positioning, and consumer decision psychology."
            : "Глубокие исследования и статьи, посвященные архитектуре выбора, позиционированию брендов и психологии потребителей."}
        </p>
      </FadeIn>

      {/* Filters and Search */}
      <FadeIn delay={0.1} className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input 
            placeholder={currentLang === "uz" ? "Maqolalarni qidirish..." : currentLang === "en" ? "Search articles..." : "Поиск статей..."}
            className="pl-12 bg-white dark:bg-card border-border hover:border-gold/40 focus-ring h-12 rounded-[16px] text-sm"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        
        {/* Category Filter */}
        <div className="w-full md:w-64">
          <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
            <SelectTrigger className="h-12 bg-white dark:bg-card border-border rounded-[16px] text-sm focus-ring">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted" />
                <SelectValue placeholder={currentLang === "uz" ? "Kategoriya" : currentLang === "en" ? "Category" : "Категория"} />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-card border border-border rounded-[16px]">
              <SelectItem value="ALL">{currentLang === "uz" ? "Barcha ruknlar" : currentLang === "en" ? "All Categories" : "Все рубрики"}</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FadeIn>

      {loading ? (
        <div className="flex justify-center py-20 text-muted-foreground font-medium">
          {currentLang === "uz" ? "Maqolalar yuklanmoqda..." : currentLang === "en" ? "Loading essays..." : "Загрузка публикаций..."}
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-white dark:bg-card border border-border border-dashed rounded-[24px]">
          {currentLang === "uz" ? "Mos keladigan maqolalar topilmadi." : currentLang === "en" ? "No articles matched your criteria." : "Публикации не найдены."}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
          {filteredArticles.map((art) => (
            <StaggerItem key={art.id}>
              <Link 
                to={`${langPrefix}/article/${art.slug}`} 
                className="group flex flex-col bg-white dark:bg-card border border-border rounded-[24px] overflow-hidden hover:border-gold hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 h-full p-8 text-left focus-ring"
              >
                <div className="flex justify-between items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-1 rounded">
                    {art.category || "General"}
                  </span>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(art.createdAt).toLocaleDateString(currentLang === "en" ? "en-US" : "uz-UZ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {(() => {
                        const cleanText = art.content.replace(/<\/?[^>]+(>|$)/g, "");
                        const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
                        return `${Math.ceil(words / 200)} daqiqa`;
                      })()}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading font-extrabold text-[22px] text-foreground leading-snug group-hover:text-gold transition-colors mb-3">
                  {art.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {art.excerpt}
                </p>
                
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center gap-1 mt-auto pt-4 border-t border-border/50">
                  {currentLang === "uz" ? "Maqolani o'qish" : currentLang === "en" ? "Read Article" : "Читать статью"}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
