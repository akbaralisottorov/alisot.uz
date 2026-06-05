import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Iltimos, to'g'ri email manzilini kiriting.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
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
        setMessage(data.error || "Xatolik yuz berdi. Iltimos qaytadan urunib ko'ring.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Tarmoqda xatolik yuz berdi. Ulanishni tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-card/30 border border-border/60 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-primary/40 transition-all duration-300">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center text-center py-6 animate-in fade-in zoom-in duration-300">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <CheckCircle2 className="w-6 h-6 animate-bounce" />
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground mb-2">Obuna muvaffaqiyatli yakunlandi!</h3>
          <p className="text-muted-foreground text-sm max-w-md">
            Rahmat! Siz Akbarali Sottorovning marketing, brending va shaxsiy rivojlanish haqidagi tahlillariga muvaffaqiyatli obuna bo'ldingiz.
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-2 text-left w-full">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Newsletter
            </span>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
              Yangiliklardan xabardor bo'ling
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl">
              Marketing, brend strategiyalari va xulq-atvor iqtisodiyoti bo'yicha eng so'nggi maqolalar va shaxsiy tahlillarni elektron pochtangizga qabul qiling.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-auto flex-1 max-w-md flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Input
                type="email"
                placeholder="Elektron pochtangiz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 bg-input/40 border-border/60 hover:border-primary/40 focus-visible:ring-primary rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl font-bold px-6 py-3 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:shadow-primary/25 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Yuklanmoqda...
                  </>
                ) : (
                  <>
                    Obuna bo'lish
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-xs mt-1 animate-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
