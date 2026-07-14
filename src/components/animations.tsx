import { motion, AnimatePresence, useInView } from "motion/react";
import { ReactNode, forwardRef, useEffect, useState, useRef } from "react";
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
  type: "tween" as const,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
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
  id?: string;
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, direction = "up", className = "", duration = 0.5, layout = false, id }, ref) => {
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
        id={id}
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

export function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function CountUp({
  to,
  from = 0,
  duration = 1.5,
  delay = 0,
  className = "",
  suffix = "",
  prefix = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const startDelayTimeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing: easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentCount = Math.floor(easeProgress * (to - from) + from);
        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };
      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(startDelayTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, to, from, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Floating({
  children,
  className = "",
  duration = 6,
  yRange = [6, -6],
  rotateRange = [-1, 1],
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  yRange?: [number, number];
  rotateRange?: [number, number];
  delay?: number;
}) {
  return (
    <motion.div
      animate={{
        y: yRange,
        rotate: rotateRange,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
