import { SEO } from "@/shared/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { Sparkles, Calendar, BookOpen, Brain, Activity, Compass } from "lucide-react";

export default function NowPage() {
  const { t, currentLang } = useTranslation();

  const content = {
    uz: {
      title: "Hozirgi Holat",
      subtitle: "Bu sahifa Derek Siversning 'Now' harakati g'oyasidan ilhomlangan bo'lib, men ayni damda nimalar bilan bandligimni ko'rsatadi.",
      lastUpdated: "Oxirgi yangilanish: Iyul, 2026-yil",
      focusTitle: "Fokusdagi Loyihalar",
      focusDesc: "Hozirda barcha e'tiborim mustaqil frilanserlar uchun 'Tax Helper AI' tizimini yakunlashga qaratilgan.",
      learningTitle: "Nimalarni o'rganyapman?",
      learningList: [
        "LLM modellarini (OpenAI/Gemini) muayyan qonunchilik sharoitida agent sifatida ishlashini sozlash.",
        "Katta moliyaviy ma'lumotlarni interaktiv d3 grafiklarga tushirish tizimlari.",
        "Xulq-atvor iqtisodiyotidagi 'System 1 vs System 2' modelini brend joylashuviga tatbiq etish."
      ],
      readingTitle: "Mutolaa Kundaligi",
      readingDesc: "Daniel Kahnemaning 'Thinking, Fast and Slow' kitobining amaliy xulosalarini marketingda qo'llashni tahlil qilyapman.",
      goalsTitle: "Kelgusi Maqsadlar",
      goalsList: [
        "Soliq yordamchisi loyihasini dastlabki 500 ta faol foydalanuvchiga taqdim etish.",
        "Toshkentda behavioral marketing bo'yicha kichik tadqiqot olib borish va uni nashr etish.",
        "Fikrlar bog'ini yangi kognitiv tahlillar bilan to'ldirib borish."
      ]
    },
    en: {
      title: "Now",
      subtitle: "This page is inspired by Derek Sivers' 'Now' movement. It highlights what I'm focused on at this exact period.",
      lastUpdated: "Last updated: July 2026",
      focusTitle: "Active Focus",
      focusDesc: "Developing 'Tax Helper AI' to assist independent freelancers and small creators with localized tax processes.",
      learningTitle: "Current Learning Path",
      learningList: [
        "Fine-tuning LLM agent frameworks (OpenAI & Gemini) for localized legislation querying.",
        "Designing complex interactive financial dashboards using d3 and canvas frameworks.",
        "Implementing choice architecture strategies in digital branding layout components."
      ],
      readingTitle: "Reading Log",
      readingDesc: "Analyzing case studies from Daniel Kahneman's 'Thinking, Fast and Slow' applied to modern consumer conversion paths.",
      goalsTitle: "Immediate Goals",
      goalsList: [
        "Launch the Tax Helper AI beta phase for 500+ active freelance creators.",
        "Conclude a behavioral brand study within Tashkent business networks.",
        "Regularly publish notes and graph links to my digital garden workspace."
      ]
    },
    ru: {
      title: "Сейчас",
      subtitle: "Эта страница вдохновлена движением 'Now' Дерека Сиверса и показывает, чем я занят в текущий период жизни.",
      lastUpdated: "Последнее обновление: Июль, 2026 г.",
      focusTitle: "Текущий Фокус",
      focusDesc: "Разработка ИИ-ассистента 'Tax Helper AI' для помощи независимым фрилансерам и авторам с налогами.",
      learningTitle: "Что я изучаю?",
      learningList: [
        "Тонкая настройка ИИ-агентов (OpenAI/Gemini) для ответов по специфическому законодательству.",
        "Создание сложных интерактивных визуализаций данных с помощью d3.js.",
        "Интеграция когнитивных триггеров и архитектуры выбора в бренд-дизайн."
      ],
      readingTitle: "Книга в процессе",
      readingDesc: "Разбираю практическое применение идей Даниэля Канемана 'Thinking, Fast and Slow' в проектировании интерфейсов.",
      goalsTitle: "Ближайшие Цели",
      goalsList: [
        "Запустить бета-тестирование Tax Helper AI для первых 500+ фрилансеров.",
        "Провести локальное исследование рынка по поведению потребителей в Ташкенте.",
        "Регулярно публиковать новые идеи и связи в Саду мыслей."
      ]
    }
  };

  const data = content[currentLang] || content.uz;

  return (
    <div className="w-full max-w-[900px] mx-auto py-16 px-6 md:px-12 flex flex-col gap-12 selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`${data.title} — Akbarali Sottorov`} 
        description={data.subtitle}
      />

      {/* Header */}
      <FadeIn>
        <div className="flex flex-col gap-4 border-b border-border/60 pb-8 relative">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold block">
            {currentLang === "uz" ? "FOKUSDAGI HOLAT" : currentLang === "en" ? "CURRENT FOCUS" : "ТЕКУЩИЙ СТАТУС"}
          </span>
          <h1 className="font-heading text-4xl md:text-[52px] leading-none text-foreground font-extrabold flex items-center gap-3">
            {data.title}
            <Sparkles className="w-8 h-8 text-gold animate-pulse shrink-0" />
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed mt-2 max-w-[680px]">
            {data.subtitle}
          </p>
          
          <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-muted">
            <Calendar className="w-3.5 h-3.5" />
            <span>{data.lastUpdated}</span>
          </div>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        
        {/* Active Focus Card */}
        <StaggerItem>
          <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-8 h-full flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gold">
              <Activity className="w-5 h-5 shrink-0" />
              <h2 className="font-heading text-lg font-bold text-foreground">{data.focusTitle}</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.focusDesc}
            </p>
          </div>
        </StaggerItem>

        {/* Current Reading Card */}
        <StaggerItem>
          <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-8 h-full flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gold">
              <BookOpen className="w-5 h-5 shrink-0" />
              <h2 className="font-heading text-lg font-bold text-foreground">{data.readingTitle}</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.readingDesc}
            </p>
          </div>
        </StaggerItem>

        {/* Learning Card */}
        <StaggerItem className="md:col-span-2">
          <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-8 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-gold">
              <Brain className="w-5 h-5 shrink-0" />
              <h2 className="font-heading text-lg font-bold text-foreground">{data.learningTitle}</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.learningList.map((item, idx) => (
                <li key={idx} className="flex flex-col gap-2 p-4 bg-background border border-border rounded-xl">
                  <span className="text-[10px] font-bold text-gold">STEP 0{idx + 1}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>

        {/* Goals Card */}
        <StaggerItem className="md:col-span-2">
          <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-8 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-gold">
              <Compass className="w-5 h-5 shrink-0" />
              <h2 className="font-heading text-lg font-bold text-foreground">{data.goalsTitle}</h2>
            </div>
            <div className="flex flex-col gap-3">
              {data.goalsList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </StaggerItem>

      </StaggerContainer>
    </div>
  );
}
