import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../i18n/language';
import type { LegalDocumentContent, LegalLanguage, LegalSection } from '../content/legalDocument';
import './LegalDocument.css';

interface LegalDocumentProps {
  documents: Record<LegalLanguage, LegalDocumentContent>;
  Icon: LucideIcon;
}

const SectionBody: React.FC<{ section: LegalSection }> = ({ section }) => (
  <>
    {section.paragraphs?.map((text) => (
      <p key={text} className="legal-paragraph">
        {text}
      </p>
    ))}

    {section.bullets && (
      <ul className="legal-bullets">
        {section.bullets.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    )}

    {section.table && (
      <div className="legal-table-wrapper">
        <table className="legal-table">
          <thead>
            <tr>
              {section.table.head.map((cell) => (
                <th key={cell} scope="col">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.table.rows.map((row) => (
              <tr key={row.join('|')}>
                {row.map((cell, cellIndex) => (
                  <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {section.notes?.map((text) => (
      <p key={text} className="legal-paragraph legal-note">
        {text}
      </p>
    ))}
  </>
);

// Privacy and Terms follow the site-wide language switch (the header already
// carries LanguageToggle) instead of keeping a language toggle of their own.
export const LegalDocument: React.FC<LegalDocumentProps> = ({ documents, Icon }) => {
  const { language } = useLanguage();
  const content = documents[language];

  return (
    <div className="legal-page">
      <div className="container-narrow legal-hero">
        <div className="title-banner">
          <h1 className="text-title legal-title">
            <Icon size={32} aria-hidden="true" />
            {content.title}
          </h1>
        </div>
        <p className="legal-effective">
          {content.effectiveLabel} · {content.effectiveDate}
        </p>
      </div>

      <div className="container-narrow">
        <div className="flat-card legal-card">
          {content.intro.map((text) => (
            <p key={text} className="legal-paragraph legal-intro">
              {text}
            </p>
          ))}

          {content.sections.map((section) => (
            <article key={section.heading} className="legal-section">
              <h2 className="legal-heading">{section.heading}</h2>
              <SectionBody section={section} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalDocument;
