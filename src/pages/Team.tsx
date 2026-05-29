import React, { useState } from 'react';
import { Mail, Compass, Send, CheckCircle, Sparkles } from 'lucide-react';

export const Team: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const members = [
    {
      name: 'monolong',
      role: 'Game Developer (Unity / Backend / Infra)',
      bio: 'Unity 게임 클라이언트 구현부터 견고한 멀티플레이 백엔드 서버 구축 및 인프라 오케스트레이션까지 개발 전반을 담당합니다. 아케인 캐스터즈의 안정적이고 빠른 실시간 PvP 환경을 완성하고 있습니다.',
      accent: '#e61e2a', // Crimson
      avatarText: 'ML',
      github: 'https://github.com/monolong', // placeholder for actual if not supplied
    },
    {
      name: 'yunseong',
      role: 'Game Developer (Unity / Backend / Infra)',
      bio: '게임 기획과 아레나 디자인을 바탕으로 Unity 클라이언트 기능 구현, 매치메이킹 백엔드 아키텍처 및 무중단 인프라 설계를 공유하여 진행합니다. 기획이 온전히 기술로 실현되도록 조율합니다.',
      accent: '#dfb73c', // Gold/Amber
      avatarText: 'YS',
      github: 'https://github.com/dev-yunseong',
    }
  ];

  return (
    <div style={styles.page}>
      {/* Introduction Header */}
      <section style={styles.introSection}>
        <div className="container" style={styles.introContainer}>
          <h1 style={styles.title} className="text-glow">THE SUMMONERS</h1>
          <p style={styles.subtitle}>
            The Evil Ent는 2명의 개발자로 구성된 인디 게임 팀입니다. 클라이언트(Unity), 서버(Backend), 시스템 인프라(Infra)를 직접 설계하고 아우르며 완성도 높은 게임을 빌드하고 있습니다.
          </p>
        </div>
      </section>

      {/* Member Cards Grid */}
      <section style={styles.teamSection}>
        <div className="container">
          <div className="grid-2" style={styles.teamGrid}>
            {members.map((member) => (
              <div 
                key={member.name} 
                className="gothic-card" 
                style={{
                  ...styles.memberCard,
                  borderColor: `rgba(45, 35, 30, 0.6)`,
                }}
              >
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
                  <div>
                    <h2 style={styles.memberName}>{member.name}</h2>
                    <h4 style={{ ...styles.memberRole, color: member.accent }}>
                      {member.role}
                    </h4>
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
                    title="GitHub Profile"
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
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                  <a 
                    href="mailto:contact@theevilent.com" 
                    style={styles.socialLink}
                    title="Send Email"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Philosophy / Contact Section */}
      <section style={styles.sectionDark}>
        <div className="container">
          <div style={styles.contactGrid}>
            {/* Left: Philosophy */}
            <div style={styles.philosophyCol}>
              <h2 style={styles.sectionTitle}>
                OUR <span className="accent-color">PHILOSOPHY</span>
              </h2>
              <ul style={styles.philoList}>
                <li style={styles.philoItem}>
                  <div style={styles.philoIconWrapper}>
                    <Sparkles size={18} color="var(--color-primary)" />
                  </div>
                  <div>
                    <strong style={styles.philoTitle}>재미있는 게임을 만들자</strong>
                    <p style={styles.philoDesc}>
                      장르적 클리셰에 얽매이지 않고, 플레이어에게 실질적인 흥미와 도전을 유발하는 가장 원초적인 즐거움을 연구합니다.
                    </p>
                  </div>
                </li>
                <li style={styles.philoItem}>
                  <div style={styles.philoIconWrapper}>
                    <Compass size={18} color="var(--color-primary)" />
                  </div>
                  <div>
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
              <div className="gothic-card" style={styles.formCard}>
                <h3 style={styles.formTitle}>SEND A SUMMON</h3>
                <p style={styles.formSubtitle}>건의 사항, 버그 리포트, 협업 제안 등 편하게 메시지를 전송해 주세요.</p>

                {submitted ? (
                  <div style={styles.successBox}>
                    <CheckCircle size={32} color="#4cd137" style={{ marginBottom: '0.75rem' }} />
                    <h4 style={styles.successTitle}>SUMMON SENT SUCCESSFULLY</h4>
                    <p style={styles.successDesc}>메시지가 어두운 가지 사이로 전송되었습니다. 검토 후 신속히 연락해 드리겠습니다.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        style={styles.input}
                        placeholder="이름 또는 닉네임"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        style={styles.input}
                        placeholder="이메일 주소"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Message</label>
                      <textarea 
                        rows={4} 
                        required 
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        style={styles.textarea}
                        placeholder="메시지 내용을 입력하세요..."
                      />
                    </div>
                    <button type="submit" className="btn-primary" style={styles.submitBtn}>
                      <Send size={16} />
                      메시지 전송
                    </button>
                  </form>
                )}
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
    padding: '6.5rem 0 3rem 0',
    textAlign: 'center',
  },
  introContainer: {
    maxWidth: '750px',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '1rem',
    letterSpacing: '0.15em',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.7',
    fontWeight: '300',
  },
  teamSection: {
    padding: '3rem 0 6rem 0',
  },
  teamGrid: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  memberCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '2.5rem',
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '8px',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0908',
  },
  avatarText: {
    fontFamily: 'var(--font-display)',
    fontWeight: '900',
    fontSize: '1.5rem',
    letterSpacing: '0.05em',
  },
  memberName: {
    fontSize: '1.6rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
  },
  memberRole: {
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    marginTop: '0.2rem',
  },
  memberBio: {
    color: 'var(--color-text-muted)',
    fontSize: '1rem',
    lineHeight: '1.7',
    flexGrow: 1,
  },
  socialRow: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  socialLink: {
    color: 'var(--color-text-muted)',
    transition: 'color 0.2s ease, transform 0.2s ease',
    display: 'inline-flex',
  },
  sectionDark: {
    padding: '6rem 0 8rem 0',
    backgroundColor: 'rgba(9, 8, 7, 0.4)',
    borderTop: '1px solid #1a1512',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '2rem',
    letterSpacing: '0.1em',
    borderLeft: '4px solid var(--color-primary)',
    paddingLeft: '1rem',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '4rem',
    alignItems: 'start',
  },
  philosophyCol: {
    display: 'flex',
    flexDirection: 'column',
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
  },
  philoIconWrapper: {
    backgroundColor: 'rgba(230, 30, 42, 0.1)',
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '1px solid #3d2222',
  },
  philoTitle: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--color-text-light)',
    marginBottom: '0.35rem',
  },
  philoDesc: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.65',
  },
  formCol: {
    display: 'flex',
    justifyContent: 'center',
  },
  formCard: {
    width: '100%',
    maxWidth: '480px',
    padding: '2.5rem',
  },
  formTitle: {
    fontSize: '1.3rem',
    letterSpacing: '0.1em',
    marginBottom: '0.5rem',
  },
  formSubtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '0.9rem',
    marginBottom: '2rem',
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
  label: {
    fontSize: '0.8rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#0a0908',
    border: '1px solid #322822',
    color: 'var(--color-text-light)',
    padding: '0.8rem 1rem',
    borderRadius: '4px',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
  },
  textarea: {
    backgroundColor: '#0a0908',
    border: '1px solid #322822',
    color: 'var(--color-text-light)',
    padding: '0.8rem 1rem',
    borderRadius: '4px',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    resize: 'none',
  },
  submitBtn: {
    marginTop: '0.5rem',
    width: '100%',
    justifyContent: 'center',
  },
  successBox: {
    textAlign: 'center',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: '1.1rem',
    letterSpacing: '0.08em',
    color: '#4cd137',
    marginBottom: '0.5rem',
  },
  successDesc: {
    color: 'var(--color-text-muted)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  },
};

// Inject custom form focusing styles and social media hover states
if (typeof document !== 'undefined') {
  const teamStyle = document.createElement('style');
  teamStyle.innerHTML = `
    @media (min-width: 1024px) {
      .Team_contactGrid {
        grid-template-columns: 1.1fr 1fr !important;
      }
    }

    .Team_input:focus, .Team_textarea:focus {
      border-color: var(--color-primary) !important;
      box-shadow: 0 0 8px var(--color-primary-glow) !important;
    }

    .Team_socialLink:hover {
      color: var(--color-text-light) !important;
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(teamStyle);
}

export default Team;
