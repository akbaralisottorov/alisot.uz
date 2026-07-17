import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { Language } from "@/shared/types";
import { getLocalizedProjectsData } from "@/shared/data/projects";

interface ProjectsSectionProps {
  currentLang: Language;
  t: (key: string) => string;
}

const PROJECTS_TEASERS: Record<string, Record<string, { process: string; result: string; lessons: string; cta: string }>> = {
  "tax-helper": {
    uz: {
      process: "AI yordamida soliq kodeksini tahlil qiluvchi maxsus bot modelini yozdik, Prisma va PostgreSQL bazasini ulab, soliq kalkulyatorini integratsiya qildik.",
      result: "Hozirda sinov rejimida 200 dan ortiq faol foydalanuvchilar o'z soliq hisobotlarini 5 daqiqa ichida xatosiz topshirdilar.",
      lessons: "Qonunlar tez-tez o'zgarib turadi, shuning uchun eng asosiysi — AI bilim bazasini real vaqtda yangilab boradigan avtomatlashtirilgan sinxronizatsiya ekanligini angladim.",
      cta: "Soliq assistentini sinab ko'rish"
    },
    en: {
      process: "We built an AI bot model that analyzes the tax code, connected Prisma and PostgreSQL, and integrated a tax calculator.",
      result: "Currently in beta, over 200 active users successfully filed their tax reports within 5 minutes without errors.",
      lessons: "Laws change frequently, so I realized the key is automated synchronization that updates the AI knowledge base in real-time.",
      cta: "Try Tax Assistant"
    },
    ru: {
      process: "Создали ИИ-бота для анализа налогового кодекса, подключили Prisma и PostgreSQL, интегрировали налоговый калькулятор.",
      result: "В настоящее время в бета-тестировании более 200 пользователей заполнили отчетность за 5 минут без ошибок.",
      lessons: "Законы меняются часто, поэтому ключевым моментом является автосинхронизация базы знаний ИИ в реальном времени.",
      cta: "Попробовать налоговый ассистент"
    }
  },
  "teran-fikr": {
    uz: {
      process: "Faqat matn va o'qish qulayligiga qaratilgan premium tipografiyali dizayn tizimi yaratdim va onu Express/React backend tizimi bilan birlashtirdim.",
      result: "Sifatli auditoriya shakllandi, har bir tashrif buyuruvchining platformadagi o'rtacha mutolaa vaqti 6 daqiqadan oshdi.",
      lessons: "Raqamli shovqin asrida odamlar baribir sifatli va chuqur matnlarni qidirishini, chiroyli va sokin muhit unga bo'lgan ishtiyoqni oshirishini tushundim.",
      cta: "Tahlillar platformasiga o'tish"
    },
    en: {
      process: "I created an elegant typography-focused design system and integrated it with an Express/React backend.",
      result: "A high-quality audience was formed, with an average reading time per visitor exceeding 6 minutes.",
      lessons: "In the digital noise era, people still look for quality, deep writing, and a beautiful, quiet environment boosts that interest.",
      cta: "Go to Essays Platform"
    },
    ru: {
      process: "Создал элегантную дизайн-систему и объединил ее с бэкендом Express/React.",
      result: "Сформировалась качественная аудитория, среднее время чтения превысило 6 минут.",
      lessons: "Люди все еще ценят глубокий контент в эпоху цифрового шума, если предоставить им спокойную среду.",
      cta: "Перейти на платформу аналитики"
    }
  },
  "pio-pay": {
    uz: {
      process: "Stripe to'lov shlyuzi bilan bevosita integratsiya ishlab chiqildi va tranzaksiyalar yo'nalishini optimallashtiradigan maxsus marshrutlash algoritmi joriy etildi.",
      result: "Tranzaksiya komissiyalari o'rtacha 1% gacha pasaytirildi va pul o'tkazish muddatlari 24 soatgacha qisqardi.",
      lessons: "Moliyaviy mahsulotlar yaratishda API barqarorligi va tranzaksiyalarning xavfsizligi eng birinchi o'rindagi muhim ustuvorlik ekanligi o'z isbotini topdi.",
      cta: "To'lov tizimini tahlil qilish"
    },
    en: {
      process: "Developed a direct integration with Stripe and implemented a routing algorithm that optimizes transaction routes.",
      result: "Transaction fees were reduced to an average of 1%, and transfer times were shortened to under 24 hours.",
      lessons: "When building financial products, API stability and transaction security are the highest priorities.",
      cta: "Analyze Payment System"
    },
    ru: {
      process: "Разработали прямую интеграцию со Stripe и внедрили алгоритм маршрутизации для оптимизации транзакций.",
      result: "Комиссии снизились до 1%, а время проведения транзакций сократилось до 24 часов.",
      lessons: "В финтех-продуктах стабильность API и безопасность транзакций являются наивысшим приоритетом.",
      cta: "Анализировать платежную систему"
    }
  },
  "hraksso-ai": {
    uz: {
      process: "Nomzodlarning javoblarini kognitiv va xulq-atvor dinamikasi bo'yicha tahlil qiluvchi neyrotizim modellarini Python FastAPI yordamida yozdik.",
      result: "Dastlabki filtrlash jarayoni tezligi 70% ga oshdi va jamoada qolish ko'rsatkichi yaxshilandi.",
      lessons: "Sun'iy intellekt faqatgina insoniy qarorlar uchun ko'makchi ekanini, yakuniy tanlovda esa baribir shaxsiy suhbat va hissiy intellekt muhimligini angladim.",
      cta: "Baholash tizimi demosini sinash"
    },
    en: {
      process: "We developed neural network models using Python FastAPI to analyze candidates' answers for cognitive and behavioral dynamics.",
      result: "Initial screening speed increased by 70%, and team retention rates improved.",
      lessons: "AI is only an assistant for human decisions; personal interviews and emotional intelligence remain key for the final choice.",
      cta: "Try Assessment System Demo"
    },
    ru: {
      process: "Написали нейросетевые модели на Python FastAPI для анализа ответов кандидатов на когнитивную динамику.",
      result: "Скорость первичного отбора выросла на 70%, показатели удержания в команде улучшились.",
      lessons: "ИИ — лишь помощник для человеческих решений; личное собеседование и эмоциональный интеллект остаются решающими.",
      cta: "Попробовать демо-версию оценки"
    }
  }
};

