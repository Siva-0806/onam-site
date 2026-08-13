import { useState, useEffect } from 'react';
import './index.css';

import Navbar              from './components/Navbar.jsx';
import HeroSection         from './components/HeroSection.jsx';
import MarqueeStrip        from './components/MarqueeStrip.jsx';
import AboutSection        from './components/AboutSection.jsx';
import EventsSection       from './components/EventsSection.jsx';
import ParticipationSection from './components/ParticipationSection.jsx';
import ClosingCTA          from './components/ClosingCTA.jsx';
import RegisterPage        from './components/RegisterPage.jsx';
import Footer              from './components/Footer.jsx';

/* Kasavu band — woven gold strip between sections */
function Band() {
  return <div className="band" aria-hidden="true" />;
}

/* Parse the current URL hash into { page, eventId } */
function parseHash(hash) {
  const h = hash || '';
  if (h.indexOf('#/register') === 0) {
    const m = h.match(/#\/register\/([a-z]+)/);
    return { page: 'register', eventId: m ? m[1] : null };
  }
  return { page: 'home', eventId: null };
}

export default function App() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  /* Sync state with browser hash navigation */
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  /* Navigate programmatically */
  function navigate(path) {
    // path like '/register', '/register/code', or 'home'
    if (path === 'home' || path === '/') {
      window.history.pushState({}, '', '#/');
      setRoute({ page: 'home', eventId: null });
      window.scrollTo(0, 0);
    } else if (path.startsWith('/register')) {
      const m = path.match(/\/register\/([a-z]+)/);
      const newHash = m ? `#/register/${m[1]}` : '#/register';
      window.history.pushState({}, '', newHash);
      setRoute({ page: 'register', eventId: m ? m[1] : null });
      window.scrollTo(0, 0);
    } else {
      // section scroll on home page
      window.history.pushState({}, '', `#${path}`);
      setRoute({ page: 'home', eventId: null });
      setTimeout(() => {
        const el = document.querySelector(`#${path.replace('#', '')}`);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  }

  /* Update document title */
  useEffect(() => {
    document.title = route.page === 'register'
      ? 'Register — TECHAVAM 2026 | Technocrats'
      : 'TECHAVAM 2026 — Technocrats | IT Department Onam Celebration';
  }, [route.page]);

  return (
    <>
      <Navbar onNavigate={navigate} currentPage={route.page} />

      {route.page === 'home' && (
        <main>
          <HeroSection onNavigate={navigate} />
          <MarqueeStrip />
          <AboutSection />
          <Band />
          <EventsSection onNavigate={navigate} />
          <Band />
          <ParticipationSection />
          <ClosingCTA onNavigate={navigate} />
        </main>
      )}

      {route.page === 'register' && (
        <main>
          <RegisterPage
            initialEvent={route.eventId}
            onBack={() => navigate('home')}
          />
        </main>
      )}

      <Footer />
    </>
  );
}
