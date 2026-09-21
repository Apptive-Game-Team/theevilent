import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  legalLanguageLabels,
  type LegalDocumentContent,
  type LegalLanguage,
  type LegalSection,
} from '../content/legalDocument';

interface LegalDocumentProps {
  documents: Record<LegalLanguage, LegalDocumentContent>;
  Icon: LucideIcon;
}

const languages = Object.keys(legalLanguageLabels) as LegalLanguage[];

// Korean readers get the Korean text, everyone else the English text. Both are
// one button away, so guessing wrong costs a click.
const getInitialLanguage = (): LegalLanguage =>
  navigator.language?.toLowerCase().startsWith('ko') ? 'ko' : 'en';

const SectionBody: React.FC<{ section: LegalSection }> = ({ section }) => (
  <>
    {section.paragraphs?.map((text) => (
      <p key={text} style={styles.paragraph}>
        {text}
      </p>
    ))}

    {section.bullets && (
      <ul style={styles.bulletList}>
        {section.bullets.map((text) => (
          <li key={text} style={styles.bullet}>
            {text}
          </li>
        ))}
      </ul>
    )}

    {section.table && (
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              {section.table.head.map((cell) => (
                <th key={cell} scope="col" style={styles.th}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.table.rows.map((row) => (
              <tr key={row.join('|')}>
                {row.map((cell) => (
                  <td key={cell} style={styles.td}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {section.notes?.map((text) => (
      <p key={text} style={styles.paragraph}>
        {text}
      </p>
    ))}
  </>
);

export const LegalDocument: React.FC<LegalDocumentProps> = ({ documents, Icon }) => {
  const [language, setLanguage] = useState<LegalLanguage>(getInitialLanguage);
  const content = documents[language];

  return (
    <div style={styles.page}>
      <section style={styles.introSection}>
        <div className="container" style={styles.introContainer}>
          <Icon size={32} color="var(--color-primary)" aria-hidden="true" />
          <h1 style={styles.title} className="text-glow">
            {content.title}
          </h1>
          <p style={styles.effective}>
            {content.effectiveLabel} · {content.effectiveDate}
          </p>

          <div style={styles.languageRow} role="group" aria-label="Document language">
            {languages.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                aria-pressed={language === code}
                style={{
                  ...styles.languageButton,
                  color: language === code ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  borderColor: language === code ? 'var(--color-primary)' : 'var(--color-border)',
                }}
              >
                {legalLanguageLabels[code]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.bodySection}>
        <div className="container" style={styles.bodyContainer}>
          {content.intro.map((text) => (
            <p key={text} style={styles.intro}>
              {text}
            </p>
          ))}

          {content.sections.map((section) => (
            <article key={section.heading} style={styles.section}>
              <h2 style={styles.heading}>{section.heading}</h2>
              <SectionBody section={section} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: '100%',
    // Korean breaks mid-word without this, so "없습니다" splits across lines.
    // English is unaffected: it still wraps at spaces.
    wordBreak: 'keep-all',
  },
  introSection: {
    padding: '6.5rem 0 2rem 0',
    textAlign: 'center',
  },
  introContainer: {
    maxWidth: '750px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  title: {
    fontSize: '2.8rem',
    letterSpacing: '0.15em',
  },
  effective: {
    color: 'var(--color-text-muted)',
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
  },
  languageRow: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  languageButton: {
    background: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '0.4rem 1rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'color 0.2s ease, border-color 0.2s ease',
  },
  bodySection: {
    padding: '1rem 0 6rem 0',
  },
  bodyContainer: {
    maxWidth: '820px',
  },
  intro: {
    color: 'var(--color-text-muted)',
    lineHeight: 1.9,
    marginBottom: '1rem',
  },
  section: {
    marginTop: '2.75rem',
  },
  heading: {
    fontSize: '1.2rem',
    letterSpacing: '0.1em',
    borderLeft: '2px solid var(--color-primary)',
    paddingLeft: '0.75rem',
    marginBottom: '1rem',
  },
  paragraph: {
    color: 'var(--color-text-muted)',
    lineHeight: 1.9,
    marginBottom: '0.9rem',
  },
  bulletList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    marginBottom: '0.9rem',
  },
  bullet: {
    color: 'var(--color-text-muted)',
    lineHeight: 1.8,
    paddingLeft: '1rem',
    borderLeft: '1px solid var(--color-border)',
  },
  tableWrapper: {
    overflowX: 'auto',
    marginBottom: '0.9rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    minWidth: '520px',
  },
  th: {
    textAlign: 'left',
    padding: '0.6rem 0.75rem',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-text-light)',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '0.6rem 0.75rem',
    borderBottom: '1px solid var(--color-border-rule)',
    color: 'var(--color-text-muted)',
    lineHeight: 1.7,
    verticalAlign: 'top',
  },
};

export default LegalDocument;
