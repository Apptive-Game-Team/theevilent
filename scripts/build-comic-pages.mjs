import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const template = await readFile('dist/index.html', 'utf8');
const episodes = JSON.parse(await readFile('src/content/comic-episodes.json', 'utf8'));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const origin = 'https://theevilent.com';
for (const episode of episodes) {
const pages = JSON.parse(await readFile(`src/content/${episode.pages}`, 'utf8'));
const directory = `dist/arcane-casters/comic/${episode.id}`;
await mkdir(directory, { recursive: true });
for (const locale of ['ko', 'en']) {
  const { title, description, coverAlt } = episode[locale];
  const route = `/arcane-casters/comic/${episode.id}`;
  const asset = `/arcane-casters/comic/${episode.directory}`;
  const url = `${origin}${route}/${locale}`;
  const fullTitle = `${title} | Arcane Casters | The Evil Ent`;
  const metadata = `
    <meta name="robots" content="noindex, noimageindex" />
    <meta name="description" content="${escape(description)}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="ko" href="${origin}${route}/ko" />
    <link rel="alternate" hreflang="en" href="${origin}${route}/en" />
    <link rel="alternate" hreflang="x-default" href="${origin}${route}/ko" />
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
  const fallback = `<noscript><main lang="${locale}"><h1>${escape(fullTitle)}</h1><p>${escape(description)}</p><p><a href="${route}/ko">한국어</a> · <a href="${route}/en">English</a></p><nav>${episodes.map(item => `<a href="/arcane-casters/comic/${item.id}/${locale}">${escape(item[locale].title)}</a>`).join(' · ')}</nav>${pages.map(page => `<figure><img src="${asset}/${locale}/page-${String(page.number).padStart(2,'0')}.webp" width="1024" height="1536" style="max-width:100%;height:auto" loading="lazy" alt="${escape(page[locale].title)}" /><figcaption>${page[locale].dialogue.map(line => `<p>${escape(line)}</p>`).join('')}</figcaption></figure>`).join('')}</main></noscript>`;
  const html = template.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, '')
    .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(fullTitle)}</title>`)
    .replace('</head>', `${metadata}</head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>${fallback}`);
  await writeFile(path.join(directory, `${locale}.html`), html);
}
}
console.log('Generated Korean and English comic entries with static social metadata.');
