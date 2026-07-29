import React, { useState, useEffect, useRef } from 'react';
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

// Returns null when the hash is a non-empty fragment that is not a tab route
// (e.g. the "#main-content" skip link), so callers can leave the route alone.
const getRouteFromHash = (): AppRoute | null => {
  if (typeof window === 'undefined') {
    return { tab: 'home' };
  }

  const route = window.location.hash.replace('#', '').split('?')[0];
  if (!route) {
    return { tab: 'home' };
  }

  const [hashTab, slug] = route.split('/') as [TabId, string | undefined];
  return validTabs.includes(hashTab) ? { tab: hashTab, slug } : null;
};

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const glow = glowRef.current;
      if (!glow) return;
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={glowRef} className="custom-cursor-glow" style={{ left: 0, top: 0 }} />;
}

function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash() ?? { tab: 'home' });

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = getRouteFromHash();
      if (!nextRoute) return;

      setRoute(nextRoute);
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
      <CursorGlow />

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
