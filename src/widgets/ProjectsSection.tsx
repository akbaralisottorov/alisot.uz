import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { Language } from "@/shared/types";

interface ProjectsSectionProps {
  currentLang: Language;
  t: (key: string) => string;
}

const PROJECTS = [
  {
    title: "Tax Helper",
    slug: "tax-helper",
    status: "Hozirda qurilmoqda",
    statusColor: "bg-gold/15 text-gold border-gold/25",
    motivation: "O'zbekistondagi mustaqil ijodkorlar va frilanserlar uchun soliq qonunchiligi o'ta chigal bo'lib, xatoliklar katta jarimalarga sabab bo'lardi. Men bu jarayonni hamma uchun oson va xavfsiz qilmoqchi bo'ldim.",
    problem: "Kichik biznes va yakka tartibdagi tadbirkorlar uchun soliq majburiyatlarini tezkor hisoblash va qonuniy imtiyozlarni aniqlash imkoni yo'qligi.",
    process: "AI yordamida soliq kodeksini tahlil qiluvchi maxsus bot modelini yozdik, Prisma va PostgreSQL bazasini ulab, soliq kalkulyatorini integratsiya qildik.",
    result: "Hozirda sinov rejimida 200 dan ortiq faol foydalanuvchilar o'z soliq hisobotlarini 5 daqiqa ichida xatosiz topshirdilar.",
    lessons: "Qonunlar tez-tez o'zgarib turadi, shuning uchun eng asosiysi — AI bilim bazasini real vaqtda yangilab boradigan avtomatlashtirilgan sinxronizatsiya ekanligini angladim.",
    techStack: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS", "Prisma"],
    website: "https://taxhelper.uz",
    github: "https://github.com/akbaralisottorov/tax-helper-ai",
    caseStudy: "/#projects",
    image: "/project_tax_helper.png",
    cta: "Soliq assistentini sinab ko'rish"
  },
  {
    title: "Teran Fikr",
    slug: "teran-fikr",
    status: "Tugallangan",
    statusColor: "bg-success/15 text-success border-success/25",
    motivation: "Uzbek internet segmentida yuzaki xabarlar ko'p, biroq chuqur, dalillarga tayangan va odamni mushohada qilishga chorlaydigan tahlillar yo'q darajada edi.",
    problem: "O'quvchilar uchun reklamasiz, shoshilmasdan chuqur maqolalarni mutolaa qilish imkonini beruvchi intellektual tahliliy platformaning yetishmasligi.",
    process: "Faqat matn va o'qish qulayligiga qaratilgan premium tipografiyali dizayn tizimi yaratdim va onu Express/React backend tizimi bilan birlashtirdim.",
    result: "Sifatli auditoriya shakllandi, har bir tashrif buyuruvchining platformadagi o'rtacha mutolaa vaqti 6 daqiqadan oshdi.",
    lessons: "Raqamli shovqin asrida odamlar baribir sifatli va chuqur matnlarni qidirishini, chiroyli va sokin muhit unga bo'lgan ishtiyoqni oshirishini tushundim.",
    techStack: ["React", "Tailwind CSS", "PostgreSQL", "Node.js", "Express"],
    website: "https://teranfikr.uz",
    github: "https://github.com/akbaralisottorov/teran-fikr",
    caseStudy: "/#projects",
    image: "/project_teran_fikr.png",
    cta: "Tahlillar platformasiga o'tish"
  },
  {
    title: "PIO Pay",
    slug: "pio-pay",
    status: "Tugallangan",
    statusColor: "bg-success/15 text-success border-success/25",
    motivation: "O'zim frilansirlik qilganimda xalqaro mijozlardan haq to'lashdagi murakkab to'siqlar va ulkan komissiyalarga duch kelgan edim. Bu muammoni hal qilish zarur edi.",
    problem: "Markaziy Osiyodagi frilanserlar uchun xalqaro to'lovlarni qabul qilishdagi yuqori komissiyalar va tranzaksiya muddatlarining uzoqligi.",
    process: "Stripe to'lov shlyuzi bilan bevosita integratsiya ishlab chiqildi va tranzaksiyalar yo'nalishini optimallashtiradigan maxsus marshrutlash algoritmi joriy etildi.",
    result: "Tranzaksiya komissiyalari o'rtacha 1% gacha pasaytirildi va pul o'tkazish muddatlari 24 soatgacha qisqardi.",
    lessons: "Moliyaviy mahsulotlar yaratishda API barqarorligi va tranzaksiyalarning xavfsizligi eng birinchi o'rindagi muhim ustuvorlik ekanligi o'z isbotini topdi.",
    techStack: ["Next.js", "Stripe", "TypeScript", "Tailwind CSS"],
    website: "https://piopay.com",
    github: "https://github.com/akbaralisottorov/pio-pay",
    caseStudy: "/#projects",
    image: "/project_pio_pay.png",
    cta: "To'lov tizimini tahlil qilish"
  },
  {
    title: "HRAkso AI",
    slug: "hraksso-ai",
    status: "Tugallangan",
    statusColor: "bg-success/15 text-success border-success/25",
    motivation: "Kompaniyalar nomzodlarni tanlashda faqat quruq rezyumega suyanib, ularning haqiqiy kognitiv qobiliyatlari va jamoaviy qadriyatlarga mosligini ko'rmas edilar.",
    problem: "Katta hajmdagi arizalarni saralashdagi subyektivlik va kognitiv empatiya darajasini rezyume orqali aniqlab bo'lmasligi.",
    process: "Nomzodlarning javoblarini kognitiv va xulq-atvor dinamikasi bo'yicha tahlil qiluvchi neyrotizim modellarini Python FastAPI yordamida yozdik.",
    result: "Dastlabki filtrlash jarayoni tezligi 70% ga oshdi va jamoada qolish ko'rsatkichi yaxshilandi.",
    lessons: "Sun'iy intellekt faqatgina insoniy qarorlar uchun ko'makchi ekanini, yakuniy tanlovda esa baribir shaxsiy suhbat va hissiy intellekt muhimligini angladim.",
    techStack: ["React", "Python", "FastAPI", "Tailwind CSS"],
    website: "https://hraksso.ai",
    github: "https://github.com/akbaralisottorov/hraksso-ai",
    caseStudy: "/#projects",
    image: "/project_hraksso_ai.png",
    cta: "Baholash tizimi demosini sinash"
  }
];

