import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faTimes } from '@fortawesome/free-solid-svg-icons';
import { portfolioData } from '../../constants/portfolioData';
import '../../styles/PortfolioAssistant.css';
import '../../styles/common-effects.css';

const PortfolioAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Informations personnelles
    if (lowerMessage.includes('qui es-tu') || lowerMessage.includes('présente toi')) {
      return `Je suis ${portfolioData.personal.name}, ${portfolioData.personal.title}. ${portfolioData.personal.description}`;
    }

    // Compétences
    if (lowerMessage.includes('compétence') || lowerMessage.includes('skill')) {
      const skillsList = portfolioData.skills.map(skill => 
        `${skill.name} (${skill.level}%) - ${skill.description}`
      ).join('\n');
      return `Voici mes compétences principales :\n${skillsList}`;
    }

    // Expérience
    if (lowerMessage.includes('expérience') || lowerMessage.includes('expérience')) {
      const experienceList = portfolioData.experience.map(exp => 
        `${exp.title} chez ${exp.company} (${exp.period})\n${exp.description}`
      ).join('\n\n');
      return `Mon expérience professionnelle :\n${experienceList}`;
    }

    // Projets
    if (lowerMessage.includes('projet') || lowerMessage.includes('projets')) {
      const projectsList = portfolioData.projects.map(project => 
        `${project.title}\n${project.description}\nTechnologies : ${project.technologies.join(', ')}`
      ).join('\n\n');
      return `Mes projets principaux :\n${projectsList}`;
    }

    // Services
    if (lowerMessage.includes('service') || lowerMessage.includes('services')) {
      const servicesList = portfolioData.services.map(service => 
        `${service.icon} ${service.title}\n${service.description}`
      ).join('\n\n');
      return `Les services que je propose :\n${servicesList}`;
    }

    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('contacter')) {
      return `Pour me contacter :\nEmail : ${portfolioData.personal.email}\nLocalisation : ${portfolioData.personal.location}\n\nVous pouvez aussi me trouver sur :\n${portfolioData.socialLinks.map(link => `${link.name}: ${link.url}`).join('\n')}`;
    }

    // Formation
    if (lowerMessage.includes('formation') || lowerMessage.includes('éducation')) {
      const educationList = portfolioData.education.map(edu => 
        `${edu.degree}\n${edu.school} (${edu.period})`
      ).join('\n\n');
      return `Ma formation :\n${educationList}`;
    }

    // Réponse par défaut
    return "Bonjour Je suis Votre assistant Portofolio je peux vous parler de mes compétences, expériences, projets, services ou formation. Que souhaitez-vous savoir ?";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputMessage('');
    setIsTyping(true);

    // Simuler un délai de réponse
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = generateResponse(userMessage);
    setMessages(prev => [...prev, { text: response, sender: 'assistant' }]);
    setIsTyping(false);
  };

  return (
    <motion.div 
      className="ai-assistant"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <button 
        className="ai-assistant-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fermer l'assistant" : "Ouvrir l'assistant"}
      >
        <FontAwesomeIcon icon={faRobot} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="ai-assistant-chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="ai-assistant-header">
              <h3>Assistant IA</h3>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Fermer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="ai-assistant-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.sender}`}
                  initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.text.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </motion.div>
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="ai-assistant-input">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Posez votre question..."
                aria-label="Message"
              />
              <button type="submit">Envoyer</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PortfolioAssistant; 