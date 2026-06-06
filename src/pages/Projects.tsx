import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import { getOptimizedImage } from '../utils/image';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);

  // Project IDs that are wide in the original projects.html layout
  const wideProjectIds = ['cube-house', 'the-woven-plaze', 'the-screen-house', 'the-pillar-path'];

  const categories = ['all', 'residential', 'commercial', 'interiors', 'landscape'];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase() === activeFilter);

  // Trigger staggered load animation whenever the filter changes
  useEffect(() => {
    // Clear visible projects first
    setVisibleProjects([]);

    // Stagger elements addition
    filteredProjects.forEach((project, index) => {
      setTimeout(() => {
        setVisibleProjects((prev) => [...prev, project.id]);
      }, index * 50);
    });
  }, [activeFilter, filteredProjects.length]);

  return (
    <div className="projects-page">
      {/* ========== HEADER SECTION ========== */}
      <section className="subpage-hero-section">
        <div className="container">
          <div className="fade-in">
            <span className="section-caption">Portfolio</span>
            <h1 className="hero-title">
              Selected<br />
              <em>Works</em>
            </h1>
          </div>

          {/* Filters */}
          <div className="filters-container fade-in">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROJECTS GRID ========== */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-grid" id="projectsGrid">
            {filteredProjects.map((project) => {
              const isWide = wideProjectIds.includes(project.id);
              const isVisible = visibleProjects.includes(project.id);

              return (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className={`project-card ${isWide ? 'wide' : ''} ${isVisible ? 'visible' : ''}`}
                  style={{
                    display: 'block',
                    // Fallback visual safety check
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease'
                  }}
                >
                  <div className={`project-image-container ${isWide ? 'wide' : 'tall'}`}>
                    <img 
                      src={getOptimizedImage(project.heroImage, 800)} 
                      alt={project.title} 
                      loading="lazy" 
                    />
                    <div className="project-overlay">
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                        {project.category}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.5rem' }}>
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div className="project-info">
                    <div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-meta">
                        {project.location} · {project.year}
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
    </div>
  );
};

export default Projects;
