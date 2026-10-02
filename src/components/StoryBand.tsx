import React from 'react';
import { useLanguage } from '../i18n/language';
import { FramePair } from './FramePair';
import './StoryBand.css';

interface StoryTile {
  key: string;
  src: string;
  swap?: string;
  width: number;
  height: number;
  title: { ko: string; en: string };
  body: { ko: string; en: string };
  seconds?: number;
}

// 설정은 client/.art/WORLD.md 를 따른다. 정해지지 않은 것(워드가 죽은 이유, 군단의 목적,
// 플레이어의 이름)은 쓰지 않는다.
const tiles: StoryTile[] = [
  {
    key: 'tree',
    src: '/hires/WorldTree.webp',
    swap: '/hires/WorldTreeCharred.webp',
    width: 1100,
    height: 1044,
    seconds: 5,
    title: { ko: '세계수', en: 'World Tree' },
    body: {
      ko: '마법의 신 워드가 쓰러진 자리에 자랐어요.',
      en: 'It grew where Ward, the god of magic, fell.',
    },
  },
  {
    key: 'legion',
    src: '/hires/HellfireDemon.webp',
    swap: '/hires/HellfireDemonAttack.webp',
    width: 1100,
    height: 1010,
    title: { ko: '불타는 군단', en: 'The Burning Legion' },
    body: {
      ko: '지옥불 차원에서 넘어온 악마들이에요.',
      en: 'Demons that crossed over from the hellfire dimension.',
    },
  },
  {
    key: 'ent',
    src: '/hires/EvilEnt.webp',
    swap: '/hires/EvilEntAttack.webp',
    width: 968,
    height: 1100,
    title: { ko: '타락한 정령', en: 'Fallen Spirit' },
    body: {
      ko: '지옥불에 오래 닿은 세계수의 정령이에요.',
      en: 'A World Tree spirit left too long in hellfire.',
    },
  },
  {
    key: 'player',
    src: '/hires/Player.webp',
    swap: '/hires/PlayerAttack.webp',
    width: 946,
    height: 896,
    title: { ko: '수습 마법생', en: 'The Apprentice' },
    body: {
      ko: '마법사의 탑에서 내려와 워드의 카드를 따라가요.',
      en: 'Came down from the Mage’s Tower, following Ward’s cards.',
    },
  },
];

const copy = {
  ko: { heading: '이야기', keyArt: '세계수 곁에 모인 수습 마법생과 정령들' },
  en: { heading: 'Story', keyArt: 'The apprentice and the spirits gathered around the World Tree' },
};

export const StoryBand: React.FC = () => {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <section className="home-story">
      <div className="container home-story-inner">
        <h2 className="text-outline home-story-heading">{t.heading}</h2>
        <div className="home-story-keyart">
          <img alt={t.keyArt} decoding="async" height={1080} loading="lazy" src="/arcane-casters-key-art.webp" width={1920} />
        </div>
        <div className="home-story-grid">
          {tiles.map((tile) => (
            <div className="home-story-item" key={tile.key}>
              <div className="tile home-story-tile">
                <FramePair
                  src={tile.src}
                  swap={tile.swap}
                  alt={tile.title[language]}
                  width={tile.width}
                  height={tile.height}
                  variant="bare"
                  seconds={tile.seconds}
                />
              </div>
              <h3 className="text-outline home-story-title">{tile.title[language]}</h3>
              <p className="home-story-body">{tile.body[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
