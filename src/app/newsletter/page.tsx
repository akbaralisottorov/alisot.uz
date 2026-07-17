import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SEO } from "@/shared/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import SubscribeForm from "@/features/subscribe-form/subscribe-form";
import { ArrowLeft, BookOpen, Calendar, Mail, FileText, X, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";

interface Issue {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
}

interface IssueModalProps {
  issue: Issue;
  onClose: () => void;
  onCopy: (id: string) => void;
  copied: boolean;
  currentLang: string;
}

function IssueModal({ issue, onClose, onCopy, copied, currentLang }: IssueModalProps) {
  // Lock scroll
  useEffect(() => {
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
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Dialog */}
      <div className="bg-white dark:bg-card border border-border rounded-[24px] w-full max-w-2xl max-h-[85vh] overflow-y-auto relative p-8 shadow-xl z-10 text-left flex flex-col gap-6 scale-in duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-start gap-4 border-b border-border/60 pb-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{issue.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span>{issue.readTime}</span>
            </div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground leading-snug">
              {issue.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 bg-background hover:bg-muted border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-sm md:text-base space-y-4 overflow-y-auto">
          <Markdown>{issue.content}</Markdown>
        </div>

        {/* Utilities Footer */}
        <div className="border-t border-border/60 pt-4 flex justify-between items-center gap-4 mt-auto">
          <button
            onClick={() => onCopy(issue.id)}
            className="px-4 py-2 bg-background border border-border hover:border-gold rounded-xl text-xs font-semibold text-muted-foreground hover:text-gold transition-colors flex items-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Archive Link"}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-wider text-[10px] rounded-[20px] transition-colors cursor-pointer"
          >
            {currentLang === "uz" ? "Yopish" : "Close"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function NewsletterPage() {
  const { t, langPrefix, currentLang } = useTranslation();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [copied, setCopied] = useState(false);

  const archives: Issue[] = [
    {
      id: "issue-3",
      title: "Issue #3: The Psychology of Choice Overload in E-commerce",
      excerpt: "Why offering 24 types of jam reduces sales compared to only 6. Choice architecture frameworks for SaaS pricing grids.",
      date: "2026-07-01",
      readTime: "5 min read",
      content: `## The Jam Experiment

In 2000, psychologists Sheena Iyengar and Mark Lepper published a landmark study. On one day, shoppers at an upscale market saw a display with 24 varieties of gourmet jam. On another day, they saw a display with only 6.

### The Result:
- **Large Selection (24 jams)**: 60% of shoppers stopped by, but only **3%** purchased.
- **Small Selection (6 jams)**: 40% of shoppers stopped by, and **30%** purchased.

### Key Takeaways for Digital Products:
1. **Limit pricing tier choices**: Keep subscription levels to 3 options.
2. **Leverage default choices**: Pre-select the most popular choice.
3. **Use anchors**: Place the high-tier price first to anchor value.`
    },
    {
      id: "issue-2",
      title: "Issue #2: System 1 Cognition in Brand Communications",
      excerpt: "Building brand associations that bypass conscious thinking. The power of anchors, sensory design, and emotional shortcuts.",
      date: "2026-06-15",
      readTime: "4 min read",
      content: `## System 1 vs System 2 Thinking

Daniel Kahneman explains that our brain operates in two modes: System 1 (fast, emotional, automatic) and System 2 (slow, rational, logical).

### Brand Communications and System 1:
- Most consumer choices are System 1 shortcuts.
- Anchoring, social proof, and visual symmetry speak directly to System 1.
- In contrast, heavy text or complex specifications force the user into slow System 2 processing, raising cognitive friction.`
    },
    {
      id: "issue-1",
      title: "Issue #1: Launching Alisot.uz - My Digital Workspace",
      excerpt: "A look inside the technical stack, database design, and semantic search implementation of this knowledge platform.",
      date: "2026-06-01",
      readTime: "3 min read",
      content: `## Building Alisot.uz

Welcome to my digital garden. This project was built to test several technical theories:
- **Express Server + Vite client**: A clean custom SSR/SPA architecture.
- **PostgreSQL Vector search**: Using pgvector for OpenAI embedding retrieval.
- **Type-safe hooks**: Eliminating generic any-casts for robust state tracking.

Thank you for following along as I build choice architecture frameworks.`
    }
  ];

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${langPrefix}/newsletter#${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto py-16 px-6 md:px-12 flex flex-col gap-12 selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`${currentLang === "uz" ? "Nashrlar" : currentLang === "en" ? "Newsletter" : "Рассылка"} — Akbarali Sottorov`} 
        description="Subscribe to my newsletter covering marketing strategy, brand communication, and consumer psychology."
      />

      {/* Back button */}
      <FadeIn>
        <Link 
          to={`${langPrefix}/`} 
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentLang === "uz" ? "Bosh sahifa" : "Digital Home"}</span>
        </Link>
      </FadeIn>

      {/* Header */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-4 border-b border-border/60 pb-8 text-left">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold block">
            {currentLang === "uz" ? "XABARLAR VA TAHLILLAR" : currentLang === "en" ? "BI-WEEKLY INSIGHTS" : "ПИСЬМА И АНАЛИТИКА"}
          </span>
          <h1 className="font-heading text-4xl md:text-[52px] leading-none text-foreground font-extrabold flex items-center gap-2">
            {currentLang === "uz" ? "Brend & Marketing Tahlili" : currentLang === "en" ? "Brand & Marketing Brief" : "Письма о маркетинге"}
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed mt-2 max-w-[650px]">
            {currentLang === "uz"
              ? "Har ikki haftada brend strategiyasi, iste'molchi xulq-atvori va mahsulot marketingiga oid chuqur tahlillar."
              : currentLang === "en"
              ? "Every two weeks, I share breakdowns on brand communications, consumer decision architecture, and tech builds."
              : "Каждые две недели я делюсь анализом бренд-стратегии, психологии выбора и веб-технологий."}
          </p>
        </div>
      </FadeIn>

      {/* Subscribe Form Container */}
      <FadeIn delay={0.2}>
        <SubscribeForm />
      </FadeIn>

      {/* Archives Section */}
      <div className="flex flex-col gap-6 text-left">
        <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-widest border-b border-border/40 pb-4 mb-2">
          <BookOpen className="w-4 h-4 text-gold" />
          <span>{currentLang === "uz" ? "Nashrlar Arxivi" : "Past Issues"}</span>
        </div>

        <StaggerContainer className="flex flex-col gap-6">
          {archives.map((issue) => (
            <StaggerItem key={issue.id}>
              <div 
                onClick={() => setSelectedIssue(issue)}
                className="p-6 bg-white dark:bg-card border border-border/80 hover:border-gold/30 rounded-2xl flex flex-col gap-3 group transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>{issue.date}</span>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground/80 font-mono">
                    {issue.readTime}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                  {issue.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {issue.excerpt}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gold uppercase tracking-widest pt-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Read online archive</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Portals Overlay Issue Viewer */}
      {selectedIssue && (
        <IssueModal 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
          onCopy={handleCopyLink} 
          copied={copied} 
          currentLang={currentLang}
        />
      )}
    </div>
  );
}
