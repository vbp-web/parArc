import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { SoundToggle } from '../components/SoundToggle';
import { projectsData } from '../data/projects';

// Typewriter Component
const Typewriter: React.FC<{ text: string; speed?: number }> = ({ text, speed = 80 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    let timeoutId: number;

    const type = () => {
      if (indexRef.current < text.length) {
        const char = text.charAt(indexRef.current);

        if (char === '<') {
          const tagEnd = text.indexOf('>', indexRef.current);
          const tag = text.substring(indexRef.current, tagEnd + 1);
          setDisplayedText((prev) => prev + tag);
          indexRef.current = tagEnd + 1;
          type();
        } else {
          setDisplayedText((prev) => prev + char);
          indexRef.current++;
          timeoutId = window.setTimeout(type, speed);
        }
      } else {
        setIsFinished(true);
      }
    };

    // Initial delay
    const startTimeout = window.setTimeout(type, 800);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed]);

  return (
    <span
      className={`typing-text ${isFinished ? 'finished' : ''}`}
      dangerouslySetInnerHTML={{ __html: displayedText }}
    />
  );
};

export const Home: React.FC = () => {
  // 1. Ken Burns background slider state
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(-1);

  // Original project hero slides from hero-animation.js
  const sliderImages = [
    'https://ik.imagekit.io/StudioparArc/parArc/RESIDENCIAL%20/THE%20OVERHANGE%20HOUSE/1.png?updatedAt=1772271983217',
    'https://ik.imagekit.io/StudioparArc/parArc/RESIDENCIAL%20/OFFSET%20TOWERS/3.png?updatedAt=1772272088141',
    'https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/THE%20TERRA%20CANVAS/1.png?updatedAt=1772272268066',
    'https://ik.imagekit.io/StudioparArc/parArc/COMMERCIAL/FACTORY%20SHED/1.png?updatedAt=1772271329698',
    'https://ik.imagekit.io/StudioparArc/parArc/LANDSCAPE/VILLAGE%20HOME%20LANDSCAPE/1_10%20-%20Photo.jpg?updatedAt=1772271584952',
    'https://ik.imagekit.io/StudioparArc/parArc/RESIDENCIAL%20/THE%20SCREEN%20HOUSE/1_1%20-%20Photo.jpg?updatedAt=1772271866019',
    'https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/THE%20GILDED%20QUARRY/1.png?updatedAt=1772272311407'
  ];

  const animationClasses = ['ken-burns-in', 'ken-burns-out', 'ken-burns-left', 'ken-burns-right'];

  // Studio images list for ribbon marquee
  const studioImages = [
    'https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/Pararc%20studio/20260525_112322.jpg',
    'https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/Pararc%20studio/20260525_113013.jpg',
    'https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/Pararc%20studio/20260525_112655.jpg',
    'https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/Pararc%20studio/20260525_112824.jpg',
    'https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/Pararc%20studio/20260525_112727.jpg',
    'https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/Pararc%20studio/20260525_112917.jpg'
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setPrevSlide(activeSlide);
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(slideInterval);
  }, [activeSlide, sliderImages.length]);

  // Remove prev class after transition completes (3s)
  useEffect(() => {
    if (prevSlide === -1) return;
    const timer = setTimeout(() => {
      setPrevSlide(-1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [prevSlide]);

  // 2. Testimonials slider state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const testimonials = [
    {
      id: 1,
      quote: "The landscape design transformed our outdoor space into an architectural garden that lives and breathes with the seasons.",
      author: "Hardik Patel",
      role: "Owner, The Woven Plaza",
      image: "https://ik.imagekit.io/StudioparArc/parArc/LANDSCAPE/PUNDHRA%20FARMHOUSE/1_10%20-%20Photo.jpg?updatedAt=1772271511699",
      alt: "The Woven Plaza"
    },
    {
      id: 2,
      quote: "parArc delivered a workspace that not only looks stunning but has significantly improved our team's daily synergy.",
      author: "Suraj Infrastructure",
      role: "Company, The Glaze",
      image: "https://ik.imagekit.io/StudioparArc/parArc/COMMERCIAL/THE%20GLAZE/1.png?updatedAt=1772271427823",
      alt: "The Glaze"
    },
    {
      id: 3,
      quote: "parArc Design Studio perfectly captured our vision for the Cube House, blending bold geometric lines with striking vertical textures to create beautiful, inviting spaces like our elegant balcony retreat.",
      author: "Sandip Patel",
      role: "Homeowner, Cube House",
      image: "https://ik.imagekit.io/StudioparArc/parArc/RESIDENCIAL%20/CUBE%20HOUSE/1_2%20-%20Photo.jpg?updatedAt=1772272176314",
      alt: "Cube House"
    },
    {
      id: 4,
      quote: "parArc Design Studio completely transformed our apartment into a warm, modern sanctuary, perfectly balancing earthy wall textures, sleek custom cabinetry, and a beautifully open, light-filled layout.",
      author: "Parth Prajapati",
      role: "Homeowner, The Terra Canvas",
      image: "https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/THE%20TERRA%20CANVAS/1.png?updatedAt=1772272268066",
      alt: "The Terra Canvas"
    },
    {
      id: 5,
      quote: "We are in love with the dynamic facade parArc Design Studio created; the custom perforated screens and layered geometry perfectly balance natural light and privacy.",
      author: "Maulik Patel",
      role: "Homeowner, The Screen House",
      image: "https://ik.imagekit.io/StudioparArc/parArc/RESIDENCIAL%20/THE%20SCREEN%20HOUSE/1_1%20-%20Photo.jpg?updatedAt=1772271866019",
      alt: "The Screen House"
    },
    {
      id: 6,
      quote: "parArc Design Studio delivered a stunning modern home, perfectly balancing bold geometric lines with warm wood accents and raw concrete textures.",
      author: "Bharat Patel",
      role: "Homeowner, The Intersect",
      image: "https://ik.imagekit.io/StudioparArc/parArc/RESIDENCIAL%20/THE%20INTERSECT/1_1%20-%20Photo.jpg?updatedAt=1772272030631",
      alt: "The Intersect"
    },
    {
      id: 7,
      quote: "parArc Design Studio perfectly translated our vision of luxury into reality, blending rich textures and flawless lighting to create a truly breathtaking showroom.",
      author: "Vijay Patel",
      role: "Owner, The Gilded Quarry",
      image: "https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/THE%20GILDED%20QUARRY/1.png?updatedAt=1772272311407",
      alt: "The Gilded Quarry"
    },
    {
      id: 8,
      quote: "Thanks to parArc Design Studio's visionary layout and rich material choices, every corner of our studio acts as a stunning, perfectly lit backdrop for our shoots.",
      author: "Rushi Purohit",
      role: "Owner, The Framed Room",
      image: "https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/THE%20FRAMED%20ROOM/1.png?updatedAt=1772272371661",
      alt: "The Framed Room"
    }
  ];

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isTestimonialHovered) return;

    const interval = setInterval(handleNextTestimonial, 2800); // Auto-slide every 2.8s
    return () => clearInterval(interval);
  }, [isTestimonialHovered]);

  return (
    <div className="home-page">
      {/* ========== HERO SECTION ========== */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>

          {/* Dynamic Slide Background */}
          <div className="hero-slider-container">
            {sliderImages.map((src, index) => {
              const isActive = index === activeSlide;
              const isPrev = index === prevSlide;
              const animClass = animationClasses[index % animationClasses.length];

              return (
                <div
                  key={src}
                  className={`hero-slide ${animClass} ${isActive ? 'active' : ''} ${isPrev ? 'prev' : ''}`}
                  style={{ backgroundImage: `url('${src}')` }}
                />
              );
            })}
          </div>
        </div>

        <div className="hero-content">
          <div className="container">
            <div className="hero-grid">
              <div>
                <p className="hero-caption fade-in">Architecture & Design Studio</p>
                <h1 className="hero-title">
                  <Typewriter text="Creating Spaces<br><em>That Inspire</em>" speed={150} />
                </h1>
              </div>
              <div className="hero-right">
                <p className="hero-description fade-in">
                  We design with purpose, crafting architectural experiences
                  that balance form, function, and emotion.
                </p>
                <div className="fade-in">
                  <Link to="/projects" className="btn btn-white">
                    View Projects
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line"></div>
        </div>

        <SoundToggle />
      </section>

      {/* ========== PHILOSOPHY SECTION ========== */}
      <section className="philosophy-section">
        <div className="container">
          <div className="philosophy-grid">
            <div className="fade-in">
              <span className="section-caption">Our Philosophy</span>
              <h2 className="section-title" style={{ marginTop: '16px' }}>
                Architecture Is<br />
                <em>The Art of Space</em>
              </h2>
            </div>
            <div className="fade-in">
              <p className="philosophy-text-large">
                At parArc Design Studio, we believe that exceptional architecture
                emerges from the careful orchestration of light, material, and proportion.
              </p>
              <p className="philosophy-text">
                Every project begins with deep listening—understanding not just what our
                clients need, but how they aspire to live. We design spaces that resonate
                with their inhabitants while contributing meaningfully to the built environment.
              </p>
              <Link to="/about" className="text-link">
                Learn More About Us
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== OUR STUDIO HEADING ========== */}
      <section style={{ padding: '80px 0 40px' }}>
        <div className="container">
          <div className="studio-header-grid fade-in">
            <div>
              <span className="section-caption">Where We Work</span>
              <h2 className="section-title" style={{ marginTop: '16px' }}>
                Our<br />
                <em>Studio</em>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.7' }}>
                A glimpse into the creative workspace of parArc — where ideas take shape, materials are studied, and every project comes to life.
              </p>
              <Link to="/projects/pararc-studio" className="text-link">
                See Studio Project
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STUDIO IMAGE SECTION ========== */}
      <section className="studio-image-section">
        <div className="studio-marquee">
          <div className="studio-marquee-track">
            {/* Repeated to create a seamless infinite scroll loop */}
            {[...studioImages, ...studioImages].map((src, index) => (
              <div key={`${src}-${index}`} className="studio-marquee-item">
                <img
                  src={src}
                  alt={`parArc Design Studio - ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED PROJECTS ========== */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-caption">Selected Work</span>
              <h2 className="section-title" style={{ marginTop: '16px' }}>
                Featured<br />Projects
              </h2>
            </div>
            <Link to="/projects" className="text-link section-header-link">
              View All Projects
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="projects-grid">
            {/* Project 1 */}
            <Link to="/projects/cube-house" className="project-card fade-in">
              <div className="project-image-container">
                <img
                  src={projectsData.find(p => p.id === 'cube-house')?.heroImage || '/src/assets/images/PHOTO_1.webp'}
                  alt="Cube House"
                  width="800"
                  height="600"
                />
                <div className="project-overlay">
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                    Residential
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.5rem' }}>
                    Cube House
                  </h3>
                </div>
              </div>
              <div className="project-info">
                <div>
                  <h3 className="project-title">Cube House</h3>
                  <p className="project-location">Gandhinagar, Gujarat</p>
                </div>
                <ArrowUpRight size={20} style={{ color: 'var(--muted-foreground)' }} />
              </div>
            </Link>

            {/* Project 2 */}
            <Link to="/projects/the-overhange-house" className="project-card fade-in">
              <div className="project-image-container">
                <img
                  src={projectsData.find(p => p.id === 'the-overhange-house')?.heroImage || '/src/assets/images/PHOTO_2.webp'}
                  alt="The Overhange House"
                  width="800"
                  height="600"
                />
                <div className="project-overlay">
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                    Residential
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.5rem' }}>
                    The Overhange House
                  </h3>
                </div>
              </div>
              <div className="project-info">
                <div>
                  <h3 className="project-title">The Overhange House</h3>
                  <p className="project-location">Ahmedabad, Gujarat</p>
                </div>
                <ArrowUpRight size={20} style={{ color: 'var(--muted-foreground)' }} />
              </div>
            </Link>

            {/* Project 3 */}
            <Link to="/projects/the-terra-canvas" className="project-card fade-in">
              <div className="project-image-container">
                <img
                  src={projectsData.find(p => p.id === 'the-terra-canvas')?.heroImage || 'https://ik.imagekit.io/StudioparArc/parArc/INTERIOR/THE%20TERRA%20CANVAS/1.png?updatedAt=1772272268066'}
                  alt="The Terra Canvas"
                  width="800"
                  height="600"
                />
                <div className="project-overlay">
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                    Interiors
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.5rem' }}>
                    The Terra Canvas
                  </h3>
                </div>
              </div>
              <div className="project-info">
                <div>
                  <h3 className="project-title">The Terra Canvas</h3>
                  <p className="project-location">Gandhinagar, India</p>
                </div>
                <ArrowUpRight size={20} style={{ color: 'var(--muted-foreground)' }} />
              </div>
            </Link>

            {/* Project 4 */}
            <Link to="/projects/the-pillar-path" className="project-card fade-in">
              <div className="project-image-container">
                <img
                  src={projectsData.find(p => p.id === 'the-pillar-path')?.heroImage || '/src/assets/images/20260525_112322.webp'}
                  alt="The Pillar Path"
                  width="800"
                  height="600"
                />
                <div className="project-overlay">
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                    Landscape
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.5rem' }}>
                    The Pillar Path
                  </h3>
                </div>
              </div>
              <div className="project-info">
                <div>
                  <h3 className="project-title">The Pillar Path</h3>
                  <p className="project-location">Ahmedabad, India</p>
                </div>
                <ArrowUpRight size={20} style={{ color: 'var(--muted-foreground)' }} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            <div className="services-intro fade-in">
              <span className="section-caption">What We Do</span>
              <h2 className="section-title" style={{ marginTop: '16px' }}>
                Our<br />Services
              </h2>
              <p>
                From initial concept to final construction, we offer comprehensive
                architectural services tailored to each project's unique requirements.
              </p>
              <Link to="/services" className="btn">
                Explore Services
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="services-list">
              <div className="service-card fade-in">
                <span className="service-number">01</span>
                <h3>Architectural Design</h3>
                <p>From concept to completion</p>
              </div>

              <div className="service-card fade-in">
                <span className="service-number">02</span>
                <h3>Interior Design</h3>
                <p>Crafting interior environments</p>
              </div>

              <div className="service-card fade-in">
                <span className="service-number">03</span>
                <h3>Commercial Design</h3>
                <p>Creating spaces for business</p>
              </div>

              <div className="service-card fade-in">
                <span className="service-number">04</span>
                <h3>Landscape Architecture</h3>
                <p>Connecting nature and architecture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
            <div>
              <span className="section-caption">Client Perspectives</span>
              <h2 className="section-title" style={{ marginTop: '16px' }}>
                Voices of<br />Trust
              </h2>
            </div>
          </div>

          <div
            className="testimonials-slider-container"
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
          >
            <div className="testimonials-track-wrap">
              <div
                className="testimonials-track"
                id="testimonialTrack"
                style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
              >
                {testimonials.map((t, idx) => (
                  <div
                    key={t.id}
                    className={`testimonial-slide ${idx === currentTestimonialIndex ? 'active' : ''}`}
                  >
                    <div className="testimonial-creative-card">
                      <div className="t-image-wrap">
                        <img src={t.image} alt={t.alt} width="800" height="800" />
                      </div>
                      <div className="t-content-wrap">
                        <div className="t-floating-mark">“</div>
                        <div className="t-quote">{t.quote}</div>
                        <div className="t-info">
                          <h4>{t.author}</h4>
                          <p>{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="slider-nav">
              <button className="slider-arrow" id="prevTestimonial" onClick={handlePrevTestimonial} aria-label="Previous">
                <ArrowLeft size={24} />
              </button>
              <button className="slider-arrow" id="nextTestimonial" onClick={handleNextTestimonial} aria-label="Next">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="cta-section">
        <div className="container">
          <div className="fade-in">
            <span className="cta-caption">Start Your Project</span>
            <h2 className="cta-title">
              Let's Create<br />
              <em>Something Exceptional</em>
            </h2>
            <Link to="/contact" className="btn btn-cta">
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
