import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Sprout, Search, Filter, Leaf, LayoutGrid, Network } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GardenGraph } from "@/components/garden-graph";

export default function GardenPage() {
  const [notes, setNotes] = useState<any[]>([]);
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
      case "SEEDLING": return "text-amber-500 border-amber-500/30 bg-amber-500/10";
      case "INCUBATOR": return "text-blue-500 border-blue-500/30 bg-blue-500/10";
      case "EVERGREEN": return "text-emerald-500 border-emerald-500/30 bg-emerald-500/10";
      default: return "text-slate-400 border-slate-750 bg-slate-800";
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "SEEDLING") return <Sprout className="w-4 h-4" />;
    return <Leaf className="w-4 h-4" />;
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
    <div className="flex-1 w-full max-w-7xl mx-auto py-8 px-6 text-foreground">
      <SEO title="Raqamli Bog' - Alisot" description="Akbarali Sottorovning raqamli bog'i — g'oyalar, tushunchalar va fikrlar to'plami." />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Leaf className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold font-heading text-foreground">Raqamli Bog'</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">Bu mening raqamli bog'im — g'oyalar, tushunchalar va fikrlarning tirik to'plami.</p>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-input/50 rounded-xl border border-border/40 w-fit backdrop-blur-sm">
          <button 
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${viewMode === 'grid' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <LayoutGrid className="w-4 h-4" /> Grid
          </button>
          <button 
            onClick={() => setViewMode("graph")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${viewMode === 'graph' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Network className="w-4 h-4" /> Grafik
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Qaydlarni qidirish..." 
            className="pl-10 bg-card/50 border-border/60 h-12"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        <div className="w-full md:w-56">
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="h-12 bg-card/50 border-border/60">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Holati" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Barcha qaydlar</SelectItem>
              <SelectItem value="SEEDLING">Seedling (Yangi g'oya)</SelectItem>
              <SelectItem value="INCUBATOR">Incubator (O'sib bormoqda)</SelectItem>
              <SelectItem value="EVERGREEN">Evergreen (Pishgan fikr)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-muted-foreground">Raqamli bog' yuklanmoqda...</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-card/20 rounded-2xl border border-border/40 border-dashed backdrop-blur-sm">
          Raqamli bog'da siz tanlagan mezonlarga mos keladigan qaydlar topilmadi.
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <Link key={note.id} to={`/garden/${note.slug}`} className="group flex flex-col bg-card/60 border border-border/60 p-6 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors h-full backdrop-blur-md">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(note.status)}`}>
                      {getStatusIcon(note.status)}
                      <span className="uppercase tracking-widest">
                        {note.status === "SEEDLING" ? "Seedling" : note.status === "INCUBATOR" ? "Incubator" : "Evergreen"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(note.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-1">{note.title}</h3>
                  <p className="text-xs text-primary mb-4 italic font-sans">{getStatusLabel(note.status)}</p>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{note.content.substring(0, 150)}{note.content.length > 150 ? "..." : ""}</p>
                  
                  <div className="mt-auto pt-4 flex gap-2 flex-wrap">
                    {(note.tags ? note.tags.split(",") : []).map((tag: string) => tag.trim() && (
                      <span key={tag} className="text-xs text-muted-foreground bg-background/50 px-3 py-1 rounded-xl border border-border/40">#{tag.trim()}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <GardenGraph notes={notes} />
          )}
        </>
      )}
    </div>
  );
}
