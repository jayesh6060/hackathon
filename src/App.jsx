import React, { useState, useEffect } from 'react';
import ContinuousAnimeExperience from './components/ContinuousAnimeExperience';
import DedicatedRegisterPage from './pages/DedicatedRegisterPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/register' || path.startsWith('/register')) return 'register';
      if (window.location.search.includes('page=register')) return 'register';
      if (path === '/admin' || path.startsWith('/admin') || window.location.search.includes('page=admin')) return 'admin';
    }
    return 'home';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/register' || path.startsWith('/register') || window.location.search.includes('page=register')) {
        window.location.replace('https://forms.gle/4UKxifNAgwn1NUri7');
        return;
      }
    }

    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/register' || path.startsWith('/register') || window.location.search.includes('page=register')) {
        window.location.replace('https://forms.gle/4UKxifNAgwn1NUri7');
      } else if (path === '/admin' || path.startsWith('/admin') || window.location.search.includes('page=admin')) {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route, query = '') => {
    if (route === 'register') {
      window.open('https://forms.gle/4UKxifNAgwn1NUri7', '_blank');
    } else if (route === 'admin') {
      window.history.pushState({}, '', '/admin' + query);
      setCurrentRoute('admin');
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

  if (currentRoute === 'admin') {
    return <AdminPage onNavigate={navigateTo} />;
  }

  return (
    <div className="relative w-full min-h-screen bg-[#101A2B] text-[#F3EBDD]">
      <ContinuousAnimeExperience onNavigate={navigateTo} />
    </div>
  );
}
