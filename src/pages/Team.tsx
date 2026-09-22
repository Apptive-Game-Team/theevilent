import React, { useState } from 'react';
import { Mail, Compass, Send, Sparkles } from 'lucide-react';
import { teamMembers, type TabId } from '../content/siteContent';
import { getTabPath } from '../routing';
import { THE_EVIL_ENT_THEME, useDocumentTheme } from '../hooks/useDocumentTheme';

const summonRecipients = teamMembers.map((member) => member.email).join(',');

interface TeamProps {
  navigateToTab: (tab: TabId) => void;
}

export const Team: React.FC<TeamProps> = ({ navigateToTab }) => {
  // The studio's own page: abyss black and crimson for as long as this stays
  // mounted. Leaving Team hands the ground straight back to Arcane Casters.
  useDocumentTheme(THE_EVIL_ENT_THEME);

  // The link back stays a real link so it can be opened in a new tab, but a
  // plain click is handed to the router instead of reloading the document.
  const openTab = (tab: TabId) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateToTab(tab);
  };

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      const subject = encodeURIComponent(`[The Evil Ent] Summon from ${formState.name}`);
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
      {/* Introduction Header */}
      <section className="band band-sm" style={styles.introSection}>
        <div className="container-narrow" style={styles.introContainer}>
          <h1>THE SUMMONERS</h1>
          <p className="lede" style={styles.subtitle}>
            The Evil Ent는 2명의 개발자로 구성된 인디 게임 팀입니다. 클라이언트(Unity), 서버(Backend), 시스템 인프라(Infra)를 직접 설계하고 아우르며 완성도 높은 게임을 빌드하고 있습니다.
          </p>
          <a
            href={getTabPath('home')}
            onClick={openTab('home')}
            className="btn-secondary"
            style={styles.backLink}
          >
            <Sparkles size={16} aria-hidden="true" />
            Arcane Casters로 돌아가기
          </a>
        </div>
      </section>

      {/* Member Cards Grid */}
      <section className="band band-md" style={styles.teamSection}>
        <div className="container">
          <div className="grid-2" style={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.name} className="panel" style={styles.memberCard}>
                {/* Avatar Icon */}
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

                <p style={styles.memberBio}>{member.bio}</p>

                {/* Member links */}
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

      {/* Studio Philosophy / Contact Section */}
      <section className="band band-lg band-sunken" style={styles.contactSection}>
        <div className="container">
          <div className="Team_contactGrid" style={styles.contactGrid}>
            {/* Left: Philosophy */}
            <div style={styles.philosophyCol}>
              <h2>OUR PHILOSOPHY</h2>
              <ul style={styles.philoList}>
                <li style={styles.philoItem}>
                  <div style={styles.philoIconWrapper}>
                    <Sparkles size={18} color="var(--color-primary)" aria-hidden="true" />
                  </div>
                  <div style={styles.philoText}>
                    <strong style={styles.philoTitle}>재미있는 게임을 만들자</strong>
                    <p style={styles.philoDesc}>
                      장르적 클리셰에 얽매이지 않고, 플레이어에게 실질적인 흥미와 도전을 유발하는 가장 원초적인 즐거움을 연구합니다.
                    </p>
                  </div>
                </li>
                <li style={styles.philoItem}>
                  <div style={styles.philoIconWrapper}>
                    <Compass size={18} color="var(--color-primary)" aria-hidden="true" />
                  </div>
                  <div style={styles.philoText}>
                    <strong style={styles.philoTitle}>게임 같은 게임을 만들자</strong>
                    <p style={styles.philoDesc}>
                      조작과 선택의 결과가 직관적이며, 플레이어가 몰입하여 스스로 흐름을 장악해 나가는 진정한 의미의 놀이를 창조하고자 합니다.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: Contact Form */}
            <div style={styles.formCol}>
              <div className="panel" style={styles.formCard}>
                <h3 style={styles.formTitle}>SEND A SUMMON</h3>
                <p style={styles.formSubtitle}>건의 사항, 버그 리포트, 협업 제안 등을 작성하면 이메일 앱에서 최종 전송할 수 있습니다.</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label htmlFor="contact-name" className="label">Name</label>
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
                      placeholder="이름 또는 닉네임…"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="contact-email" className="label">Email Address</label>
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
                    <label htmlFor="contact-message" className="label">Message</label>
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
                      placeholder="메시지 내용을 입력하세요…"
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={styles.submitBtn}>
                    <Send size={16} aria-hidden="true" />
                    이메일 앱 열기
                  </button>
                </form>
              </div>
            </div>
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
  introContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.25rem',
  },
  subtitle: {
    margin: '0 auto',
  },
  backLink: {
    marginTop: '0.25rem',
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
  memberBio: {
    color: 'var(--color-ink-soft)',
    lineHeight: 1.7,
    flexGrow: 1,
    overflowWrap: 'anywhere',
  },
  socialRow: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  socialLink: {
    color: 'var(--color-ink-muted)',
    display: 'inline-flex',
    padding: '0.25rem',
    borderRadius: 'var(--radius-control)',
  },
  contactSection: {},
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '3rem',
    alignItems: 'start',
  },
  philosophyCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    // A grid item's default min-width is its min-content width, which the
    // unbreakable Korean of the philosophy copy pushes past the track. Without
    // this the column runs 1px wider than the page at 390px.
    minWidth: 0,
  },
  philoList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  philoItem: {
    display: 'flex',
    gap: '1.25rem',
    alignItems: 'flex-start',
    minWidth: 0,
  },
  philoText: {
    minWidth: 0,
  },
  philoIconWrapper: {
    backgroundColor: 'var(--color-primary-tint)',
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-control-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  philoTitle: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--color-ink)',
    marginBottom: '0.35rem',
  },
  philoDesc: {
    fontSize: '0.95rem',
    color: 'var(--color-ink-soft)',
    lineHeight: 1.65,
  },
  formCol: {
    display: 'flex',
    justifyContent: 'center',
  },
  formCard: {
    width: '100%',
    maxWidth: '480px',
  },
  formTitle: {
    marginBottom: '0.5rem',
  },
  formSubtitle: {
    color: 'var(--color-ink-muted)',
    fontSize: '0.9rem',
    marginBottom: '1.75rem',
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
