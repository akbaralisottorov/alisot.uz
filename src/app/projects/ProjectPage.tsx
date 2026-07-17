import { useParams, Link, useNavigate } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { getProjectBySlug } from "@/shared/data/projects";
import { ArrowLeft, ExternalLink, Github, Cpu, Calendar, Target, Award, List } from "lucide-react";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, currentLang, langPrefix } = useTranslation();
  const navigate = useNavigate();

  const project = slug ? getProjectBySlug(slug, currentLang) : undefined;

  if (!project) {
    return (
      <div className="w-full max-w-[800px] mx-auto py-24 px-6 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Loyiha topilmadi</h1>
        <p className="text-muted-foreground mb-8">Siz qidirayotgan loyiha mavjud emas yoki nomi o'zgargan.</p>
        <Link 
          to={`${langPrefix}/projects`} 
          className="px-6 py-2.5 bg-gold text-white rounded-full text-xs uppercase tracking-wider font-bold"
        >
          Loyihalarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full max-w-[900px] mx-auto py-16 px-6 md:px-12 selection:bg-gold/25 selection:text-foreground">
      <SEO 
        title={`${project.title} — Project Case Study`} 
        description={project.motivation}
      />

      {/* Back to Projects */}
      <FadeIn className="mb-8">
        <button
          onClick={() => navigate(`${langPrefix}/projects`)}
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors cursor-pointer focus-ring rounded p-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("nav.projects") || "Loyihalar"}</span>
        </button>
      </FadeIn>

      {/* Header Section */}
      <FadeIn>
        <header className="border-b border-border/60 pb-12 mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border shadow-sm ${project.statusColor}`}>
              {project.status}
            </span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-[56px] leading-tight font-extrabold text-foreground mb-6">
            {project.title}
          </h1>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white dark:bg-card border border-border/80 rounded-2xl p-6 mt-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-muted font-bold block">{t("projects.duration") || "Muddat"}</span>
              <div className="flex items-center gap-1.5 mt-1 text-sm font-semibold text-foreground">
                <Calendar className="w-4 h-4 text-gold shrink-0" />
                <span>{project.timeline}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-muted font-bold block">Role</span>
              <div className="flex items-center gap-1.5 mt-1 text-sm font-semibold text-foreground">
                <Cpu className="w-4 h-4 text-gold shrink-0" />
                <span>Lead Engineer</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-muted font-bold block">Live Site</span>
              <a 
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 mt-1 text-sm font-semibold text-gold hover:underline"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>Visit Link</span>
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-muted font-bold block">Source Code</span>
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 mt-1 text-sm font-semibold text-muted-foreground hover:text-foreground hover:underline"
              >
                <Github className="w-4 h-4 shrink-0" />
                <span>Repository</span>
              </a>
            </div>
          </div>
        </header>
      </FadeIn>

      {/* Case Study Content */}
      <div className="flex flex-col gap-12 text-left">
        
        {/* Cover Image */}
        <FadeIn delay={0.1}>
          <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-border bg-background">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </FadeIn>

        {/* Overview */}
        <FadeIn>
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gold">
              <Target className="w-5 h-5 shrink-0" />
              <h2 className="font-heading text-[22px] font-bold text-foreground">Overview</h2>
            </div>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
              {project.motivation}
            </p>
          </section>
        </FadeIn>

        {/* Problem & Research */}
        <FadeIn>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/40 pt-10">
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-[18px] font-bold text-foreground">The Problem</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-[18px] font-bold text-foreground">Research & Insight</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {project.research}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Solution */}
        <FadeIn>
          <section className="flex flex-col gap-4 border-t border-border/40 pt-10">
            <div className="flex items-center gap-2 text-gold">
              <Award className="w-5 h-5 shrink-0" />
              <h2 className="font-heading text-[22px] font-bold text-foreground">The Solution</h2>
            </div>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </section>
        </FadeIn>

        {/* Architecture Section */}
        <FadeIn>
          <section className="flex flex-col gap-4 border-t border-border/40 pt-10">
            <div className="flex items-center gap-2 text-gold">
              <Cpu className="w-5 h-5 shrink-0" />
              <h2 className="font-heading text-[22px] font-bold text-foreground">System Architecture</h2>
            </div>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
              {project.architecture.description}
            </p>

            {/* Architecture Node Flow */}
            <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.architecture.nodes.map((node) => (
                  <div key={node.id} className="p-4 rounded-xl border border-border bg-background flex flex-col gap-1 relative overflow-hidden group hover:border-gold/30 transition-colors">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider">{node.label}</span>
                    <p className="text-xs text-muted-foreground leading-normal mt-1">{node.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Challenges & Lessons */}
        <FadeIn>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/40 pt-10">
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-[18px] font-bold text-foreground">Challenges faced</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {project.challenges}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-[18px] font-bold text-foreground">Lessons Learned</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed italic">
                {project.lessonsLearned}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Future Improvements & Tech Stack */}
        <FadeIn>
          <section className="flex flex-col gap-6 border-t border-border/40 pt-10">
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-[18px] font-bold text-foreground">Future Roadmap</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {project.futureImprovements}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-xs uppercase tracking-widest text-muted font-bold">Technologies Used</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white dark:bg-card border border-border/80 rounded-xl text-xs font-bold text-muted-foreground font-mono">
                    {tech}
                  </span>
                ))}
                {project.relatedTechnologies?.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white dark:bg-card border border-border/40 rounded-xl text-xs font-semibold text-muted/80 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      </div>
    </article>
  );
}