function getLocalizedProjects(lang: Language) {
  return PROJECTS.map(p => {
    if (lang === "en") {
      if (p.slug === "tax-helper") {
        return {
          ...p,
          status: "Under Construction",
          motivation: "Tax regulations for freelancers in Uzbekistan were highly complex, and mistakes led to heavy fines. I wanted to make this process easy and safe for everyone.",
          problem: "Small businesses and individual entrepreneurs lacked a quick tax calculation and legal benefit identification tool.",
          process: "We built an AI bot model that analyzes the tax code, connected Prisma and PostgreSQL, and integrated a tax calculator.",
          result: "Currently in beta, over 200 active users successfully filed their tax reports within 5 minutes without errors.",
          lessons: "Laws change frequently, so I realized the key is automated synchronization that updates the AI knowledge base in real-time.",
          cta: "Try Tax Assistant"
        };
      }
      if (p.slug === "teran-fikr") {
        return {
          ...p,
          status: "Completed",
          motivation: "The Uzbek internet segment has plenty of superficial news, but deep, evidence-based analysis was virtually non-existent.",
          problem: "Lack of an intellectual analysis platform for readers to enjoy deep articles without ads or rush.",
          process: "I created an elegant typography-focused design system and integrated it with an Express/React backend.",
          result: "A high-quality audience was formed, with an average reading time per visitor exceeding 6 minutes.",
          lessons: "In the digital noise era, people still look for quality, deep writing, and a beautiful, quiet environment boosts that interest.",
          cta: "Go to Essays Platform"
        };
      }
      if (p.slug === "pio-pay") {
        return {
          ...p,
          status: "Completed",
          motivation: "As a freelancer, I faced high commissions and complex barriers when receiving payments from international clients. This had to be solved.",
          problem: "High commissions and long transaction times for freelancers in Central Asia to accept international payments.",
          process: "Developed a direct integration with Stripe and implemented a routing algorithm that optimizes transaction routes.",
          result: "Transaction fees were reduced to an average of 1%, and transfer times were shortened to under 24 hours.",
          lessons: "When building financial products, API stability and transaction security are the highest priorities.",
          cta: "Analyze Payment System"
        };
      }
      if (p.slug === "hraksso-ai") {
        return {
          ...p,
          status: "Completed",
          motivation: "Companies relied purely on flat resumes, failing to see candidates' true cognitive abilities and cultural alignment.",
          problem: "Subjectivity in screening high volumes of applications and inability to detect cognitive empathy via resumes.",
          process: "We developed neural network models using Python FastAPI to analyze candidates' answers for cognitive and behavioral dynamics.",
          result: "Initial screening speed increased by 70%, and team retention rates improved.",
          lessons: "AI is only an assistant for human decisions; personal interviews and emotional intelligence remain key for the final choice.",
          cta: "Try Assessment System Demo"
        };
      }
    } else if (lang === "ru") {
      if (p.slug === "tax-helper") {
        return {
          ...p,
          status: "Разрабатывается",
          motivation: "Налоговое законодательство для фрилансеров в Узбекистане было слишком сложным, и ошибки приводили к крупным штрафам. Я хотел сделать этот процесс простым и безопасным.",
          problem: "Отсутствие инструмента для быстрого расчета налогов и выявления законных льгот у малого бизнеса.",
          process: "Создали ИИ-бота для анализа налогового кодекса, подключили Prisma и PostgreSQL, интегрировали налоговый калькулятор.",
          result: "В настоящее время в бета-тестировании более 200 пользователей заполнили отчетность за 5 минут без ошибок.",
          lessons: "Законы меняются часто, поэтому ключевым моментом является автосинхронизация базы знаний ИИ в реальном времени.",
          cta: "Попробовать налоговый ассистент"
        };
      }
      if (p.slug === "teran-fikr") {
        return {
          ...p,
          status: "Завершено",
          motivation: "В узбекском сегменте интернета много поверхностных новостей, но качественная аналитика на основе фактов практически оставалась незаметной.",
          problem: "Нехватка аналитической платформы для вдумчивого чтения глубоких текстов без рекламы и спешки.",
          process: "Создал элегантную дизайн-систему и объединил ее с бэкендом Express/React.",
          result: "Сформировалась качественная аудитория, среднее время чтения превысило 6 минут.",
          lessons: "Люди все еще ценят глубокий контент в эпоху цифрового шума, если предоставить им спокойную среду.",
          cta: "Перейти на платформу аналитики"
        };
      }
      if (p.slug === "pio-pay") {
        return {
          ...p,
          status: "Завершено",
          motivation: "Работая на фрилансе, я сам столкнулся со сложными барьерами и огромными комиссиями при получении оплат от зарубежных клиентов.",
          problem: "Высокие комиссии и долгие сроки зачисления платежей для фрилансеров в Центральной Азии.",
          process: "Разработали прямую интеграцию со Stripe и внедрили алгоритм маршрутизации для оптимизации транзакций.",
          result: "Комиссии снизились до 1%, а время проведения транзакций сократилось до 24 часов.",
          lessons: "В финтех-продуктах стабильность API и безопасность транзакций являются наивысшим приоритетом.",
          cta: "Анализировать платежную систему"
        };
      }
      if (p.slug === "hraksso-ai") {
        return {
          ...p,
          status: "Завершено",
          motivation: "Компании при подборе кандидатов опирались на сухие резюме, не видя реальных когнитивных способностей человека.",
          problem: "Субъективность при фильтрации больших объемов заявок и невозможность оценить уровень эмпатии по резюме.",
          process: "Написали нейросетевые модели на Python FastAPI для анализа ответов кандидатов на когнитивную динамику.",
          result: "Скорость первичного отбора выросла на 70%, показатели удержания в команде улучшились.",
          lessons: "ИИ — лишь помощник для человеческих решений; личное собеседование и эмоциональный интеллект остаются решающими.",
          cta: "Попробовать демо-версию оценки"
        };
      }
    }
    return p;
  });
}

export default function ProjectsSection({ currentLang, t }: ProjectsSectionProps) {
  const localizedProjects = getLocalizedProjects(currentLang);

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
                    href={project.caseStudy}
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
