import pages from './comic-pages.json';

export type ComicLocale = 'ko' | 'en';
export const comicPath = (locale: ComicLocale) => `/arcane-casters/comic/1/${locale}`;
export const comicUrl = (locale: ComicLocale) => `https://theevilent.com${comicPath(locale)}`;
export const comicPages = pages;
export const comicCopy = {
  ko: {
    title: '1화 · 첫 현장 연구',
    description: '마법 타워의 평범한 아침. 핀과 미라는 첫 현장 연구를 떠난다.',
    series: '아케인 캐스터즈 연재 만화',
    read: '읽기 시작', language: '읽기 언어', pages: '20페이지', share: '이 이야기 공유하기',
    device: '다른 앱으로 공유', copy: '링크 복사', copied: '링크를 복사했습니다.',
    manual: '링크를 선택해서 복사해 주세요.', failure: '공유 창을 열지 못했습니다. 링크를 복사해 주세요.',
    link: '공유할 주소', page: '페이지',
    end: '1화를 읽어주셔서 감사합니다.', back: '맨 위로', game: '게임 살펴보기',
    missing: '아직 공개되지 않은 회차입니다.', first: '1화 읽기',
  },
  en: {
    title: 'Episode 1 · First Fieldwork',
    description: 'An ordinary morning at the magic tower. Finn and Mira set out on their first field assignment.',
    series: 'An Arcane Casters comic',
    read: 'Start reading', language: 'Reading language', pages: '20 pages', share: 'Share this story',
    device: 'Share to another app', copy: 'Copy link', copied: 'Link copied.',
    manual: 'Select the link and copy it.', failure: 'Could not open sharing. Please copy the link.',
    link: 'Link to share', page: 'Page',
    end: 'Thanks for reading episode 1.', back: 'Back to top', game: 'Explore the game',
    missing: 'This episode has not been published yet.', first: 'Read episode 1',
  },
} as const;

export const getShareLinks = (locale: ComicLocale) => {
  const url = comicUrl(locale);
  const title = `Arcane Casters — ${comicCopy[locale].title}`;
  return [
    { name: 'X', href: `https://x.com/intent/tweet?${new URLSearchParams({ text: title, url })}` },
    { name: 'Bluesky', href: `https://bsky.app/intent/compose?${new URLSearchParams({ text: `${title}\n${url}` })}` },
    { name: 'Telegram', href: `https://t.me/share/url?${new URLSearchParams({ url, text: title })}` },
    { name: 'LINE', href: `https://social-plugins.line.me/lineit/share?${new URLSearchParams({ url })}` },
  ];
};
