import { listeningPosts } from './listening';
import { libraryPosts } from './library';
import { desktopPosts } from './desktop';
import type { ArticleDatesAndLinks, GuidePost } from './types';

type Feature = ArticleDatesAndLinks & {
  slug: string;
  title: string;
  searchTitle?: string;
  description: string;
  category: string;
  art: string;
  alt: string;
  body: string;
};

const historyGallery = `<figure class="article-figure" data-history-gallery>
  <a href="/assets/history-guide/listening-history.webp" aria-label="Open full-size screenshot">
    <img src="/assets/history-guide/listening-history.webp" alt="Yesterday’s listening history in Moosik, including Late checkout by Studio Four." width="1560" height="1022" loading="lazy">
  </a>
  <div class="guide-picks" hidden>
    <button type="button" aria-pressed="true" data-image="listening-history.webp" data-caption="Recently played, with sample tracks from yesterday.">History</button>
    <button type="button" aria-pressed="false" data-image="filtered-history.webp" data-caption="Searching for Studio Four with Last 7 days selected brings up Late checkout.">Search</button>
    <button type="button" aria-pressed="false" data-image="queued-track.webp" data-caption="Late checkout is next while Out on the coast keeps playing.">Queue</button>
  </div>
  <figcaption aria-live="polite">Recently played, with sample tracks from yesterday.</figcaption>
</figure>`;

