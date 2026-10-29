import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Copy, Share2 } from 'lucide-react';
import { comicCopy, comicPages, comicPath, comicUrl, getShareLinks, type ComicLocale } from '../content/comic';
import './ComicReader.css';
import { useLanguage } from '../i18n/language';

export default function ComicReader({ locale, episode }: { locale: ComicLocale; episode: string }) {
  const { setLanguage } = useLanguage();
  const copy = comicCopy[locale];
  const [status, setStatus] = useState('');
  const [manualCopy, setManualCopy] = useState(false);
  const url = comicUrl(locale);
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

  if (episode !== '1') return <section className="comic-missing"><h1>{copy.missing}</h1><a href={comicPath(locale)}>{copy.first}</a></section>;

  return (
    <article className="comic-reader" lang={locale}>
      <header className="container comic-intro" id="comic-top">
        <div className="comic-intro-copy">
          <h1 className="text-title">{copy.title}</h1>
          <p className="comic-description">{copy.description}</p>
          <div className="comic-intro-actions">
            <a className="flat-btn flat-btn-primary comic-start" href="#comic-page-1">{copy.read}<ArrowDown size={18} aria-hidden="true" /></a>
            <span>{copy.pages}</span>
          </div>
          <nav className="comic-languages" aria-label={copy.language}>
            {(['ko', 'en'] as const).map(language => (
              <a key={language} href={comicPath(language)} hrefLang={language} lang={language}
                className={`flat-btn${locale === language ? ' flat-btn-primary' : ''}`}
                aria-current={locale === language ? 'page' : undefined}>
                {language === 'ko' ? '한국어' : 'English'}
              </a>
            ))}
          </nav>
        </div>
        <img className="comic-cover" src="/arcane-casters/comic/001/cover.webp" width="1024" height="538" alt="" fetchPriority="high" />
      </header>

      <div className="comic-pages" aria-label={copy.title}>
        {comicPages.map(page => (
          <figure className="comic-page" id={`comic-page-${page.number}`} key={page.number}>
            <img src={`/arcane-casters/comic/001/${locale}/page-${String(page.number).padStart(2, '0')}.webp`}
              alt={`${copy.page} ${page.number}. ${page[locale].title}`}
              width="1024" height="1536" loading="lazy" decoding="async" />
            <figcaption>
              <span>{String(page.number).padStart(2, '0')} / 20</span>
              <div className="visually-hidden">
                <p>{page[locale].description}</p>
                {page[locale].dialogue.map((line, index) => <p key={index}>{line}</p>)}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <section className="comic-sharing" aria-labelledby="comic-share-heading">
        <h2 id="comic-share-heading" className="text-outline">{copy.share}</h2>
        <div className="comic-share-actions">
          {getShareLinks(locale).map(link => (
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
