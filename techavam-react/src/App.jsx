import { useState, useEffect } from 'react';
import './index.css';

import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import MarqueeStrip from './components/MarqueeStrip.jsx';
import AboutSection from './components/AboutSection.jsx';
import EventsSection from './components/EventsSection.jsx';
import ParticipationSection from './components/ParticipationSection.jsx';
import ClosingCTA from './components/ClosingCTA.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import Footer from './components/Footer.jsx';

import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { ApiService } from './services/api.js';

/* Kasavu band — woven gold strip between sections */
function Band() {
  return <div className="band" aria-hidden="true" />;
}

/* Parse the current URL hash into { page, eventId } */
function parseHash(hash, pathname) {
  const h = hash || '';
  const p = pathname || '';

  // Direct /admin or #/admin route
  if (h.indexOf('#/admin') === 0 || p === '/admin') {
    return { page: 'admin', eventId: null };
  }

  // Register route
  if (h.indexOf('#/register') === 0 || p.startsWith('/register')) {
    const m = h.match(/#\/register\/([a-z]+)/) || p.match(/\/register\/([a-z]+)/);
    return { page: 'register', eventId: m ? m[1] : null };
  }

  return { page: 'home', eventId: null };
}

export default function App() {
  const [route, setRoute] = useState(() =>
    parseHash(window.location.hash, window.location.pathname)
  );

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() =>
    Boolean(ApiService.getToken())
  );

  /* Sync state with browser hash/path navigation */
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash(window.location.hash, window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);

  /* Check existing admin token validity */
  useEffect(() => {
    if (route.page === 'admin') {
      const token = ApiService.getToken();
      if (token) {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
      }
    }
  }, [route.page]);

  /* Navigate programmatically */
  function navigate(path) {
    if (path === 'home' || path === '/') {
      window.history.pushState({}, '', '#/');
      setRoute({ page: 'home', eventId: null });
      window.scrollTo(0, 0);
    } else if (path === 'admin' || path === '/admin' || path === '#/admin') {
      window.history.pushState({}, '', '#/admin');
      setRoute({ page: 'admin', eventId: null });
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

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    ApiService.clearSession();
    setIsAdminAuthenticated(false);
  };

  /* Update document title */
  useEffect(() => {
    if (route.page === 'admin') {
      document.title = 'Admin Portal — TECHAVAM 2026 Registration Dashboard';
    } else if (route.page === 'register') {
      document.title = 'Register — TECHAVAM 2026 | Technocrats';
    } else {
      document.title = 'TECHAVAM 2026 — Technocrats | IT Department Onam Celebration';
    }
  }, [route.page]);

  // If in admin mode, render dedicated Admin Portal
  if (route.page === 'admin') {
    return (
      <div className="admin-root">
        {isAdminAuthenticated ? (
          <AdminDashboard
            onLogout={handleAdminLogout}
            onBackHome={() => navigate('home')}
          />
        ) : (
          <AdminLogin
            onLoginSuccess={handleAdminLoginSuccess}
            onBackHome={() => navigate('home')}
          />
        )}
      </div>
    );
  }

  // Public Website
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
