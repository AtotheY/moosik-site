import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { blogSlugs, renderBlogPage } from './src/blog/pages';

import { atomFeed, sitemap } from './src/blog/discovery';
const xmlFiles = [
  { path:'sitemap.xml', type:'application/xml', body:sitemap },
  { path:'blog/feed.xml', type:'application/atom+xml', body:atomFeed },
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'moosik-blog-html',
      configureServer(server) {
        for (const file of xmlFiles) {
          server.middlewares.use('/' + file.path, (_request, response) => {
            response.setHeader('Content-Type', file.type + '; charset=utf-8');
            response.end(file.body);
          });
        }
      },
      generateBundle() {
        for (const file of xmlFiles) this.emitFile({type:'asset', fileName:file.path, source:file.body});
      },
      transformIndexHtml: {
        order: 'pre',
        handler(html, context) {
          if (!html.includes('<!--blog-page-->')) return html;
          const slug = context.filename.split('/blog/').pop()?.split('/')[0];
          const post = renderBlogPage(slug);
          const tags = [
            { tag: 'title', children: post.title },
            { tag: 'link', attrs: { rel: 'alternate', type: 'application/atom+xml', title: 'Moosik Blog', href: '/blog/feed.xml' } },
            ...(post.schema ? [{ tag:'script',attrs:{type:'application/ld+json'},children:JSON.stringify(post.schema).replaceAll('<', '\\u003c') }] : []),
            { tag: 'meta', attrs: { name: 'description', content: post.description } },
            { tag: 'link', attrs: { rel: 'canonical', href: 'https://moosik.dev' + post.path } },
            ...Object.entries({type: post.type, title: post.title, description: post.description, image: 'https://moosik.dev'+post.image, url: 'https://moosik.dev'+post.path}).map(([key,value]) => ({tag:'meta',attrs:{property:'og:'+key,content:value}})),
          ];
          return {html: html.replace('<!--blog-page-->', () => post.body), tags};
        },
      },
    },
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { rollupOptions: { input: {
    home: 'index.html', about: 'about/index.html', downloads: 'download/index.html', blog: 'blog/index.html',
    ...Object.fromEntries(blogSlugs.map(slug => ['post-' + slug, 'blog/' + slug + '/index.html'])),
    oldHistory: 'guides/listening-history/index.html', oldDiscord: 'guides/youtube-music-discord/index.html',
  }, output: { manualChunks: {three:['three']} } } },
});
