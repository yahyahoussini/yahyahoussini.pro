import { lazy, Suspense } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import '@/i18n/config';

// Lazy load all below-the-fold components for code splitting
// Note: Components use named exports, so we need to map them to default exports
const About = lazy(() => import('@/components/About').then(module => ({ default: module.About })));
const Skills = lazy(() => import('@/components/Skills').then(module => ({ default: module.Skills })));
const Innovation3D = lazy(() => import('@/components/Innovation3D').then(module => ({ default: module.Innovation3D })));
const AppsPortfolio = lazy(() => import('@/components/AppsPortfolio').then(module => ({ default: module.AppsPortfolio })));
const Projects = lazy(() => import('@/components/Projects').then(module => ({ default: module.Projects })));
const Services = lazy(() => import('@/components/Services').then(module => ({ default: module.Services })));
const Blog = lazy(() => import('@/components/Blog').then(module => ({ default: module.Blog })));
const CaseStudies = lazy(() => import('@/components/CaseStudies').then(module => ({ default: module.CaseStudies })));
const Certifications = lazy(() => import('@/components/Certifications').then(module => ({ default: module.Certifications })));
const Testimonials = lazy(() => import('@/components/Testimonials').then(module => ({ default: module.Testimonials })));
const Contact = lazy(() => import('@/components/Contact').then(module => ({ default: module.Contact })));

/**
 * Loading skeleton component for Suspense fallback
 */
const ComponentSkeleton = () => (
  <div className="w-full h-64 bg-muted/30 animate-pulse rounded-lg" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<ComponentSkeleton />}>
          <About />
          <Skills />
          <Innovation3D />
          <AppsPortfolio />
          <Projects />
          <Services />
          <Blog />
          <CaseStudies />
          <Certifications />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
