import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { useGlobalAnimations } from './hooks/useGlobalAnimations';
import { ArrowUp } from 'lucide-react';
import logoImage from './assets/logo.png';

// Lazy loaded page components
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const Services = React.lazy(() => import('./pages/Services'));
const Contact = React.lazy(() => import('./pages/Contact'));

// Component to handle scrolling to top and triggering intersection observers on route change
const RouteInitializer: React.FC = () => {
  useScrollAnimations();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const path = window.location.pathname;

    // Dynamically set canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://www.pararcdesignstudio.in${path === '/' ? '' : path}`);

    let title = 'parArc Design Studio | Top Architects & Interior Designers in Gujarat';
    let description = 'parArc Design Studio is a leading architectural and interior design firm in Kalol, Gandhinagar, and Ahmedabad, Gujarat. Led by Punit Prajapati, we create custom residential, commercial, and landscape designs across India.';
    let ogImage = 'https://ik.imagekit.io/StudioparArc/parArc/PHOTO_1.png';

    if (path === '/about') {
      title = 'About Punit Prajapati & parArc Design Studio | Architects in Gujarat';
      description = 'Meet Punit Prajapati, founder and principal architect of parArc Design Studio. Discover our design philosophy and approach to residential, commercial, and landscape architecture in India.';
    } else if (path === '/projects') {
      title = 'Architectural Portfolio | Featured Projects by parArc Design Studio';
      description = 'Explore our portfolio of premium architectural and interior design works in Gandhinagar, Kalol, and Ahmedabad. Featuring modern homes, luxury interiors, and commercial spaces.';
    } else if (path === '/services') {
      title = 'Architectural & Interior Design Services | parArc Design Studio';
      description = 'Professional architecture and interior design services in Gujarat. We specialize in residential design, commercial buildings, institutional plans, and landscape architecture in India.';
    } else if (path === '/contact') {
      title = 'Contact parArc Design Studio | Hire Architects in Gandhinagar & Ahmedabad';
      description = 'Get in touch with parArc Design Studio in Kalol, Gandhinagar. Hire the best residential, commercial, and landscape architects for your project in Gujarat and India.';
    } else if (path.startsWith('/projects/')) {
      // Handled dynamically by the ProjectDetail page component, do not overwrite title/description here
      return;
    }

    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Dynamically update OG and Twitter Social cards
    const updateMeta = (name: string, content: string, isProperty: boolean = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('og:url', `https://www.pararcdesignstudio.in${path === '/' ? '' : path}`, true);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
  }, [window.location.pathname]);

  return null;
};

// Loader placeholder mirroring original PageLoader
const LoaderPlaceholder: React.FC = () => {
  return (
    <div className="page-loader">
      <div className="loader-content">
        <div className="loader-logo-wrapper">
          <img src={logoImage} alt="parArc Logo" className="loader-logo-image" />
        </div>
        <div className="loader-bar"></div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);
  const [shouldRenderLoader, setShouldRenderLoader] = React.useState(true);

  React.useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsInitialLoading(false);
        setTimeout(() => {
          setShouldRenderLoader(false);
        }, 600); // Wait for the transition to finish (0.6s)
      }, 800); // Minimum display time of 800ms
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
    return;
  }, []);

  // Initialize global parallax, magnetic buttons, scroll progress, back-to-top, and content protection
  useGlobalAnimations();

  // Auto-mute audio when the user navigates to a different page
  const location = useLocation();
  const { setIsMuted } = useApp();

  React.useEffect(() => {
    setIsMuted(true);
  }, [location.pathname]);

  return (
    <div className="app-container">
      {shouldRenderLoader && (
        <div className={`page-loader ${!isInitialLoading ? 'loaded' : ''}`}>
          <div className="loader-content">
            <div className="loader-logo-wrapper">
              <img src={logoImage} alt="parArc Logo" className="loader-logo-image" />
            </div>
            <div className="loader-bar"></div>
          </div>
        </div>
      )}
      {/* Scroll Progress Bar at the top */}
      <div className="scroll-progress" id="scrollProgress"></div>

      <RouteInitializer />
      <CustomCursor />
      <Navbar />

      <Suspense fallback={<LoaderPlaceholder />}>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </Suspense>

      {/* Back to Top Button */}
      <button
        className="back-to-top"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={20} />
      </button>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
