import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { SemanticSearch } from "./semantic-search";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "@/lib/i18n";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["writing", "projects", "contact"];
    const handleScrollSpy = () => {
      if (window.scrollY < 180) {
        setActiveSection("");
        return;
      }

      let currentSection = "";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [location.pathname]);

  const { t, currentLang, langPrefix } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    const currentPath = location.pathname;
    const cleanPath = currentPath.replace(/^\/(en|ru)/, "") || "/";
    const prefix = lang === "uz" ? "" : `/${lang}`;
    document.documentElement.lang = lang;
    return prefix + cleanPath + location.search + location.hash;
  };

  const navLinks = [
    { label: t("nav.home"), href: `${langPrefix}/` },
    { label: t("nav.writing"), href: `${langPrefix}/#writing` },
    { label: t("nav.projects"), href: `${langPrefix}/#projects` },
    { label: t("nav.garden"), href: `${langPrefix}/garden` },
    { label: t("nav.library"), href: `${langPrefix}/books` },
    { label: t("nav.about"), href: `${langPrefix}/about` },
    { label: t("nav.contact"), href: `${langPrefix}/#contact` }
  ];

  const isActive = (href: string) => {
    const currentPath = location.pathname;
    const currentHash = location.hash;
    
    const cleanPath = currentPath.replace(/^\/(en|ru)/, "") || "/";
    const cleanHref = href.replace(/^\/(en|ru)/, "") || "/";
    
    if (cleanHref === "/") {
      return cleanPath === "/" && !currentHash && !activeSection;
    }
    
    if (cleanHref.includes("#")) {
      const sectionId = cleanHref.split("#")[1];
      if (cleanPath === "/") {
        return activeSection === sectionId || (!activeSection && currentHash === `#${sectionId}`);
      }
      return false;
    }
    
    return cleanPath.startsWith(cleanHref);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-500">
      <div 
        className={`w-full border-b transition-all duration-500 px-6 md:px-12 flex items-center justify-between relative ${
          scrolled 
            ? "py-3.5 bg-background/85 backdrop-blur-md border-border shadow-sm" 
            : "py-5 bg-transparent border-transparent"
        }`}
      >
        {/* Scroll Progress Indicator */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gold/70 transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Logo */}
        <Link 
          to="/" 
          className="font-heading font-extrabold text-2xl text-foreground !decoration-transparent hover:opacity-90 transition-opacity focus-ring rounded-lg px-2 py-1"
          aria-label="Akbarali Sottorov digital home"
        >
          Akbarali<span className="text-gold font-normal">.</span>
        </Link>
        
        {/* Navigation - Center */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const isExternalHash = link.href.startsWith("/#");
            const linkProps = isExternalHash 
              ? { href: link.href } 
              : { to: link.href };
            const Tag = isExternalHash ? "a" : Link;

            return (
              <Tag
                key={link.label}
                {...(linkProps as any)}
                className={`relative py-1 transition-colors duration-300 focus-ring rounded-md px-2 ${
                  active 
                    ? "text-gold font-bold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Tag>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-4">
          <SemanticSearch />
          
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-xl flex items-center gap-1.5 text-xs font-bold uppercase cursor-pointer"
              aria-label="Tilni o'zgartirish"
              aria-expanded={dropdownOpen}
            >
              <Globe className="w-4 h-4 text-gold" />
              <span>{currentLang}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden py-1">
                {["uz", "en", "ru"].map((lang) => (
                  <Link
                    key={lang}
                    to={handleLanguageChange(lang)}
                    onClick={() => setDropdownOpen(false)}
                    className={`block w-full text-left px-4 py-2 text-xs font-semibold uppercase hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
                      currentLang === lang ? "text-gold font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {lang === "uz" ? "O'zbek" : lang === "en" ? "English" : "Русский"}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <ModeToggle />
          <a
            href={`${langPrefix}/#newsletter`}
            className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-white rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 hover:shadow-md hover:shadow-gold/20 transform hover:-translate-y-[1px] active:translate-y-0 focus-ring"
          >
            {t("nav.subscribe")}
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-3">
          <SemanticSearch />
          
          {/* Mobile Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-xl flex items-center gap-1 text-xs font-bold uppercase cursor-pointer"
              aria-label="Tilni o'zgartirish"
              aria-expanded={dropdownOpen}
            >
              <Globe className="w-4 h-4 text-gold" />
              <span>{currentLang}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden py-1">
                {["uz", "en", "ru"].map((lang) => (
                  <Link
                    key={lang}
                    to={handleLanguageChange(lang)}
                    onClick={() => setDropdownOpen(false)}
                    className={`block w-full text-left px-4 py-2 text-xs font-semibold uppercase hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
                      currentLang === lang ? "text-gold font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {lang === "uz" ? "O'zbek" : lang === "en" ? "English" : "Русский"}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <ModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-xl"
            aria-label="Menyuni ochish yopish"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden w-full bg-background/95 backdrop-blur-lg border-b border-border/80 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-3">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const isExternalHash = link.href.includes("#");
                const linkProps = isExternalHash 
                  ? { href: link.href } 
                  : { to: link.href };
                const Tag = isExternalHash ? "a" : Link;

                return (
                  <div key={link.label} onClick={() => setIsOpen(false)}>
                    <Tag
                      {...(linkProps as any)}
                      className={`block text-base font-semibold py-2.5 border-b border-border/5 px-2 rounded-lg transition-colors ${
                        active 
                          ? "text-gold bg-gold/5 pl-3 font-bold" 
                          : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Tag>
                  </div>
                );
              })}
              <a
                href={`${langPrefix}/#newsletter`}
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full text-center py-3 bg-gold hover:bg-gold-hover text-white rounded-full text-sm font-bold transition-all duration-300 shadow-sm"
              >
                {t("nav.subscribe")}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
