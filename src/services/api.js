const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const api = {
  // Obtenir les données du portfolio
  getPortfolioData: async () => {
    try {
      const response = await fetch(`${API_URL}/portfolio`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des données');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Envoyer un message de contact
  sendContactMessage: async (messageData) => {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
      
      if (!response.ok) throw new Error('Erreur lors de l\'envoi du message');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Obtenir les statistiques de visite
  getStats: async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des statistiques');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }
}; 