// Refresh the HTML fallback before publishing a site update for a new desktop release.
import { readFile, rename, writeFile } from "node:fs/promises";
import { REPO, selectDownloads } from "../src/lib/releases.mjs";

const destination = new URL("../src/lib/release-cache.json", import.meta.url);
const request = async url => {
  const response = await fetch(url, { headers: { "User-Agent": "Moosik-site-release-refresh" }, signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`Unable to read ${url}: HTTP ${response.status}`);
  return response;
};
const data = await (await request("https://api.github.com/repos/AtotheY/moosik/releases?per_page=30")).json();
const releases = data.filter(r => !r.draft && !r.prerelease && /^moosik-v\d+\.\d+\.\d+$/.test(r.tag_name)).map(r => ({
  tag_name: r.tag_name, draft: false, prerelease: false,
  assets: r.assets.filter(a => a.browser_download_url === `${REPO}/releases/download/${r.tag_name}/${a.name}`)
    .map(({ name, browser_download_url, size }) => ({ name, browser_download_url, size })),
}));
const {mac,windows} = selectDownloads(releases);
if (!mac || !windows) throw new Error("Expected both a published Mac DMG and Windows setup EXE; the existing snapshot was retained.");
const tags = new Set([mac.version,windows.version].map(v => "moosik-v" + v));
const selected = releases.filter(r => tags.has(r.tag_name));
const macRelease = selected.find(r => r.tag_name === "moosik-v" + mac.version);
const feed = macRelease.assets.find(a => a.name === "appcast.xml");
if (!feed) throw new Error("Expected the matching signed Mac update feed.");
const xml = await (await request(feed.browser_download_url)).text();
const items = xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/g) ?? [];
const item = items.find(i => i.includes(`<sparkle:version>${mac.version}</sparkle:version>`));
const minimum = item?.match(/<sparkle:minimumSystemVersion>(\d+(?:\.\d+){0,2})<\/sparkle:minimumSystemVersion>/)?.[1];
if (!minimum || !item.includes("<sparkle:hardwareRequirements>arm64</sparkle:hardwareRequirements>")) {
  throw new Error("Could not confirm the OS and architecture for the selected Mac release; the existing snapshot was retained.");
}
macRelease.minimum_macos = minimum;
const next = JSON.stringify(selected,null,2) + "\n";
if (next !== await readFile(destination,"utf8")) {
  const temp = new URL(destination.href + ".tmp-" + process.pid);
  await writeFile(temp,next);
  await rename(temp,destination);
}
console.log(`Verified Mac ${mac.version} (Apple Silicon, macOS ${minimum}+), Windows x64 ${windows.version}.`);
