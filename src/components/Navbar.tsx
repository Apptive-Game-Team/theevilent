import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { gameNavigationItems, navigationItems, type TabId } from '../content/siteContent';
import { getTabPath } from '../routing';
import { comicListPath } from '../content/comic';
import { useLanguage } from '../i18n/language';
import { useAccount } from '../account/accountContext';
import { LanguageToggle } from './LanguageToggle';
import './Navbar.css';

interface NavbarProps {
  activeTab: TabId;
  navigateToTab: (tab: TabId) => void;
}

const accountLabel = {
  signedOut: { ko: '로그인', en: 'Log in' },
  signedIn: { ko: '내 정보', en: 'My account' },
};

export const Navbar: React.FC<NavbarProps> = ({ activeTab, navigateToTab }) => {
  const { language } = useLanguage();
  const { status, member } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const gameTriggerRef = useRef<HTMLButtonElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const isHome = activeTab === 'home';
  const gameActive = gameNavigationItems.some(item => item.id === activeTab);

  // The home page carries the hero's own logo, so the header stays
  // transparent and logo-less there; every other page gets the ground-deep
  // bar with the wordmark on the left (Main.dc.html / Magic.dc.html).
  const handleNavClick = (tabId: TabId) => {
    navigateToTab(tabId);
    setIsOpen(false);
    setGameOpen(false);
  };

  // Let modifier clicks fall through to the browser (open in new tab/window),
  // otherwise cancel the default fragment navigation so only SPA routing runs.
  const handleNavLinkClick = (event: React.MouseEvent, tabId: TabId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    handleNavClick(tabId);
  };

  useEffect(() => {
    if (!isOpen && !gameOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      setGameOpen(false);
      const mobile = menuTriggerRef.current && getComputedStyle(menuTriggerRef.current).display !== 'none';
      (mobile ? menuTriggerRef.current : gameTriggerRef.current)?.focus();
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navbarRef.current?.contains(event.target)) {
        setIsOpen(false);
        setGameOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, gameOpen]);

  return (
    <header ref={navbarRef} className={`navbar ${isHome ? 'navbar-home' : 'navbar-page'}`}>
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
            <div className="navbar-game">
              <button
                ref={gameTriggerRef}
                type="button"
                className={`flat-btn navbar-link navbar-game-trigger${gameActive ? ' flat-btn-primary' : ''}`}
                aria-expanded={gameOpen}
                aria-controls="navbar-game-links"
                onClick={() => setGameOpen(open => !open)}
              >
                {language === 'ko' ? '게임' : 'Game'}
                <ChevronDown size={16} aria-hidden="true" />
              </button>
              <div id="navbar-game-links" className="navbar-game-links" hidden={!gameOpen}>
                {gameNavigationItems.map(item => (
                  <a key={item.id}
                    href={item.id === 'comic' ? comicListPath(language) : getTabPath(item.id)}
                    onClick={event => handleNavLinkClick(event, item.id)}
                    className="flat-btn navbar-link"
                    aria-current={activeTab === item.id ? 'page' : undefined}>
                    {item.label[language]}
                  </a>
                ))}
              </div>
            </div>
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
            <a
              href={getTabPath('account')}
              onClick={(event) => handleNavLinkClick(event, 'account')}
              className="flat-btn navbar-link navbar-account"
              aria-current={activeTab === 'account' ? 'page' : undefined}
            >
              {status === 'signedIn' && member
                ? member.name
                : status === 'signedIn'
                  ? accountLabel.signedIn[language]
                  : accountLabel.signedOut[language]}
            </a>
          </nav>

          <LanguageToggle />

          <button
            ref={menuTriggerRef}
            type="button"
            className="navbar-menu-btn"
            onClick={() => {
              setIsOpen(open => !open);
              setGameOpen(false);
            }}
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