export default function ProjectsSection({ currentLang, t }: ProjectsSectionProps) {
  const langPrefix = currentLang === "uz" ? "" : `/${currentLang}`;
  const projectsData = getLocalizedProjectsData(currentLang);
  const localizedProjects = projectsData.map(p => {
    const teaser = PROJECTS_TEASERS[p.slug]?.[currentLang] || PROJECTS_TEASERS[p.slug]?.uz || { process: "", result: "", lessons: "", cta: "" };
    return {
      ...p,
      process: teaser.process,
      result: teaser.result,
      lessons: teaser.lessons,
      cta: teaser.cta
    };
  });

  return (
    <section id="projects" className="w-full">
      <FadeIn className="mb-[32px]">
        <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">
          {t("projects.badge")}
        </span>
        <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">
          {t("projects.title")}
        </h2>
        <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mt-2">
          {t("projects.desc")}
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
        {localizedProjects.map((project) => (
          <StaggerItem key={project.title}>
            <div className="bg-white dark:bg-card border border-border rounded-[24px] overflow-hidden flex flex-col h-full group hover:border-gold/50 hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
              {/* Thumbnail */}
              <div className="aspect-[16/10] bg-background border-b border-border overflow-hidden relative p-1.5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover rounded-[18px]"
                  loading="lazy"
                />
                {/* Status Badge */}
                <span className={`absolute top-6 left-6 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border shadow-sm ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>

              {/* Details */}
              <div className="p-8 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-heading text-[24px] font-bold text-foreground mb-4 group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Case study info */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="block text-[9px] font-extrabold text-gold uppercase tracking-widest mb-1">{t("projects.motivation")}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{project.motivation}</p>
                    </div>
                    <div>
                      <span className="block text-[9px] font-extrabold text-muted uppercase tracking-widest mb-1">{t("projects.problem")}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <span className="block text-[9px] font-extrabold text-muted uppercase tracking-widest mb-1">{t("projects.process")}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{project.process}</p>
                    </div>
                    <div>
                      <span className="block text-[9px] font-extrabold text-muted uppercase tracking-widest mb-1">{t("projects.result")}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{project.result}</p>
                    </div>
                    <div>
                      <span className="block text-[9px] font-extrabold text-muted uppercase tracking-widest mb-1">{t("projects.lessons")}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed italic">{project.lessons}</p>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-background border border-border/80 rounded-lg text-[10px] font-bold text-muted-foreground font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-border/50 pt-6">
                  <div className="flex gap-4">
                    <a 
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-gold transition-colors focus-ring rounded"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t("projects.site")}</span>
                    </a>
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-gold transition-colors focus-ring rounded"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>{t("projects.code")}</span>
                    </a>
                  </div>

                  <a 
                    href={`${langPrefix}/projects/${project.slug}`}
                    className="px-5 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/15 rounded-[24px] text-[10px] font-bold text-primary dark:text-gold transition-all duration-300 hover:-translate-y-[1px] focus-ring inline-flex items-center gap-1.5"
                  >
                    <span>{project.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
