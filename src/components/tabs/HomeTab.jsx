import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cvFile from '../../assets/cv/cv.pdf';
import { getTechIconUrl } from '../../utils/techIcons';
import ContactIntentModal from '../ContactIntentModal';

const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const IconServer = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <path d="M6 6h.01M6 18h.01" />
  </svg>
);

const IconDatabase = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const catIcon = (key) => {
  switch (key) {
    case 'globe':
      return <IconGlobe />;
    case 'phone':
      return <IconPhone />;
    case 'server':
      return <IconServer />;
    case 'database':
      return <IconDatabase />;
    default:
      return null;
  }
};

const SkillTechPill = ({ label }) => {
  const iconUrl = getTechIconUrl(label);
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <span className="skill-tech-pill">
      {iconUrl && !iconFailed ? (
        <img
          src={iconUrl}
          alt=""
          className="skill-tech-pill-icon"
          width={20}
          height={20}
          loading="lazy"
          decoding="async"
          onError={() => setIconFailed(true)}
        />
      ) : null}
      <span className="skill-tech-pill-label">{label}</span>
    </span>
  );
};

SkillTechPill.propTypes = {
  label: PropTypes.string.isRequired,
};

const getSocialIcon = (name) => {
  const n = name.toLowerCase();
  if (n === 'email') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    );
  }
  if (n === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }
  if (n === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1-1.601-1 0-1.16.781-1.16 1.601v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  if (n === 'twitter') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    );
  }
  if (n === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  return null;
};

const categoryTitle = (cat, t) => {
  if (cat.id === 'web') return t.skillWeb;
  if (cat.id === 'data') return t.skillData;
  if (cat.id === 'mobile') return t.skillMobile;
  if (cat.id === 'infra') return t.skillInfra;
  return cat.id;
};

const HomeTab = ({ t, personal, aboutBio, skillCategories, socialLinks }) => {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleCv = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = `${personal.name.replace(/\s+/g, '_')}_CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-tab-grid">
      <div className="home-tab-col home-tab-about">
        <h2 className="home-tab-heading">{t.aboutTitle}</h2>
        <p className="home-tab-bio">{aboutBio}</p>
        <div className="home-social-row" role="navigation" aria-label="Réseaux">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="home-social-icon"
              aria-label={link.name}
            >
              {getSocialIcon(link.icon || link.name)}
            </a>
          ))}
        </div>
        <div className="home-cta-stack">
          <button type="button" className="btn-envi-outline-icon" onClick={handleCv}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            {t.downloadCv}
          </button>
          <button type="button" className="btn-envi-outline-icon" onClick={() => setContactModalOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {t.bookMeeting}
          </button>
        </div>
      </div>
      <div className="home-tab-col home-tab-skills">
        <h2 className="home-tab-heading">{t.skillsTitle}</h2>
        <div className="skill-category-stack">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="skill-category-card">
              <div className="skill-category-head">
                <span className="skill-category-icon">{catIcon(cat.icon)}</span>
                <span className="skill-category-title">{categoryTitle(cat, t)}</span>
              </div>
              <div className="skill-tech-row">
                {cat.technologies.map((tech) => (
                  <SkillTechPill key={tech} label={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactIntentModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        personal={personal}
        t={t}
      />
    </div>
  );
};

HomeTab.propTypes = {
  t: PropTypes.object.isRequired,
  personal: PropTypes.object.isRequired,
  aboutBio: PropTypes.string.isRequired,
  skillCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ).isRequired,
};

export default HomeTab;
