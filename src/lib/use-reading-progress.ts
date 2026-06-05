import { useEffect, useRef, useState } from 'react';
import posthog from 'posthog-js';
import ReactGA from 'react-ga4';
import { GA_TRACKING_ID, POSTHOG_KEY } from '@/lib/analytics-config';

export function useReadingProgress(title: string, type: 'article' | 'book' | 'note' = 'article') {
  const trackedQuarters = useRef(new Set<number>());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!title) return;
    
    // Reset tracked quarters when title changes (e.g. navigation)
    trackedQuarters.current.clear();
    setProgress(0);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (documentHeight <= windowHeight) {
        setProgress(100);
        return;
      }

      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(Math.min(Math.max(scrollPercentage, 0), 100));
      
      const quarters = [25, 50, 75, 100];
      
      quarters.forEach(q => {
        if (scrollPercentage >= q && !trackedQuarters.current.has(q)) {
          trackedQuarters.current.add(q);
          
          if (POSTHOG_KEY) {
            posthog.capture('reading_progress', {
              item_title: title,
              item_type: type,
              progress_percentage: q
            });
          }
          
          if (GA_TRACKING_ID) {
            ReactGA.event({
              category: 'Engagement',
              action: `Read ${q}%`,
              label: `${type}: ${title}`
            });
          }
        }
      });
    };

    // Calculate initial progress
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [title, type]);

  return progress;
}
