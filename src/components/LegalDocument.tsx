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

// Privacy and Terms stay on Arcane Casters' own ground (:root) — a legal
// notice is not the studio's identity, so neither page calls useDocumentTheme.
export const LegalDocument: React.FC<LegalDocumentProps> = ({ documents, Icon }) => {
  const [language, setLanguage] = useState<LegalLanguage>(getInitialLanguage);
  const content = documents[language];

  return (
    <div style={styles.page}>
      <section className="band band-sm" style={styles.introSection}>
        <div className="container-narrow" style={styles.introContainer}>
          <Icon size={32} color="var(--color-primary)" aria-hidden="true" />
          <h1>{content.title}</h1>
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
                  background: language === code ? 'var(--color-primary)' : 'var(--color-ground-sunken)',
                  color: language === code ? 'var(--color-ink-inverse)' : 'var(--color-ink-muted)',
                }}
              >
                {legalLanguageLabels[code]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-lg" style={styles.bodySection}>
        <div className="container-narrow">
          <div className="panel" style={styles.documentPanel}>
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
    textAlign: 'center',
  },
  introContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  effective: {
    color: 'var(--color-ink-muted)',
    fontSize: '0.9rem',
  },
  languageRow: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  languageButton: {
    border: 'none',
    borderRadius: 'var(--radius-pill)',
    padding: '0.4rem 1.1rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color var(--transition-fast), color var(--transition-fast)',
  },
  bodySection: {
    paddingTop: 0,
  },
  documentPanel: {
    padding: 'clamp(1.5rem, 5vw, 3.5rem)',
  },
  intro: {
    color: 'var(--color-ink-soft)',
    lineHeight: 1.9,
    marginBottom: '1rem',
  },
  section: {
    marginTop: '2.75rem',
  },
  heading: {
    fontSize: 'var(--text-h3)',
    marginBottom: '1rem',
  },
  paragraph: {
    color: 'var(--color-ink)',
    lineHeight: 1.9,
    marginBottom: '0.9rem',
  },
  bulletList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    marginBottom: '0.9rem',
    paddingLeft: '1.25rem',
  },
  bullet: {
    color: 'var(--color-ink)',
    lineHeight: 1.8,
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
    borderBottom: '1px solid var(--color-rule-strong)',
    color: 'var(--color-ink)',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '0.6rem 0.75rem',
    borderBottom: '1px solid var(--color-rule)',
    color: 'var(--color-ink-soft)',
    lineHeight: 1.7,
    verticalAlign: 'top',
  },
};

export default LegalDocument;
