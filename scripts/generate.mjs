import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { render } = await import(pathToFileURL(path.resolve('.ssr/entry-server.js')).href);
const sales = JSON.parse(await readFile('src/data/upcomingSales.json', 'utf8'));
const routes = [
  { path: '/', title: 'The Estate Sale Ladies | Estate & Moving Sales in Montréal’s West Island' },
  ...sales.map(sale => ({
    path: `/sales/${sale.slug}`,
    title: `${sale.title} | The Estate Sale Ladies`,
  })),
];
const template = await readFile('dist/index.html', 'utf8');
const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

for (const route of routes) {
  const rendered = render(route.path);
  const doc = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace('<!--app-html-->', rendered);
  const output = route.path === '/' ? path.join('dist', 'index.html') : path.join('dist', route.path.slice(1), 'index.html');
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, doc);
}

await rm('.ssr', { recursive: true, force: true });
