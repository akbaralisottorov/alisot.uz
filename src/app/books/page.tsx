import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { BookOpen, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
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
    <div className="flex-1 w-full max-w-7xl mx-auto py-8 px-6 text-foreground">
      <SEO title="Kutubxona - Alisot" description="Akbarali Sottorovning shaxsiy kutubxonasi va mutolaa qaydlari." />
      
      <div className="flex items-center gap-4 mb-2">
        <BookOpen className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">Kutubxona</h1>
      </div>
      <p className="text-muted-foreground mb-10 max-w-2xl">Men o'qigan, hozirda o'qiyotgan yoki o'qishni rejalashtirgan kitoblar to'plami, shuningdek, shaxsiy mulohazalarim va sevimli iqtiboslarim.</p>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Kitoblar yoki mualliflarni qidirish..." 
            className="pl-10 bg-card border-border/60 text-foreground h-12"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        
        {/* Status Filter */}
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="h-12 bg-card border-border/60">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Holati" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Barcha kitoblar</SelectItem>
              <SelectItem value="READING">Hozir o'qilmoqda</SelectItem>
              <SelectItem value="COMPLETED">Tugatilgan</SelectItem>
              <SelectItem value="WANT_TO_READ">O'qish rejalashtirilgan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-56">
          <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
            <SelectTrigger className="h-12 bg-card border-border/60">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Kategoriya" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Barcha kategoriyalar</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-muted-foreground">Kutubxona yuklanmoqda...</div>
      ) : books.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-card/60 backdrop-blur-sm rounded-2xl border border-border/40 border-dashed">
          Siz tanlagan mezonlarga mos keladigan kitoblar topilmadi.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Link key={book.id} to={`/books/${book.slug}`} className="group flex flex-col bg-card/40 backdrop-blur-sm border border-border/60 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors h-full">
              <div className="aspect-[2/3] w-full bg-input/40 relative overflow-hidden">
                {book.coverImage ? (
                  <img src={book.coverImage} alt={book.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <BookOpen className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  {book.status === "READING" && <Badge className="bg-primary/20 text-primary border-none shadow-sm font-bold backdrop-blur-md">O'qilmoqda</Badge>}
                  {book.status === "COMPLETED" && <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-none shadow-sm font-bold backdrop-blur-md">Tugatilgan</Badge>}
                  {book.rating && (
                    <Badge variant="outline" className="bg-black/50 backdrop-blur-md border-black/10 text-amber-400">
                      ★ {book.rating}/5
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold font-heading text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">{book.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{book.author}</p>
                
                <div className="mt-auto">
                  {book.progress > 0 && book.status === "READING" && (
                    <div className="w-full bg-input/40 rounded-full h-1.5 mb-2 overflow-hidden">
                       <div className="bg-primary h-1.5 rounded-full" style={{ width: `${Math.min(100, Math.max(0, book.progress))}%` }}></div>
                    </div>
                  )}
                  {book.summary ? (
                    <p className="text-xs text-muted-foreground line-clamp-2">{book.summary}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground/60 italic">Hali qaydlar yo'q</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
