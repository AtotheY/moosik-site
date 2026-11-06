import { allPosts } from "./pages";

const origin = "https://moosik.dev";
const blog = origin + "/blog/";
const address = (slug: string) => blog + slug + "/";
const escapeXml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const ordered = [...allPosts].sort((a, b) =>
  (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt) || a.slug.localeCompare(b.slug)
);

const entries = ordered.map(post => `  <entry>
    <id>${address(post.slug)}</id><title>${escapeXml(post.title)}</title>
    <link href="${address(post.slug)}"/>
    <published>${post.publishedAt}</published><updated>${post.updatedAt ?? post.publishedAt}</updated>
    <category term="${escapeXml(post.category)}"/><summary>${escapeXml(post.description)}</summary>
  </entry>`).join("\n");

export const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
  <id>${blog}</id><title>Moosik Blog</title>
  <link rel="alternate" href="${blog}"/><link rel="self" href="${blog}feed.xml"/>
  <author><name>Moosik</name><uri>${origin}/</uri></author>
  <updated>${ordered[0].updatedAt ?? ordered[0].publishedAt}</updated>
${entries}
</feed>
`;

const articleUrls = allPosts.map(post =>
  `  <url><loc>${address(post.slug)}</loc><lastmod>${post.updatedAt ?? post.publishedAt}</lastmod></url>`
);
export const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...["/", "/about/", "/download/", "/blog/"].map(path => `  <url><loc>${origin}${path}</loc></url>`),
  ...articleUrls,
  '</urlset>\n',
].join("\n");
