import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { teamMembers } from '../content/siteContent';
import { THE_EVIL_ENT_THEME, useDocumentTheme } from '../hooks/useDocumentTheme';

const summonRecipients = teamMembers.map((member) => member.email).join(',');

export const Team: React.FC = () => {
  // The studio's own page: abyss black and crimson for as long as this stays
  // mounted. Leaving Team hands the ground straight back to Arcane Casters.
  useDocumentTheme(THE_EVIL_ENT_THEME);

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      const subject = encodeURIComponent(`[The Evil Ent] ${formState.name} 님의 문의`);
      const body = encodeURIComponent(
        [
          formState.message,
          '',
          '---',
          `Name: ${formState.name}`,
          `Reply-To: ${formState.email}`,
        ].join('\n'),
      );

      window.location.href = `mailto:${summonRecipients}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div style={styles.page}>
      <section className="band band-sm" style={styles.introSection}>
        <div className="container-narrow">
          <h1>THE EVIL ENT</h1>
        </div>
      </section>

      <section className="band band-md" style={styles.teamSection}>
        <div className="container">
          <div className="grid-2" style={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.name} className="panel" style={styles.memberCard}>
                <div style={styles.avatarRow}>
                  <div
                    style={{
                      ...styles.avatar,
                      borderColor: member.accent,
                      boxShadow: `0 0 15px ${member.accent}33`,
                    }}
                  >
                    <span style={{ ...styles.avatarText, color: member.accent }}>
                      {member.avatarText}
                    </span>
                  </div>
                  <div style={styles.nameBlock}>
                    <h2 style={styles.memberName} translate="no">{member.name}</h2>
                    <p style={{ ...styles.memberRole, color: member.accent }}>
                      {member.role}
                    </p>
                  </div>
                </div>

                <div style={styles.socialRow}>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.socialLink}
                    className="Team_socialLink"
                    title="GitHub Profile"
                    aria-label={`${member.name} GitHub Profile`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    style={styles.socialLink}
                    className="Team_socialLink"
                    title="Send Email"
                    aria-label={`Send Email To ${member.name}`}
                  >
                    <Mail size={20} aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-lg band-sunken">
        <div className="container" style={styles.formCol}>
          <div className="panel" style={styles.formCard}>
            <h2 style={styles.formTitle}>문의</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="contact-name" className="label">이름</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  spellCheck={false}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={styles.input}
                  className="Team_input"
                  placeholder="닉네임…"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="contact-email" className="label">이메일</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  spellCheck={false}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={styles.input}
                  className="Team_input"
                  placeholder="player@example.com…"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="contact-message" className="label">내용</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  autoComplete="off"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={styles.textarea}
                  className="Team_textarea"
                  placeholder="버그, 건의, 협업 제안…"
                />
              </div>
              <button type="submit" className="btn-primary" style={styles.submitBtn}>
                <Send size={16} aria-hidden="true" />
                이메일 앱에서 보내기
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: '100%',
  },
  introSection: {
    textAlign: 'center',
  },
  teamSection: {},
  teamGrid: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  memberCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    minWidth: 0,
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    minWidth: 0,
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: 'var(--radius-card)',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-surface-sunken)',
    flexShrink: 0,
  },
  avatarText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: '1.5rem',
  },
  nameBlock: {
    minWidth: 0,
  },
  memberName: {
    fontSize: '1.5rem',
    overflowWrap: 'anywhere',
  },
  memberRole: {
    fontSize: '0.9rem',
    fontWeight: 600,
    marginTop: '0.2rem',
    overflowWrap: 'anywhere',
  },
  socialRow: {
    display: 'flex',
    gap: '1rem',
  },
  socialLink: {
    color: 'var(--color-ink-muted)',
    display: 'inline-flex',
    padding: '0.25rem',
    borderRadius: 'var(--radius-control)',
  },
  formCol: {
    display: 'flex',
    justifyContent: 'center',
  },
  formCard: {
    width: '100%',
    maxWidth: '480px',
    // A flex item's default min-width is its min-content width; a textarea's
    // `cols` would otherwise push this card past a phone-width viewport.
    minWidth: 0,
  },
  formTitle: {
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    // Without an explicit width a control keeps its intrinsic size (an input's
    // `size`, a textarea's `cols`), which is wider than a phone and does not
    // shrink, so the grid track it sits in outgrows the viewport.
    width: '100%',
    minWidth: 0,
    backgroundColor: 'var(--color-ground-sunken)',
    border: 'none',
    color: 'var(--color-ink)',
    padding: '0.8rem 1rem',
    borderRadius: 'var(--radius-control)',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    transition: 'box-shadow var(--transition-fast)',
  },
  textarea: {
    // Without an explicit width a control keeps its intrinsic size (an input's
    // `size`, a textarea's `cols`), which is wider than a phone and does not
    // shrink, so the grid track it sits in outgrows the viewport.
    width: '100%',
    minWidth: 0,
    backgroundColor: 'var(--color-ground-sunken)',
    border: 'none',
    color: 'var(--color-ink)',
    padding: '0.8rem 1rem',
    borderRadius: 'var(--radius-control)',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    transition: 'box-shadow var(--transition-fast)',
    resize: 'none',
  },
  submitBtn: {
    marginTop: '0.5rem',
    width: '100%',
    justifyContent: 'center',
  },
};

export default Team;
