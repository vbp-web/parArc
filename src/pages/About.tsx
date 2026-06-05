import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* ========== HERO SECTION ========== */}
      <section className="subpage-hero-section">
        <div className="container">
          <div className="fade-in">
            <span className="section-caption">About Us</span>
            <h1 className="hero-title">
              Architecture Is<br />
              <em>A Dialogue</em>
            </h1>
          </div>
        </div>
      </section>

      {/* ========== INTRODUCTION ========== */}
      <section className="intro-section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-image fade-in">
              <img
                src="https://ik.imagekit.io/StudioparArc/parArc/PHOTO_1.png"
                alt="Punit Prajapati - Architect"
                width="600"
                height="800"
              />
            </div>
            <div className="intro-content fade-in">
              <span className="section-caption">Principal Architect</span>
              <h2 className="intro-name">
                Punit<br />Prajapati
              </h2>
              <p className="intro-text">
                Punit Prajapati's architectural journey is rooted in a strong academic foundation, having
                graduated with prestigious distinctions in design from the Institute of Architecture and
                Planning at Nirma University. Driven by a clear, ambitious vision for the built environment, he
                founded parArc Design Studio. From the studio's inception, Punit has been dedicated to crafting
                spaces that strike a delicate balance between timeless elegance and contemporary functionality,
                ensuring that his designs remain visually enduring and highly practical for the people who use
                them.
              </p>
              <p className="intro-text">
                Over the course of his dynamic three-year professional practice, Punit has cultivated a diverse
                and compelling portfolio. His expertise spans a wide spectrum of typologies, successfully
                navigating the unique challenges of residential, commercial, and institutional projects. Whether
                shaping an intimate private home, an innovative workspace, or a public facility, Punit
                approaches every commission with a refined design sensibility. He is highly regarded for his
                meticulous attention to craft and detail, viewing each project as an opportunity to seamlessly
                integrate aesthetic beauty with rigorous technical execution.
              </p>
              <p className="intro-text">
                At the heart of Punit's work is a profound belief that architecture must go beyond mere
                structure to actively elevate the human experience. His design philosophy is deeply
                site-specific; he advocates that every building must engage in a thoughtful, sustainable
                dialogue with its surrounding context and climate. By prioritizing environmental responsiveness
                and user-centric layouts, Punit ensures that parArc Design Studio creates not just buildings,
                but thoughtful, living spaces that resonate deeply with their inhabitants and respect their
                natural surroundings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STUDIO ========== */}
      <section className="studio-section">
        <div className="container">
          <div className="studio-grid">
            <div className="fade-in">
              <span className="section-caption">The Studio</span>
              <h2 className="section-title" style={{ marginTop: '16px' }}>
                parArc<br />
                <em>Design Studio</em>
              </h2>
            </div>
            <div className="fade-in">
              <p className="studio-text-large">
                At parArc Design Studio, we believe that architecture is a profound intersection of art,
                environment, and human experience. Founded on the principle of bridging timeless design with
                contemporary functionality, our practice is dedicated to creating spaces that are as enduring as
                they are innovative. We approach every project whether a personalized residential retreat, a
                dynamic commercial workspace, or an impactful institutional facility as a unique opportunity to
                shape the built environment with purpose, clarity, and elegance.
              </p>
              <p className="intro-text">
                Our studio's methodology is deeply rooted in rigorous craftsmanship and meticulous attention to
                detail. We view the architectural process as a highly collaborative journey, working closely
                with our clients to seamlessly translate their aspirations into tangible realities. By balancing
                refined aesthetic sensibilities with practical structural execution, parArc Design Studio
                consistently delivers bespoke design solutions that are technically precise and visually
                compelling down to the finest detail.
              </p>
              <p className="intro-text">
                True to our foundational philosophy, we are passionately committed to context-driven
                architecture. We design with a deep respect for the local climate, site topography, and natural
                surroundings, ensuring that each structure responds intelligently to its environment.
                Ultimately, our mission at parArc Design Studio is to craft immersive, sustainable spaces that
                not only serve a functional purpose but actively elevate everyday life and foster a lasting
                connection between people and the spaces they inhabit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROCESS IMAGE ========== */}
      <section>
        <div className="process-image fade-in">
          <img
            src="https://ik.imagekit.io/StudioparArc/parArc/PHOTO_2.png"
            alt="Architectural process"
            loading="lazy"
            width="1920"
            height="822"
          />
        </div>
      </section>

      {/* ========== VALUES ========== */}
      <section className="values-section">
        <div className="container">
          <div className="values-header fade-in">
            <span className="section-caption">Our Approach</span>
            <h2 className="section-title" style={{ marginTop: '16px' }}>
              Guiding<br />
              <em>Principles</em>
            </h2>
          </div>

          <div className="values-grid">
            <div className="value-card fade-in">
              <span className="value-number">01</span>
              <h3>Precision</h3>
              <p>Every detail matters. We approach each project with meticulous attention to proportion, material, and craft.</p>
            </div>

            <div className="value-card fade-in">
              <span className="value-number">02</span>
              <h3>Context</h3>
              <p>Great architecture responds to its environment. We design buildings that belong to their place and time.</p>
            </div>

            <div className="value-card fade-in">
              <span className="value-number">03</span>
              <h3>Innovation</h3>
              <p>We embrace new technologies and methodologies while honoring timeless architectural principles.</p>
            </div>

            <div className="value-card fade-in">
              <span className="value-number">04</span>
              <h3>Sustainability</h3>
              <p>Responsible design is not optional. We integrate sustainable practices into every project we undertake.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATISTICS ========== */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="fade-in">
              <div className="stat-number">06+</div>
              <p className="stat-label">Projects Completed</p>
            </div>
            <div className="fade-in">
              <div className="stat-number">03</div>
              <p className="stat-label">Years Experience</p>
            </div>
            <div className="fade-in">
              <div className="stat-number">-</div>
              <p className="stat-label">Design Awards</p>
            </div>
            <div className="fade-in">
              <div className="stat-number">2</div>
              <p className="stat-label">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-grid">
            <div className="fade-in">
              <h2 className="cta-title">
                Ready to Start<br />
                <em>Your Project?</em>
              </h2>
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

export default About;
