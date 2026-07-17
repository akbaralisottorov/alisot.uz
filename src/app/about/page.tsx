import { SEO } from "@/shared/components/SEO";
import { Timeline } from "@/shared/components/timeline";
import { Target, Brain, TrendingUp, Compass, Award } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { getAboutTimelineEvents, getFocusAreas, getValueItems } from "@/shared/data/about";

export default function AboutPage() {
  const { t, currentLang, langPrefix } = useTranslation();

  const timelineEvents = getAboutTimelineEvents(currentLang);
  const focusAreas = getFocusAreas(currentLang);
  const values = getValueItems(currentLang);

  return (
    <div className="w-full max-w-[1000px] mx-auto py-12 px-6 md:px-12 flex flex-col gap-[140px] text-left selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={currentLang === "en" ? "About Me - Akbarali Sottorov" : currentLang === "ru" ? "Обо мне - Акбарали Сотторов" : "Men haqimda - Akbarali Sottorov"} 
        description={currentLang === "en" ? "Philosophy, career, and interests of Akbarali Sottorov - brand strategist and marketing expert." : currentLang === "ru" ? "Философия, карьера и интересы Акбарали Сотторова - бренд-стратега и эксперта по маркетингу." : "Akbarali Sottorov - Marketing strategy va brand communications mutaxassisining falsafasi, karyerasi va qiziqishlari."} 
      />
      
      {/* Header and Hero Image Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-[32px] items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold uppercase tracking-widest w-max">
            <Compass className="w-4 h-4" />
            <span>{currentLang === "en" ? "Behind the Scenes" : currentLang === "ru" ? "За кулисами" : "Kadr ortida"}</span>
          </div>
          
          <h1 className="font-heading font-extrabold text-4xl md:text-[54px] leading-tight text-foreground">
            {currentLang === "en" ? (
              <>
                Human Intuition & <br />
                <span className="italic font-normal text-primary">Systematic Marketing</span>.
              </>
            ) : currentLang === "ru" ? (
              <>
                Интуиция человека & <br />
                <span className="italic font-normal text-primary">Системный маркетинг</span>.
              </>
            ) : (
              <>
                Inson intuitsiyasi va <br />
                <span className="italic font-normal text-primary">Tizimli Marketing</span> sintezi.
              </>
            )}
          </h1>
          
          <p className="font-sans text-lg text-muted-foreground leading-relaxed max-w-[650px]">
            {currentLang === "en" 
              ? "I work in brand communications and strategic marketing. My goal is to spread great ideas and help brands establish genuine connections with their audience."
              : currentLang === "ru"
              ? "Я работаю в сфере бренд-коммуникаций и стратегического маркетинга. Моя цель — помогать распространению отличных идей и выстраиванию искренней связи брендов с их аудиторией."
              : "Men brend kommunikatsiyalari va strategik marketing sohasida faoliyat yuritaman. Maqsadim — g'oyalarning keng tarqalishiga va brendlarning auditoriya bilan samimiy bog'lanishiga yordam berish."}
          </p>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <div className="w-full max-w-[280px] aspect-[3/4] rounded-[24px] overflow-hidden border border-border p-2 bg-white shadow-sm relative">
            <img 
              src="/portrait_about.png" 
              alt="Akbarali Sottorov Portrait" 
              className="w-full h-full object-cover rounded-[18px] grayscale" 
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')]" />
          </div>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-[32px] border-t border-border pt-16">
        <div className="space-y-4">
          <h2 className="font-heading text-2xl md:text-[28px] font-bold text-foreground">
            {currentLang === "en" ? "Personal Story" : currentLang === "ru" ? "Личная история" : "Shaxsiy hikoya"}
          </h2>
          <div className="font-sans text-muted-foreground leading-relaxed space-y-4 max-w-[650px]">
            {currentLang === "en" ? (
              <>
                <p>
                  My journey into the world of marketing and branding did not start out of a simple desire to run ads. I have always been fascinated by one question: how do people make decisions and why do they follow certain ideas?
                </p>
                <p>
                  Living and working in Tashkent, I observed the development processes of various business entities. I view marketing not just as beautiful pictures or banners, but as a science based on deep psychological analysis and behavioral economics.
                </p>
                <p>
                  Currently, I am enriching my understanding of marketing through reading and socio-political research. Daniel Kahneman's book \"Thinking, Fast and Slow\" is my primary learning source, helping me study how the rapid (System 1) and deep (System 2) thinking mechanisms of the human mind can be leveraged in brand communications.
                </p>
              </>
            ) : currentLang === "ru" ? (
              <>
                <p>
                  Мой путь в мир маркетинга и брендинга начался не просто из желания делать рекламу. Меня всегда волновал один вопрос: как люди принимают решения и почему они следуют определенным идеям?
                </p>
                <p>
                  Живя и работая в Ташкенте, я наблюдал за процессами развития различных бизнес-субъектов. Я рассматриваю маркетинг не просто как красивые картинки или баннеры, а как науку, основанную на глубоком психологическом анализе и поведенческой экономике (behavioral economics).
                </p>
                <p>
                  В настоящее время я обогащаю свое понимание маркетинга с помощью чтения книг и социально-политических исследований. Книга Даниэля Канемана \"Думай медленно... решай быстро\" является моим основным источником обучения, помогая изучать, как быстрые (Система 1) и глубокие (Система 2) механизмы мышления человеческого разума можно использовать в коммуникациях бренда.
                </p>
              </>
            ) : (
              <>
                <p>
                  Mening marketing va brending olamiga kirib kelishim shunchaki reklama qilish istagidan boshlanmagan. Meni har doim bitta savol qiziqtirgan: odamlar qanday qaror qabul qiladilar va nega ma'lum bir g'oyalarga ergashadilar?
                </p>
                <p>
                  Toshkentda yashab va mehnat qilib, turli xil biznes subyektlarining rivojlanish jarayonlarini kuzatdim. Marketingni shunchaki chiroyli rasmlar yoki bannerlar emas, balki chuqur psixologik tahlil va xulq-atvor iqtisodiyoti (behavioral economics) asosidagi fan deb bilaman.
                </p>
                <p>
                  Hozirda kitob mutolaasi va ijtimoiy-siyosiy tadqiqotlar orqali marketing tushunchalarimni boyitib bormoqdaman. Daniel Kahnemanning \"Thinking, Fast and Slow\" kitobi hozirgi kundagi asosiy o'quv manbam bo'lib, inson ongining tezkor (System 1) va chuqur (System 2) fikrlash mexanizmlarini brend kommunikatsiyalarida qanday ishlatish mumkinligini o'rganishga yordam bermoqda.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-2xl md:text-[28px] font-bold text-foreground">
            {currentLang === "en" ? "My Philosophy" : currentLang === "ru" ? "Моя философия" : "Falsafam"}
          </h2>
          <div className="font-sans text-muted-foreground leading-relaxed space-y-4 max-w-[650px]">
            {currentLang === "en" ? (
              <>
                <p>
                  <strong>Ideas are like viruses.</strong> A good idea shouldn't just be created, it must spread through the right social channels and appropriate messaging. A brand is not just a name; it is people's trust.
                </p>
                <p>
                  <strong>Focus and simplicity.</strong> Conveying complex concepts in the simplest, most understandable language to the audience is the ultimate art of marketing. A consumer will never choose a brand they don't understand.
                </p>
                <p>
                  <strong>Reading and application.</strong> Acquired theoretical knowledge (like cognitive psychology or social policy) remains dry information if not integrated into real marketing campaigns. Every book is a source of new strategies.
                </p>
              </>
            ) : currentLang === "ru" ? (
              <>
                <p>
                  <strong>Идеи подобны вирусам.</strong> Хорошая идея должна не просто создаваться, она должна распространяться через правильные социальные каналы и соответствующие сообщения. Бренд — это не просто название, это доверие людей.
                </p>
                <p>
                  <strong>Фокус и простота.</strong> Донесение сложных концепций до аудитории на самом простом и понятном языке — высшее искусство маркетинга. Потребитель никогда не выберет бренд, который ему непонятен.
                </p>
                <p>
                  <strong>Чтение и применение.</strong> Полученные теоретические знания (например, когнитивная психология или социальная политика) остаются сухой информацией, если они не интегрированы в реальные маркетинговые кампании. Каждая книга — источник новых стратегий.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>G'oyalar virus kabidir.</strong> Yaxshi g'oya shunchaki yaratilishi kerak emas, u to'g'ri ijtimoiy kanallar va munosib xabarlar orqali tarqalishi kerak. Brend — bu shunchaki nom emas, u odamlarning ishonchidir.
                </p>
                <p>
                  <strong>Fokus va soddalik.</strong> Murakkab tushunchalarni eng oddiy, tushunarli tilda auditoriyaga yetkazish marketingning eng oliy san'atidir. Iste'molchi hech qachon unga tushunarsiz bo'lgan brendni tanlamaydi.
                </p>
                <p>
                  <strong>Mutolaa va tadbiq etish.</strong> O'rganilgan nazariy bilimlar (masalan, kognitiv psixologiya yoki ijtimoiy siyosat) real marketing kampaniyalariga integratsiya qilinmasa, shunchaki quruq ma'lumot bo'lib qoladi. Har bir kitob yangi strategiyalar manbayidir.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Learning Philosophy Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-[32px] border-t border-border pt-16">
        <div className="space-y-4">
          <h2 className="font-heading text-2xl md:text-[28px] font-bold text-foreground flex items-center gap-2">
            <Target className="w-6 h-6 text-gold" />
            <span>{currentLang === "en" ? "My Mission" : currentLang === "ru" ? "Моя миссия" : "Missiyam"}</span>
          </h2>
          <p className="font-sans text-muted-foreground leading-relaxed text-base">
            {currentLang === "en" 
              ? "My mission is to synthesize cognitive psychology, finance, and technology to design choice architectures and brand structures that support human intuition and build sustainable trust between platforms and creators."
              : currentLang === "ru"
              ? "Моя миссия — синтезировать когнитивную психологию, финансы и технологии для проектирования архитектур выбора и брендовых систем, которые поддерживают человеческую интуицию и укрепляют доверие."
              : "Missiyam — kognitiv psixologiya, moliya va texnologiyalarni sintez qilib, inson intuitsiyasini qo'llab-quvvatlovchi tanlov arxitekturalarini hamda brend tizimlarini yaratish, foydalanuvchilar ishonchini mustahkamlash."}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-2xl md:text-[28px] font-bold text-foreground flex items-center gap-2">
            <Brain className="w-6 h-6 text-gold" />
            <span>{currentLang === "en" ? "Learning Philosophy" : currentLang === "ru" ? "Философия обучения" : "O'rganish falsafam"}</span>
          </h2>
          <p className="font-sans text-muted-foreground leading-relaxed text-base">
            {currentLang === "en" 
              ? "I believe in 'learning in public'. Every research paper read, database designed, or startup launched is not just a discrete project, but an opportunity to compile, synthesize, and refine behavioral insights for the community."
              : currentLang === "ru"
              ? "Я верю в 'обучение на виду у всех'. Каждая прочитанная статья, база данных или запущенный стартап — это не просто отдельный проект, а возможность структурировать и распространять полезные инсайты."
              : "Men jamoat oldida o'rganish ('learning in public') falsafasiga ishonaman. Har bir o'qilgan tadqiqot ishi, ma'lumotlar bazasi loyihasi yoki ishga tushirilgan startap bu amaliy xulosalarni jamiyat bilan ulashish imkonidir."}
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="space-y-10 border-t border-border pt-16">
        <div>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold mb-3 block">PRINCIPLES</span>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            {currentLang === "en" ? "Principles I Work By" : currentLang === "ru" ? "Принципы, которыми я руководствуюсь" : "Men amal qiladigan tamoyillar"}
          </h2>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          {values.map((v, i) => (
            <StaggerItem key={i}>
              <div className="bg-white dark:bg-card border border-border p-8 rounded-[24px] hover:border-gold hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 h-full">
                <span className="font-heading text-3xl text-gold/30 block mb-4">0{i+1}</span>
                <h3 className="font-sans font-bold text-lg text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Statistics Section */}
      <section className="bg-white dark:bg-card border border-border rounded-[24px] p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-[32px] text-center md:text-left">
        <div>
          <CountUp to={45} suffix="+" className="block font-heading text-[42px] font-extrabold text-foreground mb-1 leading-none" />
          <span className="block text-[10px] font-bold text-muted uppercase tracking-widest">{t("bio.stat_books")}</span>
        </div>
        <div>
          <CountUp to={12} className="block font-heading text-[42px] font-extrabold text-foreground mb-1 leading-none" />
          <span className="block text-[10px] font-bold text-muted uppercase tracking-widest">{t("bio.stat_articles")}</span>
        </div>
        <div>
          <CountUp to={8} className="block font-heading text-[42px] font-extrabold text-foreground mb-1 leading-none" />
          <span className="block text-[10px] font-bold text-muted uppercase tracking-widest">{t("bio.stat_projects")}</span>
        </div>
        <div>
          <CountUp to={5} suffix="+" className="block font-heading text-[42px] font-extrabold text-foreground mb-1 leading-none" />
          <span className="block text-[10px] font-bold text-muted uppercase tracking-widest">{t("bio.stat_years")}</span>
        </div>
      </section>

      {/* Goals & Interests Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-[32px] border-t border-border pt-16">
        <div className="bg-white dark:bg-card border border-border rounded-[24px] p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <Target className="w-5 h-5 text-gold" />
            <span>{currentLang === "en" ? "Current Goals" : currentLang === "ru" ? "Текущие цели" : "Hozirgi maqsadlar"}</span>
          </h2>
          <ul className="space-y-3 font-sans text-sm text-muted-foreground">
            {currentLang === "en" ? (
              <>
                <li className="flex items-start gap-2">✓ Launch the freelance Tax Helper AI helper platform beta.</li>
                <li className="flex items-start gap-2">✓ Conclude and publish a brand positioning case study in Tashkent.</li>
                <li className="flex items-start gap-2">✓ Document and structure 100+ public garden learning notes.</li>
              </>
            ) : currentLang === "ru" ? (
              <>
                <li className="flex items-start gap-2">✓ Запустить бета-версию ИИ-ассистента Tax Helper AI для фрилансеров.</li>
                <li className="flex items-start gap-2">✓ Завершить и опубликовать исследование бренд-позиционирования в Ташкенте.</li>
                <li className="flex items-start gap-2">✓ Опубликовать и систематизировать более 100 заметок в Саду мыслей.</li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-2">✓ Frilanserlar uchun 'Tax Helper AI' loyihasining beta-versiyasini ishga tushirish.</li>
                <li className="flex items-start gap-2">✓ Toshkent biznes tarmoqlarida brend joylashuvi bo'yicha ilmiy tahlil chop etish.</li>
                <li className="flex items-start gap-2">✓ Raqamli bog'da foydali ma'lumotlar bazasini 100 tadan oshirish.</li>
              </>
            )}
          </ul>
        </div>

        <div className="bg-white dark:bg-card border border-border rounded-[24px] p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <Compass className="w-5 h-5 text-gold" />
            <span>{currentLang === "en" ? "Personal Interests" : currentLang === "ru" ? "Личные интересы" : "Shaxsiy qiziqishlar"}</span>
          </h2>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            {currentLang === "en" 
              ? "Reading books (focused on choice psychology and behavioral finance), digital gardening, practicing d3.js interactive chart design, studying cognitive heuristics, and running occasional brand consulting workshops."
              : currentLang === "ru" 
              ? "Чтение книг (по психологии принятия решений и поведенческим финансам), ведение цифрового сада, визуализация данных на d3.js, изучение когнитивных эвристик и проведение воркшопов."
              : "Psixologiya hamda xulq-atvor moliyasiga oid adabiyotlar mutolaasi, raqamli bog'dorchilik, d3.js yordamida interaktiv ma'lumotlar tahlili, kognitiv evristikalar va yosh tadbirkorlar uchun brending darslari."}
          </p>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="space-y-10 border-t border-border pt-16">
        <div>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold mb-3 block">EXPERTISE</span>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            {currentLang === "en" ? "Focus Areas" : currentLang === "ru" ? "Направления фокуса" : "Hozirgi yo'nalishlar"}
          </h2>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          {focusAreas.map((area, i) => (
            <StaggerItem key={i}>
              <div className="bg-white dark:bg-card border border-border p-8 rounded-[24px] hover:border-gold hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
                  {area.iconName === "target" ? (
                    <Target className="w-5 h-5 text-gold" />
                  ) : area.iconName === "brain" ? (
                    <Brain className="w-5 h-5 text-gold" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-gold" />
                  )}
                </div>
                <h3 className="font-sans font-bold text-lg text-foreground mb-3">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Skills Matrix Section */}
      <section className="space-y-10 border-t border-border pt-16">
        <div>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold mb-3 block">SKILLS MATRIX</span>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            {currentLang === "en" ? "Areas of Expertise" : currentLang === "ru" ? "Технологический стек и навыки" : "Texnik ko'nikmalar & Malaka"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          {/* Column 1: Brand Strategy */}
          <div className="bg-white dark:bg-card border border-border p-8 rounded-[24px] flex flex-col gap-4">
            <h3 className="font-sans font-bold text-lg text-foreground border-b border-border/60 pb-2">
              {currentLang === "en" ? "Brand & Strategy" : currentLang === "ru" ? "Бренд и Стратегия" : "Brend & Strategiya"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Brand Positioning", "Choice Architecture", "Market Analysis", "Strategic Consulting", "Communications", "Copywriting"].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-background border border-border/80 text-xs font-medium text-muted-foreground rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Engineering */}
          <div className="bg-white dark:bg-card border border-border p-8 rounded-[24px] flex flex-col gap-4">
            <h3 className="font-sans font-bold text-lg text-foreground border-b border-border/60 pb-2">
              {currentLang === "en" ? "Engineering & AI" : currentLang === "ru" ? "Разработка и ИИ" : "Dasturlash & Sun'iy Intellekt"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Node.js", "Express", "Vite", "Tailwind CSS", "Prisma ORM", "LLM Integration", "RAG Workflows"].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-background border border-border/80 text-xs font-medium text-muted-foreground rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Column 3: Behavioral Science */}
          <div className="bg-white dark:bg-card border border-border p-8 rounded-[24px] flex flex-col gap-4">
            <h3 className="font-sans font-bold text-lg text-foreground border-b border-border/60 pb-2">
              {currentLang === "en" ? "Behavioral & Research" : currentLang === "ru" ? "Поведение и Аналитика" : "Xulq-atvor & Tadqiqot"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Behavioral Economics", "Cognitive Heuristics", "Decision Psychology", "Socio-political Studies", "Data Visualizations", "Statistical Analysis"].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-background border border-border/80 text-xs font-medium text-muted-foreground rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="space-y-12 border-t border-border pt-16">
        <div>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold mb-3 block">JOURNEY</span>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            {currentLang === "en" ? "Chronology & Milestone Bekats" : currentLang === "ru" ? "Хронология и вехи пути" : "Xronologiya va muhim bekatlar"}
          </h2>
        </div>
        <div className="max-w-2xl">
          <Timeline events={timelineEvents} />
        </div>
      </section>

      {/* CTA section */}
      <section className="border-t border-border pt-16">
        <div className="bg-primary text-primary-foreground border border-dark-green rounded-[24px] p-8 md:p-12 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4">
            {currentLang === "en" ? "Let's start a new project together." : currentLang === "ru" ? "Давайте начнем новый проект вместе." : "Birgalikda yangi loyiha boshlaymiz."}
          </h2>
          <p className="font-sans text-base md:text-lg text-primary-foreground/80 max-w-[600px] leading-relaxed mb-8">
            {currentLang === "en" 
              ? "Feel free to reach out for an interesting branding project, marketing strategy, or just to exchange some intriguing ideas."
              : currentLang === "ru"
              ? "Вы можете связаться со мной для обсуждения интересного брендингового проекта, маркетинговой стратегии или просто для обмена мнениями."
              : "Qiziqarli brend loyihasi, marketing strategiyasi yoki shunchaki qiziqarli fikr almashish uchun bog'lanishingiz mumkin."}
          </p>
          <a 
            href={`${langPrefix}/#contact`}
            className="px-8 py-3.5 bg-gold hover:bg-gold-hover text-white rounded-[24px] font-bold uppercase tracking-wider text-xs transition-all duration-300 hover:shadow-md hover:shadow-gold/25 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus-ring inline-flex items-center gap-2"
          >
            <span>{currentLang === "en" ? "Start Conversation" : currentLang === "ru" ? "Начать разговор" : "Suhbatni boshlash"}</span>
            <Award className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
