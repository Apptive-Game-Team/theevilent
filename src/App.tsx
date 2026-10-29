import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { TabId } from './content/siteContent';
import Home from './pages/Home';
import MagicCompendium from './pages/MagicCompendium';
import Rankings from './pages/Rankings';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import News from './pages/News';
import Account from './pages/Account';
import ComicReader from './pages/ComicReader';
import { useLanguage } from './i18n/language';
import { getLegacyPathFromHash, getRedirectPath, getRouteFromPathname, getTabPath } from './routing';

function App() {
  const { language } = useLanguage();
  const [route, setRoute] = useState(() => {
    const legacyPath = getLegacyPathFromHash(window.location.hash)
      ?? getRedirectPath(window.location.pathname);
    if (legacyPath) window.history.replaceState(null, '', legacyPath);
    return getRouteFromPathname(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      const redirect = getRedirectPath(window.location.pathname);
      if (redirect) window.history.replaceState(null, '', redirect);
      setRoute(getRouteFromPathname(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToTab = (tabId: TabId) => {
    const nextPath = tabId === 'comic' ? `/arcane-casters/comic/1/${language}` : getTabPath(tabId);
    setRoute(getRouteFromPathname(nextPath));

    if (`${window.location.pathname}${window.location.search}` !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (route.tab) {
      case 'home':
        return <Home navigateToTab={navigateToTab} />;
      case 'magic':
        return <MagicCompendium slug={route.slug} />;
      case 'rankings':
        return <Rankings />;
      case 'privacy':
        return <Privacy />;
      case 'terms':
        return <Terms />;
      case 'news':
        return <News />;
      case 'account':
        return <Account />;
      case 'comic':
        return <ComicReader key={route.locale} locale={route.locale || 'ko'} episode={route.slug || '1'} />;
      default:
        return <Home navigateToTab={navigateToTab} />;
    }
  };

  return (
    <div style={styles.appLayout}>
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
