import React from 'react';
import { aiArtworkNotice, legalLinks, platformLinks, type TabId } from '../content/siteContent';
import { getTabPath } from '../routing';
import { useLanguage } from '../i18n/language';
import './Footer.css';

interface FooterProps {
  navigateToTab: (tab: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigateToTab }) => {
  const { language } = useLanguage();

  // Let modifier clicks fall through to the browser (open in new tab/window),
  // otherwise cancel the default fragment navigation so only SPA routing runs.
  const handleNavClick = (event: React.MouseEvent, tabId: TabId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateToTab(tabId);
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/theevilent-logo.png" alt="The Evil Ent" className="footer-logo" width={52} height={52} />
          <span className="footer-brand-name">The Evil Ent</span>
        </div>

        <p className="footer-ai-notice">{aiArtworkNotice[language]}</p>

        <nav className="footer-links" aria-label="Legal">
          {legalLinks.map((item) => (
            <a key={item.id} href={getTabPath(item.id)} onClick={(event) => handleNavClick(event, item.id)}>
              {item.label[language]}
            </a>
          ))}
        </nav>

        <nav className="footer-platform-links" aria-label="Platforms">
          {platformLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
