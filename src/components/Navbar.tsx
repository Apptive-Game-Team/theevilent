import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationItems, type TabId } from '../content/siteContent';
import { getTabPath } from '../routing';
import { useLanguage } from '../i18n/language';
import { LanguageToggle } from './LanguageToggle';
import './Navbar.css';

interface NavbarProps {
  activeTab: TabId;
  navigateToTab: (tab: TabId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, navigateToTab }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = activeTab === 'home';

  // The home page carries the hero's own logo, so the header stays
  // transparent and logo-less there; every other page gets the ground-deep
  // bar with the wordmark on the left (Main.dc.html / Magic.dc.html).
  const handleNavClick = (tabId: TabId) => {
    navigateToTab(tabId);
    setIsOpen(false);
  };

  // Let modifier clicks fall through to the browser (open in new tab/window),
  // otherwise cancel the default fragment navigation so only SPA routing runs.
  const handleNavLinkClick = (event: React.MouseEvent, tabId: TabId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    handleNavClick(tabId);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <header className={`navbar ${isHome ? 'navbar-home' : 'navbar-page'}`}>
      <div className={`container navbar-inner ${isHome ? 'navbar-inner-home' : ''}`}>
        {!isHome && (
          <a
            href={getTabPath('home')}
            className="navbar-logo"
            onClick={(event) => handleNavLinkClick(event, 'home')}
            aria-label="Arcane Casters"
          >
            <img
              src="/brand/logo-wide.webp"
              alt="Arcane Casters"
              className="navbar-logo-img"
              width={966}
              height={205}
              fetchPriority="high"
            />
          </a>
        )}

        <div className="navbar-actions">
          <nav
            id="navbar-links"
            className={`navbar-links ${isOpen ? 'is-open' : ''}`}
            aria-label="Primary"
          >
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={getTabPath(item.id)}
                  onClick={(event) => handleNavLinkClick(event, item.id)}
                  className="flat-btn navbar-link"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label[language]}
                </a>
              );
            })}
          </nav>

          <LanguageToggle />

          <button
            type="button"
            className="navbar-menu-btn"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? (language === 'ko' ? '메뉴 닫기' : 'Close menu') : (language === 'ko' ? '메뉴 열기' : 'Open menu')}
            aria-expanded={isOpen}
            aria-controls="navbar-links"
          >
            {isOpen ? <X size={22} color="#ffffff" aria-hidden="true" /> : <Menu size={22} color="#ffffff" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
