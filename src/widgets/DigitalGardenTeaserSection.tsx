import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Language } from "@/shared/types";

interface DigitalGardenTeaserSectionProps {
  langPrefix: string;
  t: (key: string) => string;
  currentLang: Language;
}

export default function DigitalGardenTeaserSection({ langPrefix, t, currentLang }: DigitalGardenTeaserSectionProps) {
  return (
    <section className="w-full">
      <div className="bg-primary/5 border border-primary/10 rounded-[24px] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        <div className="lg:col-span-8 space-y-4">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold block">{t("garden.badge")}</span>
          <h2 className="font-heading text-3xl font-bold text-foreground">{t("garden.title")}</h2>
          <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-[650px]">
            {t("garden.desc")}
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <span className="text-[11px] font-semibold text-muted bg-background border border-border/80 px-2.5 py-1 rounded-lg">#{currentLang === "en" ? "Ideas" : currentLang === "ru" ? "Идеи" : "G'oyalar"}</span>
            <span className="text-[11px] font-semibold text-muted bg-background border border-border/80 px-2.5 py-1 rounded-lg">#{currentLang === "en" ? "Drafts" : currentLang === "ru" ? "Черновики" : "Xom-mulohazalar"}</span>
            <span className="text-[11px] font-semibold text-muted bg-background border border-border/80 px-2.5 py-1 rounded-lg">#{currentLang === "en" ? "Questions" : currentLang === "ru" ? "Вопросы" : "Savollar"}</span>
            <span className="text-[11px] font-semibold text-muted bg-background border border-border/80 px-2.5 py-1 rounded-lg">#{currentLang === "en" ? "Experiments" : currentLang === "ru" ? "Эксперименты" : "Tajribalar"}</span>
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-end">
          <Link 
            to={`${langPrefix}/garden`}
            className="px-6 py-3.5 bg-gold hover:bg-gold-hover text-white rounded-[24px] text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm shadow-gold/10 hover:shadow-md hover:shadow-gold/25 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus-ring inline-flex items-center gap-2 w-full lg:w-auto justify-center"
          >
            <span>{t("garden.cta")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
