import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { API_ROUTES } from "@/shared/constants";
import { useTranslation } from "@/shared/lib/i18n";

export default function SubscribeForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage(t("newsletter.error_invalid"));
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch(API_ROUTES.subscribe, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || t("newsletter.error_generic"));
      }
    } catch {
      setStatus("error");
      setMessage(t("newsletter.error_network"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-card border border-border rounded-[24px] p-8 md:p-12 shadow-sm text-left relative overflow-hidden">
      {/* Subtle background graphics */}
      <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center py-6"
          >
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-4 font-bold">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-foreground mb-2">
              {t("newsletter.success_title")}
            </h3>
            <p className="font-sans text-muted-foreground text-base max-w-md leading-relaxed mb-6">
              {t("newsletter.success_desc")}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors cursor-pointer"
            >
              {t("newsletter.add_another")}
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col lg:flex-row items-start justify-between gap-10"
          >
            <div className="flex-1 space-y-3 w-full">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> {t("newsletter.badge")}
              </span>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground leading-tight">
                {t("newsletter.title")}
              </h2>
              <p className="font-sans text-base text-muted-foreground max-w-xl leading-relaxed">
                {t("newsletter.desc")}
              </p>
              <div className="pt-2 text-xs text-muted-foreground/80 flex flex-wrap gap-x-6 gap-y-2">
                <span>{t("newsletter.periodicity")}</span>
                <span>{t("newsletter.guarantee")}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full lg:w-auto flex-1 max-w-md flex flex-col gap-2 pt-2">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  value={email}
                  onChange={handleEmailChange}
                  disabled={loading}
                  className="flex-1 bg-background border border-border hover:border-gold/40 focus-ring rounded-[16px] px-4 py-3 h-12 text-foreground placeholder:text-muted-foreground text-sm transition-all duration-300"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gold hover:bg-gold-hover text-white rounded-[16px] font-bold px-6 h-12 transition-all flex items-center justify-center gap-2 shadow-sm shadow-gold/20 cursor-pointer disabled:opacity-50 focus-ring"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t("newsletter.loading")}</span>
                    </>
                  ) : (
                    <>
                      <span>{t("newsletter.cta")}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
              
              <AnimatePresence>
                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 text-red-500 text-xs mt-2.5 font-sans font-medium"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
