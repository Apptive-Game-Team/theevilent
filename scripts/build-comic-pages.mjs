import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const template = await readFile('dist/index.html', 'utf8');
const pages = JSON.parse(await readFile('src/content/comic-pages.json', 'utf8'));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const origin = 'https://theevilent.com';
const directory = 'dist/arcane-casters/comic/1';
await mkdir(directory, { recursive: true });
for (const locale of ['ko', 'en']) {
  const title = locale === 'ko' ? '1화 · 첫 현장 연구' : 'Episode 1 · First Fieldwork';
  const description = locale === 'ko'
    ? '마법 타워의 평범한 아침. 핀과 미라는 첫 현장 연구를 떠난다.'
    : 'An ordinary morning at the magic tower. Finn and Mira set out on their first field assignment.';
  const url = `${origin}/arcane-casters/comic/1/${locale}`;
  const fullTitle = `${title} | Arcane Casters | The Evil Ent`;
  const metadata = `
    <meta name="description" content="${escape(description)}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="ko" href="${origin}/arcane-casters/comic/1/ko" />
    <link rel="alternate" hreflang="en" href="${origin}/arcane-casters/comic/1/en" />
    <link rel="alternate" hreflang="x-default" href="${origin}/arcane-casters/comic/1/ko" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="The Evil Ent" />
    <meta property="og:title" content="${escape(fullTitle)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:locale" content="${locale === 'ko' ? 'ko_KR' : 'en_US'}" />
    <meta property="og:image" content="${origin}/arcane-casters/comic/001/cover.webp" />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="538" />
    <meta property="og:image:alt" content="${locale === 'ko' ? '세계수와 초원의 아침 풍경' : 'Morning over the World Tree and the grasslands'}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(fullTitle)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${origin}/arcane-casters/comic/001/cover.webp" />
  `;
  const fallback = `<noscript><main lang="${locale}"><h1>${escape(fullTitle)}</h1><p>${escape(description)}</p><p><a href="/arcane-casters/comic/1/ko">한국어</a> · <a href="/arcane-casters/comic/1/en">English</a></p>${pages.map(page => `<figure><img src="/arcane-casters/comic/001/${locale}/page-${String(page.number).padStart(2,'0')}.webp" width="1024" height="1536" style="max-width:100%;height:auto" loading="lazy" alt="${escape(page[locale].title)}" /><figcaption>${page.number} / 20${page[locale].dialogue.map(line => `<p>${escape(line)}</p>`).join('')}</figcaption></figure>`).join('')}</main></noscript>`;
  const html = template.replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(fullTitle)}</title>`)
    .replace('</head>', `${metadata}</head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>${fallback}`);
  await writeFile(path.join(directory, `${locale}.html`), html);
}
console.log('Generated Korean and English comic entries with static social metadata.');
