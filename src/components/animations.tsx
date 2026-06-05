import { motion, AnimatePresence } from "motion/react";
import { ReactNode, forwardRef } from "react";
import { useLocation } from "react-router-dom";

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
  },
  in: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  out: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
  },
};

export const pageTransition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.35,
};

export function PageTransition({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedRoutes({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname} className="w-full h-full">
        <PageTransition>
          {children}
        </PageTransition>
      </div>
    </AnimatePresence>
  );
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
  layout?: boolean;
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, direction = "up", className = "", duration = 0.5, layout = false }, ref) => {
    const directions = {
      up: { y: 20 },
      down: { y: -20 },
      left: { x: 20 },
      right: { x: -20 },
      none: { x: 0, y: 0 },
    };

    return (
      <motion.div
        ref={ref}
        initial={{
          opacity: 0,
          ...directions[direction],
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={className}
        layout={layout}
      >
        {children}
      </motion.div>
    );
  }
);
FadeIn.displayName = "FadeIn";

export const StaggerContainer = ({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string; key?: any }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15, filter: "blur(2px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "tween", ease: [0.25, 0.1, 0.25, 1], duration: 0.4 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HoverCard = ({ children, className = "" }: { children: ReactNode; className?: string; key?: any }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`transition-shadow hover:shadow-lg hover:shadow-primary/5 ${className}`}
    >
      {children}
    </motion.div>
  );
};
