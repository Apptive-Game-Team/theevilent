import React from 'react';
import { teamMembers } from '../content/siteContent';
import { useCopy } from '../i18n/language';
import './Team.css';

// The first card is the client's Battle orange, the second its mana blue —
// the same two-accent pairing the mockup (Team.dc.html) uses, independent of
// whatever `accent` sits on the teamMembers record.
const avatarAccents = ['var(--color-primary)', 'var(--color-mana)'];

const copy = {
  ko: { mail: '메일', github: 'GitHub', logoAlt: 'The Evil Ent 스튜디오 로고' },
  en: { mail: 'Email', github: 'GitHub', logoAlt: 'The Evil Ent studio logo' },
};

export const Team: React.FC = () => {
  const t = useCopy(copy);

  return (
    <section className="grass team-page">
      <div className="team-hero">
        <img
          src="/theevilent-logo.png"
          alt={t.logoAlt}
          className="team-logo"
          width={150}
          height={150}
        />
        <div className="title-banner">
          <h1 className="text-title">The Evil Ent</h1>
        </div>
      </div>

      <div className="team-members">
        {teamMembers.map((member, index) => (
          <article key={member.name} className="flat-card team-card">
            <div
              className="team-avatar"
              style={{ backgroundColor: avatarAccents[index % avatarAccents.length] }}
            >
              <span className="team-avatar-text text-outline">{member.avatarText}</span>
            </div>

            <h2 className="team-name" translate="no">{member.name}</h2>

            <div className="team-links">
              <a
                className="flat-btn"
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.github}
              </a>
              <a className="flat-btn" href={`mailto:${member.email}`}>
                {t.mail}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Team;
