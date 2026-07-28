import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import type { TabId } from './content/siteContent';
import Home from './pages/Home';
import Games from './pages/Games';
import Team from './pages/Team';
import MagicCompendium from './pages/MagicCompendium';

const validTabs: TabId[] = ['home', 'games', 'magic', 'team'];

interface AppRoute {
  tab: TabId;
  slug?: string;
}

const getRouteFromHash = (): AppRoute => {
  if (typeof window === 'undefined') {
    return { tab: 'home' };
  }

  const route = window.location.hash.replace('#', '').split('?')[0];
  const [hashTab, slug] = route.split('/') as [TabId, string | undefined];
  return validTabs.includes(hashTab) ? { tab: hashTab, slug } : { tab: 'home' };
};

function App() {
  const [route, setRoute] = useState<AppRoute>(getRouteFromHash);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigateToTab = (tabId: TabId) => {
    setRoute({ tab: tabId });
    const nextHash = tabId === 'home' ? '' : `#${tabId}`;

    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', `${window.location.pathname}${nextHash}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (route.tab) {
      case 'home':
        return <Home navigateToTab={navigateToTab} />;
      case 'games':
        return <Games />;
      case 'magic':
        return <MagicCompendium slug={route.slug} />;
      case 'team':
        return <Team />;
      default:
        return <Home navigateToTab={navigateToTab} />;
    }
  };

  return (
    <div style={styles.appLayout}>
      <div 
        className="custom-cursor-glow" 
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      <ParticleBackground />
      <a href="#main-content" className="skip-link">
        Skip To Main Content
      </a>

      <Navbar activeTab={route.tab} navigateToTab={navigateToTab} />

      <main id="main-content" style={styles.mainContent} className="page-fade-in">
        {renderContent()}
      </main>

      <Footer navigateToTab={navigateToTab} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appLayout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
};

export default App;
