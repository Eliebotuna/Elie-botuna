import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/stats.css';
import '../styles/common-effects.css';

const Stats = () => {
  const statsData = [
    { value: 2, label: 'Experiences' },
    { value: 15, label: 'Project done' },
    { value: 50, label: 'Happy Clients' }
  ];

  return (
    <motion.section 
      className="stats-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatItem 
            key={index}
            value={stat.value}
            label={stat.label}
            delay={index * 0.15}
          />
        ))}
      </div>
    </motion.section>
  );
};

const StatItem = ({ value, label, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const increment = value / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 20px rgba(255, 215, 0, 0.1)"
      }}
    >
      <div className="stat-content image-container">
        {/* Particules orbitales */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        
        {/* Étoiles scintillantes */}
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>

        {/* Formes géométriques */}
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
        <div className="shape shape-6"></div>

        <motion.h3
          animate={{ 
            scale: [1, 1.05, 1],
            textShadow: ["0 0 0px rgb(234, 255, 0)", "0 0 8px #FFD700", "0 0 0px #FFD700"]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          {count}+
        </motion.h3>
        <p>{label}</p>
      </div>
    </motion.div>
  );
};

export default Stats;