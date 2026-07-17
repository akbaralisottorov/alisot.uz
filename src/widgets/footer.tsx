import { Link } from "react-router-dom";
import { BookOpen, Layers, Mail } from "lucide-react";
import { useTranslation } from "@/shared/lib/i18n";

export default function Footer() {
  const { t, langPrefix } = useTranslation();

  return (
    <footer className="border-t border-border/40 py-16 mt-24 px-6 md:px-12 bg-card rounded-t-[24px]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-left text-sm text-muted-foreground">
        
        {/* Column 1: Philosophy & Copyright */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="font-heading font-extrabold text-foreground text-base tracking-tight">Akbarali Sottorov</h3>
          <p className="font-sans text-xs md:text-sm text-muted-foreground/85 leading-relaxed max-w-[450px]">
            {t("footer.desc")}
          </p>
          <p className="text-[11px] text-muted-foreground/60 pt-2 font-mono">
            © {new Date().getFullYear()} Akbarali Sottorov. {t("footer.rights")}
          </p>
        </div>

        {/* Column 2: Now Status */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-gold">{t("footer.status")}</h4>
          
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <div className="text-xs">
                <span className="block text-[9px] text-muted-foreground/60 font-semibold uppercase">{t("footer.reading")}</span>
                <span className="font-medium text-foreground">Thinking, Fast and Slow</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-primary dark:text-gold flex-shrink-0" />
              <div className="text-xs">
                <span className="block text-[9px] text-muted-foreground/60 font-semibold uppercase">{t("footer.building")}</span>
                <span className="font-medium text-foreground">Tax Helper AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Navigation & Contact */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-gold">{t("footer.connect")}</h4>
          
          <div className="flex flex-col gap-2 pt-1">
            <a 
              href="mailto:akbaraliy.phone@gmail.com" 
              className="text-xs text-foreground hover:text-gold transition-colors flex items-center gap-1.5 focus-ring rounded"
            >
              <Mail className="w-3.5 h-3.5 text-muted-foreground/70" />
              <span>akbaraliy.phone@gmail.com</span>
            </a>
            
            <div className="flex flex-wrap gap-4 pt-2 font-semibold">
              <a 
                href="https://github.com/akbaralisottorov" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold hover:underline underline-offset-4 transition-colors focus-ring rounded"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/akbaralisottorov" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold hover:underline underline-offset-4 transition-colors focus-ring rounded"
              >
                LinkedIn
              </a>
              <Link 
                to={`${langPrefix}/garden`}
                className="hover:text-gold hover:underline underline-offset-4 transition-colors focus-ring rounded"
              >
                {t("nav.garden")}
              </Link>
              <Link 
                to="/admin" 
                className="hover:text-gold hover:underline underline-offset-4 transition-colors text-muted-foreground/50 focus-ring rounded"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
