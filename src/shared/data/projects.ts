import { Language } from "@/shared/types";

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  status: string;
  statusColor: string;
  motivation: string;
  problem: string;
  research: string;
  solution: string;
  architecture: {
    description: string;
    nodes: { id: string; label: string; details: string }[];
    edges: { from: string; to: string; label?: string }[];
  };
  techStack: string[];
  website: string;
  github: string;
  image: string;
  cta: string;
  challenges: string;
  lessonsLearned: string;
  futureImprovements: string;
  timeline: string;
  relatedArticles?: { title: string; slug: string }[];
  relatedTechnologies?: string[];
}

const PROJECTS_DATA: Record<Language, ProjectCaseStudy[]> = {
  uz: [
    {
      slug: "tax-helper",
      title: "Tax Helper",
      status: "Hozirda qurilmoqda",
      statusColor: "bg-gold/15 text-gold border-gold/25",
      motivation: "O'zbekistondagi mustaqil ijodkorlar va frilanserlar uchun soliq qonunchiligi o'ta chigal bo'lib, xatoliklar katta jarimalarga sabab bo'lardi. Men bu jarayonni hamma uchun oson va xavfsiz qilmoqchi bo'ldim.",
      problem: "Kichik biznes va yakka tartibdagi tadbirkorlar uchun soliq majburiyatlarini tezkor hisoblash va qonuniy imtiyozlarni aniqlash imkoni yo'qligi.",
      research: "Mustaqil frilanserlar o'rtasida o'tkazilgan so'rovnoma shuni ko'rsatdiki, 80% dan ortiq foydalanuvchilar qaysi soliq rejimini (JShDS, YATT yoki O'zini o'zi band qilish) tanlashni bilishmaydi. Qonunchilik hujjatlari doimiy yangilanganligi sababli, hisob-kitoblarda chalkashliklar yuzaga keladi.",
      solution: "Soliq kalkulyatori, real vaqt rejimidagi soliq kodeksi AI tahlilchisi va avtomatlashtirilgan oylik hisobotlarni tayyorlovchi portal yaratildi.",
      architecture: {
        description: "Loyiha Next.js 14 server funksiyalaridan foydalanib, OpenAI API modelini PostgreSQL va Prisma ORM bilan bog'laydi.",
        nodes: [
          { id: "client", label: "Client View (Next.js)", details: "Responsive interfeys, soliq kalkulyatori" },
          { id: "api", label: "API Handlers", details: "Soliq algoritmlari va JWT xavfsizlik tekshiruvi" },
          { id: "ai", label: "OpenAI Engine", details: "Soliq kodeksi ma'lumotlar bazasi va semantik agent" },
          { id: "db", label: "PostgreSQL (Prisma)", details: "Foydalanuvchi ma'lumotlari, soliq hisobotlari va keshlar" }
        ],
        edges: [
          { from: "client", to: "api", label: "Request" },
          { from: "api", to: "ai", label: "Embeddings/Analyze" },
          { from: "api", to: "db", label: "Query" }
        ]
      },
      techStack: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      website: "https://taxhelper.uz",
      github: "https://github.com/akbaralisottorov/tax-helper-ai",
      image: "/project_tax_helper.png",
      cta: "Soliq assistentini sinab ko'rish",
      challenges: "O'zbekiston soliq kodeksi hujjatlarining o'zgaruvchanligi va AI modellarini yangi qarorlar bilan tezkor ta'minlash eng katta texnik qiyinchilik bo'ldi.",
      lessonsLearned: "Qonunchilik tez-tez yangilanganda AI bilimlar omborini (Vector DB/Embeddings) avtomatlashtirilgan parserlar yordamida tez-tez sinxronlash strategiyasini o'rgandim.",
      futureImprovements: "Hisobotlarni to'g'ridan-to'g'ri soliq qo'mitasining API tizimiga integratsiya qilish va avtomatlashtirilgan to'lov tizimlarini joriy etish.",
      timeline: "3 oy (Hozirda faol ishlab chiqishda)",
      relatedTechnologies: ["AI Agent", "RAG Architecture", "Vector Embeddings", "Fintech API"],
      relatedArticles: [
        { title: "Soliq sohasida Sun'iy Intellekt", slug: "ai-in-taxes" }
      ]
    },
    {
      slug: "teran-fikr",
      title: "Teran Fikr",
      status: "Tugallangan",
      statusColor: "bg-success/15 text-success border-success/25",
      motivation: "Uzbek internet segmentida yuzaki xabarlar ko'p, biroq chuqur, dalillarga tayangan va odamni mushohada qilishga chorlaydigan tahlillar yo'q darajada edi.",
      problem: "O'quvchilar uchun reklamasiz, shoshilmasdan chuqur maqolalarni mutolaa qilish imkonini beruvchi intellektual tahliliy platformaning yetishmasligi.",
      research: "Tahliliy kontent iste'molchilarining o'qish xulq-atvori tahlil qilindi va chalg'ituvchi bannerlar, pop-uplar o'quvchi diqqatini 40% ga kamaytirishi aniqlandi.",
      solution: "Faqat matn va o'qish qulayligiga qaratilgan premium tipografiyali, toza, minimalist dizayn tizimi yaratildi va Express/React backend tizimi bilan birlashtirildi.",
      architecture: {
        description: "Minimalist va yuqori tezlikdagi SSR-ga moslashgan platforma arxitekturasi.",
        nodes: [
          { id: "react", label: "React Frontend", details: "Premium dizayn, tipografik sozlangan layout" },
          { id: "express", label: "Express API", details: "Maqolalar boshqaruvi va o'quvchi tahlillari" },
          { id: "prisma", label: "Prisma & Postgres", details: "Maqolalar va kategoriyalar ombori" }
        ],
        edges: [
          { from: "react", to: "express" },
          { from: "express", to: "prisma" }
        ]
      },
      techStack: ["React", "Tailwind CSS", "PostgreSQL", "Node.js", "Express", "Prisma"],
      website: "https://teranfikr.uz",
      github: "https://github.com/akbaralisottorov/teran-fikr",
      image: "/project_teran_fikr.png",
      cta: "Tahlillar platformasiga o'tish",
      challenges: "Veb-sayt tezligini maksimal darajada saqlash va turli ekranlar uchun premium shriftlar uyg'unligini moslashtirish.",
      lessonsLearned: "Raqamli shovqin asrida odamlar baribir sifatli va chuqur matnlarni qidirishini, chiroyli va sokin muhit unga bo'lgan ishtiyoqni oshirishini tushundim.",
      futureImprovements: "Foydalanuvchilarga maqolalarni audio formatida eshitish imkonini beruvchi sun'iy ovoz xizmatini ulash.",
      timeline: "2 oy",
      relatedTechnologies: ["Typography System", "Responsive Layouts", "SEO Optimization"],
      relatedArticles: [
        { title: "Xulq-atvor iqtisodiyoti va dizayn", slug: "behavioral-design" }
      ]
    },
    {
      slug: "pio-pay",
      title: "PIO Pay",
      status: "Tugallangan",
      statusColor: "bg-success/15 text-success border-success/25",
      motivation: "O'zim frilansirlik qilganimda xalqaro mijozlardan haq to'lashdagi murakkab to'siqlar va ulkan komissiyalarga duch kelgan edim. Bu muammoni hal qilish zarur edi.",
      problem: "Markaziy Osiyodagi frilanserlar uchun xalqaro to'lovlarni qabul qilishdagi yuqori komissiyalar va tranzaksiya muddatlarining uzoqligi.",
      research: "Frilanserlarning xalqaro hisob-kitoblarining 60% qismi o'rtacha 5-7% yo'qotish va bank xarajatlari bilan yuz berishi aniqlandi.",
      solution: "Stripe to'lov shlyuzi bilan bevosita integratsiya ishlab chiqildi va tranzaksiyalar yo'nalishini optimallashtiradigan maxsus marshrutlash algoritmi joriy etildi.",
      architecture: {
        description: "Xavfsizlik va tezkor to'lov marshrutlariga mo'ljallangan fintech arxitekturasi.",
        nodes: [
          { id: "next", label: "Next.js App", details: "Mijoz portali va tranzaktsiyalar tarixi" },
          { id: "stripe", label: "Stripe Gateway", details: "Xalqaro to'lovlarni qabul qilish xizmati" },
          { id: "api", label: "Routing API", details: "Hisob-kitoblar va valyuta konvertatsiyasi" }
        ],
        edges: [
          { from: "next", to: "api" },
          { from: "api", to: "stripe" }
        ]
      },
      techStack: ["Next.js", "Stripe API", "TypeScript", "Tailwind CSS", "Node.js"],
      website: "https://piopay.com",
      github: "https://github.com/akbaralisottorov/pio-pay",
      image: "/project_pio_pay.png",
      cta: "To'lov tizimini tahlil qilish",
      challenges: "Xavfsizlik talablarining yuqoriligi va to'lov holatlarining to'liq sinxronlashishini ta'minlash.",
      lessonsLearned: "Moliyaviy mahsulotlar yaratishda API barqarorligi va tranzaksiyalarning xavfsizligi eng birinchi o'rindagi muhim ustuvorlik ekanligi o'z isbotini topdi.",
      futureImprovements: "Ko'proq mahalliy to'lov tizimlari (Payme, Click) va boshqa xalqaro provayderlarni qo'shish.",
      timeline: "4 oy",
      relatedTechnologies: ["Fintech Integrations", "Security Auditing", "Webhooks Processing"]
    },
    {
      slug: "hraksso-ai",
      title: "HRAkso AI",
      status: "Tugallangan",
      statusColor: "bg-success/15 text-success border-success/25",
      motivation: "Kompaniyalar nomzodlarni tanlashda faqat quruq rezyumega suyanib, ularning haqiqiy kognitiv qobiliyatlari va jamoaviy qadriyatlarga mosligini ko'rmas edilar.",
      problem: "Karta hajmdagi arizalarni saralashdagi subyektivlik va kognitiv empatiya darajasini rezyume orqali aniqlab bo'lmasligi.",
      research: "An'anaviy suhbat jarayonlari va rezyume tahlillari haqiqiy jamoaviy qadriyatlarga moslikni 35% dan ortiq aniqlay olmasligi tadqiq etildi.",
      solution: "Nomzodlarning yozma javoblarini kognitiv va xulq-atvor dinamikasi bo'yicha tahlil qiluvchi neyrotizim modellarini Python FastAPI yordamida yozdik.",
      architecture: {
        description: "Python FastAPI asosida qurilgan NLP tahlil modeli va React interfeysi.",
        nodes: [
          { id: "react", label: "React Dashboard", details: "HR menejeri uchun tahlillar oynasi" },
          { id: "fastapi", label: "FastAPI Server", details: "NLP modellarini boshqarish va integratsiya" },
          { id: "nlp", label: "NLP Models", details: "Kognitiv va semantik tahlillar dvigateli" }
        ],
        edges: [
          { from: "react", to: "fastapi" },
          { from: "fastapi", to: "nlp" }
        ]
      },
      techStack: ["React", "Python", "FastAPI", "Tailwind CSS", "PyTorch", "Hugging Face"],
      website: "https://hraksso.ai",
      github: "https://github.com/akbaralisottorov/hraksso-ai",
      image: "/project_hraksso_ai.png",
      cta: "Baholash tizimi demosini sinash",
      challenges: "NLP modellarini o'zbek tili grammatikasi va semantikasiga moslashtirish, kognitiv parametrlarni to'g'ri baholash.",
      lessonsLearned: "Sun'iy intellekt faqatgina insoniy qarorlar uchun ko'makchi ekanini, yakuniy tanlovda esa baribir shaxsiy suhbat va hissiy intellekt muhimligini angladim.",
      futureImprovements: "Audio suhbatlarni real vaqtda tahlil qiluvchi nutq modellarini ulash.",
      timeline: "5 oy",
      relatedTechnologies: ["Natural Language Processing", "FastAPI Development", "Machine Learning models"]
    }
  ],
  en: [
    {
      slug: "tax-helper",
      title: "Tax Helper",
      status: "Under Construction",
      statusColor: "bg-gold/15 text-gold border-gold/25",
      motivation: "Tax regulations for independent creators and freelancers in Uzbekistan are extremely complex, and mistakes lead to heavy fines. I wanted to make this process simple and safe for everyone.",
      problem: "The lack of quick tax calculation and legal benefit identification tools for small businesses and individual entrepreneurs.",
      research: "A survey among independent freelancers showed that over 80% did not know which tax regime to select (PIT, Individual Entrepreneur, or Self-employed). Constant regulatory updates created extreme calculation confusion.",
      solution: "Created a tax calculator, a real-time AI tax code analyzer, and a portal generating automated monthly reports.",
      architecture: {
        description: "The project uses Next.js 14 Server Actions to bridge OpenAI API with PostgreSQL using Prisma ORM.",
        nodes: [
          { id: "client", label: "Client View (Next.js)", details: "Responsive UI and Soliq Calculator" },
          { id: "api", label: "API Handlers", details: "Tax calculation algorithms and JWT authorization checks" },
          { id: "ai", label: "OpenAI Engine", details: "Tax code database context and semantic bot agent" },
          { id: "db", label: "PostgreSQL (Prisma)", details: "User data, tax reports, and caching" }
        ],
        edges: [
          { from: "client", to: "api", label: "Request" },
          { from: "api", to: "ai", label: "Embeddings/Analyze" },
          { from: "api", to: "db", label: "Query" }
        ]
      },
      techStack: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      website: "https://taxhelper.uz",
      github: "https://github.com/akbaralisottorov/tax-helper-ai",
      image: "/project_tax_helper.png",
      cta: "Try Tax Assistant",
      challenges: "Ensuring the AI engine stays synced with the volatile Uzbek tax code laws in real-time.",
      lessonsLearned: "I realized the key is building automated parsers that constantly update the AI's knowledge base (Vector DB/Embeddings).",
      futureImprovements: "Integrate tax reports directly with the government tax portal API and implement automated bank payment systems.",
      timeline: "3 months (Active)",
      relatedTechnologies: ["AI Agent", "RAG Architecture", "Vector Embeddings", "Fintech API"],
      relatedArticles: [
        { title: "Artificial Intelligence in Taxes", slug: "ai-in-taxes" }
      ]
    },
    {
      slug: "teran-fikr",
      title: "Teran Fikr",
      status: "Completed",
      statusColor: "bg-success/15 text-success border-success/25",
      motivation: "The Uzbek internet segment has plenty of superficial news, but deep, evidence-based analysis was virtually non-existent.",
      problem: "Lack of an intellectual analysis platform for readers to enjoy deep articles without ads or rush.",
      research: "Analysis of reader behavior indicated that distracting banner ads and pop-ups reduce focus span by over 40%.",
      solution: "Created an elegant typography-focused, clean, minimalist design system and integrated it with an Express/React backend.",
      architecture: {
        description: "High-performance platform structured for quick server-side parsing.",
        nodes: [
          { id: "react", label: "React Frontend", details: "Premium design, highly tailored typography layout" },
          { id: "express", label: "Express API", details: "Article management and reader analytics" },
          { id: "prisma", label: "Prisma & Postgres", details: "Articles and categories repository" }
        ],
        edges: [
          { from: "react", to: "express" },
          { from: "express", to: "prisma" }
        ]
      },
      techStack: ["React", "Tailwind CSS", "PostgreSQL", "Node.js", "Express", "Prisma"],
      website: "https://teranfikr.uz",
      github: "https://github.com/akbaralisottorov/teran-fikr",
      image: "/project_teran_fikr.png",
      cta: "Go to Essays Platform",
      challenges: "Maintaining exceptional website speeds while loading premium custom fonts across device displays.",
      lessonsLearned: "In the digital noise era, people still look for quality, deep writing, and a beautiful, quiet environment boosts that interest.",
      futureImprovements: "Integrate synthetic voice services to allow readers to listen to essays in audio format.",
      timeline: "2 months",
      relatedTechnologies: ["Typography System", "Responsive Layouts", "SEO Optimization"],
      relatedArticles: [
        { title: "Behavioral Economics and Design", slug: "behavioral-design" }
      ]
    },
    {
      slug: "pio-pay",
      title: "PIO Pay",
      status: "Completed",
      statusColor: "bg-success/15 text-success border-success/25",
      motivation: "As a freelancer, I faced high commissions and complex barriers when receiving payments from international clients. This had to be solved.",
      problem: "High commissions and long transaction times for freelancers in Central Asia to accept international payments.",
      research: "Discovered that 60% of international freelancer transfers suffer from 5-7% total value leakage due to mediator bank exchanges.",
      solution: "Developed a direct integration with Stripe and implemented a routing algorithm that optimizes transaction routes.",
      architecture: {
        description: "Secure and optimized payment processing routing.",
        nodes: [
          { id: "next", label: "Next.js App", details: "Client portal and transaction histories dashboard" },
          { id: "stripe", label: "Stripe Gateway", details: "International acquiring service handler" },
          { id: "api", label: "Routing API", details: "Accounting and currency exchange optimization engine" }
        ],
        edges: [
          { from: "next", to: "api" },
          { from: "api", to: "stripe" }
        ]
      },
      techStack: ["Next.js", "Stripe API", "TypeScript", "Tailwind CSS", "Node.js"],
      website: "https://piopay.com",
      github: "https://github.com/akbaralisottorov/pio-pay",
      image: "/project_pio_pay.png",
      cta: "Analyze Payment System",
      challenges: "Securing bank-grade transaction states and keeping background webhooks fully synchronized.",
      lessonsLearned: "When building financial products, API stability and transaction security are the highest priorities.",
      futureImprovements: "Integrate local APIs (Payme, Click) alongside international gateways.",
      timeline: "4 months",
      relatedTechnologies: ["Fintech Integrations", "Security Auditing", "Webhooks Processing"]
    },
    {
      slug: "hraksso-ai",
      title: "HRAkso AI",
      status: "Completed",
      statusColor: "bg-success/15 text-success border-success/25",
      motivation: "Companies relied purely on flat resumes, failing to see candidates' true cognitive abilities and cultural alignment.",
      problem: "Subjectivity in screening high volumes of applications and inability to detect cognitive empathy via resumes.",
      research: "Demonstrated that typical interview reviews only identify true team value match under 35% of the time.",
      solution: "We developed neural network models using Python FastAPI to analyze candidates' answers for cognitive and behavioral dynamics.",
      architecture: {
        description: "Python FastAPI NLP processing engine alongside a React dashboard.",
        nodes: [
          { id: "react", label: "React Dashboard", details: "Manager analytics dashboard" },
          { id: "fastapi", label: "FastAPI Server", details: "NLP model orchestrator and integrations layer" },
          { id: "nlp", label: "NLP Models", details: "Cognitive and semantic analysis engine" }
        ],
        edges: [
          { from: "react", to: "fastapi" },
          { from: "fastapi", to: "nlp" }
        ]
      },
      techStack: ["React", "Python", "FastAPI", "Tailwind CSS", "PyTorch", "Hugging Face"],
      website: "https://hraksso.ai",
      github: "https://github.com/akbaralisottorov/hraksso-ai",
      image: "/project_hraksso_ai.png",
      cta: "Try Assessment System Demo",
      challenges: "Fine-tuning NLP models for Uzbek language semantics and parsing cognitive criteria reliably.",
      lessonsLearned: "AI is only an assistant for human decisions; personal interviews and emotional intelligence remain key for the final choice.",
      futureImprovements: "Add real-time voice speech analysis models.",
      timeline: "5 months",
      relatedTechnologies: ["Natural Language Processing", "FastAPI Development", "Machine Learning models"]
    }
  ],
  ru: [
    {
      slug: "tax-helper",
      title: "Tax Helper",
      status: "Разрабатывается",
      statusColor: "bg-gold/15 text-gold border-gold/25",
      motivation: "Налоговое законодательство для независимых создателей контента и фрилансеров в Узбекистане слишком сложное, и ошибки ведут к крупным штрафам. Я хотел сделать этот процесс простым для каждого.",
      problem: "Отсутствие инструментов для быстрого расчета налогов и выявления льгот для малого бизнеса.",
      research: "Опрос показал, что 80% фрилансеров не знают, какой налоговый режим выбрать. Постоянные изменения законов вызывают серьезную путаницу в расчетах.",
      solution: "Создали калькулятор налогов, ИИ-помощник реального времени по налоговому кодексу и портал автоматической отчетности.",
      architecture: {
        description: "Проект использует Server Actions Next.js 14 для связи OpenAI API с PostgreSQL через Prisma ORM.",
        nodes: [
          { id: "client", label: "Клиент (Next.js)", details: "Адаптивный интерфейс и налоговый калькулятор" },
          { id: "api", label: "API Обработчики", details: "Налоговые алгоритмы и валидация JWT" },
          { id: "ai", label: "Модель OpenAI", details: "Налоговый кодекс как векторная база знаний" },
          { id: "db", label: "PostgreSQL (Prisma)", details: "Данные пользователей, кэш и отчеты" }
        ],
        edges: [
          { from: "client", to: "api", label: "Запрос" },
          { from: "api", to: "ai", label: "Анализ/Векторы" },
          { from: "api", to: "db", label: "База данных" }
        ]
      },
      techStack: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      website: "https://taxhelper.uz",
      github: "https://github.com/akbaralisottorov/tax-helper-ai",
      image: "/project_tax_helper.png",
      cta: "Попробовать Tax Helper",
      challenges: "Обеспечение оперативной синхронизации базы знаний ИИ с часто меняющимся законодательством.",
      lessonsLearned: "Я понял, что ключом является автоматический парсинг законов для обновления Vector DB.",
      futureImprovements: "Прямая отправка отчетов в ГНК по API и автоплатежи.",
      timeline: "3 месяца (Активно)",
      relatedTechnologies: ["AI Agent", "RAG Architecture", "Vector Embeddings", "Fintech API"],
      relatedArticles: [
        { title: "Искусственный интеллект в налогах", slug: "ai-in-taxes" }
      ]
    },
    {
      slug: "teran-fikr",
      title: "Teran Fikr",
      status: "Завершено",
      statusColor: "bg-success/15 text-success border-success/25",
      motivation: "В узбекском сегменте интернета много поверхностных новостей, но качественная аналитика на основе фактов практически отсутствовала.",
      problem: "Нехватка аналитической платформы для вдумчивого чтения глубоких текстов без рекламы и спешки.",
      research: "Анализ поведения читателей показал, что реклама снижает концентрацию внимания на 40%.",
      solution: "Создали элегантную типографическую дизайн-систему на React/Express без баннеров.",
      architecture: {
        description: "Архитектура ориентирована на максимальную скорость отрисовки текста.",
        nodes: [
          { id: "react", label: "React Фронтенд", details: "Премиальная типографика, чистый интерфейс" },
          { id: "express", label: "Express API", details: "Управление статьями и базовая статистика" },
          { id: "prisma", label: "Prisma & Postgres", details: "Хранилище статей" }
        ],
        edges: [
          { from: "react", to: "express" },
          { from: "express", to: "prisma" }
        ]
      },
      techStack: ["React", "Tailwind CSS", "PostgreSQL", "Node.js", "Express", "Prisma"],
      website: "https://teranfikr.uz",
      github: "https://github.com/akbaralisottorov/teran-fikr",
      image: "/project_teran_fikr.png",
      cta: "Перейти к статьям",
      challenges: "Оптимизация шрифтов для быстрой загрузки на всех экранах.",
      lessonsLearned: "Люди все еще ищут вдумчивый контент в эпоху шума, если предоставить им подходящую среду.",
      futureImprovements: "Добавление озвучки статей с помощью ИИ.",
      timeline: "2 месяца",
      relatedTechnologies: ["Typography System", "Responsive Layouts", "SEO Optimization"],
      relatedArticles: [
        { title: "Поведенческая экономика и дизайн", slug: "behavioral-design" }
      ]
    },
    {
      slug: "pio-pay",
      title: "PIO Pay",
      status: "Завершено",
      statusColor: "bg-success/15 text-success border-success/25",
      motivation: "Работая фрилансером, я столкнулся с огромными комиссиями и сложностями при приеме валюты. Решил сделать платежную систему.",
      problem: "Высокие комиссии и долгие переводы для фрилансеров Центральной Азии от зарубежных клиентов.",
      research: "Переводы фрилансеров теряют 5-7% на комиссиях банков-посредников.",
      solution: "Разработали прямую интеграцию со Stripe и умный алгоритм маршрутизации оплат.",
      architecture: {
        description: "Безопасное проведение транзакций через Stripe.",
        nodes: [
          { id: "next", label: "Next.js Портал", details: "Кабинет пользователя и история транзакций" },
          { id: "stripe", label: "Шлюз Stripe", details: "Проведение международных оплат" },
          { id: "api", label: "Routing API", details: "Конвертация валют и проводка" }
        ],
        edges: [
          { from: "next", to: "api" },
          { from: "api", to: "stripe" }
        ]
      },
      techStack: ["Next.js", "Stripe API", "TypeScript", "Tailwind CSS", "Node.js"],
      website: "https://piopay.com",
      github: "https://github.com/akbaralisottorov/pio-pay",
      image: "/project_pio_pay.png",
      cta: "Анализировать систему",
      challenges: "Безопасность банковского уровня и надежные вебхуки.",
      lessonsLearned: "При создании финтех-продуктов стабильность API и безопасность транзакций важнее всего.",
      futureImprovements: "Поддержка Payme/Click наряду со Stripe.",
      timeline: "4 месяца",
      relatedTechnologies: ["Fintech Integrations", "Security Auditing", "Webhooks Processing"]
    },
    {
      slug: "hraksso-ai",
      title: "HRAkso AI",
      status: "Завершено",
      statusColor: "bg-success/15 text-success border-success/25",
      motivation: "Компании оценивали соискателей только по резюме, упуская когнитивные способности и ценности человека.",
      problem: "Субъективность и медленный скрининг тысяч резюме.",
      research: "Обычное интервью определяет культурное соответствие кандидата лишь в 35% случаев.",
      solution: "Разработали модели NLP на Python FastAPI для анализа когнитивных и поведенческих качеств по текстовым ответам.",
      architecture: {
        description: "FastAPI сервер с NLP моделями и React панелью.",
        nodes: [
          { id: "react", label: "Панель React", details: "Аналитика для рекрутера" },
          { id: "fastapi", label: "Сервер FastAPI", details: "Оркестрация ИИ-моделей" },
          { id: "nlp", label: "Модели NLP", details: "Анализатор смыслов и когнитивных карт" }
        ],
        edges: [
          { from: "react", to: "fastapi" },
          { from: "fastapi", to: "nlp" }
        ]
      },
      techStack: ["React", "Python", "FastAPI", "Tailwind CSS", "PyTorch", "Hugging Face"],
      website: "https://hraksso.ai",
      github: "https://github.com/akbaralisottorov/hraksso-ai",
      image: "/project_hraksso_ai.png",
      cta: "Попробовать демо-оценку",
      challenges: "Адаптация моделей для узбекского языка и точность поведенческих тестов.",
      lessonsLearned: "ИИ — лишь ассистент, последнее слово все равно за живым эмоциональным интеллектом на интервью.",
      futureImprovements: "Добавление анализа устной речи кандидатов.",
      timeline: "5 месяцев",
      relatedTechnologies: ["Natural Language Processing", "FastAPI Development", "Machine Learning models"]
    }
  ]
};

export function getLocalizedProjectsData(lang: Language): ProjectCaseStudy[] {
  return PROJECTS_DATA[lang] || PROJECTS_DATA.uz;
}

export function getProjectBySlug(slug: string, lang: Language): ProjectCaseStudy | undefined {
  const list = getLocalizedProjectsData(lang);
  return list.find(p => p.slug === slug);
}
