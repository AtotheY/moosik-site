// Test the HTML that a non-JavaScript reader receives after the production build.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { REPO, selectDownloads } from "../src/lib/releases.mjs";

const dist = new URL("../dist/", import.meta.url);
const read = path => readFile(new URL(path,dist),"utf8");
const origin = "https://moosik.dev";
const sitemap = await read("sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
assert(urls.length > 3 && new Set(urls.map(u=>u.href)).size === urls.length, "Sitemap must contain unique public URLs.");
const index = await read("blog/index.html");
const home = await read("index.html");
const downloadPage = await read("download/index.html");
const cached = JSON.parse(await readFile(new URL("../src/lib/release-cache.json",import.meta.url),"utf8"));
const {mac,windows} = selectDownloads(cached);
for (const item of [mac,windows]) {
  assert(item && item.url.startsWith(REPO + "/releases/download/"), "Missing an official release asset.");
  for (const html of [home,downloadPage]) assert(html.includes('href="' + item.url + '"'), "Missing installer link in initial HTML: " + item.name);
}
let posts = 0;
for (const url of urls) {
  assert.equal(url.origin,origin);
  const html = await read(url.pathname.slice(1) + "index.html");
  assert(html.includes('rel="canonical" href="' + url.href + '"'), "Canonical mismatch: " + url);
  assert(/<h1[\s>]/.test(html), "Missing prerendered heading: " + url);
  if (url.pathname.startsWith("/blog/") && url.pathname !== "/blog/") {
    posts++;
    assert(index.includes('href="' + url.pathname + '"'), "Post is absent from the index: " + url);
    const schema = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(s=>s["@type"]==="BlogPosting");
    assert(schema && schema.url === url.href && schema.headline, "Post identity mismatch: " + url);
    assert(html.includes('<article class="article'), "Missing article text: " + url);
  }
}
assert(posts>0);
console.log(`Verified ${urls.length} canonical pages, ${posts} articles and both direct installer links in the production HTML.`);
