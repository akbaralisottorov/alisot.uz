import { useState, useRef, useEffect } from "react";
import { MessageSquare, Sparkles, Send, X, ArrowRight, Loader2, Link as LinkIcon, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "@/shared/lib/i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{ title: string; type: string; slug: string }>;
}

export function AIAssistant() {
  const { langPrefix, currentLang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isUz = currentLang === "uz";
  const isEn = currentLang === "en";

  const suggestions = isUz ? [
    "Akbarali haqida qisqacha ma'lumot bering.",
    "Choice Architecture (Tanlov arxitekturasi) nima?",
    "U qanday kitoblarni o'qigan va tavsiya etadi?",
    "Uning asosiy startap g'oyalari qanday?"
  ] : isEn ? [
    "Tell me about Akbarali Sottorov.",
    "What is Choice Architecture?",
    "Which projects has he developed?",
    "What is his learning philosophy?"
  ] : [
    "Расскажите об Акбарали Сотторове.",
    "Что такое архитектура выбора?",
    "Какие проекты он разработал?",
    "Какие книги он рекомендует?"
  ];

  // Welcome message based on language
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = isUz 
        ? "Assalomu alaykum! Men Akbaralining raqamli egizak AI yordamchisiman. Uning faoliyati, g'oyalari yoki kitoblari haqida so'rang."
        : isEn
        ? "Hello! I am Akbarali's digital twin AI assistant. Ask me anything about his work, choice architecture, books, or articles."
        : "Здравствуйте! Я цифровой ИИ-помощник Акбарали. Спросите меня о его проектах, статьях или исследованиях.";
      setMessages([{ role: "assistant", content: greeting }]);
    }
  }, [currentLang, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    
    const userMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages.slice(-8) }), // keep context short
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {
          role: "assistant",
          content: data.content,
          citations: data.citations
        }]);
      } else {
        throw new Error("Failed to get AI response");
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: isUz 
          ? "Kechirasiz, tarmoq ulanishida xatolik yuz berdi. Iltimos qaytadan urinib ko'ring." 
          : "Sorry, a network connection error occurred. Please try again."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const getCitationUrl = (citation: { type: string; slug: string }) => {
    if (citation.type === "article") return `${langPrefix}/article/${citation.slug}`;
    if (citation.type === "garden") return `${langPrefix}/garden/${citation.slug}`;
    if (citation.type === "book") return `${langPrefix}/books/${citation.slug}`;
    return `${langPrefix}/`;
  };

  const clearHistory = () => {
    const greeting = isUz 
      ? "Assalomu alaykum! Men Akbaralining raqamli egizak AI yordamchisiman. Uning faoliyati, g'oyalari yoki kitoblari haqida so'rang."
      : isEn
      ? "Hello! I am Akbarali's digital twin AI assistant. Ask me anything about his work, choice architecture, books, or articles."
      : "Здравствуйте! Я цифровой ИИ-помощник Акбарали. Спросите меня о его проектах, статьях или исследованиях.";
    setMessages([{ role: "assistant", content: greeting }]);
  };

  return (
    <>
      {/* Floating Toggle Bubble */}
      <div className="fixed bottom-10 right-28 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="p-3.5 bg-gold border border-gold hover:bg-gold-hover text-white rounded-full shadow-lg shadow-gold/20 flex items-center justify-center cursor-pointer relative group"
          aria-label="Toggle AI Assistant"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="absolute right-14 bg-card border border-border text-foreground px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-sm">
            {isUz ? "AI Yordamchi" : isEn ? "AI Assistant" : "ИИ Помощник"}
          </span>
        </motion.button>
      </div>

      {/* Expanded Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 sm:right-10 z-50 w-[90vw] sm:w-[420px] h-[550px] bg-white dark:bg-card border border-border/80 rounded-[24px] shadow-2xl flex flex-col overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="p-5 border-b border-border/60 bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground">Alisot Digital Twin</h3>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online • AI Knowledge Engine
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearHistory}
                  title="Clear history"
                  className="p-1.5 hover:bg-muted border border-transparent hover:border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-muted border border-transparent hover:border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-5 overflow-y-auto space-y-4 text-left flex flex-col bg-background/5"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div 
                    className={`p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-gold text-white rounded-br-none" 
                        : "bg-white dark:bg-muted/40 border border-border/80 text-foreground rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                  
                  {/* Citations */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {msg.citations.map((c, ci) => (
                        <a
                          key={ci}
                          href={getCitationUrl(c)}
                          className="inline-flex items-center gap-1 text-[9px] font-bold text-gold uppercase tracking-wider bg-gold/5 border border-gold/15 px-2 py-0.5 rounded hover:bg-gold/10 transition-colors"
                        >
                          <LinkIcon className="w-2.5 h-2.5" />
                          <span>{c.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs p-3.5 bg-muted/20 border border-border/40 rounded-2xl rounded-bl-none w-fit">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-gold" />
                  <span>Thinking...</span>
                </div>
              )}
            </div>

            {/* Suggestion Pills */}
            {messages.length <= 1 && !loading && (
              <div className="px-5 py-2.5 flex flex-col gap-1.5 border-t border-border/40 bg-muted/10 text-left">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-muted">Suggested Prompts</span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(s)}
                      className="px-2.5 py-1 border border-border/80 hover:border-gold rounded-full text-[10px] text-muted-foreground hover:text-gold transition-colors text-left bg-white dark:bg-card cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-4 border-t border-border/60 bg-muted/20 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isUz ? "Savol yozing..." : isEn ? "Type a question..." : "Напишите вопрос..."}
                disabled={loading}
                className="flex-1 bg-white dark:bg-card border border-border/80 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-gold text-foreground"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 bg-gold hover:bg-gold-hover disabled:bg-muted text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
