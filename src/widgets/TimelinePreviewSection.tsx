import { Link } from "react-router-dom";
import { getLocalizedTimelineData } from "@/shared/data/timeline";
import { Briefcase, GraduationCap, Award, Compass, Target, Calendar, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { Language } from "@/shared/types";

interface TimelinePreviewSectionProps {
  currentLang: Language;
  t: (key: string) => string;
}

export default function TimelinePreviewSection({ currentLang, t }: TimelinePreviewSectionProps) {
  const timeline = getLocalizedTimelineData(currentLang);
  // Get the two most recent events
  const previewItems = timeline.slice(0, 2);

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
        return <Compass className="w-4 h-4" />;
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

  const langPrefix = currentLang === "uz" ? "" : `/${currentLang}`;

  return (
    <section className="w-full text-left">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
        {/* Left Column: Heading and CTA */}
        <FadeIn className="lg:col-span-1 flex flex-col justify-center gap-4">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-1 block">
            {currentLang === "uz" ? "FAOLIYAT BOSQICHLARI" : currentLang === "en" ? "CAREER MILESTONES" : "ЭТАПЫ ДЕЯТЕЛЬНОСТИ"}
          </span>
          <h2 className="font-heading text-3xl md:text-[40px] leading-tight text-foreground font-bold">
            {currentLang === "uz" ? "Professional O'sish" : currentLang === "en" ? "Professional Path" : "Профессиональный путь"}
          </h2>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            {currentLang === "uz"
              ? "Tashkent Davlat Iqtisodiyot Universiteti tadqiqotlaridan boshlab, startaplar va strategik loyihalar yaratishgacha bo'lgan yo'l xronologiyasi."
              : currentLang === "en"
              ? "A record of startups, brand positioning strategies, academic researches and immediate future goals."
              : "Хронология стартапов, позиционирования брендов, исследований и ближайших планов."}
          </p>
          <div className="mt-4">
            <Link 
              to={`${langPrefix}/timeline`}
              className="px-6 py-2.5 bg-primary/5 hover:bg-primary/10 border border-primary/15 rounded-[24px] text-xs font-bold text-primary dark:text-gold transition-all duration-300 hover:-translate-y-[1px] focus-ring inline-flex items-center gap-2 group"
            >
              <span>{currentLang === "uz" ? "To'liq xronologiya" : currentLang === "en" ? "Full Timeline" : "Полная хроника"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        {/* Right Column: Mini Timeline preview list */}
        <div className="lg:col-span-2 relative border-l border-border/80 ml-4 pl-8 py-2 flex flex-col gap-8">
          <StaggerContainer>
            {previewItems.map((item) => (
              <StaggerItem key={item.id} className="relative">
                {/* Connection dot/icon wrapper */}
                <span className="absolute -left-[45px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border bg-card border-border text-gold shadow-sm shrink-0">
                  {getIcon(item.type)}
                </span>

                {/* Card */}
                <div className="flex flex-col gap-2 p-6 bg-white dark:bg-card border border-border/80 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs text-muted font-medium">
                    <span className="font-bold text-gold uppercase tracking-widest">
                      {getTypeLabel(item.type)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border shrink-0" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-foreground mt-1">
                    {item.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-muted-foreground">
                    {item.subtitle}
                  </h4>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
