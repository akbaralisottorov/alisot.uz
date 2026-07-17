import { Language } from "@/shared/types";

export interface TimelineItem {
  id: string;
  date: string;
  type: "career" | "education" | "achievement" | "milestone" | "goal";
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
}

const TIMELINE_DATA: Record<Language, TimelineItem[]> = {
  uz: [
    {
      id: "t1",
      date: "2026 - Hozir",
      type: "career",
      title: "Brend va Marketing Strategi",
      subtitle: "Mustaqil Konsaltant & Soliq Assistent AI asoschisi",
      description: "Bizneslar uchun brend pozitsiyalash, xulq-atvor iqtisodiyoti tamoyillari asosida marketing tizimini yo'lga qo'yish. Kichik tadbirkorlarga yordam beruvchi 'Tax Helper' platformasini ishlab chiqish.",
      tags: ["Behavioral Economics", "Brand Strategy", "AI", "Startup"]
    },
    {
      id: "t2",
      date: "2025 - Hozir",
      type: "education",
      title: "Moliya va Xulq-atvor Iqtisodiyoti",
      subtitle: "Toshkent Davlat Iqtisodiyot Universiteti",
      description: "Kognitiv psixologiya va iste'molchilarning qaror qabul qilish mexanizmlari, moliya bozori dinamikasi bo'yicha akademik tadqiqotlar.",
      tags: ["Finance", "Behavioral Economics", "Academic Research"]
    },
    {
      id: "t3",
      date: "2025",
      type: "achievement",
      title: "HRAkso AI platformasi ishga tushishi",
      subtitle: "Loyihani yakunlash va dastlabki mijozlarga taqdim etish",
      description: "Nomzodlarning kognitiv va empatiya ko'rsatkichlarini rezyume tahlili orqali baholovchi sun'iy intellekt tizimini yozish va joriy etish.",
      tags: ["AI", "NLP", "HR Tech"]
    },
    {
      id: "t4",
      date: "2024",
      type: "career",
      title: "Marketing Kommunikatsiyalari Mutaxassisi",
      subtitle: "Teran Fikr tahlil portali hamda PIO Pay asoschisi",
      description: "Uzbek segmentida reklamasiz va chuqur tahlillarni o'quvchilarga yetkazuvchi platforma qurish. Frilanserlar uchun xalqaro Stripe to'lov shlyuzini optimallashtiruvchi platforma ishlab chiqish.",
      tags: ["Publishing", "Fintech", "UX Design"]
    },
    {
      id: "t5",
      date: "2023",
      type: "milestone",
      title: "Raqamli Brending va UX Sohasi",
      subtitle: "Dastlabki frilans loyihalar",
      description: "Bizneslar uchun marketing konsepsiyalari va foydalanuvchilarning intuitiv to'siqlarini yenguvchi tanlov arxitekturalarini loyihalashni boshlash.",
      tags: ["UX", "Branding", "Freelance"]
    },
    {
      id: "t6",
      date: "2027 va undan keyin",
      type: "goal",
      title: "Xulq-atvor Iqtisodiyoti Laboratoriyasi",
      subtitle: "Kelajakdagi maqsad",
      description: "O'zbekistonda marketing va jamoat siyosatida kognitiv yondashuvlarni tadbiq qiluvchi, tadqiqotlar olib boruvchi ilmiy laboratoriyaga asos solish.",
      tags: ["Research Lab", "Cognitive Sciences", "Strategy"]
    }
  ],
  en: [
    {
      id: "t1",
      date: "2026 - Present",
      type: "career",
      title: "Brand & Marketing Strategist",
      subtitle: "Independent Consultant & Founder of Tax Helper AI",
      description: "Aiding businesses with brand positioning, implementing marketing frameworks based on behavioral economics. Developing 'Tax Helper' to assist local freelancers.",
      tags: ["Behavioral Economics", "Brand Strategy", "AI", "Startup"]
    },
    {
      id: "t2",
      date: "2025 - Present",
      type: "education",
      title: "Finance & Behavioral Economics Studies",
      subtitle: "Tashkent State University of Economics",
      description: "Focusing academic research on consumer decision-making mechanisms and cognitive bias within financial structures.",
      tags: ["Finance", "Behavioral Economics", "Academic Research"]
    },
    {
      id: "t3",
      date: "2025",
      type: "achievement",
      title: "HRAkso AI Platform Launch",
      subtitle: "Project Launch & Alpha Client Deployment",
      description: "Developed and launched an NLP machine learning system that screens candidate cognitive empathy through written answers.",
      tags: ["AI", "NLP", "HR Tech"]
    },
    {
      id: "t4",
      date: "2024",
      type: "career",
      title: "Marketing Communications Specialist",
      subtitle: "Founder of Teran Fikr Analytic Portal & PIO Pay",
      description: "Created an ad-free intellectual publishing platform. Developed a Stripe payments routing engine for Central Asian creators.",
      tags: ["Publishing", "Fintech", "UX Design"]
    },
    {
      id: "t5",
      date: "2023",
      type: "milestone",
      title: "Entry into Digital Branding & UX",
      subtitle: "Initial Freelance Projects",
      description: "Began consulting for local startups, building choice architectures and content strategies.",
      tags: ["UX", "Branding", "Freelance"]
    },
    {
      id: "t6",
      date: "2027 & Beyond",
      type: "goal",
      title: "Behavioral Economics Research Lab",
      subtitle: "Future Vision",
      description: "Establishing a research center that integrates cognitive insights directly into local brand marketing and design frameworks.",
      tags: ["Research Lab", "Cognitive Sciences", "Strategy"]
    }
  ],
  ru: [
    {
      id: "t1",
      date: "2026 - Наст. время",
      type: "career",
      title: "Бренд-стратег и маркетолог",
      subtitle: "Независимый консультант и основатель Tax Helper AI",
      description: "Позиционирование брендов и настройка маркетинговых воронок на основе поведенческой экономики. Создание Tax Helper для фрилансеров.",
      tags: ["Behavioral Economics", "Brand Strategy", "AI", "Startup"]
    },
    {
      id: "t2",
      date: "2025 - Наст. время",
      type: "education",
      title: "Финансы и поведенческая экономика",
      subtitle: "Ташкентский Государственный Экономический Университет",
      description: "Академические исследования когнитивных искажений потребителей и финансового поведения.",
      tags: ["Finance", "Behavioral Economics", "Academic Research"]
    },
    {
      id: "t3",
      date: "2025",
      type: "achievement",
      title: "Запуск HR-платформы HRAkso AI",
      subtitle: "Успешная разработка и развертывание",
      description: "Создание и интеграция ИИ-системы для оценки когнитивной эмпатии кандидатов при приеме на работу.",
      tags: ["AI", "NLP", "HR Tech"]
    },
    {
      id: "t4",
      date: "2024",
      type: "career",
      title: "Специалист по маркетингу",
      subtitle: "Создатель журнала Teran Fikr и сервиса PIO Pay",
      description: "Запуск аналитического журнала без рекламы и создание платежного моста на базе Stripe.",
      tags: ["Publishing", "Fintech", "UX Design"]
    },
    {
      id: "t5",
      date: "2023",
      type: "milestone",
      title: "Старт в сфере брендинга и UX",
      subtitle: "Первые фриланс-проекты",
      description: "Проектирование пользовательских путей и архитектуры выбора для малого бизнеса.",
      tags: ["UX", "Branding", "Freelance"]
    },
    {
      id: "t6",
      date: "2027 и позже",
      type: "goal",
      title: "Лаборатория поведенческой экономики",
      subtitle: "Цель на будущее",
      description: "Основание независимой исследовательской лаборатории для анализа когнитивных механизмов рынка.",
      tags: ["Research Lab", "Cognitive Sciences", "Strategy"]
    }
  ]
};

export function getLocalizedTimelineData(lang: Language): TimelineItem[] {
  return TIMELINE_DATA[lang] || TIMELINE_DATA.uz;
}
