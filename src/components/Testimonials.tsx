import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Testimonials = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayCount, setDisplayCount] = useState(6);
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  const testimonials = Array.from({ length: 19 }, (_, i) => ({
    quote: t(`testimonials.quote${i + 1}`),
    author: t(`testimonials.author${i + 1}`),
    role: t(`testimonials.role${i + 1}`),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Customer${i + 1}`
  }));

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      // Only reset count if user hasn't clicked "Load More" yet
      if (!hasLoadedMore) {
        setDisplayCount(mobile ? 3 : 6);
      }
    };

    // Initial check
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setDisplayCount(mobile ? 3 : 6);

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [hasLoadedMore]);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": testimonials.slice(0, displayCount).map((testimonial, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": testimonial.author
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": testimonial.quote
      }
    }))
  };

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            {t('testimonials.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials.slice(0, displayCount).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 relative"
              >
                <Quote className="absolute top-4 right-4 w-10 h-10 text-accent/20" />
                <div className="relative z-10">
                  <p className="text-base text-muted-foreground mb-4 leading-relaxed italic line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {displayCount < testimonials.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mt-8"
            >
              <Button
                onClick={() => {
                  const increment = isMobile ? 3 : 6;
                  setDisplayCount(prev => Math.min(prev + increment, testimonials.length));
                  setHasLoadedMore(true);
                }}
                variant="outline"
                size="lg"
                className="font-medium"
              >
                {t('appsPortfolio.loadMore')}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
