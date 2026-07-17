import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { Sprout, Search, Filter, Leaf, LayoutGrid, Network } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { GardenGraph } from "@/features/garden/garden-graph";
import { FadeIn } from "@/shared/components/animations";
import { GardenNote } from "@/shared/types";

export default function GardenPage() {
  const [notes, setNotes] = useState<GardenNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "graph">("grid");
  
  const searchInput = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "ALL";

  useEffect(() => {
    let url = "/api/garden?";
    if (searchInput) url += `search=${encodeURIComponent(searchInput)}&`;
    if (statusFilter && statusFilter !== "ALL") url += `status=${encodeURIComponent(statusFilter)}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotes(data);
        } else {
          setNotes([]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchInput, statusFilter]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SEEDLING": return "text-gold border-gold/30 bg-gold/5";
      case "INCUBATOR": return "text-secondary border-secondary/30 bg-secondary/5";
      case "EVERGREEN": return "text-success border-success/30 bg-success/5";
      default: return "text-muted border-border bg-background";
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "SEEDLING") return <Sprout className="w-4 h-4 text-gold" />;
    return <Leaf className="w-4 h-4 text-secondary" />;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "SEEDLING": return "Yangi g'oya — hali rivojlanmoqda";
      case "INCUBATOR": return "O'sib bormoqda — regularly update";
      case "EVERGREEN": return "Pishgan fikr — barqaror";
      default: return status;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-12 px-6 md:px-12 text-left selection:bg-gold/25 selection:text-foreground">
      <SEO title="Raqamli Bog' - Akbarali Sottorov" description="Akbarali Sottorovning raqamli bog'i — g'oyalar, tushunchalar va fikrlar to'plami." />
      
      {/* Header and Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <FadeIn className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold uppercase tracking-widest w-max">
            <Leaf className="w-4 h-4" />
            <span>Digital Garden</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-[54px] leading-tight text-foreground">Raqamli Bog'</h1>
          <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed">
            Bu mening raqamli bog'im — g'oyalar, tushunchalar, mutolaa qaydlari va fikrlarning tirik va o'sib boruvchi to'plami.
          </p>
        </FadeIn>
        
        {/* Toggle Mode */}
        <FadeIn delay={0.1} className="flex items-center gap-2 p-1 bg-white dark:bg-card rounded-[14px] border border-border w-fit shadow-sm">
          <button 
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-[10px] font-semibold text-xs transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Grid
          </button>
          <button 
            onClick={() => setViewMode("graph")}
            className={`flex items-center gap-2 px-4 py-2 rounded-[10px] font-semibold text-xs transition-all cursor-pointer ${viewMode === 'graph' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Network className="w-3.5 h-3.5" /> Grafik
          </button>
        </FadeIn>
      </div>

      {/* Filters and Search */}
      <FadeIn delay={0.1} className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input 
            placeholder="Qaydlarni qidirish..." 
            className="pl-12 bg-white dark:bg-card border-border hover:border-gold/40 focus-ring h-12 rounded-[16px] text-sm"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        <div className="w-full md:w-56">
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="h-12 bg-white dark:bg-card border-border rounded-[16px] text-sm focus-ring">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted" />
                <SelectValue placeholder="Holati" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-card border border-border rounded-[16px]">
              <SelectItem value="ALL">Barcha qaydlar</SelectItem>
              <SelectItem value="SEEDLING">Seedling (Yangi g'oya)</SelectItem>
              <SelectItem value="INCUBATOR">Incubator (O'sib bormoqda)</SelectItem>
              <SelectItem value="EVERGREEN">Evergreen (Pishgan fikr)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FadeIn>

      {/* Main Content Grid/Graph */}
      {loading ? (
        <div className="flex justify-center py-20 text-muted-foreground font-medium">Raqamli bog' yuklanmoqda...</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-white dark:bg-card border border-border border-dashed rounded-[24px] shadow-sm">
          Raqamli bog'da siz tanlagan mezonlarga mos keladigan qaydlar topilmadi.
        </div>
      ) : (
        <FadeIn delay={0.2}>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
              {notes.map((note) => (
                <Link 
                  key={note.id} 
                  to={`/garden/${note.slug}`} 
                  className="group flex flex-col bg-white dark:bg-card border border-border p-8 rounded-[24px] hover:border-gold hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 h-full text-left focus-ring"
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(note.status)}`}>
                      {getStatusIcon(note.status)}
                      <span className="uppercase tracking-widest">
                        {note.status === "SEEDLING" ? "Seedling" : note.status === "INCUBATOR" ? "Incubator" : "Evergreen"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground/60">{new Date(note.updatedAt).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="font-heading font-extrabold text-[22px] text-foreground group-hover:text-gold transition-colors mb-1.5 leading-snug">
                    {note.title}
                  </h3>
                  
                  <p className="text-[11px] text-muted font-semibold italic mb-4">
                    {getStatusLabel(note.status)}
                  </p>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {note.content.substring(0, 150)}{note.content.length > 150 ? "..." : ""}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-border/50 flex gap-2 flex-wrap">
                    {(note.tags ? note.tags.split(",") : []).map((tag: string) => tag.trim() && (
                      <span key={tag} className="text-[11px] font-semibold text-muted bg-background border border-border/80 px-2.5 py-1 rounded-lg">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <GardenGraph notes={notes} />
          )}
        </FadeIn>
      )}
    </div>
  );
}
