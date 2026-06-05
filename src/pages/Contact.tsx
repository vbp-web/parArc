import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, Send, Loader, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/pararc2000@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _captcha: 'false',
          _template: 'table',
          _subject: 'New Portfolio Inquiry!'
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        showToast('Message sent successfully!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => {
          setSubmitStatus('idle');
          setIsSubmitting(false);
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      showToast('Failed to send message. Please try again.', 'error');

      setTimeout(() => {
        setSubmitStatus('idle');
        setIsSubmitting(false);
      }, 3000);
    }
  };

  return (
    <div className="contact-page">
      {/* Toast Notification */}
      <div className={`toast ${toast.type} ${toast.show ? 'show' : ''}`}>
        {toast.message}
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="subpage-hero-section">
        <div className="container">
          <div className="fade-in">
            <span className="section-caption">Get in Touch</span>
            <h1 className="hero-title">
              Let's Start<br />
              <em>A Conversation</em>
            </h1>
          </div>
        </div>
      </section>

      {/* ========== CONTACT CONTENT ========== */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info fade-in">
              <div>
                <p className="contact-intro">
                  We'd love to hear about your project. Whether you're
                  planning a new build, renovation, or simply exploring
                  possibilities, reach out and let's discuss your vision.
                </p>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div>
                    <span className="contact-label">Email</span>
                    <a href="mailto:pararc2000@gmail.com">pararc2000@gmail.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div>
                    <span className="contact-label">Phone</span>
                    <a href="tel:+916355994947">+91 6355994947</a>
                  </div>
                </div>

                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div>
                    <span className="contact-label">Studio</span>
                    <p>
                      16, Pushpratna Shopping, <br />
                      Near Ambica Bus Stand, Kalol<br />
                      Gandhinagar, Gujarat, India<br />
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <span className="contact-label">Follow Us</span>
                <div className="social-links">
                  <a href="https://www.instagram.com/pararc_design_studio/" className="social-link" target="_blank" rel="noopener noreferrer">
                    Instagram
                    <ArrowUpRight size={12} />
                  </a>
                  <a href="#" className="social-link">
                    LinkedIn
                    <ArrowUpRight size={12} />
                  </a>
                  <a href="#" className="social-link">
                    Pinterest
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-in">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-input"
                    placeholder="Project inquiry"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn ${submitStatus === 'success' ? 'success' : ''}`}
                  disabled={isSubmitting}
                >
                  <span>
                    {submitStatus === 'success'
                      ? 'Message Sent'
                      : isSubmitting
                        ? 'Sending...'
                        : 'Send Message'}
                  </span>
                  {submitStatus === 'success' ? (
                    <Check size={16} />
                  ) : isSubmitting ? (
                    <Loader size={16} className="spinner" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MAP SECTION ========== */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7332.0973030382875!2d72.4899787!3d23.2413166!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2500687204d3%3A0x8b32e31fb7a028f8!2sParArc%20design%20studio!5e0!3m2!1sen!2sin!4v1780573648102!5m2!1sen!2sin"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="parArc Studio Location"
        />
      </section>
    </div>
  );
};

export default Contact;
