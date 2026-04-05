import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import cvFile from '../assets/cv/cv.pdf';
import '../styles/hero.css';

const pillItems = [
  { id: 'home', label: 'Accueil', icon: 'home' },
  { id: 'about', label: 'Expérience', icon: 'briefcase' },
  { id: 'portfolio', label: 'Projets', icon: 'folder' },
];

const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const IconBriefcase = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);

const IconFolder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const pillIcon = (key) => {
  switch (key) {
    case 'home':
      return <IconHome />;
    case 'briefcase':
      return <IconBriefcase />;
    case 'folder':
      return <IconFolder />;
    default:
      return null;
  }
};

const Hero = ({ socialLinks, personal }) => {
  const [activePill, setActivePill] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      const order = ['home', 'about', 'portfolio'];
      let current = 'home';
      for (const id of order) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActivePill(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActivePill('home');
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 32;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActivePill(sectionId);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToContact = () => scrollToSection('contact');

  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'github':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1-1.601-1 0-1.16.781-1.16 1.601v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const displayName = (personal?.name || 'Votre nom').toUpperCase();

  return (
    <motion.section
      className="envi-hero"
      id="home"
      role="banner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="envi-hero-head">
        <h1 className="envi-hero-title">{displayName}</h1>
        <p className="envi-hero-subtitle">{personal?.title || ''}</p>
      </div>

      <nav className="pill-nav" aria-label="Sections">
        {pillItems.map((item) => {
          const active = activePill === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`pill-nav-btn${active ? ' pill-nav-btn--active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {active && <span className="pill-nav-active-bg" aria-hidden />}
              <span className="pill-nav-inner">
                {pillIcon(item.icon)}
                <span className="pill-nav-label">{item.label}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="envi-card envi-card-glow hero-glass-card">
        <div className="hero-card-grid">
          <div className="hero-card-main">
            <h2 className="hero-card-heading">À propos de moi</h2>
            <p className="hero-card-text">{personal?.description}</p>
            <div className="hero-social" role="navigation" aria-label="Réseaux sociaux">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                  aria-label={link.name}
                >
                  {getSocialIcon(link.name)}
                </a>
              ))}
            </div>
            <div className="hero-card-actions">
              <button type="button" className="btn-envi-primary" onClick={handleDownloadCV}>
                Télécharger mon CV
              </button>
              <button type="button" className="btn-envi-outline" onClick={scrollToContact}>
                Me contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

Hero.propTypes = {
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  personal: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

Hero.defaultProps = {
  personal: {},
};

export default Hero;
