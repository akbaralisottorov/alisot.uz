import { useState, useEffect } from "react";
import { SEO } from "@/shared/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { Idea } from "@/shared/types";
import { Lightbulb, Calendar, ArrowRight, ShieldAlert, Zap, Layers } from "lucide-react";

export default function IdeasPage() {
  const { t, currentLang } = useTranslation();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const defaultIdeas: Idea[] = [
    {
      id: "i1",
      title: "Cognitive Marketing Optimizer (SaaS)",
      slug: "cognitive-marketing-optimizer",
      content: "An automated web landing page analyzer that crawls visual layouts and text to flag violations of consumer choice architecture principles (e.g., choice overload, poor anchor pricing, lack of System 1 cues).",
      status: "ACTIVE",
      priority: "HIGH",
      tags: "Marketing, AI, SaaS",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "i2",
      title: "Freelance Tax Autotiler (Mobile App)",
      slug: "freelance-tax-autotiler",
      content: "A mobile banking-connected service in Central Asia that automatically splits incoming payments into tax brackets and auto-submits monthly returns, expanding the Tax Helper AI concept.",
      status: "DRAFT",
      priority: "HIGH",
      tags: "Fintech, Mobile, Automation",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "i3",
      title: "Digital Garden Graph Publisher (Plugin)",
      slug: "digital-garden-graph-publisher",
      content: "An Obsidian/MD-compatible exporter that compiles interlinked vaults into styled, interactive d3.js nodes directly optimized for Vite static pages with custom SEO tags.",
      status: "DRAFT",
      priority: "MEDIUM",
      tags: "Developer Tools, Knowledge Management",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "i4",
      title: "Behavioral Economics Research Database",
      slug: "behavioral-economics-research-db",
      content: "A public, indexed directory of consumer psychology research studies, fully mapped to marketing design patterns (e.g., social proof, scarcity overlays).",
      status: "COMPLETED",
      priority: "LOW",
      tags: "Academic, Database, Psychology",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetch("/api/ideas")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setIdeas(data);
        } else {
          setIdeas(defaultIdeas);
        }
      })
      .catch(() => setIdeas(defaultIdeas))
      .finally(() => setLoading(false));
  }, []);

  const filteredIdeas = activeFilter === "all"
    ? ideas
    : ideas.filter((idea) => idea.status === activeFilter);

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "MEDIUM":
        return "bg-gold/15 text-gold border-gold/25";
      default:
        return "bg-muted/15 text-muted-foreground border-border/80";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-success/15 text-success border-success/20";
      case "COMPLETED":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted/15 text-muted-foreground border-border/80";
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto py-16 px-6 md:px-12 flex flex-col gap-12 selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`${currentLang === "uz" ? "G'oyalar" : currentLang === "en" ? "Ideas Box" : "Идеи"} — Akbarali Sottorov`} 
        description="A list of active product concepts, startup drafts, and software experiments."
      />

      {/* Header */}
      <FadeIn>
        <div className="flex flex-col gap-4 border-b border-border/60 pb-8 text-left">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold block">
            {currentLang === "uz" ? "LOJHALAR VA EKSPERIMENTLAR" : currentLang === "en" ? "IDEAS & EXPERIMENTS" : "ИДЕИ И ЭКСПЕРИМЕНТЫ"}
          </span>
          <h1 className="font-heading text-4xl md:text-[52px] leading-none text-foreground font-extrabold flex items-center gap-2">
            {currentLang === "uz" ? "G'oyalar Qutisi" : currentLang === "en" ? "Ideas Box" : "Ящик идей"}
            <Lightbulb className="w-8 h-8 text-gold" />
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed mt-2 max-w-[650px]">
            {currentLang === "uz"
              ? "Startap g'oyalar, kichik mahsulot chizmalari, UI eksperimentlari va kelgusidagi loyihalarim ombori."
              : currentLang === "en"
              ? "A public log of startup concepts, software features, behavioral hacks, and visual experiments I dream up."
              : "Открытый список концепций стартапов, фич, поведенческих трюков и визуальных экспериментов."}
          </p>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 justify-start">
          {[
            { label: currentLang === "uz" ? "Barchasi" : currentLang === "en" ? "All" : "Все", value: "all" },
            { label: currentLang === "uz" ? "Aktiv" : currentLang === "en" ? "Active" : "Активные", value: "ACTIVE" },
            { label: currentLang === "uz" ? "Qoralama" : currentLang === "en" ? "Draft" : "Черновики", value: "DRAFT" },
            { label: currentLang === "uz" ? "Bajarilgan" : currentLang === "en" ? "Done" : "Готово", value: "COMPLETED" }
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                activeFilter === f.value
                  ? "bg-gold border-gold text-white"
                  : "bg-white dark:bg-card border-border hover:border-gold/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Grid */}
      {loading ? (
        <div className="text-center text-muted py-12">Yuklanmoqda...</div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {filteredIdeas.map((idea) => (
            <StaggerItem key={idea.id}>
              <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-8 flex flex-col justify-between h-full group hover:border-gold/30 hover:shadow-sm transition-all duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-4 justify-between">
                    <span className={`px-2.5 py-0.5 border text-[9px] font-extrabold uppercase tracking-widest rounded-md ${getStatusStyle(idea.status)}`}>
                      {idea.status}
                    </span>
                    <span className={`px-2.5 py-0.5 border text-[9px] font-extrabold uppercase tracking-widest rounded-md ${getPriorityStyle(idea.priority)}`}>
                      {idea.priority} Priority
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                    {idea.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {idea.content}
                  </p>
                </div>

                <div className="border-t border-border/50 pt-4 flex flex-wrap items-center justify-between gap-4 mt-auto">
                  <div className="flex flex-wrap gap-1">
                    {idea.tags?.split(",").map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-background border border-border rounded text-[9px] font-bold text-muted-foreground/80">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-muted">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(idea.createdAt).toLocaleDateString(currentLang === "en" ? "en-US" : "uz-UZ")}</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
