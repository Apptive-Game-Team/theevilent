import React from 'react';
import { languageLabels, languages, useLanguage } from '../i18n/language';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="segmented" role="group" aria-label="Language">
      {languages.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          aria-pressed={language === option}
          onClick={() => {
            setLanguage(option);
            const comic = /^\/arcane-casters\/comic\/(?:(\d+)\/)?(ko|en)\/?$/.exec(window.location.pathname);
            if (comic && comic[2] !== option) {
              const episode = comic[1] ? `/${comic[1]}` : '';
              window.location.assign(`/arcane-casters/comic${episode}/${option}${window.location.hash}`);
            }
          }}
        >
          {languageLabels[option]}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
