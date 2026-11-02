import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const template = await readFile('dist/index.html', 'utf8');
const episodes = JSON.parse(await readFile('src/content/comic-episodes.json', 'utf8'));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const origin = 'https://theevilent.com';
const episodeIds = new Set();
for (const episode of episodes) {
  if (episodeIds.has(episode.id)) throw new Error(`Duplicate comic episode: ${episode.id}`);
  episodeIds.add(episode.id);
  if (!episode.locales?.length || episode.locales.some(locale => !['ko', 'en'].includes(locale))) {
    throw new Error(`Invalid published comic locales: ${episode.id}`);
  }
  const pages = JSON.parse(await readFile(`src/content/${episode.pages}`, 'utf8'));
  if (!pages.length || pages.some((page, index) => page.number !== index + 1)) {
    throw new Error(`Invalid comic page sequence: ${episode.id}`);
  }
  for (const locale of episode.locales) {
    if (!episode[locale]?.title || !episode[locale]?.description) throw new Error(`Missing episode copy: ${episode.id}/${locale}`);
    for (const page of pages) {
      if (!page[locale]?.title || !page[locale]?.description || !Array.isArray(page[locale]?.dialogue)) {
        throw new Error(`Missing comic page copy: ${episode.id}/${locale}/${page.number}`);
      }
      const asset = `public/arcane-casters/comic/${episode.directory}/${locale}/page-${String(page.number).padStart(2, '0')}.webp`;
      const bytes = await readFile(asset);
      if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') {
        throw new Error(`Invalid comic image: ${asset}`);
      }
    }
  }
  const cover = await readFile(`public/arcane-casters/comic/${episode.directory}/cover.webp`);
  if (cover.toString('ascii', 0, 4) !== 'RIFF' || cover.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error(`Invalid comic cover: ${episode.id}`);
  }
}
for (const episode of episodes) {
const pages = JSON.parse(await readFile(`src/content/${episode.pages}`, 'utf8'));
const directory = `dist/arcane-casters/comic/${episode.id}`;
await mkdir(directory, { recursive: true });
for (const locale of episode.locales) {
  const { title, description, coverAlt } = episode[locale];
  const route = `/arcane-casters/comic/${episode.id}`;
  const asset = `/arcane-casters/comic/${episode.directory}`;
  const url = `${origin}${route}/${locale}`;
  const fullTitle = `${title} | Arcane Casters | The Evil Ent`;
  const metadata = `
    <meta name="robots" content="noindex, noimageindex" />
    <meta name="description" content="${escape(description)}" />
    <link rel="canonical" href="${url}" />
    ${episode.locales.map(language => `<link rel="alternate" hreflang="${language}" href="${origin}${route}/${language}" />`).join('\n    ')}
    <link rel="alternate" hreflang="x-default" href="${origin}${route}/${episode.locales[0]}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="The Evil Ent" />
    <meta property="og:title" content="${escape(fullTitle)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:locale" content="${locale === 'ko' ? 'ko_KR' : 'en_US'}" />
    <meta property="og:image" content="${origin}${asset}/cover.webp" />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="538" />
    <meta property="og:image:alt" content="${escape(coverAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(fullTitle)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${origin}${asset}/cover.webp" />
  `;
  const languageLinks = episode.locales.map(language => `<a href="${route}/${language}">${language === 'ko' ? '한국어' : 'English'}</a>`).join(' · ');
  const fallback = `<noscript><main lang="${locale}"><h1>${escape(fullTitle)}</h1><p>${escape(description)}</p><p>${languageLinks}</p><nav>${episodes.filter(item => item.locales.includes(locale)).map(item => `<a href="/arcane-casters/comic/${item.id}/${locale}">${escape(item[locale].title)}</a>`).join(' · ')}</nav>${pages.map(page => `<figure><img src="${asset}/${locale}/page-${String(page.number).padStart(2,'0')}.webp" width="1024" height="1536" style="max-width:100%;height:auto" loading="lazy" alt="${escape(page[locale].title)}" /><figcaption>${page[locale].dialogue.map(line => `<p>${escape(line)}</p>`).join('')}</figcaption></figure>`).join('')}</main></noscript>`;
  const html = template.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, '')
    .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(fullTitle)}</title>`)
    .replace('</head>', `${metadata}</head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>${fallback}`);
  await writeFile(path.join(directory, `${locale}.html`), html);
}
}
const libraryDirectory = 'dist/arcane-casters/comic';
await mkdir(libraryDirectory, { recursive: true });
for (const locale of ['ko', 'en']) {
  const title = `${locale === 'ko' ? '만화' : 'Comic'} | Arcane Casters | The Evil Ent`;
  const url = `${origin}/arcane-casters/comic/${locale}`;
  const metadata = `
    <meta name="robots" content="noindex, noimageindex" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="ko" href="${origin}/arcane-casters/comic/ko" />
    <link rel="alternate" hreflang="en" href="${origin}/arcane-casters/comic/en" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}/arcane-casters/comic/001/cover.webp" />
    <meta name="twitter:card" content="summary_large_image" />
  `;
  const fallback = `<noscript><main lang="${locale}"><h1>${escape(title)}</h1><ol>${episodes.filter(episode => episode.locales.includes(locale)).map(episode =>
    `<li><a href="/arcane-casters/comic/${episode.id}/${locale}">${escape(episode[locale].title)}</a></li>`).join('')}</ol></main></noscript>`;
  const html = template.replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace('</head>', `${metadata}</head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>${fallback}`);
  await writeFile(path.join(libraryDirectory, `${locale}.html`), html);
}
console.log('Validated comic assets and generated library and episode metadata for published languages.');
