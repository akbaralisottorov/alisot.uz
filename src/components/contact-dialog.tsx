import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "@/lib/i18n";
import { API_ROUTES } from "@/lib/constants";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

type FormStatus = "idle" | "success" | "error";

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setStatus("idle");
    setErrorMsg("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: silently discard bot submissions
    if (formData.website) {
      setStatus("success");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const response = await fetch(API_ROUTES.contact, {
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

      setStatus("success");
      setFormData(INITIAL_FORM);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Tizimda xatolik. Keyinroq qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  // Render via Portal to escape all parent stacking contexts and animations
  const dialogContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-card border border-border/80 rounded-[28px] shadow-2xl p-6 md:p-8 z-10 text-left overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
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
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Yopish
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — hidden from real users */}
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
                  <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    id="name"
                    label="Ismingiz"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ismingizni kiriting"
                  />
                  <FormField
                    id="email"
                    label="Pochtangiz"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                </div>

                <FormField
                  id="subject"
                  label="Mavzu"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Xabar mavzusi"
                />

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
      )}
    </AnimatePresence>
  );

  // Portal ensures dialog escapes any parent transform/filter/opacity stacking contexts
  return createPortal(dialogContent, document.body);
}

// ─── Small reusable text input field ─────────────────────────────────────────
interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

function FormField({ id, label, value, onChange, placeholder, type = "text", required }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-border/60 hover:border-border rounded-xl text-sm focus-ring outline-none transition-colors placeholder:text-muted-foreground/50"
      />
    </div>
  );
}
