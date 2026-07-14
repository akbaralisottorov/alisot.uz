import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowUpRight, BookOpen, Layers, MessageSquare } from "lucide-react";
import { Floating } from "./animations";
import { useTranslation } from "@/lib/i18n";

export default function Hero() {
  const { t, currentLang } = useTranslation();

  const roles = currentLang === "en" ? [
    "Marketing Strategist",
    "Finance Student",
    "Behavioral Economics Enthusiast",
    "Writer",
    "Creator"
  ] : currentLang === "ru" ? [
    "Маркетинг-стратег",
    "Студент финансов",
    "Любитель поведенческой экономики",
    "Писатель",
    "Создатель"
  ] : [
    "Marketing Strategi",
    "Moliya talabasi",
    "Xulq-atvor iqtisodiyoti ishqibozi",
    "Yozuvchi",
    "Yaratuvchi"
  ];

  return (
    <section className="relative w-full py-12 md:py-20 lg:py-24 px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 overflow-hidden border border-border bg-card rounded-[24px] shadow-sm">
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Paper texture overlay for the entire section */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')]" />

      {/* Left Content Area */}
      <div className="flex-1 flex flex-col justify-center relative z-10 w-full max-w-2xl text-left">
        {/* Welcome Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold uppercase tracking-widest w-max mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-status-pulse" />
          {t("hero.welcome")}
        </motion.div>

        {/* Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-[72px] leading-[1.05] tracking-tight text-foreground mb-6"
        >
          Akbarali <br />
          <span className="italic text-primary font-normal">Sottorov</span>
        </motion.h1>

        {/* Roles Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2.5 mb-8"
        >
          {roles.map((role) => (
            <span 
              key={role}
              className="px-3.5 py-1.5 bg-background border border-border/80 rounded-full text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-gold hover:text-foreground"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Short Introduction */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-normal text-xl sm:text-[24px] leading-[1.4] text-muted-foreground mb-10 max-w-[650px]"
        >
          {t("hero.tagline")}
        </motion.p>

        {/* Buttons and Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6"
        >
          {/* Main Gold Button */}
          <a 
            href="#writing" 
            className="px-8 py-4 bg-gold hover:bg-gold-hover text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-gold/20 flex justify-center items-center gap-2 group text-base focus-ring"
          >
            <span>{t("hero.cta_read")}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          
          {/* Secondary Button */}
          <a 
            href="#projects" 
            className="px-8 py-4 border border-border bg-background hover:bg-card text-foreground rounded-full font-semibold transition-all duration-300 flex justify-center items-center hover:border-gold hover:text-gold text-base focus-ring"
          >
            {t("hero.cta_view")}
          </a>

          {/* Social Links */}
          <div className="flex items-center justify-center sm:justify-start gap-4 sm:ml-4 border-t sm:border-t-0 sm:border-l border-border/60 pt-4 sm:pt-0 sm:pl-6">
            <a 
              href="https://github.com/akbaralisottorov" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-background border border-border/80 hover:border-gold hover:text-gold rounded-full text-muted-foreground transition-all duration-300 hover:scale-105 focus-ring"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/akbaralisottorov" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-background border border-border/80 hover:border-gold hover:text-gold rounded-full text-muted-foreground transition-all duration-300 hover:scale-105 focus-ring"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:akbaraliy.phone@gmail.com" 
              className="p-3 bg-background border border-border/80 hover:border-gold hover:text-gold rounded-full text-muted-foreground transition-all duration-300 hover:scale-105 focus-ring"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right Content Area: Portrait with Texture & Floating Cards */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 w-full max-w-lg lg:max-w-none flex items-center justify-center relative min-h-[460px] lg:min-h-[500px]"
      >
        {/* Frame container with paper texture */}
        <motion.div 
          whileHover={{ 
            scale: 1.02,
            rotate: 0.5,
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-[300px] h-[380px] md:w-[320px] md:h-[400px] rounded-[24px] overflow-hidden bg-background border border-border shadow-md relative group cursor-pointer"
        >
          <img 
            src="/portrait.png" 
            alt="Akbarali Sottorov Portrait" 
            loading="eager"
            className="w-full h-full object-cover grayscale brightness-95 group-hover:scale-[1.03] transition-transform duration-700 ease-out" 
          />
          {/* Overlay texture details */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.07] bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')]" />
        </motion.div>

        {/* Floating Card 1: Reading Now */}
        <Floating 
          duration={8} 
          yRange={[6, -6]} 
          rotateRange={[-1.5, 1.5]} 
          delay={0}
          className="absolute -top-4 left-4 md:left-8 z-20 pointer-events-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white/90 dark:bg-card/85 border border-border p-4 rounded-[20px] shadow-lg backdrop-blur-md flex items-center gap-3.5 max-w-[210px]"
          >
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-[11px] font-semibold text-gold tracking-widest uppercase">{t("hero.reading_now")}</span>
              <span className="block text-sm font-semibold text-foreground font-sans truncate max-w-[130px]">Thinking, Fast & Slow</span>
            </div>
          </motion.div>
        </Floating>

        {/* Floating Card 2: Current Project */}
        <Floating 
          duration={9} 
          yRange={[-5, 5]} 
          rotateRange={[1.2, -1.2]} 
          delay={0.5}
          className="absolute right-0 top-1/3 z-20 pointer-events-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white/90 dark:bg-card/85 border border-border p-4 rounded-[20px] shadow-lg backdrop-blur-md flex items-center gap-3.5 max-w-[220px]"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-gold flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-[11px] font-semibold text-primary dark:text-gold tracking-widest uppercase">{t("hero.focus_project")}</span>
              <span className="block text-sm font-semibold text-foreground font-sans truncate max-w-[140px]">Tax Helper AI</span>
            </div>
          </motion.div>
        </Floating>

        {/* Floating Card 3: Latest Essay */}
        <Floating 
          duration={10} 
          yRange={[5, -5]} 
          rotateRange={[-1, 1]} 
          delay={1}
          className="absolute bottom-2 left-6 md:left-12 z-20 pointer-events-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white/90 dark:bg-card/85 border border-border p-4 rounded-[20px] shadow-lg backdrop-blur-md flex items-center gap-3.5 max-w-[220px]"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary dark:text-soft-green flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-[11px] font-semibold text-secondary dark:text-soft-green tracking-widest uppercase">{t("hero.latest_article")}</span>
              <span className="block text-sm font-semibold text-foreground font-sans truncate max-w-[140px]">
                {currentLang === "en" ? "Choice Psychology" : currentLang === "ru" ? "Психология выбора" : "Tanlov psixologiyasi"}
              </span>
            </div>
          </motion.div>
        </Floating>
      </motion.div>
    </section>
  );
}
