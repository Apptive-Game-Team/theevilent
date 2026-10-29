import React from 'react';
import { getMagicName, magicConcepts } from '../content/magicConcepts';
import { platformLinks } from '../content/siteContent';
import type { TabId } from '../content/siteContent';
import { StoryBand } from '../components/StoryBand';
import { useCopy, useLanguage, type Language } from '../i18n/language';
import { getTabPath } from '../routing';
import './Home.css';

interface HomeProps {
  navigateToTab: (tab: TabId) => void;
}

// A capture of the current public build (practice mode, Korean UI, hand open).
const GAMEPLAY_SHOT = '/gameplay/battle.webp';

interface HowToStep {
  key: string;
  sprite: string;
  title: Record<'ko' | 'en', string>;
  body: Record<'ko' | 'en', string>;
}

const howToSteps: HowToStep[] = [
  {
    key: 'deck',
    sprite: '/game-assets/dragon-tower.webp',
    title: { ko: '덱 꾸리기', en: 'Build a Deck' },
    body: {
      ko: '소환수, 탑, 폭격 마법을 골라 나만의 덱을 만들어요.',
      en: 'Pick summons, towers and bombardments for your own deck.',
    },
  },
  {
    key: 'mana',
    sprite: '/game-assets/aqua-archer.webp',
    title: { ko: '마나 모으기', en: 'Gather Mana' },
    body: {
      ko: '마나가 차면 카드를 전장에 끌어다 놓아 시전해요.',
      en: 'When your mana fills up, drag a card onto the field to cast it.',
    },
  },
  {
    key: 'element',
    sprite: '/game-assets/storm-stag.webp',
    title: { ko: '원소 상성', en: 'Elements' },
    body: {
      ko: '상대 원소에 강한 마법으로 받아쳐요.',
      en: 'Counter with an element that beats your rival’s.',
    },
  },
];

interface MagicTileEntry {
  bean: string;
  sprite: string;
}

// The first seven show on desktop; zap_mouse is the eighth cell that fills
// out the mobile 4-column grid (see Mobile.dc.html).
const magicTileBeans: MagicTileEntry[] = [
  { bean: 'aqua_archer', sprite: '/game-assets/aqua-archer.webp' },
  { bean: 'dragon_tower', sprite: '/game-assets/dragon-tower.webp' },
  { bean: 'storm_stag', sprite: '/game-assets/storm-stag.webp' },
  { bean: 'magma_spirit', sprite: '/game-assets/magma-spirit.webp' },
  { bean: 'sea_serpent', sprite: '/game-assets/sea-serpent.webp' },
  { bean: 'electric_tower', sprite: '/game-assets/electric-tower.webp' },
  { bean: 'cloud_dragon', sprite: '/game-assets/cloud-dragon.webp' },
  { bean: 'zap_mouse', sprite: '/game-assets/zap-mouse.webp' },
];

const magicByBean = new Map(magicConcepts.map((magic) => [magic.bean, magic]));

const magicAlt = (bean: string, language: Language) => {
  const magic = magicByBean.get(bean);
  return magic ? getMagicName(magic, language) : bean;
};

const copy = {
  ko: {
    play: '지금 플레이!',
    googlePlay: 'Google Play',
    itchIo: 'itch.io',
    howTo: '플레이 방법',
    gameplayAlt: '실제 대전 화면',
    magicBook: '마법 도감',
  },
  en: {
    play: 'Play Now!',
    googlePlay: 'Google Play',
    itchIo: 'itch.io',
    howTo: 'How to Play',
    gameplayAlt: 'In-game battle screen',
    magicBook: 'Magic Book',
  },
};

export const Home: React.FC<HomeProps> = ({ navigateToTab }) => {
  const t = useCopy(copy);
  const { language } = useLanguage();
  const [googlePlay, itchIo] = platformLinks;

  const openMagic = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateToTab('magic');
  };

  return (
    <div className="home-page">
      {/* Hero: characters on the grass, the logo and store buttons beside them. */}
      <section className="grass home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-chars">
            <div className="home-hero-shadow" aria-hidden="true" />
            <img className="home-hero-caster" src="/brand/caster.webp" alt="" />
            <img className="home-hero-archer" src="/brand/aqua-archer.webp" alt="" />
            <img className="home-hero-golem" src="/brand/tree-golem.webp" alt="" />
          </div>

          <h1 className="home-hero-logo">
            <img src="/brand/logo-stacked.webp" alt="Arcane Casters" width={800} height={402} />
          </h1>

          <div className="home-hero-buttons">
            <a
              href={itchIo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flat-btn flat-btn-primary flat-btn-lg home-hero-play"
            >
              {t.play}
            </a>
            <div className="home-hero-stores">
              <a href={googlePlay.href} target="_blank" rel="noopener noreferrer" className="flat-btn">
                {t.googlePlay}
              </a>
              <a href={itchIo.href} target="_blank" rel="noopener noreferrer" className="flat-btn">
                {t.itchIo}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How to play: three steps, a tile and a line each. */}
      <section className="home-howto">
        <div className="container">
          <h2 className="visually-hidden">{t.howTo}</h2>
          <div className="home-howto-grid">
            {howToSteps.map((step, index) => (
              <div className="home-howto-item" key={step.key}>
                <div className="tile home-howto-tile">
                  <img src={step.sprite} alt="" className="home-howto-sprite" />
                  <span className="text-outline home-howto-badge">{index + 1}</span>
                </div>
                <div className="home-howto-copy">
                  <h3 className="text-outline home-howto-title">{step.title[language]}</h3>
                  <p className="home-howto-body">{step.body[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StoryBand />

      {/* Gameplay: one screen capture, then the magic wall. */}
      <section className="home-gameplay">
        <div className="container home-gameplay-inner">
          <div className="home-gameplay-frame">
            <img src={GAMEPLAY_SHOT} alt={t.gameplayAlt} className="home-gameplay-shot" />
          </div>

          <div className="home-magic-row">
            <div className="home-magic-grid">
              {magicTileBeans.map(({ bean, sprite }) => (
                <a
                  className="tile home-magic-tile"
                  href={getTabPath('magic', bean)}
                  key={bean}
                >
                  <img src={sprite} alt={magicAlt(bean, language)} className="home-magic-sprite" />
                </a>
              ))}
            </div>
            <a
              href={getTabPath('magic')}
              onClick={openMagic}
              className="flat-btn flat-btn-primary home-magic-cta"
            >
              {t.magicBook}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
