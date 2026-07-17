import { Target } from "lucide-react";
import { Language } from "@/shared/types";

interface NowSectionProps {
  currentLang: Language;
  t: (key: string) => string;
}

export default function NowSection({ currentLang, t }: NowSectionProps) {
  return (
    <section className="w-full">
      <div className="bg-white dark:bg-card border border-border rounded-[24px] p-8 md:p-12 text-left relative overflow-hidden">
        <div className="absolute -right-12 -top-12 opacity-[0.02] text-primary">
          <Target className="w-48 h-48" />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-border/60 pb-6">
          <div>
            <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold block mb-1">{t("now.badge")}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{t("now.title")}</h2>
            <p className="text-xs text-muted-foreground mt-1">{t("now.desc")}</p>
          </div>
          <div className="text-[10px] text-muted-foreground font-semibold bg-background border border-border/80 px-3.5 py-1.5 rounded-full">
            {t("now.updated")}: {currentLang === "en" ? "July 14, 2026" : currentLang === "ru" ? "14 июля 2026" : "14-iyul, 2026-yil"}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {t("now.focus")}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentLang === "en" ? "My final research thesis in finance and designing user interfaces that align with user psychology." : currentLang === "ru" ? "Моя выпускная научно-исследовательская работа в области финансов и проектирование интерфейсов продуктов, соответствующих психологии пользователей." : "Moliya sohasidagi yakuniy ilmiy-tadqiot ishlarim hamda foydalanuvchilar psixologiyasiga mos keluvchi mahsulot interfeyslarini loyihalash."}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {t("now.projects")}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentLang === "en" ? "Actively coding Tax Helper AI project, conducting user interviews, and calibrating tax modules." : currentLang === "ru" ? "Активное программирование проекта Tax Helper AI, проведение интервью с пользователями и калибровка налоговых модулей." : "Tax Helper AI loyihasini faol ravishda kodlash, bevosita foydalanuvchilar bilan suhbatlar o'tkazish va soliq modullarini sozlash."}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {t("now.experiments")}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentLang === "en" ? "Testing models of leveraging generative AI in branding and marketing decisions." : currentLang === "ru" ? "Тестирование моделей эффективного использования генеративного ИИ в брендинге и маркетинговых решениях." : "Brending va marketing qarorlarida generativ sun'iy intellektdan unumli foydalanish modellarini sinab ko'rish."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
