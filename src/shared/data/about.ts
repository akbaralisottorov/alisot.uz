import { Language } from "@/shared/types";

export interface AboutTimelineEvent {
  year: string;
  title: string;
  role: string;
  description: string;
  icon: "work" | "education" | "award" | "milestone";
}

export interface FocusArea {
  title: string;
  description: string;
  iconName: "target" | "brain" | "trending-up";
}

export interface ValueItem {
  title: string;
  description: string;
}

const TIMELINE_EVENTS: Record<Language, AboutTimelineEvent[]> = {
  en: [
    {
      year: "2026",
      title: "Created Tax Helper AI",
      role: "AI & Tax Integration",
      description: "Built the first AI assistant that allows freelancers and small businesses to calculate and optimize tax reports error-free in 5 minutes.",
      icon: "milestone",
    },
    {
      year: "2025",
      title: "Launched Teran Fikr Platform",
      role: "Premium Essays & Opinions",
      description: "Created an ad-free premium intellectual essay platform in Uzbek, encouraging readers to think deeply and read analysis in a calm environment.",
      icon: "milestone",
    },
    {
      year: "2024",
      title: "Began Studying Behavioral Economics",
      role: "Cognitive Psychology & Finance",
      description: "Started deep analysis of human decision-making biases and research into irrational factors shaping financial and consumer habits.",
      icon: "milestone",
    },
    {
      year: "2023",
      title: "Started Writing Actively Online",
      role: "Thoughts & Analysis",
      description: "Began sharing my library, book summaries, and independent articles on branding and marketing with the public.",
      icon: "milestone",
    },
    {
      year: "2022",
      title: "Built First Digital Project & Personal Site",
      role: "Frontend & Design",
      description: "Learned UI/UX design systems, HTML/CSS and Javascript basics, and created my first digital home on the internet.",
      icon: "milestone",
    },
    {
      year: "2020",
      title: "Steps into Programming & Systems",
      role: "Technology & Logic",
      description: "Self-studied algorithms, data structures, and clean coding culture, laying the foundation for my technological and engineering worldview.",
      icon: "milestone",
    },
  ],
  ru: [
    {
      year: "2026",
      title: "Создал ассистента Tax Helper AI",
      role: "Интеграция ИИ и налогов",
      description: "Создал первого ИИ-ассистента для фрилансеров и малого бизнеса, позволяющего безошибочно рассчитывать и оптимизировать налоговые отчеты за 5 минут.",
      icon: "milestone",
    },
    {
      year: "2025",
      title: "Запустил платформу Teran Fikr",
      role: "Премиум эссе и мнения",
      description: "Создал премиальную интеллектуальную платформу эссе на узбекском языке без рекламы, побуждающую читателей глубоко мыслить и читать аналитику в спокойной обстановке.",
      icon: "milestone",
    },
    {
      year: "2024",
      title: "Начал изучать поведенческую экономику",
      role: "Когнитивная психология и финансы",
      description: "Начал глубокий анализ ошибок принятия решений людьми, исследование иррациональных факторов, формирующих финансовые и потребительские привычки.",
      icon: "milestone",
    },
    {
      year: "2023",
      title: "Начал активно писать в интернете",
      role: "Мысли и анализ",
      description: "Начал делиться с публикой своей библиотекой, конспектами прочитанных книг, независимыми статьями по брендингу и маркетингу.",
      icon: "milestone",
    },
    {
      year: "2022",
      title: "Создал первый цифровой проект и личный сайт",
      role: "Фронтенд и проектирование",
      description: "Изучил основы UI/UX систем дизайна, HTML/CSS и Javascript, создав свою первую цифровую обитель в интернете.",
      icon: "milestone",
    },
    {
      year: "2020",
      title: "Сделал шаги в программирование и системы",
      role: "Технологии и логика",
      description: "Самостоятельно изучил алгоритмы, структуры данных и культуру написания кода, заложив основу своего технологического и инженерного мировоззрения.",
      icon: "milestone",
    },
  ],
  uz: [
    {
      year: "2026",
      title: "Tax Helper AI loyihasini yaratdim",
      role: "AI & Soliq Integratsiyasi",
      description: "Frilanserlar va kichik bizneslarning soliq hisobotlarini 5 daqiqa ichida xatosiz hisoblash va optimallashtirish imkonini beruvchi birinchi AI assistentni qurdim.",
      icon: "milestone",
    },
    {
      year: "2025",
      title: "Teran Fikr platformasini ishga tushirdim",
      role: "Premium Maqolalar & Fikrlar",
      description: "O'zbek tilida reklamasiz, o'quvchini chuqur fikrlash va tahlillarni sokin muhitda o'qishga undaydigan premium intellektual esselar platformasini yaratdim.",
      icon: "milestone",
    },
    {
      year: "2024",
      title: "Xulq-atvor iqtisodiyotini o'rganishga kirishdim",
      role: "Kognitiv Psixologiya & Moliya",
      description: "Insonlarning qaror qabul qilishdagi og'ishlarini chuqur tahlil qilish, ularning moliya va iste'molchilik odatlarini shakllantiruvchi irratsional omillarni tadqiq qilishni boshladim.",
      icon: "milestone",
    },
    {
      year: "2023",
      title: "Internetda faol ravishda yozishni boshladim",
      role: "Fikrlar & Tahlillar",
      description: "Kutubxonam, o'qigan kitoblarim xulosalari, brending va marketing masalalari bo'yicha mustaqil maqolalarimni omma bilan baham ko'rishni boshladim.",
      icon: "milestone",
    },
    {
      year: "2022",
      title: "Ilk raqamli loyiham va shaxsiy saytimni qurdim",
      role: "Frontend & Loyihalash",
      description: "UI/UX dizayn tizimlarini, HTML/CSS va Javascript asoslarini o'rganib, internet olamida o'zimning birinchi raqamli boshpanamni yaratdim.",
      icon: "milestone",
    },
    {
      year: "2020",
      title: "Dasturlash va tizimlarni o'rganishga qadam qo'ydim",
      role: "Texnolgiya & Mantiq",
      description: "Algoritmlar, ma'lumotlar tuzilmasi va kod yozish madaniyatini mustaqil o'rganib, muhandislik va texnologik dunyoqarashimga asos soldim.",
      icon: "milestone",
    },
  ],
};

