import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';
import ReactGA from 'react-ga4';
import { GA_TRACKING_ID, POSTHOG_KEY, POSTHOG_HOST, PLAUSIBLE_DOMAIN } from '@/lib/analytics-config';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.PROD && PLAUSIBLE_DOMAIN) {
      const existingScript = document.querySelector(`script[data-domain="${PLAUSIBLE_DOMAIN}"]`);
      if (!existingScript) {
        const script = document.createElement('script');
        script.defer = true;
        script.setAttribute('data-domain', PLAUSIBLE_DOMAIN);
        script.src = 'https://plausible.io/js/script.js';
        document.head.appendChild(script);
      }
    }

    if (POSTHOG_KEY) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        loaded: (posthog) => {
          if (import.meta.env.DEV) posthog.debug(false);
        }
      });
    }

    if (GA_TRACKING_ID) {
      ReactGA.initialize(GA_TRACKING_ID);
    }
  }, []);

  useEffect(() => {
    if (POSTHOG_KEY) {
      posthog.capture('$pageview');
    }
    if (GA_TRACKING_ID) {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    }
  }, [location]);

  return <>{children}</>;
}
