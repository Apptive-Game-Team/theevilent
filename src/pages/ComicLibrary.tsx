import { useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { comicEpisodes, comicListPath, comicPath, type ComicLocale } from '../content/comic';
import { useComicHistory } from '../content/comicReading';
import { useLanguage } from '../i18n/language';
import './ComicLibrary.css';

export default function ComicLibrary({ locale }: { locale: ComicLocale }) {
  const { setLanguage } = useLanguage();
  const history = useComicHistory();
  const copy = locale === 'ko'
    ? { title: '만화', list: '회차 목록', language: '읽기 언어', resume: '이어서 읽기', read: '읽음', reading: '읽는 중', unread: '읽기 전' }
    : { title: 'Comic', list: 'Episode list', language: 'Reading language', resume: 'Continue reading', read: 'Read', reading: 'In progress', unread: 'Unread' };
  const ongoing = comicEpisodes.filter(item => history[item.id] && !history[item.id].completed)
    .sort((a, b) => history[b.id].updatedAt - history[a.id].updatedAt)[0];

  useEffect(() => {
    setLanguage(locale);
    const title = document.title;
    const language = document.documentElement.lang;
    document.title = `${locale === 'ko' ? '만화' : 'Comic'} | Arcane Casters | The Evil Ent`;
    document.documentElement.lang = locale;
    return () => { document.title = title; document.documentElement.lang = language; };
  }, [locale, setLanguage]);

  return (
    <section className="container comic-library" lang={locale}>
      <header className="comic-library-header">
        <h1 className="text-title">{copy.title}</h1>
        <nav className="comic-languages" aria-label={copy.language}>
          {(['ko', 'en'] as const).map(language => (
            <a key={language} className={`flat-btn${language === locale ? ' flat-btn-primary' : ''}`}
              href={comicListPath(language)} hrefLang={language} lang={language}
              aria-current={language === locale ? 'page' : undefined}>
              {language === 'ko' ? '한국어' : 'English'}
            </a>
          ))}
        </nav>
      </header>
      {ongoing && (
        <a className="flat-btn flat-btn-primary comic-library-resume"
          href={`${comicPath(locale, ongoing.id)}#comic-page-${history[ongoing.id].page}`}>
          <span>{copy.resume}<small>{ongoing[locale].title}</small></span>
          <ArrowRight size={22} aria-hidden="true" />
        </a>
      )}
      <ol className="comic-episode-list" aria-label={copy.list}>
        {comicEpisodes.map(episode => (
          <li key={episode.id}>
            <a className="flat-card comic-episode-row" href={comicPath(locale, episode.id)}>
              <img src={`/arcane-casters/comic/${episode.directory}/cover.webp`}
                alt="" width="1024" height="538" loading="lazy" />
              <span className="comic-episode-copy">
                <strong>{episode[locale].title}</strong>
                <span className="comic-episode-description">{episode[locale].description}</span>
                <span className="comic-reading-state">{history[episode.id]?.completed ? copy.read
                  : history[episode.id] ? copy.reading : copy.unread}</span>
              </span>
              <ChevronRight size={22} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