const FOCUS_AREAS: Record<Language, FocusArea[]> = {
  en: [
    {
      title: "Brand Strategy",
      description: "Defining brand identity, shaping core values, and establishing a strong connection with the audience.",
      iconName: "target",
    },
    {
      title: "Behavioral Economics",
      description: "Applying decision-making mechanisms, cognitive biases, and irrational choices to marketing.",
      iconName: "brain",
    },
    {
      title: "Brand Communications",
      description: "Laws of ideas spreading in society, creative PR, and integrated communication campaigns.",
      iconName: "trending-up",
    },
  ],
  ru: [
    {
      title: "Бренд-стратегия",
      description: "Определение уникальности брендов, формирование ценностей и установление прочной связи с аудиторией.",
      iconName: "target",
    },
    {
      title: "Поведенческая экономика",
      description: "Применение механизмов принятия решений, когнитивных ошибок и иррационального выбора в маркетинге.",
      iconName: "brain",
    },
    {
      title: "Коммуникации бренда",
      description: "Законы распространения идей в обществе, креативный PR и интегрированные коммуникационные кампании.",
      iconName: "trending-up",
    },
  ],
  uz: [
    {
      title: "Brend Strategiyasi",
      description: "Brendlarning o'ziga xosligini aniqlash, qadriyatlarini shakllantirish va auditoriya bilan mustahkam aloqa o'rnatish.",
      iconName: "target",
    },
    {
      title: "Xatti-harakatlar Iqtisodiyoti",
      description: "Odamlarning qaror qabul qilish mexanizmlari, kognitiv xatoliklar va irratsional tanlovlarini marketingga tatbiq etish.",
      iconName: "brain",
    },
    {
      title: "Brand Communications",
      description: "G'oyalarning jamiyatda tarqalish qonuniyatlari, kreativ PR va integratsiyalashgan kommunikatsiya kampaniyalari.",
      iconName: "trending-up",
    },
  ],
};

