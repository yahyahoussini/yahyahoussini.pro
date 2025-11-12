/**
 * Google Analytics utility functions
 * Provides type-safe analytics tracking
 */

type GtagFunction = (
  command: string,
  targetId: string,
  config?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Load Google Analytics script (non-blocking)
 */
const loadGA = (): void => {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return;
  }

  // Create script tags for GA
  const script1 = document.createElement('script');
  script1.async = true;
  script1.defer = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
  });
};

/**
 * Initialize Google Analytics
 * Loads after page is interactive to avoid blocking rendering
 * Should be called once on app mount
 */
export const initGA = (): void => {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return;
  }

  // Wait for page to be interactive before loading GA
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Use requestIdleCallback for non-critical scripts
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadGA, { timeout: 2000 });
      } else {
        setTimeout(loadGA, 2000);
      }
    });
  } else {
    // Page already loaded, use requestIdleCallback
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadGA, { timeout: 2000 });
    } else {
      setTimeout(loadGA, 2000);
    }
  }
};

/**
 * Track page view
 */
export const trackPageView = (url: string): void => {
  if (!window.gtag) return;
  
  window.gtag('event', 'page_view', {
    page_path: url,
  });
};

/**
 * Track custom event
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
): void => {
  if (!window.gtag) return;
  
  window.gtag('event', eventName, params);
};

/**
 * Track contact form submission
 */
export const trackContactSubmission = (): void => {
  trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: 'Contact Form',
  });
};

/**
 * Track project view
 */
export const trackProjectView = (projectName: string): void => {
  trackEvent('view_project', {
    event_category: 'portfolio',
    event_label: projectName,
  });
};

/**
 * Track external link click
 */
export const trackExternalLink = (url: string, label: string): void => {
  trackEvent('click_external_link', {
    event_category: 'outbound',
    event_label: label,
    value: url,
  });
};

