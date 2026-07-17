import { Link } from "react-router-dom";
import { Brain, Target, ArrowRight } from "lucide-react";
import { FadeIn, CountUp } from "@/shared/components/animations";

interface AboutSectionProps {
  langPrefix: string;
  t: (key: string) => string;
}

export default function AboutSection({ langPrefix, t }: AboutSectionProps) {
  return (
    <section id="about" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Portrait left */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="w-[280px] h-[360px] md:w-[320px] md:h-[400px] rounded-[24px] overflow-hidden border border-border bg-white p-2 shadow-sm">
            <img 
              src="/portrait.png" 
              alt="Akbarali Sottorov" 
              className="w-full h-full object-cover rounded-[18px] grayscale" 
              loading="lazy"
            />
          </div>
        </div>

        {/* About details right */}
        <div className="lg:col-span-7 text-left space-y-8">
          <FadeIn>
            <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">{t("bio.badge")}</span>
            <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold mb-4">
              {t("bio.title")}
            </h2>
            <p className="font-sans text-[18px] text-muted-foreground leading-relaxed max-w-[650px]">
              {t("bio.desc")}
            </p>
          </FadeIn>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px] pt-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-foreground text-base mb-1">{t("bio.value1_title")}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{t("bio.value1_desc")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-gold flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-foreground text-base mb-1">{t("bio.value2_title")}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{t("bio.value2_desc")}</p>
              </div>
            </div>
          </div>

          {/* Statistics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-border/50 text-center sm:text-left">
            <div>
              <CountUp to={45} suffix="+" className="block font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-1" />
              <span className="block text-[10px] font-bold text-muted uppercase tracking-widest">{t("bio.stat_books")}</span>
            </div>
            <div>
              <CountUp to={12} className="block font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-1" />
              <span className="block text-[10px] font-bold text-muted uppercase tracking-widest">{t("bio.stat_articles")}</span>
            </div>
            <div>
              <CountUp to={8} className="block font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-1" />
              <span className="block text-[10px] font-bold text-muted uppercase tracking-widest">{t("bio.stat_projects")}</span>
            </div>
            <div>
              <CountUp to={5} suffix="+" className="block font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-1" />
              <span className="block text-[10px] font-bold text-muted uppercase tracking-widest">{t("bio.stat_years")}</span>
            </div>
          </div>

          <div className="flex justify-start">
            <Link 
              to={`${langPrefix}/about`}
              className="px-6 py-3.5 bg-primary hover:bg-primary/95 text-white rounded-[24px] text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus-ring inline-flex items-center gap-2"
            >
              <span>{t("bio.cta")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
