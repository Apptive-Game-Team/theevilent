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
            if (/^\/arcane-casters\/comic\/1\/(ko|en)\/?$/.test(window.location.pathname)) {
              window.location.assign(`/arcane-casters/comic/1/${option}${window.location.hash}`);
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