const features: Feature[] = [
  {
    slug: "youtube-music-discord",
    publishedAt: "2026-11-06T06:40:29Z",
    updatedAt: "2026-11-06T07:06:57Z",
    related: ["youtube-music-windows-installer-or-portable", "compare-youtube-music-desktop-clients"],
    title: "Listen to YouTube Music together on Discord",
    description: "Share what’s playing on your Discord profile, then let a friend follow your song changes, pauses, and skips.",
    category: "Integrations",
    art: "/assets/player.jpg",
    alt: "A Moosik player beside its matching Discord listening activity.",
    body: `<p>You’re halfway through a song when a friend asks what you’re listening to. With Moosik 0.1.26, they can open that track from your Discord profile or join you right where you are. Each of you listens through your own player and sets your own volume.</p>
      <h2>Show what’s playing</h2>
      <p>Open the Discord desktop app and Moosik on the same computer. In Moosik, go to <strong>Settings → System → Integrations</strong> and turn on <strong>Discord Rich Presence</strong>. Play a YouTube Music track, then open your Discord profile. Your activity shows the title, artist, playback progress, and cover art when available.</p>
      <h2>Invite a friend to listen along</h2>
      <ol><li>Both listeners install <a href="/download/">Moosik 0.1.26 or later</a> and use their own YouTube Premium or YouTube Music Premium account. On Windows, use the setup installer so Discord invites can open Moosik. The portable ZIP alone does not register those links on a fresh PC.</li>
      <li>As host, enable <strong>Host Listen along</strong> in the same Integrations settings, then play a track.</li>
      <li>Your friend opens your Discord profile, chooses <strong>Listen along</strong>, and opens the invite in Moosik. Their stream follows your pauses, skips, and seeks.</li></ol>
      <p>If they just want the song, <strong>Play song</strong> opens it in their player for independent listening. To stop following, choose <strong>Leave</strong> in Moosik’s Integrations settings. If Moosik saved a queue before joining, it restores that queue when you leave.</p>
      <a class="demo-link" href="/#discord"><img src="/assets/discord/paused.png" alt="" width="44" height="44"><span>Try the Discord listening demo</span><span aria-hidden="true">↗</span></a>
      <h2>Which tracks and invites work?</h2><p>Play a streamed YouTube Music track while hosting. A local MP3 on your computer isn’t sent to your friend. Anyone you forward a live invite to can read the current track and playback position. Ending hosting closes the room. <a href="https://github.com/AtotheY/moosik/blob/moosik-v0.1.26/listen-relay/README.md">How Moosik handles a room</a>.</p>
      <h2>If your profile looks empty</h2><p>Check that Discord desktop is running and play a song. Moosik clears its activity after a pause of about 30 seconds. In Discord, open <strong>User Settings → Activity Privacy</strong> and allow activity sharing. If friends in only one server can’t see your activity, check that server’s privacy setting too. <a href="https://support.discord.com/hc/en-us/articles/7931156448919-Activity-Sharing-on-Discord-FAQ">Discord’s activity sharing guide</a> covers both settings.</p>`,
  },
  {
    slug: "listening-history",
    publishedAt: "2026-11-06T06:40:29Z",
    updatedAt: "2026-11-06T07:17:45Z",
    related: ["what-counts-as-a-play", "save-youtube-music-radio-queue"],
    title: "Find the song you played yesterday",
    searchTitle: "Search your YouTube Music listening history in Moosik",
    description: "Search your YouTube Music listening history in Moosik, bring a forgotten track back to the queue, and save the mix.",
    category: "Listening guides",
    art: "/assets/history-guide/listening-history.webp",
    alt: "Recently played songs in the Moosik listening history.",
    body: `<p>Say you remember the artist but never caught the title. Moosik keeps a time-stamped history of the songs you play on your computer. You can search by artist or song, or scroll straight to yesterday’s listens.</p>
      <h2>Find yesterday’s track</h2><p>Open <strong>Listening history → Recently played</strong> in the sidebar. Choose <strong>Last 7 days</strong> and look for <strong>Yesterday</strong>. The most recent listens appear first.</p>
      <p>In the example below, typing <strong>Studio Four</strong> into <strong>Find a song or artist you heard</strong> brings back “Late checkout.” Select Search to see the result, then Queue to see where it goes.</p>` + historyGallery + `
      <h2>Play it next, or keep it for later</h2><p>Right-click the song and choose <strong>Play next</strong>. It moves to the top of the upcoming tracks while your current song keeps playing. Choose <strong>Add to queue</strong> to put it at the end instead.</p>
      <h2>Save the whole mix</h2><p>Open <strong>Queue</strong>. Hold <strong>⌘</strong> on Mac or <strong>Ctrl</strong> on Windows and click the tracks you want to move. Drag them together, then choose <strong>Save as private playlist</strong>. Moosik keeps the current song and upcoming sequence in a playlist on this computer.</p>
      <h2>What if the history is empty?</h2><p>For the songs you heard before installing Moosik, open <strong>YouTube history</strong> while signed in. It uses your YouTube account history. If you paused watch history, Google says activity from that interval won’t appear there. Check <a href="https://support.google.com/youtubemusic/answer/6364666?hl=en">YouTube Music’s history settings</a> for that account.</p><p><strong>Recently played</strong> is separate. Play a song in Moosik first: it records listening on this installation on your Apple Silicon Mac or Windows x64 PC. You can also <a href="https://github.com/AtotheY/moosik/blob/main/docs/listening-stats.md">export your local listening records</a>.</p>`,
  },
];

const header = `<header class="site-header"><a class="wordmark" href="/" aria-label="Moosik home"><img src="/assets/icons/ceramic.png" width="38" height="38" alt="">moosik</a><nav aria-label="Main navigation"><a href="/blog/" aria-current="location">Blog</a><a href="/download/">Download ↗</a></nav></header>`;
const displayDate = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Toronto', month: 'short', day: 'numeric', year: 'numeric' });
const date = (iso: string) => `<time datetime="${iso}">${displayDate.format(new Date(iso))}</time>`;
const categories = [
  { title: 'Queue & library', id: 'queue-library', posts: libraryPosts },
  { title: 'Listening stats', id: 'listening-stats', posts: listeningPosts },
  { title: 'Desktop player', id: 'desktop-player', posts: desktopPosts },
];
export const allPosts: Array<Feature | GuidePost> = [...features, ...categories.flatMap(group => group.posts)];
export const blogSlugs = allPosts.map(p => p.slug);
const url = (p: Feature | GuidePost) => '/blog/' + p.slug + '/';
const esc = (s: string) => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const art = (p: Feature | GuidePost) => 'art' in p ? p.art : undefined;
const card = (p: Feature) => `<a class="story-card" href="${url(p)}"><img class="cover" src="${p.art}" alt="${esc(p.alt)}" width="1280" height="854"><div class="story-meta">${esc(p.category)}<span>·</span>${date(p.publishedAt)}</div><h2>${esc(p.title)}</h2><p>${esc(p.description)}</p></a>`;