const VALUES: Record<Language, ValueItem[]> = {
  en: [
    {
      title: "Think Deeply",
      description: "Superficial solutions are temporary. True results are achieved by understanding the root of the problem, human nature, and psychology.",
    },
    {
      title: "Build Consistently",
      description: "Keeping ideas only in your head is useless. Writing practical code and creating products every day reinforces design logic.",
    },
    {
      title: "Share Openly",
      description: "Knowledge and experience should not be hidden. Every analysis shared with the community is a cornerstone of personal growth and trust.",
    },
    {
      title: "Stay Curious",
      description: "Never stop learning. The synthesis of finance, psychology, and technology yields the best results.",
    },
    {
      title: "Learn in Public",
      description: "Do not be ashamed of making mistakes, but writing down the learning process and shortcomings openly helps others too.",
    },
    {
      title: "Prefer Clarity",
      description: "Elegant, minimalist approach maintains attention. Simplicity in words and design is the highest skill.",
    },
  ],
  ru: [
    {
      title: "Думайте глубже",
      description: "Поверхностные решения временны. Настоящий результат достигается за счет понимания сути проблемы, человеческой природы и психологии.",
    },
    {
      title: "Стройте регулярно",
      description: "Бесполезно держать идеи только в голове. Ежедневное написание практического кода и создание продуктов укрепляют логику дизайна.",
    },
    {
      title: "Делитесь открыто",
      description: "Знания и опыт не следует скрывать. Каждый анализ, которым вы делитесь с сообществом, является краеугольным камнем личного роста и доверия.",
    },
    {
      title: "Оставайтесь любознательными",
      description: "Никогда не прекращайте учиться. Синтез финансов, психологии и технологий дает наилучшие результаты.",
    },
    {
      title: "Учитесь публично",
      description: "Не стесняйтесь делать ошибки, открытое описание процесса обучения и недостатков помогает и другим.",
    },
    {
      title: "Предпочитайте ясность",
      description: "Элегантный, минималистичный подход удерживает внимание. Простота в словах и дизайне — высшее мастерство.",
    },
  ],
  uz: [
    {
      title: "Chuqur o'yla. (Think deeply)",
      description: "Yuzaki yechimlar vaqtinchalik. Haqiqiy natija muammoning ildizini, inson tabiati va psixologiyasini anglash orqali erishiladi.",
    },
    {
      title: "Muntazam ravishda qur. (Build consistently)",
      description: "G'oyalarni faqat boshda saqlash foydasiz. Har kuni amaliy kod yozish, mahsulot yaratish dizayn mantiqini mustahkamlaydi.",
    },
    {
      title: "Ochiqchasiga ulash. (Share openly)",
      description: "Bilim va tajribani yashirmaslik lozim. Jamiyatga ulashilgan har bir tahlil shaxsiy o'sish va ishonch poydevoridir.",
    },
    {
      title: "Hamisha izlanuvchan bo'l. (Stay curious)",
      description: "Hech qachon o'rganishdan to'xtamaslik kerak. Moliya, psixologiya va texnologiya sohalari sintezi eng yaxshi natijani beradi.",
    },
    {
      title: "Ko'pchilik oldida o'rgan. (Learn in public)",
      description: "Xatolar qilishdan uyalmaslik, balki o'rganish jarayonini va kamchiliklarni ochiq yozib borish boshqalarga ham yordam beradi.",
    },
    {
      title: "Murakkablikdan ko'ra aniqlikni afzal ko'r. (Clarity)",
      description: "Elegant, minimalist yondashuv diqqatni saqlab qoladi. So'zlar va dizayndagi soddalik — eng yuksak mahoratdir.",
    },
  ],
};

export function getAboutTimelineEvents(lang: Language): AboutTimelineEvent[] {
  return TIMELINE_EVENTS[lang] || TIMELINE_EVENTS.uz;
}

export function getFocusAreas(lang: Language): FocusArea[] {
  return FOCUS_AREAS[lang] || FOCUS_AREAS.uz;
}

export function getValueItems(lang: Language): ValueItem[] {
  return VALUES[lang] || VALUES.uz;
}
