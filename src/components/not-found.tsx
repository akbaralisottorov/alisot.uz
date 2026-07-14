import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { Compass } from "lucide-react";
import { motion } from "motion/react";

export function NotFoundPage() {
  const { t, langPrefix } = useTranslation();

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-6 md:px-12 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white dark:bg-card border border-border rounded-[24px] p-8 md:p-12 shadow-sm relative overflow-hidden flex flex-col items-center"
      >
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6 animate-status-pulse">
          <Compass className="w-8 h-8" />
        </div>
        
        <h1 className="font-heading font-extrabold text-3xl text-foreground mb-4">
          {t("notfound.title")}
        </h1>
        
        <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-8">
          {t("notfound.desc")}
        </p>

        <Link
          to={`${langPrefix}/`}
          className="px-6 py-3 bg-gold hover:bg-gold-hover text-white rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:shadow-gold/20 transform hover:-translate-y-[1.5px] active:translate-y-0 active:scale-[0.98] focus-ring"
        >
          {t("notfound.cta")}
        </Link>
      </motion.div>
    </div>
  );
}
