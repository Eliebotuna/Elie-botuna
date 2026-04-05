import React, { useEffect, useRef, useState } from 'react';
import '../styles/header.css';
import profilePhoto from '../assets/profile.png';

const Header = ({ onHome, lang, setLang, theme, setTheme, t }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <header className="envi-header">
      <div className="envi-header-inner">
        <button
          type="button"
          className="envi-avatar-link envi-avatar-btn"
          onClick={() => {
            onHome();
            setMenuOpen(false);
          }}
          aria-label="Accueil"
        >
          <img src={profilePhoto} alt="" />
        </button>

        <div className="envi-header-toolbar" ref={panelRef}>
          <button
            type="button"
            className="envi-lang-switch"
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <span className={lang === 'en' ? 'envi-lang-on' : 'envi-lang-off'}>{t.langEn}</span>
            <span className={lang === 'fr' ? 'envi-lang-on' : 'envi-lang-off'}>{t.langFr}</span>
            <span
              className="envi-lang-knob"
              data-lang={lang}
              aria-hidden
            />
          </button>

          <div className="envi-theme-group" role="group" aria-label="Thème">
            <button
              type="button"
              className={`envi-theme-btn${theme === 'light' ? ' is-active' : ''}`}
              onClick={() => setTheme('light')}
              aria-label={t.themeLight}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </button>
            <button
              type="button"
              className={`envi-theme-btn${theme === 'dark' ? ' is-active' : ''}`}
              onClick={() => setTheme('dark')}
              aria-label={t.themeDark}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            className="envi-menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Menu"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((o) => !o);
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
          <div className={`envi-mobile-panel ${menuOpen ? 'open' : ''}`}>
            <button type="button" onClick={() => { setLang('fr'); setMenuOpen(false); }}>Français</button>
            <button type="button" onClick={() => { setLang('en'); setMenuOpen(false); }}>English</button>
            <button type="button" onClick={() => { setTheme('light'); setMenuOpen(false); }}>{t.themeLight}</button>
            <button type="button" onClick={() => { setTheme('dark'); setMenuOpen(false); }}>{t.themeDark}</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
