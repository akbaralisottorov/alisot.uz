import { SEO } from "@/shared/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import SubscribeForm from "@/features/subscribe-form/subscribe-form";
import { ArrowLeft, BookOpen, Calendar, Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewsletterPage() {
  const { t, langPrefix, currentLang } = useTranslation();

  const archives = [
    {
      id: "issue-3",
      title: "Issue #3: The Psychology of Choice Overload in E-commerce",
      excerpt: "Why offering 24 types of jam reduces sales compared to only 6. Choice architecture frameworks for SaaS pricing grids.",
      date: "2026-07-01",
      readTime: "5 min read"
    },
    {
      id: "issue-2",
      title: "Issue #2: System 1 Cognition in Brand Communications",
      excerpt: "Building brand associations that bypass conscious thinking. The power of anchors, sensory design, and emotional shortcuts.",
      date: "2026-06-15",
      readTime: "4 min read"
    },
    {
      id: "issue-1",
      title: "Issue #1: Launching Alisot.uz - My Digital Workspace",
      excerpt: "A look inside the technical stack, database design, and semantic search implementation of this knowledge platform.",
      date: "2026-06-01",
      readTime: "3 min read"
    }
  ];

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
              <div className="p-6 bg-white dark:bg-card border border-border/80 hover:border-gold/30 rounded-2xl flex flex-col gap-3 group transition-colors">
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
    </div>
  );
}
