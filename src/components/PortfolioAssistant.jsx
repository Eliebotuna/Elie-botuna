import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCVContent } from '../services/cvService';
import '../styles/portfolioAssistant.css';

const PortfolioAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [cvInfo, setCvInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCV = async () => {
      try {
        const info = await getCVContent();
        setCvInfo(info);
        console.log('CV chargé:', info); // Pour déboguer
      } catch (error) {
        console.error('Erreur lors du chargement du CV:', error);
      }
    };
    loadCV();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Préparer le contexte avec les informations du CV
      const context = cvInfo ? `
        Voici le contenu du CV d'Elie Botuna:
        
        ${cvInfo.fullText}
        
        Question de l'utilisateur: ${userMessage}
        
        IMPORTANT: Utilise UNIQUEMENT les informations fournies dans le CV ci-dessus pour répondre à la question. 
        Si l'information n'est pas dans le CV, dis-le clairement.
        Ne fais pas d'hypothèses ou de suppositions.
      ` : userMessage;

      // Appeler l'API pour obtenir une réponse
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "Tu es un assistant IA spécialisé dans le portfolio d'Elie Botuna. Tu dois répondre aux questions en te basant UNIQUEMENT sur les informations fournies dans le CV. Si une information n'est pas dans le CV, dis-le clairement. Ne fais pas d'hypothèses."
            },
            {
              role: "user",
              content: context
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: 'Désolé, je rencontre des difficultés techniques. Veuillez réessayer plus tard.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="portfolio-assistant">
      <motion.button
        className="assistant-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="assistant-chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="chat-header">
              <h3>Assistant IA</h3>
              <p>Posez-moi des questions sur Elie Botuna</p>
            </div>

            <div className="chat-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {message.content}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  className="message ai loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  En train de réfléchir...
                </motion.div>
              )}
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question..."
              />
              <button onClick={handleSendMessage}>Envoyer</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioAssistant; 