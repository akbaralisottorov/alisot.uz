import { useState, useEffect } from "react";
import { SEO } from "@/shared/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { LearningNode } from "@/shared/types";
import { BookOpen, Award, CheckCircle2, Circle, ArrowRight, ExternalLink, Library } from "lucide-react";

export default function LearningPage() {
  const { t, currentLang } = useTranslation();
  const [nodes, setNodes] = useState<LearningNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { label: currentLang === "uz" ? "Barchasi" : currentLang === "en" ? "All" : "Все", value: "all" },
    { label: currentLang === "uz" ? "Dasturlash" : currentLang === "en" ? "Programming" : "Программирование", value: "programming" },
    { label: currentLang === "uz" ? "Moliya" : currentLang === "en" ? "Finance" : "Финансы", value: "finance" },
    { label: currentLang === "uz" ? "Sun'iy Intellekt" : currentLang === "en" ? "AI" : "ИИ", value: "ai" },
    { label: currentLang === "uz" ? "Dizayn" : currentLang === "en" ? "Design" : "Дизайн", value: "design" },
    { label: currentLang === "uz" ? "Biznes & Startap" : currentLang === "en" ? "Business & Startups" : "Бизнес и стартапы", value: "startups" }
  ];

  // Premium fallback seed data if database is empty
  const defaultNodes: LearningNode[] = [
    {
      id: "l1",
      category: "ai",
      title: "RAG & Vector Embeddings Integration",
      progress: 90,
      notes: "Deep-dive into vector databases, semantic search mechanics, and using OpenAI embeddings to query databases semantically. Applied this to index site contents.",
      resources: "OpenAI API Reference, pgvector PostgreSQL documentation, Deeplearning.ai RAG course",
      takeaways: "Semantic query relevance is heavily dependent on chunking strategy and selecting the correct similarity metrics (cosine vs L2 distance).",
      links: "https://openai.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "l2",
      category: "finance",
      title: "Behavioral Corporate Finance",
      progress: 75,
      notes: "Researching how cognitive biases (overconfidence, loss aversion) affect corporate financial strategy, manager capital budgeting, and asset pricing.",
      resources: "Behavioral Finance by Edwin T. Burton, Academic Papers on SSRN",
      takeaways: "Managers are not perfectly rational; branding and narrative plays an active role even in strict capital budgeting decisions.",
      links: "https://ssrn.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "l3",
      category: "programming",
      title: "Advanced Data Visualization with d3.js",
      progress: 80,
      notes: "Studying SVG rendering, force-directed graph physics, dynamic node-linking layouts, and optimizing large canvas charts for web performance.",
      resources: "D3.js Graphing Library Documentation, Josh Comeau Interactive Articles",
      takeaways: "SVG is excellent for small datasets; for 1000+ nodes (e.g. digital garden maps), rendering must switch to Canvas or WebGL to avoid DOM bloat.",
      links: "https://d3js.org",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "l4",
      category: "startups",
      title: "Product-Led Growth (PLG) Strategy",
      progress: 60,
      notes: "Analyzing Stripe and Linear growth strategies: how premium UX and self-serve onboarding acts as the primary marketing funnel.",
      resources: "PLG Playbook by Wes Bush, Lenny's Newsletter Case Studies",
      takeaways: "Product superiority and frictionless setup will consistently outperform expensive traditional marketing campaigns for SaaS.",
      links: "https://productled.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetch("/api/learning")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNodes(data);
        } else {
          setNodes(defaultNodes);
        }
      })
      .catch(() => setNodes(defaultNodes))
      .finally(() => setLoading(false));
  }, []);

  const filteredNodes = activeCategory === "all"
    ? nodes
    : nodes.filter((n) => n.category === activeCategory);

  const getCategoryLabel = (cat: string) => {
    const matched = categories.find((c) => c.value === cat);
    return matched ? matched.label : cat;
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto py-16 px-6 md:px-12 flex flex-col gap-12 selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`${currentLang === "uz" ? "Ta'lim" : currentLang === "en" ? "Learning Hub" : "Обучение"} — Akbarali Sottorov`} 
        description="Follow my active learning path across programming, finance, AI, design, and startups."
      />

      {/* Page Header */}
      <FadeIn>
        <div className="flex flex-col gap-4 border-b border-border/60 pb-8 text-left">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold block">
            {currentLang === "uz" ? "MUTOLAALAR VA KUNDALIK" : currentLang === "en" ? "LEARNING PATHS" : "ОБУЧЕНИЕ И ИЗУЧЕНИЕ"}
          </span>
          <h1 className="font-heading text-4xl md:text-[52px] leading-none text-foreground font-extrabold">
            {currentLang === "uz" ? "Ta'lim Hubi" : currentLang === "en" ? "Learning Hub" : "Учебный центр"}
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed mt-2 max-w-[650px]">
            {currentLang === "uz"
              ? "Men ayni damda o'rganayotgan mavzular, o'qiyotgan kurslarim, olingan xulosalar va foydali manbalar arxivi."
              : currentLang === "en"
              ? "A structured index of concepts I'm actively studying, courses, takeaways, and gathered research resources."
              : "Структурированный архив концепций, которые я изучаю, курсов, выводов и полезных ресурсов."}
          </p>
        </div>
      </FadeIn>

      {/* Tabs */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 justify-start">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setActiveCategory(c.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                activeCategory === c.value
                  ? "bg-gold border-gold text-white"
                  : "bg-white dark:bg-card border-border hover:border-gold/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Grid List */}
      {loading ? (
        <div className="text-center text-muted py-12">Yuklanmoqda...</div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {filteredNodes.map((node) => (
            <StaggerItem key={node.id}>
              <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-8 flex flex-col justify-between h-full group hover:border-gold/30 hover:shadow-sm transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2.5 py-1 rounded">
                      {getCategoryLabel(node.category)}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                      <span>{node.progress}% Complete</span>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                    {node.title}
                  </h3>

                  {/* Progress bar */}
                  <div className="w-full bg-border/40 rounded-full h-1.5 mb-6 overflow-hidden">
                    <div 
                      className="bg-gold h-full rounded-full transition-all duration-500" 
                      style={{ width: `${node.progress}%` }}
                    />
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="block text-[9px] font-extrabold text-muted uppercase tracking-widest mb-1">Study Notes</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{node.notes}</p>
                    </div>
                    {node.takeaways && (
                      <div>
                        <span className="block text-[9px] font-extrabold text-gold uppercase tracking-widest mb-1">Key Takeaway</span>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">{node.takeaways}</p>
                      </div>
                    )}
                    {node.resources && (
                      <div>
                        <span className="block text-[9px] font-extrabold text-muted uppercase tracking-widest mb-1">Resources</span>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed font-sans">{node.resources}</p>
                      </div>
                    )}
                  </div>
                </div>

                {node.links && (
                  <div className="border-t border-border/50 pt-4 mt-auto">
                    <a 
                      href={node.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-gold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>External Resource</span>
                    </a>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
