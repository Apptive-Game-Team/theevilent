import React from 'react';
import { Newspaper } from 'lucide-react';
import { newsAnchorId, newsPageCopy, newsReleases } from '../content/newsContent';
import { useCopy, useLanguage } from '../i18n/language';
import './News.css';

export const News: React.FC = () => {
  const { language } = useLanguage();
  const page = useCopy(newsPageCopy);

  // A link such as /arcane-casters/news#v1-3-0 lands on that release. The page
  // is rendered after the router chose it, so the browser's own jump has
  // already missed the element and has to be repeated here.
  React.useEffect(() => {
    const id = window.location.hash.replace(/^#/, '');
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <div className="news-page">
      <div className="container-narrow news-hero">
        <div className="title-banner">
          <h1 className="text-title news-title">
            <Newspaper size={32} aria-hidden="true" />
            {page.title}
          </h1>
        </div>
        <p className="news-intro">{page.intro}</p>
      </div>

      <div className="container-narrow news-list">
        {newsReleases.map((release) => {
          const copy = release[language];
          const id = newsAnchorId(release.version);
          return (
            <article key={release.version} id={id} className="flat-card news-entry">
              <header className="news-entry-head">
                <h2 className="news-entry-title">{copy.title}</h2>
                <time className="news-entry-date" dateTime={release.date}>
                  {release.date}
                </time>
              </header>
              <ul className="news-items">
                {copy.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default News;
