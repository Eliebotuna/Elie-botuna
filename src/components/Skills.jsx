import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import '../styles/skills.css';

const SkillItem = ({ name, level }) => {
  const progressStyle = useMemo(() => ({
    width: `${level}%`
  }), [level]);

  return (
    <div className="skill-item" role="listitem">
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-percent" aria-label={`${level}% de maîtrise`}>{level}%</span>
      </div>
      <div 
        className="skill-bar"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div 
          className="skill-progress" 
          style={progressStyle}
        ></div>
      </div>
    </div>
  );
};

SkillItem.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired
};

const Skills = ({ skills }) => {
  return (
    <section className="skills-section" id="skills" aria-labelledby="skills-title">
      <div className="skills-container">
        <h2 id="skills-title" className="section-title">
          My <span className="gold-text">Skills</span>
        </h2>
        
        <div className="skills-grid" role="list">
          {skills.map((skill, index) => (
            <SkillItem
              key={`${skill.name}-${index}`}
              name={skill.name}
              level={skill.level}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Skills;