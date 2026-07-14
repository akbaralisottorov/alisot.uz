import { motion } from "motion/react";
import { Briefcase, GraduationCap, Award, Star } from "lucide-react";

export interface TimelineEvent {
  year: string;
  title: string;
  role?: string;
  description: string;
  icon?: "work" | "education" | "award" | "milestone";
}

export function Timeline({ events }: { events: TimelineEvent[] }) {
  const getIcon = (type?: string) => {
    const iconClass = "w-4 h-4 text-gold";
    switch (type) {
      case "work":
        return <Briefcase className={iconClass} />;
      case "education":
        return <GraduationCap className={iconClass} />;
      case "award":
        return <Award className={iconClass} />;
      default:
        return <Star className={iconClass} />;
    }
  };

  return (
    <div className="relative border-l border-border/40 ml-4 md:ml-6 space-y-12 pb-4">
      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
          className="relative pl-8 md:pl-12"
        >
          {/* Timeline dot */}
          <div className="absolute -left-[21px] top-0.5 w-10 h-10 rounded-full bg-white dark:bg-card border border-border flex items-center justify-center shadow-sm">
            <div className="w-8 h-8 rounded-full bg-gold/5 flex items-center justify-center">
              {getIcon(event.icon)}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <h3 className="font-heading font-extrabold text-xl text-foreground">
              {event.title}
            </h3>
            <span className="text-[10px] font-extrabold text-gold px-3 py-1 bg-gold/10 rounded-full w-fit uppercase tracking-wider font-sans">
              {event.year}
            </span>
          </div>
          
          {event.role && (
            <div className="text-muted text-xs uppercase tracking-wider font-bold mb-3">
              {event.role}
            </div>
          )}
          
          <p className="text-muted-foreground leading-relaxed text-sm max-w-[650px]">
            {event.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
