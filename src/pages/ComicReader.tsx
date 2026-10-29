import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Copy, Share2 } from 'lucide-react';
import { comicCopy, comicEpisodes, getComicEpisode, comicListPath, comicPath, comicUrl, getShareLinks, type ComicLocale } from '../content/comic';
import { useComicReading } from '../content/comicReading';
import './ComicReader.css';
import { useLanguage } from '../i18n/language';

export default function ComicReader({ locale, episode }: { locale: ComicLocale; episode: string }) {
  const { setLanguage } = useLanguage();
  const entry = getComicEpisode(episode);
  const copy = { ...comicCopy[locale], ...entry?.[locale] };
  const { pagesRef, endRef, resumePage } = useComicReading(episode, entry?.pages.length ?? 0);
  const index = comicEpisodes.findIndex(item => item.id === episode);
  const previous = comicEpisodes[index - 1];
  const next = comicEpisodes[index + 1];
  const listLabel = locale === 'ko' ? '회차 목록' : 'Episode list';
  const [status, setStatus] = useState('');
  const [manualCopy, setManualCopy] = useState(false);
  const url = comicUrl(locale, episode);
  useEffect(() => { setLanguage(locale); }, [locale, setLanguage]);

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    document.title = `${copy.title} | Arcane Casters | The Evil Ent`;
    document.documentElement.lang = locale;
    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLang;
    };
  }, [locale, copy.title]);

  const copyLink = async () => {
    setStatus('');
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      setStatus(copy.copied);
      setManualCopy(false);
    } catch {
      setManualCopy(true);
      setStatus(copy.manual);
    }
  };

  const share = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }
    try {
      await navigator.share({ title: `Arcane Casters — ${copy.title}`, text: copy.description, url });
      setStatus('');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setManualCopy(true);
      setStatus(copy.failure);
    }
  };

  if (!entry) return <section className="comic-missing"><h1>{copy.missing}</h1><a href={comicListPath(locale)}>{listLabel}</a></section>;

  return (
    <article className="comic-reader" lang={locale}>
      <header className="container comic-intro comic-reader-intro" id="comic-top">
        <div className="comic-intro-copy">
          <a className="comic-list-back" href={comicListPath(locale)}>← {listLabel}</a>
          <h1 className="text-title">{copy.title}</h1>
          <div className="comic-intro-actions">
            <a className="flat-btn flat-btn-primary comic-start" href={`#comic-page-${resumePage}`}>{resumePage > 1 ? (locale === 'ko' ? '이어서 읽기' : 'Continue reading') : copy.read}<ArrowDown size={18} aria-hidden="true" /></a>
          </div>
          <nav className="comic-languages" aria-label={copy.language}>
            {(['ko', 'en'] as const).map(language => (
              <a key={language} href={comicPath(language, episode)} hrefLang={language} lang={language}
                className={`flat-btn${locale === language ? ' flat-btn-primary' : ''}`}
                aria-current={locale === language ? 'page' : undefined}>
                {language === 'ko' ? '한국어' : 'English'}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="comic-pages" aria-label={copy.title} ref={pagesRef}>
        {entry.pages.map(page => (
          <figure className="comic-page" id={`comic-page-${page.number}`} data-page={page.number} key={page.number}>
            <img src={`/arcane-casters/comic/${entry.directory}/${locale}/page-${String(page.number).padStart(2, '0')}.webp`}
              alt={`${copy.page} ${page.number}. ${page[locale].title}`}
              width="1024" height="1536" loading="lazy" decoding="async" />
            <figcaption className="visually-hidden">
                <p>{page[locale].description}</p>
                {page[locale].dialogue.map((line, index) => <p key={index}>{line}</p>)}
            </figcaption>
          </figure>
        ))}
      </div>
      <div ref={endRef} className="comic-reading-end" aria-hidden="true" />
      <nav className="comic-episode-navigation" aria-label={locale === 'ko' ? '회차 이동' : 'Episode navigation'}>
        {previous && <a className="flat-btn" href={comicPath(locale, previous.id)}>← {locale === 'ko' ? '이전화' : 'Previous episode'}</a>}
        <a className="flat-btn" href={comicListPath(locale)}>{listLabel}</a>
        {next && <a className="flat-btn flat-btn-primary" href={comicPath(locale, next.id)}>{locale === 'ko' ? '다음화' : 'Next episode'} →</a>}
      </nav>

      <section className="comic-sharing" aria-labelledby="comic-share-heading">
        <h2 id="comic-share-heading" className="text-outline">{copy.share}</h2>
        <div className="comic-share-actions">
          {getShareLinks(locale, episode).map(link => (
            <a className="flat-btn" key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.name} · ${copy.share}`}>{link.name}<span className="comic-external" aria-hidden="true">↗</span></a>
          ))}
          <button className="flat-btn" type="button" onClick={share}><Share2 size={16} aria-hidden="true" />{copy.device}</button>
          <button className="flat-btn" type="button" onClick={copyLink}><Copy size={16} aria-hidden="true" />{copy.copy}</button>
        </div>
        <p role="status" className="comic-share-status">{status}</p>
        {manualCopy && <label className="comic-manual-link">{copy.link}<input readOnly value={url} onFocus={event => event.currentTarget.select()} /></label>}
        <div className="comic-end-links"><a href="#comic-top"><ArrowUp size={16} aria-hidden="true" />{copy.back}</a><a href="/arcane-casters">{copy.game} ↗</a></div>
      </section>
    </article>
  );
}
