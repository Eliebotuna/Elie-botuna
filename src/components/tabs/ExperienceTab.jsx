import React from 'react';
import PropTypes from 'prop-types';

/** Lit une valeur bilingue { fr, en } ou une valeur simple (rétrocompat). */
function pick(job, lang, key) {
  const v = job[key];
  if (v == null) return undefined;
  if (typeof v === 'object' && !Array.isArray(v) && (Object.prototype.hasOwnProperty.call(v, 'fr') || Object.prototype.hasOwnProperty.call(v, 'en'))) {
    return v[lang] ?? v.en ?? v.fr ?? '';
  }
  return v;
}

function pickBullets(job, lang) {
  const b = pick(job, lang, 'bullets');
  if (Array.isArray(b) && b.length > 0) return b;
  const desc = pick(job, lang, 'description');
  if (typeof desc === 'string' && desc.trim()) return [desc];
  if (typeof job.description === 'string' && job.description.trim()) return [job.description];
  return [];
}

function pickTags(job, lang) {
  const tags = pick(job, lang, 'tags');
  if (Array.isArray(tags) && tags.length > 0) return tags;
  if (Array.isArray(job.tags)) return job.tags;
  return [];
}

const ExperienceTab = ({ t, items, lang }) => (
  <div className="experience-tab">
    <h2 className="experience-tab-title">{t.experienceTitle}</h2>
    <ul className="experience-list">
      {items.map((job, index) => {
        const title = pick(job, lang, 'title');
        const period = pick(job, lang, 'period');
        const location = pick(job, lang, 'location');
        const bullets = pickBullets(job, lang);
        const tags = pickTags(job, lang);

        return (
          <li key={`${job.company}-${index}`} className="experience-item">
            <div className="experience-item-head">
              <div className="experience-logo-placeholder" aria-hidden />
              <div className="experience-head-text">
                <div className="experience-company-row">
                  <span className="experience-company">{job.company}</span>
                  <span className="experience-period">{period}</span>
                </div>
                {location ? <p className="experience-location">{location}</p> : null}
                <p className="experience-role">{title}</p>
              </div>
            </div>
            <ul className="experience-bullets">
              {bullets.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            {tags.length > 0 ? (
              <div className="experience-tags">
                {tags.map((tag) => (
                  <span key={tag} className="experience-tag">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  </div>
);

ExperienceTab.propTypes = {
  t: PropTypes.object.isRequired,
  lang: PropTypes.oneOf(['fr', 'en']).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExperienceTab;
