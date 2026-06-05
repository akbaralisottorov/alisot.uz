import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Instagram, Linkedin, Send } from "lucide-react";

const KnowledgeSphereCanvas = lazy(() => import("./knowledge-sphere-canvas"));

export default function Hero() {
  return (
    <section className="col-span-1 md:col-span-12 border border-border/60 bg-card/60 rounded-[2.5rem] p-8 md:p-14 lg:p-16 flex flex-col md:flex-row relative overflow-hidden backdrop-blur-xl w-full gap-12 lg:gap-20">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[60%] bg-secondary rounded-full blur-[100px]" />
      </div>

      {/* Left Content Area */}
      <div className="flex-1 flex flex-col justify-center relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-heading font-semibold uppercase tracking-widest w-max mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Akbarali Sottorov</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6 leading-[1.05] text-foreground"
        >
          Marketing & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Brand Strategi</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground text-xl leading-relaxed mb-4 max-w-xl"
        >
          Brend kommunikatsiyalari va strategik marketing bo'yicha professional maslahatchi.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground/80 text-base leading-relaxed mb-10 max-w-xl"
        >
          Xulq-atvor iqtisodiyoti, iste'molchi psixologiyasi va g'oyalarning tarqalish mexanizmlariga asoslangan tizimli marketing yechimlari.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a 
            href="#projects" 
            className="px-8 py-4 bg-foreground group hover:opacity-90 text-background rounded-2xl font-heading font-bold transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] inline-flex justify-center items-center gap-3"
          >
            <span>Loyihalarni ko'rish</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 bg-background/50 hover:bg-background/80 text-foreground border border-border/60 hover:border-border rounded-2xl font-heading font-bold transition-all backdrop-blur-md inline-flex justify-center items-center"
          >
            Aloqaga chiqish
          </a>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.6, delay: 0.6 }}
           className="flex flex-wrap items-center gap-6 mt-10"
        >
           <a href="https://t.me/akbaralisottorov" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#0088cc] transition-colors p-2 -ml-2 rounded-lg hover:bg-foreground/5 flex items-center gap-2">
             <Send className="h-5 w-5" />
             <span className="text-sm font-medium">Telegram</span>
           </a>
           <a href="https://instagram.com/akbaralisottorov" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#E1306C] transition-colors p-2 rounded-lg hover:bg-foreground/5 flex items-center gap-2">
             <Instagram className="h-5 w-5" />
             <span className="text-sm font-medium">Instagram</span>
           </a>
           <a href="https://linkedin.com/in/akbaralisottorov" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#0077B5] transition-colors p-2 rounded-lg hover:bg-foreground/5 flex items-center gap-2">
             <Linkedin className="h-5 w-5" />
             <span className="text-sm font-medium">LinkedIn</span>
           </a>
        </motion.div>
      </div>

      {/* Right Interactive/Visual Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 relative z-10 w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          }>
            <KnowledgeSphereCanvas />
          </Suspense>
        </div>
      </motion.div>
    </section>
  );
}