function guideLibrary() {
  const groups = categories.map(g => `<section class="guide-group" id="${g.id}"><h3>${esc(g.title)}</h3><ul>${g.posts.map(p => `<li data-guide-row><a href="${url(p)}"><strong>${esc(p.title)}</strong><p>${esc(p.description)}</p></a></li>`).join('')}</ul></section>`).join('');
  return `<section id="guides" class="guide-library"><div class="library-header"><h2>All guides</h2><div hidden data-search-controls><label class="sr-only" for="guide-search">Search guides</label><input id="guide-search" type="search" placeholder="Search guides" autocomplete="off"></div></div>
  <div class="guide-groups">${groups}</div><p class="empty-results" data-empty-results hidden>No matching guides. <button type="button" data-reset-search>Clear search</button></p><span class="sr-only" aria-live="polite" data-result-count></span></section>`;
}

function relatedLinks(post: Feature | GuidePost) {
  const others = post.related.map(slug => {
    const found = allPosts.find(item => item.slug === slug);
    if (!found || found === post) throw new Error('Invalid related article for ' + post.slug + ': ' + slug);
    return found;
  });
  return `<aside class="related reading"><small>Read next</small>${others.map(other=>`<a href="${url(other)}">${art(other)?`<img src="${art(other)}" alt="" width="140" height="100" loading="lazy">`:''}<strong>${esc(other.title)}</strong><i aria-hidden="true">↗</i></a>`).join('')}</aside>`;
}

export function renderBlogPage(slug?: string) {
  const post = allPosts.find(item => item.slug === slug);
  const title = post ? post.searchTitle ?? (post.title + ' | Moosik Blog') : 'Blog | Moosik';
  const description = post?.description ?? 'Listening guides, desktop tips, and product news from Moosik, the YouTube Music desktop player.';
  const path = post ? url(post) : '/blog/';
  const group = categories.find(g => g.title === post?.category);
  const image = post ? art(post) : features[0].art;
  const category = post ? (group ? `<a href="/blog/#${group.id}">${esc(group.title)}</a>` : esc(post.category)) : '';
  const body = post ? `<article class="article ${image ? '' : 'text-article'}">
    <header class="article-heading reading"><a class="backlink" href="/blog/">← Blog</a>
    <h1>${esc(post.title)}</h1><p class="dek">${esc(post.description)}</p>
    <div class="byline"><img src="/assets/icons/ceramic.png" alt="" width="23" height="23"><a href="/about/#project">Moosik</a><span>·</span>${date(post.publishedAt)}<span>·</span>${category}</div></header>
    ${'art' in post ? `<img class="article-cover" src="${post.art}" alt="${esc(post.alt)}" width="1280" height="854" fetchpriority="high">` : ''}
    <div class="prose reading">${post.body}</div>${relatedLinks(post)}</article>`
    : `<section class="blog-index"><h1>Blog</h1><div class="story-grid">${features.map(card).join('')}</div>${guideLibrary()}</section>`;
  const origin = 'https://moosik.dev';
  const schema = post ? {
    '@context':'https://schema.org','@type':'BlogPosting',headline:post.title,
    description:post.description,url:origin+path,mainEntityOfPage:origin+path,datePublished:post.publishedAt,dateModified:post.updatedAt ?? post.publishedAt,
    ...(image ? {image:origin+image}:{}),articleSection:post.category,
    author:{'@type':'Organization',name:'Moosik',url:origin+'/about/#project'},
  } : undefined;
  return {title, description, path, image:image??'/assets/moosik-hero.webp', schema, type:post?'article':'website', body:header+'<main id="content">'+body+'</main>'+ `<footer><a href="/" class="blog-foot-brand">moosik</a><div><a href="/blog/">Blog</a><a href="/about/">About</a><a href="/blog/feed.xml">Subscribe to feed</a><a href="/download/">Download</a><a href="https://github.com/AtotheY/moosik">GitHub ↗</a></div></footer>`};
}
