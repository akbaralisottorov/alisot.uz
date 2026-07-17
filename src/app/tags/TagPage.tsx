import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { getLocalizedProjectsData } from "@/shared/data/projects";
import { Article, GardenNote, Book } from "@/shared/types";
import { Tag as TagIcon, FileText, Cpu, Sprout, BookOpen, ArrowLeft } from "lucide-react";

export default function TagPage() {
  const { name } = useParams<{ name: string }>();
  const { t, langPrefix, currentLang } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [notes, setNotes] = useState<GardenNote[]>([]);
  const [loading, setLoading] = useState(true);

  const projects = getLocalizedProjectsData(currentLang);
  const tagName = name || "";

  useEffect(() => {
    setLoading(true);
    // Fetch articles & notes in parallel
    Promise.all([
      fetch("/api/articles").then(res => res.json()),
      fetch("/api/garden").then(res => res.json())
    ])
      .then(([articlesData, notesData]) => {
        if (Array.isArray(articlesData)) setArticles(articlesData);
        if (Array.isArray(notesData)) setNotes(notesData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter matched contents
  const matchedArticles = articles.filter(a => 
    a.tags?.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())
  );

  const matchedProjects = projects.filter(p => 
    p.techStack.some(tech => tech.toLowerCase() === tagName.toLowerCase()) || 
    p.relatedTechnologies?.some(tech => tech.toLowerCase() === tagName.toLowerCase())
  );

  const matchedNotes = notes.filter(n => 
    n.tags && n.tags.split(",").map(t => t.trim().toLowerCase()).includes(tagName.toLowerCase())
  );

  const totalMatches = matchedArticles.length + matchedProjects.length + matchedNotes.length;

  return (
    <div className="w-full max-w-[900px] mx-auto py-16 px-6 md:px-12 flex flex-col gap-12 selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`Topics: #${tagName} — Akbarali Sottorov`} 
        description={`Explore articles, project case studies, and garden notes tagged under #${tagName}.`}
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
          <div className="flex items-center gap-3 text-gold">
            <TagIcon className="w-8 h-8" />
            <h1 className="font-heading text-4xl md:text-[52px] leading-none text-foreground font-extrabold">
              #{tagName}
            </h1>
          </div>
          
          <p className="font-sans text-base text-muted-foreground leading-relaxed mt-2">
            {currentLang === "uz"
              ? `Ushbu mavzu bo'yicha topilgan barcha bog'liq kontentlar. Jami: ${totalMatches} ta natija.`
              : `All related knowledge resources matched under this topic. Total: ${totalMatches} items found.`}
          </p>
        </div>
      </FadeIn>

      {loading ? (
        <div className="text-center text-muted py-12">Qidirilmoqda...</div>
      ) : totalMatches === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          {currentLang === "uz" ? "Hech qanday natija topilmadi." : "No matching resources found."}
        </div>
      ) : (
        <StaggerContainer className="flex flex-col gap-12 text-left">
          
          {/* Projects Column */}
          {matchedProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-widest border-b border-border/40 pb-4 mb-6">
                <Cpu className="w-4 h-4 text-gold" />
                <span>Projects ({matchedProjects.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {matchedProjects.map(proj => (
                  <StaggerItem key={proj.slug}>
                    <Link 
                      to={`${langPrefix}/projects/${proj.slug}`}
                      className="p-6 bg-white dark:bg-card border border-border/80 hover:border-gold/30 rounded-2xl flex flex-col gap-2 group transition-colors"
                    >
                      <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {proj.motivation}
                      </p>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </div>
          )}

          {/* Articles Column */}
          {matchedArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-widest border-b border-border/40 pb-4 mb-6">
                <FileText className="w-4 h-4 text-gold" />
                <span>Essays ({matchedArticles.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {matchedArticles.map(art => (
                  <StaggerItem key={art.slug}>
                    <Link 
                      to={`${langPrefix}/article/${art.slug}`}
                      className="p-6 bg-white dark:bg-card border border-border/80 hover:border-gold/30 rounded-2xl flex flex-col gap-2 group transition-colors"
                    >
                      <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </div>
          )}

          {/* Garden Notes Column */}
          {matchedNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-widest border-b border-border/40 pb-4 mb-6">
                <Sprout className="w-4 h-4 text-gold" />
                <span>Digital Garden Notes ({matchedNotes.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {matchedNotes.map(note => (
                  <StaggerItem key={note.slug}>
                    <Link 
                      to={`${langPrefix}/garden/${note.slug}`}
                      className="p-6 bg-white dark:bg-card border border-border/80 hover:border-gold/30 rounded-2xl flex flex-col gap-2 group transition-colors"
                    >
                      <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                        {note.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {note.content.substring(0, 100)}...
                      </p>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </div>
          )}

        </StaggerContainer>
      )}
    </div>
  );
}
