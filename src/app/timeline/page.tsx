import { useState } from "react";
import { SEO } from "@/shared/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { getLocalizedTimelineData } from "@/shared/data/timeline";
import { Briefcase, GraduationCap, Award, Compass, Target, Calendar } from "lucide-react";

export default function TimelinePage() {
  const { t, currentLang } = useTranslation();
  const timeline = getLocalizedTimelineData(currentLang);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { label: currentLang === "uz" ? "Barchasi" : currentLang === "en" ? "All" : "Все", value: "all" },
    { label: currentLang === "uz" ? "Karyera" : currentLang === "en" ? "Career" : "Карьера", value: "career" },
    { label: currentLang === "uz" ? "Ta'lim" : currentLang === "en" ? "Education" : "Обучение", value: "education" },
    { label: currentLang === "uz" ? "Yutuqlar" : currentLang === "en" ? "Achievements" : "Достижения", value: "achievement" },
    { label: currentLang === "uz" ? "Maqsadlar" : currentLang === "en" ? "Future Goals" : "Цели", value: "goal" }
  ];

  const filteredTimeline = activeFilter === "all"
    ? timeline
    : timeline.filter((item) => item.type === activeFilter);

  const getIcon = (type: string) => {
    switch (type) {
      case "career":
        return <Briefcase className="w-4 h-4" />;
      case "education":
        return <GraduationCap className="w-4 h-4" />;
      case "achievement":
        return <Award className="w-4 h-4" />;
      case "milestone":
        return <Target className="w-4 h-4" />;
      case "goal":
        return <Compass className="w-4 h-4 animate-spin-slow" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    if (currentLang === "en") return type;
    if (currentLang === "ru") {
      switch (type) {
        case "career": return "Карьера";
        case "education": return "Обучение";
        case "achievement": return "Успех";
        case "milestone": return "Веха";
        case "goal": return "Цель";
        default: return type;
      }
    }
    switch (type) {
      case "career": return "Karyera";
      case "education": return "Ta'lim";
      case "achievement": return "Yutuq";
      case "milestone": return "Bosqich";
      case "goal": return "Maqsad";
      default: return type;
    }
  };

  return (
    <div className="w-full max-w-[850px] mx-auto py-16 px-6 md:px-12 flex flex-col gap-12 selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`${currentLang === "uz" ? "Tarix" : currentLang === "en" ? "Timeline" : "Хроника"} — Akbarali Sottorov`} 
        description="Explore the educational, career, and personal milestones of Akbarali Sottorov."
      />

      {/* Header */}
      <FadeIn>
        <div className="flex flex-col gap-4 border-b border-border/60 pb-8 text-left">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold block">
            {currentLang === "uz" ? "KARYERA VA MAQSADLAR" : currentLang === "en" ? "CAREER & MILESTONES" : "КАРЬЕРА И ЦЕЛИ"}
          </span>
          <h1 className="font-heading text-4xl md:text-[52px] leading-none text-foreground font-extrabold">
            {currentLang === "uz" ? "Professional Tarix" : currentLang === "en" ? "Professional Timeline" : "Профессиональная хроника"}
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed mt-2 max-w-[650px]">
            {currentLang === "uz" 
              ? "Ta'lim, tadbirkorlik, ilmiy tadqiqotlar va kelgusidagi strategik maqsadlarim yilma-yil xronologiyasi."
              : currentLang === "en"
              ? "A chronological record of my academic path, startups, brand strategies, and long-term milestones."
              : "Хронология моего обучения, стартапов, бренд-стратегий и долгосрочных ориентиров."}
          </p>
        </div>
      </FadeIn>

      {/* Filter Tabs */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 items-center justify-start">
          {filters.map((f) => (
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

      {/* Vertical Timeline Tree */}
      <div className="relative border-l border-border/80 ml-4 md:ml-6 pl-8 md:pl-12 py-2 text-left flex flex-col gap-12">
        <StaggerContainer>
          {filteredTimeline.map((item, index) => (
            <StaggerItem key={item.id} className="relative">
              
              {/* Vertical connector dot/icon wrapper */}
              <span className="absolute -left-[45px] md:-left-[59px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border bg-card border-border text-gold shadow-sm shrink-0">
                {getIcon(item.type)}
              </span>

              {/* Event Card */}
              <div className="flex flex-col gap-2 p-6 bg-white dark:bg-card border border-border/80 rounded-2xl hover:border-gold/30 hover:shadow-sm transition-all duration-300 transform hover:-translate-y-[1px]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gold uppercase tracking-widest">
                      {getTypeLabel(item.type)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border shrink-0" />
                    <span className="text-xs font-semibold text-muted">
                      {item.date}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mt-1">
                  {item.title}
                </h3>
                <h4 className="text-xs font-semibold text-muted-foreground">
                  {item.subtitle}
                </h4>
                
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-2">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-4">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-0.5 bg-background border border-border/80 text-[9px] font-bold uppercase tracking-wider text-muted font-mono rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
