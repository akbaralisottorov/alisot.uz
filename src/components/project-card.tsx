import type { FC } from "react"
import { ExternalLink, Github } from "lucide-react"
import { TiltCard } from "./tilt-card"

interface ProjectCardProps {
  title: string
  description: string
  link?: string
  github?: string
  tags: string[]
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  link,
  github,
  tags,
}) => {
  return (
    <TiltCard className="h-full">
      <div 
        className="h-full bg-card/80 border border-border/60 rounded-2xl p-6 md:p-8 flex flex-col justify-between group overflow-hidden relative transition-colors hover:border-primary/80 backdrop-blur-md"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative z-10 flex-1" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          <span 
            className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-4 block"
            style={{ transform: "translateZ(10px)" }}
          >
            Loyiha
          </span>
          <h3 
            className="font-heading text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors"
            style={{ transform: "translateZ(20px)" }}
          >
            {title}
          </h3>
          <p 
            className="text-muted-foreground text-sm mb-6 leading-relaxed"
            style={{ transform: "translateZ(15px)" }}
          >
            {description}
          </p>
          
          <div 
            className="flex flex-wrap gap-2 mb-6"
            style={{ transform: "translateZ(25px)" }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-input/40 border border-border/40 rounded-xl text-xs text-muted-foreground backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div 
          className="flex gap-4 relative z-10"
          style={{ transform: "translateZ(35px)" }}
        >
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors group/link"
            >
              <Github className="w-4 h-4 group-hover/link:text-primary transition-colors" />
              <span>Kodni ko'rish</span>
            </a>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors group/link"
            >
              <ExternalLink className="w-4 h-4 group-hover/link:text-primary transition-colors" />
              <span>Saytga o'tish</span>
            </a>
          )}
        </div>

        {/* Depth decorative element */}
        <div 
          className="absolute -right-4 -bottom-4 w-40 h-40 bg-primary/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          style={{ transform: "translateZ(-20px)" }}
        />
      </div>
    </TiltCard>
  )
}

export default ProjectCard
