import { useParams, useLocation } from "react-router-dom";

export type Language = "uz" | "en" | "ru";

export const translations = {
  uz: {
    nav: {
      home: "Mundarija",
      writing: "Tahlillar",
      projects: "Loyihalar",
      garden: "Fikrlar bog'i",
      library: "Kutubxona",
      about: "Men haqimda",
      contact: "Aloqa",
      subscribe: "Obuna bo'lish"
    },
    hero: {
      welcome: "RAQAMLI UYIMGA XUSH KELIBSIZ",
      tagline: "Men inson psixologiyasi, moliya va xulq-atvor iqtisodiyoti chorrahasida tadqiqot olib boraman, fikrlarimni baham ko'raman va foydali mahsulotlar quraman.",
      cta_read: "Tahlillarni o'qish",
      cta_view: "Loyihalarni ko'rish",
      reading_now: "Hozir o'qilmoqda",
      focus_project: "Fokusdagi loyiha",
      latest_article: "So'nggi maqola"
    },
    currently: {
      title: "Hozirgi mashg'ulotlar",
      badge: "DIQQAT MARKAZIDA",
      desc: "Mening faol fokus sohalarim, davom etayotgan izlanishlarim va yaratilayotgan loyihalarim paneli.",
      building: "Qurmoqdaman",
      reading: "O'qimoqdaman",
      learning: "O'rganmoqdaman",
      writing: "Yozmoqdaman",
      thinking: "Mulohaza qilyapman",
      status: "Holati",
      updated: "Yangilandi"
    },
    featured: {
      badge: "ENG SO'NGGI E'LON",
      title: "Tanlangan maqola",
      cta: "Tahlilni o'qish"
    },
    projects: {
      badge: "MAHSULOTLAR",
      title: "Tanlangan loyihalar",
      desc: "Psixologiya, brend marketing va sun'iy intellekt chorrahasida yaratilgan foydali yechimlar.",
      motivation: "Motivatsiya",
      problem: "Muammo",
      process: "Jarayon",
      result: "Natija",
      lessons: "Olingan saboqlar",
      site: "Sayt",
      code: "GitHub"
    },
    reading: {
      badge: "MUTOLAA DAFTARI",
      title: "Hozir o'qilmoqda",
      desc: "Hozirda men tahlil qilayotgan, muhim joylarini belgilab o'rganayotgan adabiyot.",
      progress: "Mutolaa jarayoni",
      takeaways: "Asosiy xulosalar",
      changed: "Fikrlarimni qanday o'zgartirdi?",
      related: "Bog'liq maqolalar",
      library: "Qaydlar kutubxonasiga o'tish"
    },
    garden: {
      badge: "RAQAMLI BOG'",
      title: "Fikrlar Bog'i (Digital Garden)",
      desc: "Bu yer faqatgina tayyor maqolalar joyi emas. Bu yer mening tirik fikrlarim, chala qoralangan tushunchalarim, kutilmagan kuzatuvlarim, ilmiy tajribalarim va javobsiz savollarim yetishadigan raqamli bog'dir. Bog' doimo o'sib, yangilanib boradi.",
      cta: "Bog'da sayr qilish"
    },
    libraryPage: {
      badge: "KUTUBXONA",
      title: "Kitob javoni",
      desc: "Mening dunyoqarashimni shakllantirgan eng muhim adabiyotlar va ularning reytingi."
    },
    library: {
      search: "Kitoblar yoki mualliflarni qidirish...",
      status_all: "Barcha kitoblar",
      status_reading: "Hozir o'qilmoqda",
      status_completed: "Tugatilgan",
      status_planned: "O'qish rejalashtirilgan",
      cat_all: "Barcha kategoriyalar",
      loading: "Kutubxona yuklanmoqda...",
      empty: "Siz tanlagan mezonlarga mos keladigan kitoblar topilmadi.",
      by: "Muallif:",
      progress: "Jarayon",
      read_notes: "Qaydlarni o'qish"
    },
    now: {
      badge: "HOZIRGI HOLATIM (NOW)",
      title: "Ayni damdagi hayotim va fokuslarim",
      desc: "nownownow.com tashabbusidan ilhomlanib yaratilgan sahifa.",
      updated: "Yangilangan sana",
      focus: "Asosiy diqqat markazi",
      projects: "Fokusdagi loyihalar",
      experiments: "Tajriba va izlanishlar"
    },
    bio: {
      badge: "BIOGRAFIYA",
      title: "Strategiya va matn ortida.",
      desc: "Men kognitiv fanlar, brend marketingi va moliya kesishmasida ishlayman. Hozirda Toshkent shahrida Moliya yo'nalishi talabasiman. Mening ilmiy izlanishlarim xulq-atvor iqtisodiyotiga — kognitiv og'ishlarning iste'molchilar qaror qabul qilish mexanizmlariga ta'sirini o'rganishga qaratilgan.",
      value1_title: "Birinchi navbatda inson psixologiyasi",
      value1_desc: "Ishontirish — manipulyatsiya emas, balki tanlov arxitekturasini to'g'ri loyihalashdir.",
      value2_title: "Muvaffaqiyatli soddalik",
      value2_desc: "Elegant, minimalist dizayn o'quvchida ma'lumot qabul qilish yengilligini keltirib chiqaradi.",
      stat_books: "O'qilgan kitoblar",
      stat_articles: "Yozilgan maqolalar",
      stat_projects: "Yaratilgan loyihalar",
      stat_years: "Yillik izlanish",
      cta: "Batafsil ma'lumot va xronologiya"
    },
    contact: {
      badge: "SUHBAT QURAMIZ",
      title: "Keling, choy ustida gaplashamiz.",
      desc: "Shunchaki salom demoqchimisiz, qiziqarli kitobni muhokama qilmoqchimisiz yoki bankingizda yangi g'oyalaringiz bormi? Menga istalgan vaqtda maktub yo'llang — men mazmunli suhbatlarga hamisha ochiqman.",
      cta: "Maktub yuborish"
    },
    newsletter: {
      badge: "BEYSLETTER (XABARNOMA)",
      title: "Yakshanba tongidagi mulohaza",
      desc: "Sizga har ikki haftada bir marta eng yaxshi marketing, brend strategiyalari, xulq-atvor iqtisodiyoti bo'yicha tahlillar va kitob xulosalarini yuboraman. Reklamasiz, spamsiz — faqat chuqur kontent.",
      placeholder: "Elektron pochtangiz",
      cta: "Mutolaaga qo'shilish"
    },
    notfound: {
      title: "Sahifa topilmadi",
      desc: "Siz izlayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan.",
      cta: "Bosh sahifaga qaytish"
    },
    footer: {
      desc: "Inson tabiati, kognitiv psixologiya va texnologiyalarni chuqur tahlil qilish orqali insonlar hayotiga yengillik olib keluvchi yechimlar yarataman. Ushbu sayt mening raqamli boshpanam va fikrlar omborimdir.",
      rights: "Barcha huquqlar himoyalangan.",
      status: "Status: Hozirgi holat",
      reading: "O'qilmoqda",
      building: "Qurilmoqda",
      connect: "Aloqada bo'ling"
    },
    articlePage: {
      back: "Barcha maqolalar",
      author: "Muallif",
      readTime: "daqiqa o'qish",
      loading: "Maqola yuklanmoqda..."
    }
  },
  en: {
    nav: {
      home: "Index",
      writing: "Essays",
      projects: "Projects",
      garden: "Digital Garden",
      library: "Library",
      about: "About Me",
      contact: "Contact",
      subscribe: "Subscribe"
    },
    hero: {
      welcome: "WELCOME TO MY DIGITAL HOME",
      tagline: "I conduct research, share ideas, and build useful products at the intersection of human psychology, finance, and behavioral economics.",
      cta_read: "Read Essays",
      cta_view: "View Projects",
      reading_now: "Reading Now",
      focus_project: "Featured Project",
      latest_article: "Latest Essay"
    },
    currently: {
      title: "Current Focus",
      badge: "IN FOCUS",
      desc: "A dashboard of my active focus areas, ongoing research, and projects currently in development.",
      building: "Building",
      reading: "Reading",
      learning: "Learning",
      writing: "Writing",
      thinking: "Thinking",
      status: "Status",
      updated: "Updated"
    },
    featured: {
      badge: "LATEST ESSAY",
      title: "Featured Essay",
      cta: "Read Analysis"
    },
    projects: {
      badge: "PRODUCTS",
      title: "Featured Projects",
      desc: "Useful solutions built at the intersection of psychology, brand marketing, and AI.",
      motivation: "Motivation",
      problem: "Problem",
      process: "Process",
      result: "Result",
      lessons: "Lessons Learned",
      site: "Live Site",
      code: "GitHub"
    },
    reading: {
      badge: "READING JOURNAL",
      title: "Reading Now",
      desc: "Literature I am currently analyzing, annotating, and learning from.",
      progress: "Reading Progress",
      takeaways: "Key Takeaways",
      changed: "How it changed my thinking?",
      related: "Related Essays",
      library: "Go to Notes Library"
    },
    garden: {
      badge: "DIGITAL GARDEN",
      title: "Digital Garden",
      desc: "This is not just a place for finished essays. It is a live digital garden of half-formed thoughts, unexpected observations, experiments, and questions. The garden constantly grows and updates.",
      cta: "Explore Garden"
    },
    libraryPage: {
      badge: "LIBRARY",
      title: "Bookshelf",
      desc: "The books that shaped my worldview, along with my ratings."
    },
    library: {
      search: "Search books or authors...",
      status_all: "All books",
      status_reading: "Reading now",
      status_completed: "Completed",
      status_planned: "Want to read",
      cat_all: "All categories",
      loading: "Loading library...",
      empty: "No books found matching your criteria.",
      by: "by",
      progress: "Progress",
      read_notes: "Read notes"
    },
    now: {
      badge: "CURRENTLY (NOW)",
      title: "My Life & Focus Right Now",
      desc: "A page inspired by the nownownow.com initiative.",
      updated: "Last Updated",
      focus: "Primary Focus",
      projects: "Active Projects",
      experiments: "Experiments & Research"
    },
    bio: {
      badge: "BIOGRAPHY",
      title: "Behind the strategy and copy.",
      desc: "I work at the intersection of cognitive sciences, brand marketing, and finance. Currently a finance student in Tashkent. My academic research focuses on behavioral economics — how cognitive biases impact consumer decision-making mechanisms.",
      value1_title: "Human Psychology First",
      value1_desc: "Persuasion is not manipulation, but the correct design of choice architecture.",
      value2_title: "Powerful Simplicity",
      value2_desc: "Elegant, minimalist design creates ease of cognitive processing for the reader.",
      stat_books: "Books Read",
      stat_articles: "Essays Written",
      stat_projects: "Projects Built",
      stat_years: "Years of Research",
      cta: "More Details & Timeline"
    },
    contact: {
      badge: "LET'S TALK",
      title: "Let's talk over tea.",
      desc: "Want to say hello, discuss a book, or share a new idea? Drop me a message — I'm always open to meaningful conversations.",
      cta: "Send Message"
    },
    newsletter: {
      badge: "NEWSLETTER",
      title: "Sunday Morning Reflections",
      desc: "I send marketing, brand strategy, behavioral economics insights, and book summaries every two weeks. No ads, no spam — just deep content.",
      placeholder: "Your email address",
      cta: "Subscribe Now"
    },
    notfound: {
      title: "Page Not Found",
      desc: "The page you are looking for does not exist or has been moved to another address.",
      cta: "Return to Home"
    },
    footer: {
      desc: "By deeply analyzing human nature, cognitive psychology, and technology, I create solutions that bring simplicity to people's lives. This website is my digital shelter and repository of thoughts.",
      rights: "All rights reserved.",
      status: "Status: Current focus",
      reading: "Reading",
      building: "Building",
      connect: "Stay connected"
    },
    articlePage: {
      back: "Back to essays",
      author: "Author",
      readTime: "min read",
      loading: "Loading essay..."
    }
  },
  ru: {
    nav: {
      home: "Содержание",
      writing: "Аналитика",
      projects: "Проекты",
      garden: "Сад мыслей",
      library: "Библиотека",
      about: "Обо мне",
      contact: "Контакты",
      subscribe: "Подписаться"
    },
    hero: {
      welcome: "ДОБРО ПОЖАЛОВАТЬ В МОЙ ЦИФРОВОЙ ДОМ",
      tagline: "Я провожу исследования, делюсь идеями и строю полезные продукты на стыке человеческой психологии, финансов и поведенческой экономики.",
      cta_read: "Читать эссе",
      cta_view: "Смотреть проекты",
      reading_now: "Сейчас читаю",
      focus_project: "Проект в фокусе",
      latest_article: "Последняя статья"
    },
    currently: {
      title: "Текущие занятия",
      badge: "В ЦЕНТРЕ ВНИМАНИЯ",
      desc: "Панель моих активных сфер фокуса, текущих исследований и разрабатываемых проектов.",
      building: "Строю",
      reading: "Читаю",
      learning: "Изучаю",
      writing: "Пишу",
      thinking: "Размышляю",
      status: "Статус",
      updated: "Обновлено"
    },
    featured: {
      badge: "ПОСЛЕДНЯЯ СТАТЬЯ",
      title: "Рекомендуемая статья",
      cta: "Читать статью"
    },
    projects: {
      badge: "ПРОДУКТЫ",
      title: "Избранные проекты",
      desc: "Полезные решения, созданные на стыке психологии, бренд-маркетинга и искусственного интеллекта.",
      motivation: "Мотивация",
      problem: "Проблема",
      process: "Процесс",
      result: "Результат",
      lessons: "Извлеченные уроки",
      site: "Сайт",
      code: "GitHub"
    },
    reading: {
      badge: "ЧИТАТЕЛЬСКИЙ ДНЕВНИК",
      title: "Сейчас читаю",
      desc: "Литература, которую я сейчас анализирую, конспектирую и изучаю.",
      progress: "Прогресс чтения",
      takeaways: "Основные выводы",
      changed: "Как это изменило мое мышление?",
      related: "Связанные статьи",
      library: "Перейти в библиотеку конспектов"
    },
    garden: {
      badge: "ЦИФРОВОЙ САД",
      title: "Сад мыслей (Digital Garden)",
      desc: "Это не просто склад готовых статей. Это живой цифровой сад моих незаконченных мыслей, наблюдений, экспериментов и вопросов. Сад постоянно растет и обновляется.",
      cta: "Прогуляться по саду"
    },
    libraryPage: {
      badge: "БИБЛИОТЕКА",
      title: "Книжная полка",
      desc: "Книги, сформировавшие мое мировоззрение, и мои оценки к ним."
    },
    library: {
      search: "Поиск книг или авторов...",
      status_all: "Все книги",
      status_reading: "Сейчас читаю",
      status_completed: "Прочитано",
      status_planned: "Планирую прочесть",
      cat_all: "Все категории",
      loading: "Загрузка библиотеки...",
      empty: "Книг по выбранным критериям не найдено.",
      by: "автор:",
      progress: "Прогресс",
      read_notes: "Читать конспекты"
    },
    now: {
      badge: "СЕЙЧАС (NOW)",
      title: "Моя жизнь и фокус прямо сейчас",
      desc: "Страница, вдохновленная инициативой nownownow.com.",
      updated: "Обновлено",
      focus: "Основной фокус",
      projects: "Активные проекты",
      experiments: "Эксперименты и исследования"
    },
    bio: {
      badge: "БИОГРАФИЯ",
      title: "За стратегией и текстом.",
      desc: "Я работаю на стыке когнитивных наук, бренд-маркетинга и финансов. В настоящее время я студент финансового направления в Ташкенте. Мои академические исследования сосредоточены на поведенческой экономике — как когнитивные искажения влияют на механизмы принятия решений потребителями.",
      value1_title: "Психология человека прежде всего",
      value1_desc: "Убеждение — это не манипуляция, а правильное проектирование архитектуры выбора.",
      value2_title: "Сила простоты",
      value2_desc: "Элегантный, минималистичный дизайн облегчает когнитивное восприятие информации читателем.",
      stat_books: "Прочитано книг",
      stat_articles: "Написано статей",
      stat_projects: "Создано проектов",
      stat_years: "Лет исследований",
      cta: "Подробнее и хронология"
    },
    contact: {
      badge: "ПООБЩАЕМСЯ",
      title: "Давай пообщаемся за чаем.",
      desc: "Хотите сказать «привет», обсудить книгу или поделиться новой идеей? Напишите мне в любое время — я всегда открыт для содержательных разговоров.",
      cta: "Отправить сообщение"
    },
    newsletter: {
      badge: "РАССЫЛКА",
      title: "Воскресные размышления",
      desc: "Раз в две недели я делюсь лучшими инсайтами по маркетингу, бренд-стратегиям, поведенческой экономике и кратким содержанием книг. Без рекламы и спама — только полезный контент.",
      placeholder: "Ваша электронная почта",
      cta: "Присоединиться к чтению"
    },
    notfound: {
      title: "Страница не найдена",
      desc: "Страница, которую вы ищете, не существует или была перенесена по другому адресу.",
      cta: "Вернуться на главную"
    },
    footer: {
      desc: "Глубоко анализируя человеческую природу, когнитивную психологию и технологии, я создаю решения, приносящие простоту в жизнь людей. Этот сайт — мое цифровое убежище и хранилище мыслей.",
      rights: "Все права защищены.",
      status: "Статус: Текущие занятия",
      reading: "Читаю",
      building: "Строю",
      connect: "Будьте на связи"
    },
    articlePage: {
      back: "Назад к статьям",
      author: "Автор",
      readTime: "мин чтения",
      loading: "Загрузка статьи..."
    }
  }
};

export function useTranslation() {
  const { lang } = useParams();
  const location = useLocation();
  
  let currentLang: Language = "uz";
  if (lang && ["en", "ru", "uz"].includes(lang)) {
    currentLang = lang as Language;
  } else {
    const pathParts = location.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0 && ["en", "ru", "uz"].includes(pathParts[0])) {
      currentLang = pathParts[0] as Language;
    }
  }
  
  const t = (path: string): any => {
    const parts = path.split(".");
    let result: any = translations[currentLang];
    
    for (const part of parts) {
      if (result && typeof result === "object" && part in result) {
        result = result[part];
      } else {
        // Fallback to Uzbek if translation path is missing
        let uzFallback: any = translations.uz;
        for (const fallbackPart of parts) {
          if (uzFallback && typeof uzFallback === "object" && fallbackPart in uzFallback) {
            uzFallback = uzFallback[fallbackPart];
          } else {
            return path;
          }
        }
        return uzFallback;
      }
    }
    return result;
  };

  return { t, currentLang, langPrefix: currentLang === "uz" ? "" : `/${currentLang}` };
}
