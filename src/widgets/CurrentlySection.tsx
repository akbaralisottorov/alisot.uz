import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { Language } from "@/shared/types";

interface CurrentlySectionProps {
  currentLang: Language;
  t: (key: string) => string;
}

export default function CurrentlySection({ currentLang, t }: CurrentlySectionProps) {
  const currentItems = [
    { 
      label: t("currently.building"), 
      title: "Tax Helper AI", 
      desc: currentLang === "en" ? "Tax calculator and advisor bot for freelancers." : currentLang === "ru" ? "Налоговый калькулятор и чат-бот для фрилансеров." : "Frilanser va yakka tadbirkorlar uchun soliq deklaratsiyalari kalkulyatori.", 
      status: currentLang === "en" ? "Testing tax modules" : currentLang === "ru" ? "Тестирование модулей" : "Soliq modullari sinovi", 
      date: currentLang === "en" ? "July 14, 2026" : currentLang === "ru" ? "14 июля 2026" : "14-iyul, 2026", 
      type: "gold" 
    },
    { 
      label: t("currently.reading"), 
      title: "Thinking Fast & Slow", 
      desc: currentLang === "en" ? "Cognitive biases in decision-making based on Kahneman's theory." : currentLang === "ru" ? "Когнитивные искажения в принятии решений по теории Канемана." : "Kahneman nazariyasi asosida inson qarorlaridagi kognitiv og'ishlar.", 
      status: currentLang === "en" ? "On chapter 5" : currentLang === "ru" ? "На 5-й главе" : "5-bobda", 
      date: currentLang === "en" ? "July 12, 2026" : currentLang === "ru" ? "12 июля 2026" : "12-iyul, 2026", 
      type: "green" 
    },
    { 
      label: t("currently.learning"), 
      title: currentLang === "en" ? "Behavioral Economics" : currentLang === "ru" ? "Поведенческая экономика" : "Xulq-atvor iqtisodiyoti", 
      desc: currentLang === "en" ? "Researching irrational consumer buying choices and decisions." : currentLang === "ru" ? "Исследование иррациональных покупательских решений потребителей." : "Iste'molchilarning irratsional sotib olish qarorlarini tadqiq etish.", 
      status: currentLang === "en" ? "Topic analysis" : currentLang === "ru" ? "Анализ темы" : "Mavzu tahlili", 
      date: currentLang === "en" ? "July 10, 2026" : currentLang === "ru" ? "10 июля 2026" : "10-iyul, 2026", 
      type: "green" 
    },
    { 
      label: t("currently.writing"), 
      title: currentLang === "en" ? "Consumer Mindset" : currentLang === "ru" ? "Психология потребителя" : "Iste'molchi ruhiyati", 
      desc: currentLang === "en" ? "System 1 level marketing and design persuasion methods." : currentLang === "ru" ? "Методы убеждения на уровне Системы 1 в маркетинге и дизайне." : "Dizayn va marketing tizimlarida Tizim 1 darajasidagi manipulyatsiyalar.", 
      status: currentLang === "en" ? "Drafting" : currentLang === "ru" ? "Черновик" : "Qoralama bosqichi", 
      date: currentLang === "en" ? "July 13, 2026" : currentLang === "ru" ? "13 июля 2026" : "13-iyul, 2026", 
      type: "gold" 
    },
    { 
      label: t("currently.thinking"), 
      title: "AI x Branding", 
      desc: currentLang === "en" ? "Generative AI impacts on personal branding and marketing." : currentLang === "ru" ? "Влияние генеративного ИИ на личный брендинг и маркетинг." : "Generativ sun'iy intellektning shaxsiy brend strategiyalariga ta'siri.", 
      status: currentLang === "en" ? "Gathering ideas" : currentLang === "ru" ? "Сбор идей" : "G'oyalarni yig'ish", 
      date: currentLang === "en" ? "July 14, 2026" : currentLang === "ru" ? "14 июля 2026" : "14-iyul, 2026", 
      type: "green" 
    }
  ];

  return (
    <section className="w-full">
      <FadeIn className="mb-[32px]">
        <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">
          {t("currently.badge")}
        </span>
        <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">
          {t("currently.title")}
        </h2>
        <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mt-2">
          {t("currently.desc")}
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[32px]">
        {currentItems.map((item, idx) => (
          <StaggerItem key={idx}>
            <div className="bg-white dark:bg-card border border-border p-8 rounded-[24px] h-full flex flex-col justify-between group hover:border-gold hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div>
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block mb-4">
                  {item.label}
                </span>
                <h3 className="font-sans font-extrabold text-base text-foreground mb-2 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
              </div>
              <div className="pt-4 border-t border-border/50 space-y-2 mt-auto">
                <div className="text-[10px] text-muted-foreground/80 flex items-center gap-1">
                  <span className="font-semibold text-foreground">{t("currently.status")}:</span> {item.status}
                </div>
                <div className="text-[9px] text-muted/70 flex items-center gap-1">
                  <span>{t("currently.updated")}:</span> {item.date}
                </div>
                <span className={`w-1.5 h-1.5 rounded-full mt-2 block ${
                  item.type === "gold" ? "bg-gold animate-status-pulse" : "bg-primary animate-status-pulse"
                }`} />
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
