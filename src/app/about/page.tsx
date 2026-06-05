import { SEO } from "@/components/SEO";
import { Timeline } from "@/components/timeline";
import { ArrowRight, Sparkles, BookOpen, Target, TrendingUp, Compass, Brain } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/animations";

export default function AboutPage() {
  const timelineEvents = [
    {
      year: "2024 - Hozirgacha",
      title: "Mustaqil Marketing Strategi va Maslahatchisi",
      role: "Brand Communications",
      description: "Toshkentdagi yetakchi kompaniyalar va startaplar uchun marketing strategiyalari, brending va kommunikatsiya tizimlarini shakllantirish. Xatti-harakatlar iqtisodiyoti (behavioral economics) tamoyillarini amaliyotga tatbiq etish.",
      icon: "work" as const,
    },
    {
      year: "2022 - 2024",
      title: "Katta Brand Strateg va Kommunikatsiya Mutaxassisi",
      role: "Brend va PR",
      description: "Brend platformalarini yaratish va kreativ reklama kampaniyalarini boshqarish. OAV va ijtimoiy tarmoqlar orqali brend xabarlarini maqsadli auditoriyaga yetkazish tizimini loyihalash.",
      icon: "work" as const,
    },
    {
      year: "2020 - 2022",
      title: "Marketing va PR Menejeri",
      role: "Kompaniya Loyihalari",
      description: "Brend imidjini yaratish, PR-kampaniyalar o'tkazish, jamoatchilik va mijozlar bilan muloqot strategiyalarini ishlab chiqish hamda tahlil qilish.",
      icon: "work" as const,
    },
    {
      year: "2018 - 2020",
      title: "Marketing va SMM bo'yicha mutaxassis",
      role: "Karyeraning boshlanishi",
      description: "Kompaniyalar uchun ijtimoiy media strategiyalari, kontent rejalar va auditoriya bilan ishlash tizimlarini yo'lga qo'yish orqali marketing olamiga qadam qo'yish.",
      icon: "milestone" as const,
    },
  ];

  const focusAreas = [
    {
      title: "Brend Strategiyasi",
      description: "Brendlarning o'ziga xosligini aniqlash, qadriyatlarini shakllantirish va auditoriya bilan mustahkam aloqa o'rnatish.",
      icon: <Target className="w-6 h-6 text-orange-400" />,
    },
    {
      title: "Xatti-harakatlar Iqtisodiyoti",
      description: "Odamlarning qaror qabul qilish mexanizmlari, kognitiv xatoliklar va irratsional tanlovlarini marketingga tatbiq etish.",
      icon: <Brain className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Brand Communications",
      description: "G'oyalarning jamiyatda tarqalish qonuniyatlari, kreativ PR va integratsiyalashgan kommunikatsiya kampaniyalari.",
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
    },
  ];

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <SEO title="Men haqimda - Alisot" description="Akbarali Sottorov - Marketing strategy va brand communications mutaxassisining falsafasi, karyerasi va qiziqishlari." />
      
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-6 py-20 relative">
        <FadeIn className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-heading font-semibold uppercase tracking-widest w-max mb-6">
            <Compass className="w-4 h-4" />
            <span>Kadr ortida</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-8 text-foreground">
            Inson intuitsiyasi va <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Tizimli Marketing</span> sintezi.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            Men brend kommunikatsiyalari va strategik marketing sohasida faoliyat yuritaman. Maqsadim — g'oyalarning keng tarqalishiga va brendlarning auditoriya bilan samimiy bog'lanishiga yordam berish.
          </p>
        </FadeIn>
      </section>

      {/* Philosophy & Story */}
      <section className="w-full bg-card/30 border-y border-border/40 py-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <FadeIn direction="right" className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-foreground">Shaxsiy hikoya</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Mening marketing va brending olamiga kirib kelishim shunchaki reklama qilish istagidan boshlanmagan. Meni har doim bitta savol qiziqtirgan: odamlar qanday qaror qabul qiladilar va nega ma'lum bir g'oyalarga ergashadilar?
              </p>
              <p>
                Toshkentda yashab va mehnat qilib, turli xil biznes subyektlarining rivojlanish jarayonlarini kuzatdim. Marketingni shunchaki chiroyli rasmlar yoki bannerlar emas, balki chuqur psixologik tahlil va xulq-atvor iqtisodiyoti (behavioral economics) asosidagi fan deb bilaman.
              </p>
              <p>
                Hozirda kitob mutolaasi va ijtimoiy-siyosiy tadqiqotlar orqali marketing tushunchalarimni boyitib bormoqdaman. Daniel Kahnemanning "Thinking, Fast and Slow" kitobi hozirgi kundagi asosiy o'quv manbam bo'lib, inson ongining tezkor (System 1) va chuqur (System 2) fikrlash mexanizmlarini brend kommunikatsiyalarida qanday ishlatish mumkinligini o'rganishga yordam bermoqda.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left" className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-foreground">Falsafam</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong>G'oyalar virus kabidir.</strong> Yaxshi g'oya shunchaki yaratilishi kerak emas, u to'g'ri ijtimoiy kanallar va munosib xabarlar orqali tarqalishi kerak. Brend — bu shunchaki nom emas, u odamlarning ishonchidir.
              </p>
              <p>
                <strong>Fokus va soddalik.</strong> Murakkab tushunchalarni eng oddiy, tushunarli tilda auditoriyaga yetkazish marketingning eng oliy san'atidir. Iste'molchi hech qachon unga tushunarsiz bo'lgan brendni tanlamaydi.
              </p>
              <p>
                <strong>Mutolaa va tadbiq etish.</strong> O'rganilgan nazariy bilimlar (masalan, kognitiv psixologiya yoki ijtimoiy siyosat) real marketing kampaniyalariga integratsiya qilinmasa, shunchaki quruq ma'lumot bo'lib qoladi. Har bir kitob yangi strategiyalar manbayidir.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Current Focus */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24 overflow-hidden">
        <FadeIn className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Hozirgi yo'nalishlar</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">Ayni paytda faol o'rganayotgan, tadbiq etayotgan va tahlil qilayotgan sohalarim.</p>
        </FadeIn>
        
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {focusAreas.map((area, i) => (
            <StaggerItem key={i}>
              <HoverCard className="h-full bg-card/50 border border-border/60 p-8 rounded-2xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center mb-6 border border-border/40 shadow-sm">
                  {area.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Timeline */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-24">
        <FadeIn className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Karyera yo'li</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">Marketing va brend strategiyasi sohasidagi shakllanish bosqichlarim.</p>
        </FadeIn>
        
        <FadeIn delay={0.2} className="max-w-3xl">
          <Timeline events={timelineEvents} />
        </FadeIn>
      </section>
      
      {/* CTA */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-32">
         <FadeIn delay={0.3} className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-10 md:p-16 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Birgalikda yangi brend tarixi yaratamiz.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-10">Biznesingizning brend strategiyasini shakllantirish, samarali kommunikatsiyalar qurish yoki tahliliy marketing loyihalari bo'yicha hamkorlik qilishga tayyorman.</p>
            <a 
              href="/#contact" 
              className="px-8 py-4 bg-foreground hover:opacity-90 text-background rounded-2xl font-heading font-bold transition-all inline-flex justify-center items-center gap-3 shadow-lg hover:scale-105 active:scale-95"
            >
              <span>Men bilan bog'lanish</span>
              <ArrowRight className="w-4 h-4" />
            </a>
         </FadeIn>
      </section>
    </div>
  );
}
