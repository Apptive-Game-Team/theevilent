import React from 'react';
import { ArrowLeft, Compass, Footprints, Hourglass, Shield } from 'lucide-react';
import { summonConcepts, type SummonConcept } from '../content/summonConcepts';

const SummonDetail: React.FC<{ summon: SummonConcept }> = ({ summon }) => (
  <article className="magic-detail-page">
    <div className="container">
      <a className="magic-back-link" href="#summons">
        <ArrowLeft size={17} aria-hidden="true" />
        소환수 도감으로
      </a>

      <header className="magic-detail-hero">
        <div>
          <p className="magic-kicker">{summon.faction} · SUMMONED CREATURE</p>
          <h1>{summon.name}</h1>
          <p className="magic-legacy-name">내부 이름 · {summon.internalName}</p>
        </div>
      </header>

      <section className="magic-artwork-gallery" aria-label={`${summon.name} 컨셉 아트`}>
        {summon.spawnArtwork && (
          <figure className="magic-game-asset">
            <img
              alt={summon.spawnArtwork.alt}
              decoding="async"
              height={summon.spawnArtwork.height}
              src={summon.spawnArtwork.src}
              width={summon.spawnArtwork.width}
            />
            <figcaption>{summon.spawnArtwork.caption}</figcaption>
          </figure>
        )}
        <figure className="magic-concept-art">
          <img
            alt={summon.artwork.alt}
            decoding="async"
            height={summon.artwork.height}
            src={summon.artwork.src}
            width={summon.artwork.width}
          />
          <figcaption>{summon.artwork.caption ?? `${summon.role} · ${summon.mobility}`}</figcaption>
        </figure>
        {summon.alternateArtwork && (
          <figure className="magic-game-asset">
            <img
              alt={summon.alternateArtwork.alt}
              decoding="async"
              height={summon.alternateArtwork.height}
              src={summon.alternateArtwork.src}
              width={summon.alternateArtwork.width}
            />
            <figcaption>{summon.alternateArtwork.caption}</figcaption>
          </figure>
        )}
      </section>

      <section className="magic-lore-panel">
        <p className="magic-section-label">CREATURE RECORD</p>
        <h2>소환수 설명</h2>
        <p>{summon.description}</p>
      </section>

      <section className="magic-profile-grid" aria-label="소환수 전투 프로필">
        {[
          ['기동 방식', summon.mobility, Footprints],
          ['전투 역할', summon.role, Shield],
          ['표적', summon.targeting, Compass],
          ['생명주기', summon.lifecycle, Hourglass],
        ].map(([label, value, Icon]) => {
          const ProfileIcon = Icon as typeof Shield;
          return (
            <article key={label as string}>
              <ProfileIcon size={18} aria-hidden="true" />
              <span>{label as string}</span>
              <strong>{value as string}</strong>
            </article>
          );
        })}
      </section>

      <section className="magic-lore-panel">
        <p className="magic-section-label">SOURCE MAGIC</p>
        <h2>연관 마법</h2>
        <a className="summon-relation-link" href={`#magic/${summon.sourceMagic.slug}`}>
          {summon.sourceMagic.name} 상세 보기
        </a>
      </section>

      <p className="magic-key" translate="no">SUMMON KEY · {summon.internalName}</p>
    </div>
  </article>
);

const SummonCompendium: React.FC<{ slug?: string }> = ({ slug }) => {
  if (slug) {
    const summon = summonConcepts.find((item) => item.slug === slug);
    if (summon) return <SummonDetail summon={summon} />;
  }

  return (
    <div className="magic-compendium-page">
      <header className="magic-compendium-hero">
        <div className="container magic-compendium-hero-grid">
          <div>
            <p className="magic-kicker">ARCANE CASTERS · CREATURE ARCHIVE</p>
            <h1>소환수<br /><span>컨셉 도감</span></h1>
          </div>
          <div className="magic-compendium-intro">
            <p>마법 카드가 전장에 불러내는 생물과 병기의 실제 행동·진영·생명주기 기록.</p>
            <dl>
              <div><dt>기록</dt><dd>{summonConcepts.length}</dd></div>
              <div><dt>진영</dt><dd>{new Set(summonConcepts.map((item) => item.faction)).size}</dd></div>
            </dl>
          </div>
        </div>
      </header>

      <main className="container magic-compendium-content">
        <section className="magic-card-grid" aria-label="소환수 목록">
          {summonConcepts.map((summon) => (
            <a className="magic-concept-card" href={`#summons/${summon.slug}`} key={summon.slug}>
              <div className="magic-card-tags">
                <span>{summon.faction}</span>
                <span>{summon.mobility}</span>
              </div>
              <h2>{summon.name}</h2>
              <p className="magic-card-legacy">{summon.internalName}</p>
              <p>{summon.description}</p>
              <strong>{summon.role} · {summon.targeting}</strong>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
};

export default SummonCompendium;
