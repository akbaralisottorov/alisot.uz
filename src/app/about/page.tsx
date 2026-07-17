import { SEO } from "@/shared/components/SEO";
import { Timeline } from "@/shared/components/timeline";
import { Target, Brain, TrendingUp, Compass, Award } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";

export default function AboutPage() {
  const { t, currentLang, langPrefix } = useTranslation();

  const timelineEvents = [
    {
      year: "2026",
      title: currentLang === "en" ? "Created Tax Helper AI" : currentLang === "ru" ? "Создал ассистента Tax Helper AI" : "Tax Helper AI loyihasini yaratdim",
      role: currentLang === "en" ? "AI & Tax Integration" : currentLang === "ru" ? "Интеграция ИИ и налогов" : "AI & Soliq Integratsiyasi",
      description: currentLang === "en" ? "Built the first AI assistant that allows freelancers and small businesses to calculate and optimize tax reports error-free in 5 minutes." : currentLang === "ru" ? "Создал первого ИИ-ассистента для фрилансеров и малого бизнеса, позволяющего безошибочно рассчитывать и оптимизировать налоговые отчеты за 5 минут." : "Frilanserlar va kichik bizneslarning soliq hisobotlarini 5 daqiqa ichida xatosiz hisoblash va optimallashtirish imkonini beruvchi birinchi AI assistentni qurdim.",
      icon: "milestone" as const,
    },
    {
      year: "2025",
      title: currentLang === "en" ? "Launched Teran Fikr Platform" : currentLang === "ru" ? "Запустил платформу Teran Fikr" : "Teran Fikr platformasini ishga tushirdim",
      role: currentLang === "en" ? "Premium Essays & Opinions" : currentLang === "ru" ? "Премиум эссе и мнения" : "Premium Maqolalar & Fikrlar",
      description: currentLang === "en" ? "Created an ad-free premium intellectual essay platform in Uzbek, encouraging readers to think deeply and read analysis in a calm environment." : currentLang === "ru" ? "Создал премиальную интеллектуальную платформу эссе на узбекском языке без рекламы, побуждающую читателей глубоко мыслить и читать аналитику в спокойной обстановке." : "O'zbek tilida reklamasiz, o'quvchini chuqur fikrlash va tahlillarni sokin muhitda o'qishga undaydigan premium intellektual esselar platformasini yaratdim.",
      icon: "milestone" as const,
    },
    {
      year: "2024",
      title: currentLang === "en" ? "Began Studying Behavioral Economics" : currentLang === "ru" ? "Начал изучать поведенческую экономику" : "Xulq-atvor iqtisodiyotini o'rganishga kirishdim",
      role: currentLang === "en" ? "Cognitive Psychology & Finance" : currentLang === "ru" ? "Когнитивная психология и финансы" : "Kognitiv Psixologiya & Moliya",
      description: currentLang === "en" ? "Started deep analysis of human decision-making biases and research into irrational factors shaping financial and consumer habits." : currentLang === "ru" ? "Начал глубокий анализ ошибок принятия решений людьми, исследование иррациональных факторов, формирующих финансовые и потребительские привычки." : "Insonlarning qaror qabul qilishdagi og'ishlarini chuqur tahlil qilish, ularning moliya va iste'molchilik odatlarini shakllantiruvchi irratsional omillarni tadqiq qilishni boshladim.",
      icon: "milestone" as const,
    },
    {
      year: "2023",
      title: currentLang === "en" ? "Started Writing Actively Online" : currentLang === "ru" ? "Начал активно писать в интернете" : "Internetda faol ravishda yozishni boshladim",
      role: currentLang === "en" ? "Thoughts & Analysis" : currentLang === "ru" ? "Мысли и анализ" : "Fikrlar & Tahlillar",
      description: currentLang === "en" ? "Began sharing my library, book summaries, and independent articles on branding and marketing with the public." : currentLang === "ru" ? "Начал делиться с публикой своей библиотекой, конспектами прочитанных книг, независимыми статьями по брендингу и маркетингу." : "Kutubxonam, o'qigan kitoblarim xulosalari, brending va marketing masalalari bo'yicha mustaqil maqolalarimni omma bilan baham ko'rishni boshladim.",
      icon: "milestone" as const,
    },
    {
      year: "2022",
      title: currentLang === "en" ? "Built First Digital Project & Personal Site" : currentLang === "ru" ? "Создал первый цифровой проект и личный сайт" : "Ilk raqamli loyiham va shaxsiy saytimni qurdim",
      role: currentLang === "en" ? "Frontend & Design" : currentLang === "ru" ? "Фронтенд и проектирование" : "Frontend & Loyihalash",
      description: currentLang === "en" ? "Learned UI/UX design systems, HTML/CSS and Javascript basics, and created my first digital home on the internet." : currentLang === "ru" ? "Изучил основы UI/UX систем дизайна, HTML/CSS и Javascript, создав свою первую цифровую обитель в интернете." : "UI/UX dizayn tizimlarini, HTML/CSS va Javascript asoslarini o'rganib, internet olamida o'zimning birinchi raqamli boshpanamni yaratdim.",
      icon: "milestone" as const,
    },
    {
      year: "2020",
      title: currentLang === "en" ? "Steps into Programming & Systems" : currentLang === "ru" ? "Сделал шаги в программирование и системы" : "Dasturlash va tizimlarni o'rganishga qadam qo'ydim",
      role: currentLang === "en" ? "Technology & Logic" : currentLang === "ru" ? "Технологии и логика" : "Texnologiya & Mantiq",
      description: currentLang === "en" ? "Self-studied algorithms, data structures, and clean coding culture, laying the foundation for my technological and engineering worldview." : currentLang === "ru" ? "Самостоятельно изучил алгоритмы, структуры данных и культуру написания кода, заложив основу своего технологического и инженерного мировоззрения." : "Algoritmlar, ma'lumotlar tuzilmasi va kod yozish madaniyatini mustaqil o'rganib, muhandislik va texnologik dunyoqarashimga asos soldim.",
      icon: "milestone" as const,
    },
  ];

  const focusAreas = [
    {
      title: currentLang === "en" ? "Brand Strategy" : currentLang === "ru" ? "Бренд-стратегия" : "Brend Strategiyasi",
      description: currentLang === "en" ? "Defining brand identity, shaping core values, and establishing a strong connection with the audience." : currentLang === "ru" ? "Определение уникальности брендов, формирование ценностей и установление прочной связи с аудиторией." : "Brendlarning o'ziga xosligini aniqlash, qadriyatlarini shakllantirish va auditoriya bilan mustahkam aloqa o'rnatish.",
      icon: <Target className="w-5 h-5 text-gold" />,
    },
    {
      title: currentLang === "en" ? "Behavioral Economics" : currentLang === "ru" ? "Поведенческая экономика" : "Xatti-harakatlar Iqtisodiyoti",
      description: currentLang === "en" ? "Applying decision-making mechanisms, cognitive biases, and irrational choices to marketing." : currentLang === "ru" ? "Применение механизмов принятия решений, когнитивных ошибок и иррационального выбора в маркетинге." : "Odamlarning qaror qabul qilish mexanizmlari, kognitiv xatoliklar va irratsional tanlovlarini marketingga tatbiq etish.",
      icon: <Brain className="w-5 h-5 text-gold" />,
    },
    {
      title: currentLang === "en" ? "Brand Communications" : currentLang === "ru" ? "Коммуникации бренда" : "Brand Communications",
      description: currentLang === "en" ? "Laws of ideas spreading in society, creative PR, and integrated communication campaigns." : currentLang === "ru" ? "Законы распространения идей в обществе, креативный PR и интегрированные коммуникационные кампании." : "G'oyalarning jamiyatda tarqalish qonuniyatlari, kreativ PR va integratsiyalashgan kommunikatsiya kampaniyalari.",
      icon: <TrendingUp className="w-5 h-5 text-gold" />,
    },
  ];

  const values = [
    {
      title: currentLang === "en" ? "Think Deeply" : currentLang === "ru" ? "Думайте глубже" : "Chuqur o'yla. (Think deeply)",
      description: currentLang === "en" ? "Superficial solutions are temporary. True results are achieved by understanding the root of the problem, human nature, and psychology." : currentLang === "ru" ? "Поверхностные решения временны. Настоящий результат достигается за счет понимания сути проблемы, человеческой природы и психологии." : "Yuzaki yechimlar vaqtinchalik. Haqiqiy natija muammoning ildizini, inson tabiati va psixologiyasini anglash orqali erishiladi."
    },
    {
      title: currentLang === "en" ? "Build Consistently" : currentLang === "ru" ? "Стройте регулярно" : "Muntazam ravishda qur. (Build consistently)",
      description: currentLang === "en" ? "Keeping ideas only in your head is useless. Writing practical code and creating products every day reinforces design logic." : currentLang === "ru" ? "Бесполезно держать идеи только в голове. Ежедневное написание практического кода и создание продуктов укрепляют логику дизайна." : "G'oyalarni faqat boshda saqlash foydasiz. Har kuni amaliy kod yozish, mahsulot yaratish dizayn mantiqini mustahkamlaydi."
    },
    {
      title: currentLang === "en" ? "Share Openly" : currentLang === "ru" ? "Делитесь открыто" : "Ochiqchasiga ulash. (Share openly)",
      description: currentLang === "en" ? "Knowledge and experience should not be hidden. Every analysis shared with the community is a cornerstone of personal growth and trust." : currentLang === "ru" ? "Знания и опыт не следует скрывать. Каждый анализ, которым вы делитесь с сообществом, является краеугольным камнем личного роста и доверия." : "Bilim va tajribani yashirmaslik lozim. Jamiyatga ulashilgan har bir tahlil shaxsiy o'sish va ishonch poydevoridir."
    },
    {
      title: currentLang === "en" ? "Stay Curious" : currentLang === "ru" ? "Оставайтесь любознательными" : "Hamisha izlanuvchan bo'l. (Stay curious)",
      description: currentLang === "en" ? "Never stop learning. The synthesis of finance, psychology, and technology yields the best results." : currentLang === "ru" ? "Никогда не прекращайте учиться. Синтез финансов, психологии и технологий дает наилучшие результаты." : "Hech qachon o'rganishdan to'xtamaslik kerak. Moliya, psixologiya va texnologiya sohalari sintezi eng yaxshi natijani beradi."
    },
    {
      title: currentLang === "en" ? "Learn in Public" : currentLang === "ru" ? "Учитесь публично" : "Ko'pchilik oldida o'rgan. (Learn in public)",
      description: currentLang === "en" ? "Do not be ashamed of making mistakes, but writing down the learning process and shortcomings openly helps others too." : currentLang === "ru" ? "Не стесняйтесь делать ошибки, открытое описание процесса обучения и недостатков помогает и другим." : "Xatolar qilishdan uyalmaslik, balki o'rganish jarayonini va kamchiliklarni ochiq yozib borish boshqalarga ham yordam beradi."
    },
    {
      title: currentLang === "en" ? "Prefer Clarity" : currentLang === "ru" ? "Предпочитайте ясность" : "Murakkablikdan ko'ra aniqlikni afzal ko'r. (Clarity)",
      description: currentLang === "en" ? "Elegant, minimalist approach maintains attention. Simplicity in words and design is the highest skill." : currentLang === "ru" ? "Элегантный, минималистичный подход удерживает внимание. Простота в словах и дизайне — высшее мастерство." : "Elegant, minimalist yondashuv diqqatni saqlab qoladi. So'zlar va dizayndagi soddalik — eng yuksak mahoratdir."
    }
  ];

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
                  {area.icon}
                </div>
                <h3 className="font-sans font-bold text-lg text-foreground mb-3">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
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
