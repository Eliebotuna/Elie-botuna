import React from 'react';
import PropTypes from 'prop-types';
import HomeTab from './tabs/HomeTab';
import ExperienceTab from './tabs/ExperienceTab';
import ProjectsTab from './tabs/ProjectsTab';
import '../styles/layout-tabs.css';

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

const pills = [
  { key: 'home', icon: <IconHome /> },
  { key: 'experience', icon: <IconBriefcase /> },
  { key: 'projects', icon: <IconFolder /> },
];

const PortfolioMain = ({ tab, setTab, lang, t, portfolioData: data }) => {
  const personal = data.personal;
  const displayName = (personal.name || '').toUpperCase();
  const tagline = lang === 'en' ? personal.titleEn || personal.title : personal.title;
  const aboutBio = lang === 'en' ? personal.aboutBioEn || personal.aboutBio : personal.aboutBio;

  return (
    <>
      <div className="envi-brand-block">
        <h1 className="envi-brand-name">{displayName}</h1>
        <p className="envi-brand-tagline">{tagline}</p>
      </div>

      <nav className="pill-nav envi-pill-nav" aria-label="Navigation principale">
        {pills.map(({ key, icon }) => {
          const label = key === 'home' ? t.tabHome : key === 'experience' ? t.tabExperience : t.tabProjects;
          const active = tab === key;
          return (
            <button
              key={key}
              type="button"
              className={`pill-nav-btn${active ? ' pill-nav-btn--active' : ''}`}
              onClick={() => setTab(key)}
              aria-current={active ? 'page' : undefined}
            >
              {active && <span className="pill-nav-active-bg" aria-hidden />}
              <span className="pill-nav-inner">
                {icon}
                <span className="pill-nav-label">{label}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="envi-card envi-card-glow envi-tab-shell">
        <div className="envi-tab-panel" key={tab}>
          {tab === 'home' && (
            <HomeTab
              t={t}
              personal={personal}
              aboutBio={aboutBio}
              skillCategories={data.skillCategories}
              socialLinks={data.socialLinks}
            />
          )}
          {tab === 'experience' && <ExperienceTab t={t} lang={lang} items={data.experience} />}
          {tab === 'projects' && <ProjectsTab t={t} />}
        </div>
      </div>
    </>
  );
};

PortfolioMain.propTypes = {
  tab: PropTypes.oneOf(['home', 'experience', 'projects']).isRequired,
  setTab: PropTypes.func.isRequired,
  lang: PropTypes.oneOf(['fr', 'en']).isRequired,
  t: PropTypes.object.isRequired,
  portfolioData: PropTypes.object.isRequired,
};

export default PortfolioMain;
