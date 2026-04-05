import React from 'react';
import { motion } from 'framer-motion';
import '../styles/portfolio.css';
import portfolioImg from '../assets/portofolio.png';
import loginImg from '../assets/login .png';
import taxiImg from '../assets/taxi.png';
import kingImg from '../assets/King-j avant.jpg';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      category: "Web Development",
      image: portfolioImg,
      description: "A modern portfolio website built with React and Framer Motion",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "https://botunaeliecv.vercel.app/"
    },
    {
      id: 2,
      title: "Login System",
      category: "UI/UX Design",
      image: loginImg,
      description: "User interface design for a secure login system",
      technologies: ["Figma", "CSS", "Authentication"],
      link: "https://www.figma.com/design/DcDmW1XkZpAvuDxCDTWIu1/Login-Page-?m=auto&t=7VDeE7Ua3ijFHRSc-6"
    },
    {
      id: 3,
      title: "Taxi Service App",
      category: "Mobile App UIX",
      image: taxiImg,
      description: "Mobile application for taxi service booking",
      technologies: ["Figma", "ReactJs", "Node Js"],
      link: "https://www.figma.com/design/CcGts5cDOvLL3bVaYHLuNa/Taxi-Service-App?m=auto&t=7VDeE7Ua3ijFHRSc-6"
    },
    {
      id: 4,
      title: "King J Protect",
      category: "Web Development",
      image: kingImg,
      description: "brochure for King J project",
      technologies: ["Adode", "Photoshop", "Brochure"],
      link: "+243977350699"
    }
  ];

  return (
    <motion.section 
      className="portfolio-section" 
      id="portfolio"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="portfolio-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My <span className="gold-text">Portfolio</span>
        </motion.h2>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="portfolio-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 20px rgba(255, 215, 0, 0.1)"
              }}
            >
              <div className="portfolio-image-container">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-overlay">
                  <div className="portfolio-details">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="portfolio-technologies">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <a href={project.link} className="portfolio-link">
                      View Project
                    </a>
                  </div>
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <span className="portfolio-category">{project.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio; 