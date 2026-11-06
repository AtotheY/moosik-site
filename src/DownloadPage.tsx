import { ArrowDownToLine, ArrowUpRight, Laptop } from "lucide-react";
import { REPO, selectDownloads, type Download } from "./lib/releases.mjs";
import { useReleaseCatalog, type Release } from "./lib/use-release-catalog";
import cached from "./lib/release-cache.json";

const macGuide = "/blog/install-youtube-music-player-apple-silicon-mac/";
const winGuide = "/blog/youtube-music-windows-installer-or-portable/";
const releaseUrl = (version: string) => REPO + "/releases/tag/moosik-v" + version;

function companion(releases: Release[], version: string, filename: string) {
  const tag = "moosik-v" + version;
  const asset = releases.find(release => release?.tag_name === tag)?.assets.find(file => file.name === filename);
  return asset?.browser_download_url === REPO + "/releases/download/" + tag + "/" + filename ? asset.browser_download_url : undefined;
}

function Installer({release,label}: {release: Download | null; label: string}) {
  if (!release) return <a className="get-installer" href={REPO + "/releases"}>Check GitHub releases <ArrowUpRight size={16}/></a>;
  return <>
    <a className="get-installer" href={release.url}>{label} <ArrowDownToLine size={16}/></a>
    <span className="file-meta">v{release.version}{release.size > 0 && <> · {(release.size / 1_000_000).toFixed(1)} MB</>}</span>
  </>;
}

export default function DownloadPage() {
  const releases = useReleaseCatalog();
  const {mac, windows} = selectDownloads(releases);
  const minimum = cached.find(item => item.tag_name === "moosik-v" + mac?.version)?.minimum_macos;
  const portable = windows && companion(releases, windows.version, "moosik-" + windows.version + "-windows-x86_64.zip");
  return <>
    <a className="skip-link" href="#downloads">Skip to downloads</a>
    <header className="site-header"><a className="wordmark" href="/"><img src="/assets/icons/ceramic.png" alt="" width="38" height="38"/>moosik</a>
      <nav aria-label="Main navigation"><a href="/blog/">Blog</a><a href={REPO}>GitHub ↗</a></nav></header>
    <main className="download-page" id="downloads">
      <img src="/assets/icons/ceramic.png" width="64" height="64" alt="" />
      <h1>Download Moosik</h1>
      <p className="download-intro">Play your YouTube Music library in an open-source desktop app for Mac and Windows. Use your YouTube Premium or YouTube Music Premium account.</p>
      <div className="download-platforms">
        <section id="mac"><h2><Laptop aria-hidden="true" size={24}/> Mac</h2>
          <p>Apple Silicon{minimum && <> · macOS {minimum} or later</>}</p>
          <Installer release={mac} label="Download Mac DMG"/>
          <a className="install-help" href={macGuide}>How to install on a Mac ↗</a>
        </section>
        <section id="windows"><h2><span className="windows-icon" aria-hidden="true"><i/><i/><i/><i/></span> Windows</h2>
          <p>64-bit Windows (x64) · experimental</p>
          <Installer release={windows} label="Download Windows installer"/>
          <a className="install-help" href={winGuide}>Windows installation options ↗</a>
        </section>
      </div>
      <details className="file-details"><summary>Other files and release notes</summary>
        <ul>
          {portable && <li><a href={portable}>Windows x64 portable ZIP (v{windows!.version})</a>. Choose the setup installer for Discord invite links.</li>}
          {mac && <li><a href={releaseUrl(mac.version)}>Release notes and SHA-256 checksums for v{mac.version}</a>.</li>}
          <li><a href={REPO + "/releases"}>All published versions on GitHub</a>.</li>
        </ul>
      </details>
    </main>
  </>;
}
