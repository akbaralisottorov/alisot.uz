import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Hero from "@/components/hero";
import SubscribeForm from "@/components/subscribe-form";
import { 
  ArrowUpRight, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Brain, 
  Target, 
  Calendar, 
  Clock, 
  ArrowRight
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/animations";
import { useTranslation } from "@/lib/i18n";
import { ContactDialog } from "@/components/contact-dialog";
import { useHomeData } from "@/lib/use-home-data";

// ─── Static Projects Data ───────────────────────────────────────────────────
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
    process: "Faqat matn va o'qish qulayligiga qaratilgan premium tipografiyali dizayn tizimi yaratdim va uni Express/React backend tizimi bilan birlashtirdim.",
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

function getLocalizedProjects(lang: string) {
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

export default function Page() {
  const { t, currentLang, langPrefix } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { articles, books, error } = useHomeData();

  const localizedProjects = getLocalizedProjects(currentLang);

  const defaultFeaturedArticle = {
    title: "Tanlov psixologiyasi: Nima uchun biz sotib olamiz?",
    category: "Xulq-atvor iqtisodiyoti",
    createdAt: new Date().toISOString(),
    excerpt: "Kognitiv og'ishlar, tanlov arxitekturasi va brendlar iste'molchi qarorlariga ta'sir qilish uchun 'System 1' fikrlashidan qanday foydalanishi to'g'risida ilmiy tahlil.",
    content: "",
    coverImage: "/featured_cover.png",
    slug: "psychology-of-choice",
    readTime: "8 daqiqa",
    author: { name: "Akbarali Sottorov" }
  };

  const featuredArticle = articles.find(a => a.featured) || articles[0] || defaultFeaturedArticle;

  const defaultReadingNow = {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    progress: 65,
    rating: 5,
    coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400",
    summary: "Inson ongining ikkita tizimi — tezkor (System 1) va chuqur (System 2) fikrlash hamda ularning qaror qabul qilishdagi roli haqida.",
    favoriteQuote: "We can be blind to the obvious, and we are also blind to our blindness.",
    lessonsLearned: "Tizim 1 tez va intuitiv, ammo tizimli xatolarga va kognitiv og'ishlarga moyil. Marketing Tizim 1 bilan bog'lanishi, lekin qarorlarni Tizim 2 tasdiqlashi lozim.",
    changedThinking: "Bu kitob meni marketingda shunchaki 'chiroyli dizayn' emas, balki foydalanuvchilarning intuitiv to'siqlarini yenguvchi 'tanlov arxitekturasi' yaratishga o'rgatdi.",
    relatedArticles: [
      { title: "Tanlov psixologiyasi maqolasi", slug: "psychology-of-choice" }
    ]
  };

  const readingNowBook = books.find(b => b.status === "READING") || defaultReadingNow;

  return (
    <div className="w-full max-w-[1200px] mx-auto py-12 px-6 md:px-12 flex flex-col gap-[140px] selection:bg-gold/25 selection:text-foreground">
      <SEO title="Akbarali Sottorov - Digital Home" />

      {/* Hero Section */}
      <FadeIn>
        <Hero />
      </FadeIn>

      {/* Currently Section */}
      <section className="w-full">
        <FadeIn className="mb-[32px]">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">{t("currently.badge")}</span>
          <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">{t("currently.title")}</h2>
          <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mt-2">
            {t("currently.desc")}
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[32px]">
          {[
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
          ].map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white dark:bg-card border border-border p-8 rounded-[24px] h-full flex flex-col justify-between group hover:border-gold hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div>
                  <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block mb-4">{item.label}</span>
                  <h3 className="font-sans font-extrabold text-base text-foreground mb-2 group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-border/50 space-y-2 mt-auto">
                  <div className="text-[10px] text-muted-foreground/80 flex items-center gap-1">
                    <span className="font-semibold text-foreground">{t("currently.status")}:</span> {item.status}
                  </div>
                  <div className="text-[9px] text-muted/70 flex items-center gap-1">
                    <span>{t("currently.updated")}:</span> {item.date}
                  </div>
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 block ${item.type === "gold" ? "bg-gold animate-status-pulse" : "bg-primary animate-status-pulse"}`} />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Featured Article Section */}
      <section className="w-full">
        <FadeIn className="mb-[32px]">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">{t("featured.badge")}</span>
          <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">{t("featured.title")}</h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-white dark:bg-card border border-border rounded-[24px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 group hover:border-gold/50 hover:shadow-md transition-all duration-300">
            {/* Cover Image */}
            <div className="lg:col-span-6 rounded-[18px] overflow-hidden aspect-[16/10] bg-background border border-border relative">
              <img 
                src={featuredArticle.coverImage || "/featured_cover.png"} 
                alt={featuredArticle.title} 
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-card/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border/40 text-[10px] font-extrabold tracking-widest text-primary dark:text-gold uppercase">
                {featuredArticle.category || "Behavioral Economics"}
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2 text-left">
              <div>
                <div className="flex items-center gap-2 text-[10px] text-muted font-bold tracking-wider uppercase mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(featuredArticle.createdAt).toLocaleDateString("uz-UZ")}</span>
                  <span className="mx-1.5">&bull;</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featuredArticle.readTime || "8 min"}</span>
                </div>

                <h3 className="font-heading text-[28px] md:text-[34px] leading-[1.15] font-extrabold text-foreground mb-4 group-hover:text-gold transition-colors">
                  {featuredArticle.title}
                </h3>

                <p className="font-sans text-base text-muted-foreground max-w-[650px] leading-relaxed mb-6 line-clamp-3">
                  {featuredArticle.excerpt || featuredArticle.content?.substring(0, 180).replace(/<[^>]*>/g, "") + "..."}
                </p>
              </div>

              {/* Author & CTA */}
              <div className="flex items-center justify-between border-t border-border/50 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-heading text-xs font-bold uppercase">
                    AS
                  </div>
                  <span className="text-sm font-semibold text-foreground">{featuredArticle.author?.name || "Akbarali Sottorov"}</span>
                </div>

                <Link 
                  to={`${langPrefix}/article/${featuredArticle.slug}`}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-white rounded-[24px] text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm shadow-gold/10 hover:shadow-md hover:shadow-gold/25 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus-ring inline-flex items-center gap-2"
                >
                  <span>{t("featured.cta")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Projects Case Study Section */}
      <section id="projects" className="w-full">
        <FadeIn className="mb-[32px]">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">{t("projects.badge")}</span>
          <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">{t("projects.title")}</h2>
          <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mt-2">
            {t("projects.desc")}
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
          {localizedProjects.map((project, idx) => (
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

      {/* Reading Now Bookshelf Section */}
      <section className="w-full">
        <FadeIn className="mb-[32px]">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">{t("reading.badge")}</span>
          <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">{t("reading.title")}</h2>
          <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mt-2">
            {t("reading.desc")}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-white dark:bg-card border border-border rounded-[24px] p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Book Cover */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="w-[180px] aspect-[2/3] rounded-xl overflow-hidden bg-background border border-border shadow-md transform hover:-rotate-1 hover:scale-[1.01] transition-transform duration-500 relative group p-1 bg-white">
                <img 
                  src={readingNowBook.coverImage || "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400"} 
                  alt={readingNowBook.title}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Book Info & Details */}
            <div className="lg:col-span-9 flex flex-col justify-between h-full py-2">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-heading text-[24px] font-bold text-foreground leading-tight">
                      {readingNowBook.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-sans mt-0.5">
                      {currentLang === "en" ? `by ${readingNowBook.author}` : currentLang === "ru" ? `автора ${readingNowBook.author}` : `${readingNowBook.author} qalamiga mansub`}
                    </p>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 bg-gold/10 px-3 py-1 rounded-full text-gold text-xs font-bold">
                    <span>★</span>
                    <span>{readingNowBook.rating || 5}/5</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6 max-w-sm">
                  <div className="flex justify-between text-[10px] text-muted font-bold tracking-wider uppercase mb-1.5">
                    <span>{t("reading.progress")}</span>
                    <span className="text-gold">{readingNowBook.progress || 65}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-background border border-border rounded-full overflow-hidden">
                    <div 
                      className="bg-gold h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${readingNowBook.progress || 65}%` }} 
                    />
                  </div>
                </div>

                {/* Favorite Quote */}
                {readingNowBook.favoriteQuote && (
                  <div className="border-l-2 border-gold/40 pl-4 py-1 italic text-muted-foreground text-base mb-6 font-sans">
                    "{readingNowBook.favoriteQuote.replace(/^- /, "")}"
                  </div>
                )}

                {/* Lessons Learned */}
                {readingNowBook.lessonsLearned && (
                  <div className="mb-4">
                    <span className="block text-[10px] font-extrabold text-gold uppercase tracking-widest mb-1.5">{t("reading.takeaways")}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-[650px]">{readingNowBook.lessonsLearned}</p>
                  </div>
                )}

                {/* Changed Thinking */}
                {readingNowBook.changedThinking && (
                  <div className="mb-4">
                    <span className="block text-[10px] font-extrabold text-gold uppercase tracking-widest mb-1.5">Fikrlarimni qanday o'zgartirdi?</span>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-[650px] italic">{readingNowBook.changedThinking}</p>
                  </div>
                )}

                {/* Related Articles */}
                {readingNowBook.relatedArticles && readingNowBook.relatedArticles.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-extrabold text-gold uppercase tracking-widest mb-1.5">Bog'liq maqolalar</span>
                    <div className="flex gap-4">
                      {readingNowBook.relatedArticles.map((art: any, i: number) => (
                        <Link 
                          key={i} 
                          to={`/article/${art.slug}`} 
                          className="text-xs text-primary hover:text-gold hover:underline font-semibold flex items-center gap-1 focus-ring rounded"
                        >
                          <span>{art.title}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* View library CTA */}
              <div className="mt-8 pt-6 border-t border-border/50 flex justify-end">
                <Link 
                  to={`${langPrefix}/books`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-hover hover:underline underline-offset-4 decoration-2 decoration-gold/30 transition-colors focus-ring rounded"
                >
                  <span>{t("reading.library")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Writing Section */}
      <section id="writing" className="w-full">
        <FadeIn className="mb-[32px]">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">
            {currentLang === "en" ? "ESSAYS & ANALYSIS" : currentLang === "ru" ? "ЭССЕ И АНАЛИТИКА" : "ESSELAR VA TAHLILLAR"}
          </span>
          <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">
            {currentLang === "en" ? "Author Essays" : currentLang === "ru" ? "Авторские статьи" : "Mualliflik maqolalari"}
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mt-2">
            {currentLang === "en" ? "Analysis on marketing, finance, behavioral economics and psychology." : currentLang === "ru" ? "Анализ вопросов маркетинга, финансов, поведенческой экономики и психологии." : "Marketing, moliya, xulq-atvor iqtisodiyoti va psixologiya masalalari bo'yicha tahlillar."}
          </p>
        </FadeIn>

        {error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-[20px] p-6 text-destructive-foreground text-sm text-left">
            {currentLang === "en" ? "Database connection error:" : currentLang === "ru" ? "Ошибка подключения к базе данных:" : "Ma'lumotlar bazasiga ulanishda xatolik:"} {error}
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white dark:bg-card border border-border rounded-[24px] p-12 text-center text-muted-foreground">
            {currentLang === "en" ? "No articles published yet." : currentLang === "ru" ? "Статьи еще не опубликованы." : "Hozircha maqolalar chop etilmagan."}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
            {articles.slice(0, 3).map((article) => (
              <StaggerItem key={article.id}>
                <Link to={`${langPrefix}/article/${article.slug}`} className="group flex flex-col bg-white dark:bg-card border border-border p-8 rounded-[24px] h-full hover:border-gold hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 text-left focus-ring">
                  {article.coverImage && (
                    <div className="aspect-[16/10] rounded-[16px] overflow-hidden bg-background border border-border/50 mb-5 relative">
                      <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" loading="lazy" />
                    </div>
                  )}
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gold tracking-widest uppercase block mb-3">
                        {article.categories?.[0]?.name || "Behavioral Economics"}
                      </span>
                      <h3 className="font-heading text-[22px] font-bold text-foreground mb-3 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                        {article.excerpt || article.content.substring(0, 100).replace(/<[^>]*>/g, "") + "..."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted font-medium border-t border-border/50 pt-4 mt-auto">
                      <span>{new Date(article.createdAt).toLocaleDateString(currentLang === "uz" ? "uz-UZ" : currentLang === "ru" ? "ru-RU" : "en-US")}</span>
                      <span className="group-hover:text-gold transition-colors flex items-center gap-1 font-bold uppercase tracking-wider text-[10px]">
                        {currentLang === "en" ? "Read" : currentLang === "ru" ? "Читать" : "O'qish"}
                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>

      {/* Digital Garden Teaser Section */}
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

      {/* Books Shelf Section */}
      <section className="w-full">
        <FadeIn className="mb-[32px]">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">{t("libraryPage.badge")}</span>
          <h2 className="font-heading text-3xl md:text-[42px] leading-tight text-foreground font-bold">{t("libraryPage.title")}</h2>
          <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mt-2">
            {t("libraryPage.desc")}
          </p>
        </FadeIn>

        {books.length === 0 ? (
          <div className="bg-white dark:bg-card border border-border rounded-[24px] p-8 text-center text-muted-foreground">
            {currentLang === "en" ? "Bookshelf is empty." : currentLang === "ru" ? "Книжная полка пуста." : "Kitob javoni bo'sh."}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
            {books.slice(0, 4).map((book) => (
              <StaggerItem key={book.id}>
                <Link to={`${langPrefix}/books/${book.slug}`} className="group flex flex-col bg-white dark:bg-card border border-border p-6 rounded-[24px] h-full hover:border-gold hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 text-left focus-ring">
                  <div className="aspect-[2/3] w-full bg-background rounded-lg overflow-hidden border border-border/60 mb-4 p-1 bg-white">
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="w-full h-full object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading text-[18px] font-bold text-foreground leading-snug line-clamp-1 group-hover:text-gold transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">{book.author}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                        {book.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase pt-3 border-t border-border/55">
                      <span className="text-gold">★ {book.rating || 5}/5</span>
                      <span className="text-muted-foreground group-hover:text-gold transition-colors">
                        {currentLang === "en" ? "Thoughts &rarr;" : currentLang === "ru" ? "Отзыв &rarr;" : "Fikr &rarr;"}
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>

      {/* Now Section (inspired by nownownow.com) */}
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

      {/* Newsletter Section */}
      <section id="newsletter" className="w-full">
        <FadeIn>
          <SubscribeForm />
        </FadeIn>
      </section>

      {/* About Section */}
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

      {/* Contact Section */}
      <section id="contact" className="w-full">
        <div className="bg-primary text-primary-foreground border border-dark-green rounded-[24px] p-8 md:p-12 lg:p-16 text-center max-w-[850px] mx-auto relative overflow-hidden">
          {/* Subtle noise pattern */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')]" />

          <FadeIn className="flex flex-col items-center">
            <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">{t("contact.badge")}</span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              {t("contact.title")}
            </h2>
            <p className="font-sans text-base text-primary-foreground/80 max-w-[600px] leading-relaxed mb-8">
              {t("contact.desc")}
            </p>

            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-8 py-3.5 bg-gold hover:bg-gold-hover text-white rounded-[24px] font-bold uppercase tracking-wider text-xs transition-all duration-300 hover:shadow-md hover:shadow-gold/25 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus-ring inline-flex items-center gap-2 mb-12 cursor-pointer"
            >
              <span>{t("contact.cta")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-8 font-semibold border-t border-primary-foreground/15 pt-8 w-full max-w-md">
              <a href="https://linkedin.com/in/akbaralisottorov" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-sm focus-ring rounded">LinkedIn</a>
              <a href="https://github.com/akbaralisottorov" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-sm focus-ring rounded">GitHub</a>
              <a href="mailto:akbaraliy.phone@gmail.com" className="hover:text-gold transition-colors text-sm focus-ring rounded">Email</a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-sm focus-ring rounded">X (Twitter)</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Dialog */}
      <ContactDialog isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
