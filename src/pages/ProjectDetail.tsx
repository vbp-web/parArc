import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projects';

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === projectId);

  const relatedProjects = project
    ? projectsData
      .filter((p) => p.category.toLowerCase() === project.category.toLowerCase() && p.id !== project.id)
      .slice(0, 3)
    : [];

  useEffect(() => {
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);

  useEffect(() => {
    if (!project) return;

    // SEO Title
    document.title = `${project.title} | parArc Design Studio`;

    // SEO Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    const description = project.overview || project.concept || '';
    metaDescription.setAttribute('content', description);

    // Dynamically update OG and Twitter Social cards for sharing
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

    updateMeta('og:url', `https://pararcdesignstudio.in/projects/${project.id}`, true);
    updateMeta('og:title', `${project.title} | parArc Design Studio`, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', project.heroImage, true);
    updateMeta('twitter:title', `${project.title} | parArc Design Studio`);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', project.heroImage);

    // SEO JSON-LD Schema
    const scriptId = 'project-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.title,
      "creator": {
        "@type": "Organization",
        "name": "parArc Design Studio",
        "url": "https://pararcdesignstudio.in"
      },
      "description": project.overview,
      "image": project.heroImage,
      "locationCreated": {
        "@type": "Place",
        "name": project.location
      },
      "dateCreated": project.year,
      "genre": `${project.category} Architecture`
    };

    script.text = JSON.stringify(jsonLd);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="detail-page">
      {/* ========== BACK LINK ========== */}
      <section className="back-link-section">
        <div className="container">
          <Link to="/projects" className="back-link">
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            Back to Projects
          </Link>
        </div>
      </section>

      {/* ========== PROJECT HEADER ========== */}
      <section className="project-header">
        <div className="container">
          <div className="fade-in">
            <span className="project-category">{project.category}</span>
            <h1 className="project-title">{project.title}</h1>
          </div>
        </div>
      </section>

      {/* ========== HERO IMAGE ========== */}
      <section className="hero-image-section">
        <div className="hero-image-container fade-in">
          <img src={project.heroImage} alt={project.title} />
        </div>
      </section>

      {/* ========== PROJECT INFO ========== */}
      <section className="project-info-section">
        <div className="container">
          <div className="info-grid">
            {/* Project Details */}
            <div className="project-details fade-in">
              <div className="detail-item">
                <span className="detail-label">Location</span>
                <p className="detail-value">{project.location}</p>
              </div>
              <div className="detail-item">
                <span className="detail-label">Year</span>
                <p className="detail-value">{project.year}</p>
              </div>
              <div className="detail-item">
                <span className="detail-label">Area</span>
                <p className="detail-value">{project.area}</p>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category</span>
                <p className="detail-value">{project.category}</p>
              </div>
            </div>

            {/* Project Description */}
            <div className="project-description fade-in">
              <div className="description-section">
                <h3>Overview</h3>
                <p className="description-text-large">
                  {project.overview}
                </p>
              </div>
              {project.concept && (
                <div className="description-section">
                  <h3>Concept</h3>
                  <p className="description-text">
                    {project.concept}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== GALLERY ========== */}
      {project.images && project.images.length > 0 && (
        <section className="gallery-section">
          <div className="container">
            <div className="gallery-header fade-in">
              <span className="section-caption">Gallery</span>
            </div>

            <div className="gallery-grid">
              {project.images.map((image, index) => {
                const isWide = index === 0; // The first image is wide in the template layout
                return (
                  <div key={index} className={`gallery-item ${isWide ? 'wide' : ''} fade-in`}>
                    <div className="gallery-image">
                      <img src={image} alt={`${project.title} - View ${index + 2}`} loading="lazy" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========== TESTIMONIAL ========== */}
      {project.testimonial && (
        <section className="project-testimonial-section" style={{ padding: '96px 0', background: 'var(--background)' }}>
          <div className="container">
            <div className="testimonial-content fade-in" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
              <span className="section-caption">Client Perspective</span>
              <blockquote
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
                  lineHeight: '1.3',
                  color: 'var(--foreground)',
                  margin: '40px 0',
                  fontStyle: 'italic',
                  fontWeight: '400'
                }}
              >
                "{project.testimonial.quote}"
              </blockquote>
              <div className="testimonial-author">
                <h4
                  style={{
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '4px'
                  }}
                >
                  {project.testimonial.author}
                </h4>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--muted-foreground)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em'
                  }}
                >
                  {project.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== RELATED PROJECTS SECTION ========== */}
      {relatedProjects.length > 0 && (
        <section className="related-projects-section" style={{ padding: '96px 0', borderTop: '1px solid var(--border)', background: 'rgba(244, 244, 245, 0.3)' }}>
          <div className="container">
            <div className="section-header" style={{ display: 'flex', flexDirection: 'column', marginBottom: '48px' }}>
              <span className="section-caption">Related Projects</span>
              <h2 className="section-title" style={{ marginTop: '16px' }}>
                Similar<br />
                <em>Works</em>
              </h2>
            </div>

            <div className="projects-grid" id="relatedProjectsGrid">
              {relatedProjects.map((p) => {
                const isWide = ['cube-house', 'the-woven-plaze', 'the-screen-house', 'the-pillar-path'].includes(p.id);
                return (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className={`project-card ${isWide ? 'wide' : ''}`}
                    style={{ display: 'block' }}
                  >
                    <div className={`project-image-container ${isWide ? 'wide' : 'tall'}`}>
                      <img src={p.heroImage} alt={p.title} loading="lazy" />
                      <div className="project-overlay">
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                          {p.category}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.5rem' }}>
                          {p.title}
                        </h3>
                      </div>
                    </div>
                    <div className="project-info">
                      <div>
                        <h3 className="project-title">{p.title}</h3>
                        <p className="project-meta">
                          {p.location} · {p.year}
                        </p>
                      </div>
                      <ArrowUpRight className="project-icon" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========== CTA SECTION ========== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-grid">
            <div className="fade-in">
              <h2 className="cta-title">
                Interested in Working<br />
                <em>Together?</em>
              </h2>
            </div>
            <div className="cta-button-wrapper fade-in">
              <Link to="/contact" className="btn">
                Start a Conversation
                <ArrowUpRight style={{ width: '16px', height: '16px' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
