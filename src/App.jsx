import React, { useState, useEffect } from 'react';
import ContinuousAnimeExperience from './components/ContinuousAnimeExperience';
import DedicatedRegisterPage from './pages/DedicatedRegisterPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/register' || path.startsWith('/register')) return 'register';
      if (window.location.search.includes('page=register')) return 'register';
    }
    return 'home';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/register' || path.startsWith('/register') || window.location.search.includes('page=register')) {
        setCurrentRoute('register');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route, query = '') => {
    if (route === 'register') {
      window.history.pushState({}, '', '/register' + query);
      setCurrentRoute('register');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
      setCurrentRoute('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (currentRoute === 'register') {
    return <DedicatedRegisterPage onBack={() => navigateTo('home')} />;
  }

  return (
    <div className="relative w-full min-h-screen bg-[#101A2B] text-[#F3EBDD]">
      <ContinuousAnimeExperience onNavigate={navigateTo} />
    </div>
  );
}
