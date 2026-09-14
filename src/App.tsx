import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import ArcaneCastersSubNav from './components/ArcaneCastersSubNav';
import type { TabId } from './content/siteContent';
import Home from './pages/Home';
import Games from './pages/Games';
import Team from './pages/Team';
import MagicCompendium from './pages/MagicCompendium';
import SummonCompendium from './pages/SummonCompendium';
import { getLegacyPathFromHash, getRouteFromPathname, getTabPath, isArcaneCastersTab } from './routing';

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
  const [route, setRoute] = useState(() => {
    const legacyPath = getLegacyPathFromHash(window.location.hash);
    if (legacyPath) window.history.replaceState(null, '', legacyPath);
    return getRouteFromPathname(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromPathname(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToTab = (tabId: TabId) => {
    setRoute({ tab: tabId });
    const nextPath = getTabPath(tabId);

    if (`${window.location.pathname}${window.location.search}` !== nextPath) {
      window.history.pushState(null, '', nextPath);
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
      case 'summons':
        return <SummonCompendium slug={route.slug} />;
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

      {isArcaneCastersTab(route.tab) && (
        <ArcaneCastersSubNav activeTab={route.tab} navigateToTab={navigateToTab} />
      )}

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
