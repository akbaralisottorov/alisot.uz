import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "@/lib/i18n";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent scrolling behind
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    // Honeypot check
    if (formData.website) {
      // Quietly act like it succeeded to throw off bots
      setTimeout(() => {
        setLoading(false);
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      }, 1000);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Xabarni yuborishda xatolik yuz berdi");
      }

      setLoading(false);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err: any) {
      setLoading(false);
      setStatus("error");
      setErrorMsg(err.message || "Tizimda xatolik. Keyinroq qayta urinib ko'ring.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
        >
          {/* Backdrop */}
          <motion.div
            inherit={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Flex container to center card */}
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Modal Container */}
            <motion.div
              inherit={false}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-card border border-border/80 rounded-[28px] shadow-2xl p-6 md:p-8 overflow-hidden text-left z-10"
            >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-xl"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-gold mb-1 block">
                {t("contact.badge")}
              </span>
              <h2 id="contact-title" className="font-heading text-2xl font-extrabold text-foreground">
                {t("contact.title")}
              </h2>
            </div>

            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center flex flex-col items-center"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-status-pulse" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  Xabar muvaffaqiyatli yuborildi!
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs mb-8">
                  Tez orada siz bilan bog'lanaman. E'tiboringiz uchun rahmat!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Yopish
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {status === "error" && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Ismingiz <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ismingizni kiriting"
                      className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-border/60 hover:border-border rounded-xl text-sm focus-ring outline-none transition-colors placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Pochtangiz <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-border/60 hover:border-border rounded-xl text-sm focus-ring outline-none transition-colors placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Mavzu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Xabar mavzusi"
                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-border/60 hover:border-border rounded-xl text-sm focus-ring outline-none transition-colors placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Xabaringiz <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Xabaringiz matnini kiriting..."
                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-border/60 hover:border-border rounded-xl text-sm focus-ring outline-none transition-colors placeholder:text-muted-foreground/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full py-3.5 bg-gold hover:bg-gold-hover disabled:bg-gold/50 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2 cursor-pointer focus-ring"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t("contact.cta")}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
}
