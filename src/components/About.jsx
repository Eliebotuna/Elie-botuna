import React from 'react';
import { motion } from 'framer-motion';
import '../styles/about.css';
import profilePhoto from '../assets/profile.png';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About <span className="gold-text">Me</span>
        </motion.h2>
        
        <div className="about-content">
          <div className="about-text">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Informaticien, passionné par la conception et le développement d’applications web et mobiles. Fort d’une expertise en gestion de projet et en community management, j'excelle dans la création de solutions technologiques adaptées aux besoins des utilisateurs.

Spécialisé en UI/UX design, je maîtrise Figma pour concevoir des interfaces modernes et intuitives. mon savoir-faire s’étend également à la programmation web.
            </motion.p>
            
            <div className="skills">
              
            </div>
          </div>

          <div className="about-image">
            <div className="image-frame">
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

              {/* Formes géométriques existantes */}
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
              <div className="shape shape-6"></div>

              <img 
                src={profilePhoto} 
                alt="Mahmood Fazile at work" 
                className="profile-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;