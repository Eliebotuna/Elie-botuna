// Options pour l'Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

// Fonction pour gérer les animations des sections
const handleSectionAnimation = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Désactiver l'observation une fois que l'élément est visible
      observer.unobserve(entry.target);
    }
  });
};

// Fonction pour gérer les animations des cartes
const handleCardAnimation = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Désactiver l'observation une fois que l'élément est visible
      cardObserver.unobserve(entry.target);
    }
  });
};

// Créer les observateurs
const observer = new IntersectionObserver(handleSectionAnimation, observerOptions);
const cardObserver = new IntersectionObserver(handleCardAnimation, {
  ...observerOptions,
  threshold: 0.2
});

// Observer les sections
document.querySelectorAll('.hero-section, .about-section, .services-section, .stats-section').forEach(section => {
  observer.observe(section);
});

// Observer les cartes
document.querySelectorAll('.service-card, .stat-card').forEach(card => {
  cardObserver.observe(card);
});

// Gérer le défilement fluide pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80; // Ajuster selon la hauteur de votre header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}); 