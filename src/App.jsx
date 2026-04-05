import './utils/scrollAnimation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import './styles/App.css';

function App() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: 'fab fa-github'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: 'fab fa-linkedin'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: 'fab fa-twitter'
    }
  ];

  return (
    <div className="app">
      <Hero socialLinks={socialLinks} />
      <About />
      <Services />
      <Stats />
      <Portfolio />
    </div>
  );
}

export default App; 