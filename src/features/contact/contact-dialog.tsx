import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "@/shared/lib/i18n";
import { API_ROUTES } from "@/shared/constants";
import { api } from "@/shared/lib/api";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot
}

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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
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

    // Honeypot check
    if (formData.website) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStatus("success");
        setFormData(INITIAL_FORM);
      }, 800);
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      await api.post(API_ROUTES.contact, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setStatus("success");
      setFormData(INITIAL_FORM);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || t("contact.error_generic"));
    } finally {
      setLoading(false);
    }
  };

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
            inherit={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            inherit={false}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-card border border-border/80 rounded-[28px] shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] text-left z-10"
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
                  {t("contact.success_title")}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs mb-8">
                  {t("contact.success_desc")}
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                >
                  {t("contact.close")}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <FormField
                    id="name"
                    label={t("contact.name_label")}
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.name_placeholder")}
                  />
                  <FormField
                    id="email"
                    label={t("contact.email_label")}
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.email_placeholder")}
                  />
                </div>

                <FormField
                  id="subject"
                  label={t("contact.subject_label")}
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t("contact.subject_placeholder")}
                />

                <div className="space-y-1">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("contact.message_label")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.message_placeholder")}
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

  return createPortal(dialogContent, document.body);
}

// ─── Reusable Form Field Subcomponent ─────────────────────────────────────────
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
    <div className="space-y-1 text-left">
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
