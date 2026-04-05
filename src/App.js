import React, { useState } from 'react';
import Header from './components/Header';
import PortfolioMain from './components/PortfolioMain';
import Footer from './components/Footer';
import { portfolioData } from './constants/portfolioData';
import { UI } from './constants/i18n';
import './styles/App.css';

function App() {
  const [tab, setTab] = useState('home');
  const [lang, setLang] = useState('fr');
  const [theme, setTheme] = useState('dark');
  const t = UI[lang];

  return (
    <div className="app envi-app-root">
      <div className="envi-glow-spot" aria-hidden />
      <div className="aurora-background" aria-hidden />
      <Header
        onHome={() => setTab('home')}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        t={t}
      />
      <main className="envi-main envi-content">
        <PortfolioMain
          tab={tab}
          setTab={setTab}
          lang={lang}
          t={t}
          portfolioData={portfolioData}
        />
      </main>
      <Footer socialLinks={portfolioData.socialLinks} email={portfolioData.personal.email} />
    </div>
  );
}

export default App;
