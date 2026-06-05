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
    switch (type) {
      case "work":
        return <Briefcase className="w-4 h-4 text-primary" />;
      case "education":
        return <GraduationCap className="w-4 h-4 text-purple-400" />;
      case "award":
        return <Award className="w-4 h-4 text-yellow-400" />;
      default:
        return <Star className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="relative border-l border-border/60 ml-4 md:ml-6 space-y-12 pb-4">
      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative pl-8 md:pl-12"
        >
          {/* Timeline dot */}
          <div className="absolute -left-[21px] top-1 w-10 h-10 rounded-full bg-card border border-border/60 flex items-center justify-center shadow-sm">
            {getIcon(event.icon)}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
            <h3 className="font-heading font-bold text-xl text-foreground">
              {event.title}
            </h3>
            <span className="text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full w-fit">
              {event.year}
            </span>
          </div>
          
          {event.role && (
            <div className="text-muted-foreground font-medium mb-3">
              {event.role}
            </div>
          )}
          
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            {event.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
