import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/shared/components/animations";
import { SITE_CONFIG } from "@/shared/config/site";

interface ContactSectionProps {
  setIsContactOpen: (open: boolean) => void;
  t: (key: string) => string;
}

export default function ContactSection({ setIsContactOpen, t }: ContactSectionProps) {
  return (
    <section id="contact" className="w-full">
      <div className="bg-primary text-primary-foreground border border-dark-green rounded-[24px] p-8 md:p-12 lg:p-16 text-center max-w-[850px] mx-auto relative overflow-hidden">
        {/* Subtle noise pattern */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')]" />

        <FadeIn className="flex flex-col items-center">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3 block">{t("contact.badge")}</span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            {t("contact.title")}
          </h2>
          <p className="font-sans text-base text-primary-foreground/80 max-w-[600px] leading-relaxed mb-8">
            {t("contact.desc")}
          </p>

          <button 
            onClick={() => setIsContactOpen(true)}
            className="px-8 py-3.5 bg-gold hover:bg-gold-hover text-white rounded-[24px] font-bold uppercase tracking-wider text-xs transition-all duration-300 hover:shadow-md hover:shadow-gold/25 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus-ring inline-flex items-center gap-2 mb-12 cursor-pointer"
          >
            <span>{t("contact.cta")}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-8 font-semibold border-t border-primary-foreground/15 pt-8 w-full max-w-md">
            <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-sm focus-ring rounded">LinkedIn</a>
            <a href={SITE_CONFIG.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-sm focus-ring rounded">GitHub</a>
            <a href={`mailto:${SITE_CONFIG.author.email}`} className="hover:text-gold transition-colors text-sm focus-ring rounded">Email</a>
            <a href={SITE_CONFIG.socials.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-sm focus-ring rounded">Telegram</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
