import React from 'react';
import '../styles/services.css';
import '../styles/common-effects.css';

const ServiceCard = ({ service, index }) => {
  return (
    <div className="service-card">
      <div className="service-icon-container image-container">
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

        <div className="service-icon">{service.icon}</div>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: '🖥️',
      title: 'UI/UX Design',
      description: 'Conception d\'interfaces intuitives et esthétiques avec des prototypes interactifs avec Figma et Proto'
    },
    {
      icon: '📱',
      title: 'Graphist Design',
      description: 'Conception des supports de communication , de mockup avec adode Photoshop '
    },
    {
      icon: '🌐',
      title: 'Développement Web et Applications Mobile',
      description: 'J\'utilise React Js pour creer des pages interatives et React Native pour les application mobile'
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <h2 className="section-title">My <span className="gold-text">Services</span></h2>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;