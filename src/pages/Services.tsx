import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Home, Trees, Building2, Landmark, Users, ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  const serviceItems = [
    {
      number: '01',
      icon: <Building size={24} style={{ color: 'var(--muted-foreground)' }} />,
      title: 'Architectural Design',
      description: 'From concept to completion, we create timeless architectural solutions that respond to context, climate, and client aspirations. Our design process integrates sustainability and innovation.'
    },
    {
      number: '02',
      icon: <Home size={24} style={{ color: 'var(--muted-foreground)' }} />,
      title: 'Interior Design',
      description: 'We craft interior environments that embody elegance and functionality. Our approach considers spatial flow, material palette, and lighting to create cohesive living experiences.'
    },
    {
      number: '03',
      icon: <Trees size={24} style={{ color: 'var(--muted-foreground)' }} />,
      title: 'Landscape Architecture',
      description: 'Our landscape designs create meaningful connections between architecture and nature. We develop outdoor spaces that enhance wellbeing and ecological balance.'
    },
    {
      number: '04',
      icon: <Building2 size={24} style={{ color: 'var(--muted-foreground)' }} />,
      title: 'Commercial Design',
      description: 'We design innovative commercial spaces that elevate brand identity and foster productivity. Our commercial architecture focuses on functional efficiency, modern aesthetics, and creating engaging environments for businesses and customers alike.'
    },
    {
      number: '05',
      icon: <Landmark size={24} style={{ color: 'var(--muted-foreground)' }} />,
      title: 'Institutional Design',
      description: 'We create purposeful institutional environments including educational, healthcare, and civic buildings. We prioritize durability, accessibility, and high-performance design that serves the community and supports long-term goals.'
    },
    {
      number: '06',
      icon: <Users size={24} style={{ color: 'var(--muted-foreground)' }} />,
      title: 'Consultation',
      description: 'Our expert consultation services guide clients through complex architectural decisions. We offer strategic advice on design direction, feasibility, and value engineering.'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We begin by understanding your vision, requirements, and aspirations through collaborative dialogue.'
    },
    {
      number: '02',
      title: 'Concept',
      description: 'Our team develops design concepts that respond to site, program, and your unique needs.'
    },
    {
      number: '03',
      title: 'Development',
      description: 'We refine the design through iterative development, integrating engineering and detailing.'
    },
    {
      number: '04',
      title: 'Realization',
      description: 'We oversee construction to ensure the design vision is faithfully executed.'
    }
  ];

  return (
    <div className="services-page">
      {/* ========== HERO SECTION ========== */}
      <section className="subpage-hero-section">
        <div className="container">
          <div className="header-grid">
            <div className="fade-in">
              <span className="section-caption">What We Do</span>
              <h1 className="hero-title">
                Our<br />
                <em>Services</em>
              </h1>
            </div>
            <div className="header-description fade-in">
              <p>
                We offer comprehensive architectural services, bringing
                expertise and creativity to every phase of your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES LIST ========== */}
      <section className="services-section">
        <div className="container">
          {serviceItems.map((item) => (
            <div key={item.number} className="service-item fade-in">
              <div className="service-grid">
                <div className="service-number">{item.number}</div>
                <div className="service-title-wrapper">
                  {item.icon}
                  <h3 className="service-title">{item.title}</h3>
                </div>
                <p className="service-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== PROCESS SECTION ========== */}
      <section className="process-section">
        <div className="container">
          <div className="process-header fade-in">
            <span className="section-caption">Our Process</span>
            <h2 className="section-title" style={{ marginTop: '16px' }}>
              How We<br />
              <em>Work</em>
            </h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <div key={step.number} className="process-step fade-in">
                <div className="process-number">{step.number}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-grid">
            <div className="fade-in">
              <h2 className="cta-title">
                Let's Discuss<br />
                <em>Your Project</em>
              </h2>
              <p className="cta-text">
                Every great project starts with a conversation. We'd love to hear about
                your vision and explore how we can bring it to life.
              </p>
            </div>
            <div className="cta-button-wrapper fade-in">
              <Link to="/contact" className="btn">
                Get in Touch
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
