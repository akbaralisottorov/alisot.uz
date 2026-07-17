import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { getLocalizedProjectsData } from "@/shared/data/projects";
import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react";

export default function ProjectsPage() {
  const { t, currentLang, langPrefix } = useTranslation();
  const projects = getLocalizedProjectsData(currentLang);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique technologies
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.techStack || []))
  );

  const filteredProjects = selectedTag
    ? projects.filter((p) => p.techStack.includes(selectedTag))
    : projects;

  return (
    <div className="w-full max-w-[1200px] mx-auto py-16 px-6 md:px-12 flex flex-col gap-12 selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`${t("nav.projects")} — Akbarali Sottorov`} 
        description="Premium Case Studies and Software Projects built by Akbarali Sottorov."
      />

      <FadeIn>
        <div className="flex flex-col gap-4 border-b border-border/60 pb-8">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-gold block">
            {t("projects.badge") || "PORTFOLIO"}
          </span>
          <h1 className="font-heading text-4xl md:text-[52px] leading-none text-foreground font-extrabold">
            {t("projects.title") || "Selected Work"}
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed">
            {t("projects.desc") || "Discover full case studies, architecture patterns, and technical decisions."}
          </p>
        </div>
      </FadeIn>

      {/* Filter Tabs */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
              selectedTag === null
                ? "bg-gold border-gold text-white"
                : "bg-white dark:bg-card border-border hover:border-gold/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Projects
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                selectedTag === tag
                  ? "bg-gold border-gold text-white"
                  : "bg-white dark:bg-card border-border hover:border-gold/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <StaggerItem key={project.slug}>
            <div className="bg-white dark:bg-card border border-border rounded-[24px] overflow-hidden flex flex-col h-full group hover:border-gold/50 hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
              <div className="aspect-[16/10] bg-background border-b border-border overflow-hidden relative p-1.5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover rounded-[18px]"
                  loading="lazy"
                />
                <span className={`absolute top-6 left-6 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border shadow-sm ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {project.motivation}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-background border border-border/80 rounded-lg text-[10px] font-bold text-muted-foreground font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/50 pt-6 mt-auto">
                  <div className="flex gap-4">
                    <a 
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-gold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-gold transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  </div>

                  <Link 
                    to={`${langPrefix}/projects/${project.slug}`}
                    className="px-5 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/15 rounded-[24px] text-[10px] font-bold text-primary dark:text-gold transition-all duration-300 hover:-translate-y-[1px] inline-flex items-center gap-1.5"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
