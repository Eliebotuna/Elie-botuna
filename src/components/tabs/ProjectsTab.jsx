import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { projectsGallery } from '../../constants/projectsGallery';

const PLACEHOLDER = `${process.env.PUBLIC_URL || ''}/projects/placeholder.svg`;

const ProjectCardImage = ({ src, title }) => {
  const candidates = Array.isArray(src) ? src : [src];
  const chain = [...candidates, PLACEHOLDER];
  const [index, setIndex] = useState(0);
  const current = chain[Math.min(index, chain.length - 1)];

  return (
    <img
      src={current}
      alt={title}
      loading="lazy"
      decoding="async"
      onError={() => {
        setIndex((i) => Math.min(i + 1, chain.length - 1));
      }}
    />
  );
};

ProjectCardImage.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  title: PropTypes.string.isRequired,
};

const IconBook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconExternal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

const ProjectsTab = ({ t }) => (
  <div className="projects-tab">
    <h2 className="projects-tab-title">
      <span className="accent-text">{t.projectsTitle}</span>
    </h2>
    <div className="projects-tab-grid">
      {projectsGallery.map((project) => (
        <article key={project.id} className="project-card-envi">
          <div className="project-card-envi-image">
            <ProjectCardImage src={project.image} title={project.title} />
          </div>
          <div className="project-card-envi-body">
            <h3 className="project-card-envi-name">{project.title}</h3>
            <p className="project-card-envi-desc">{project.description}</p>
            <div className="project-card-envi-links">
              {project.sourceUrl ? (
                <a
                  href={project.sourceUrl}
                  className="project-card-envi-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBook />
                  {t.sourceLink}
                </a>
              ) : null}
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  className="project-card-envi-link"
                  target={project.demoUrl.startsWith('http') ? '_blank' : undefined}
                  rel={project.demoUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <IconExternal />
                  {project.demoUrl.startsWith('tel:')
                    ? t.contactLink
                    : project.demoUrl.includes('play.google.com')
                      ? t.playStoreLink
                      : t.demoLink}
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

ProjectsTab.propTypes = {
  t: PropTypes.object.isRequired,
};

export default ProjectsTab;
