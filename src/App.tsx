import { lazy, Suspense, useEffect, useState, useRef } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Laptop,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "./components/ui/button";
import AppPreview from "./components/AppPreview";
import {
  detectPlatform,
  selectDownloads,
  REPO,
  type Downloads,
  type Platform,
} from "./lib/releases.mjs";
import { useReleaseCatalog } from "./lib/use-release-catalog";
import { parseHandoff, type Handoff } from "./lib/handoff.mjs";
const OrbitScene = lazy(() => import("./components/OrbitScene"));
function WindowsIcon() {
  return (
    <span className="windows-icon" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
function DownloadControls({
  platform,
  setPlatform,
  downloads,
}: {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  downloads: Downloads;
}) {
  const item = platform === "choose" ? null : downloads[platform];
  return (
    <div className="download-box">
      <div className="platform-tabs" role="group" aria-label="Operating system">
        <span className={`platform-indicator ${platform}`} aria-hidden="true" />
        <button
          aria-pressed={platform === "mac"}
          onClick={() => setPlatform("mac")}
        >
          <Laptop size={19} />
          macOS
        </button>
        <button
          aria-pressed={platform === "windows"}
          onClick={() => setPlatform("windows")}
        >
          <WindowsIcon />
          Windows
        </button>
      </div>
      <Button asChild className="download-button">
        <a href={item?.url || "/download/"}>
          {item
            ? "Download Moosik"
            : platform === "choose"
              ? "View downloads"
              : "All downloads"}
          <Download size={17} />
        </a>
      </Button>
      <p className="download-meta" aria-live="polite">
        {item
          ? `v${item.version} · ${platform === "mac" ? "Apple Silicon · DMG" : "Windows x64 · EXE"}`
          : "Available for macOS & Windows"}
      </p>
    </div>
  );
}
export default function App() {
  const [icon, setIcon] = useState("ceramic");
  const logoRef = useRef<HTMLButtonElement>(null);
  const [platform, setPlatform] = useState<Platform>("choose");
  const [ready, setReady] = useState(false);
  const [handoff, setHandoff] = useState<Handoff | null>(null);
  const downloads = selectDownloads(useReleaseCatalog());
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const preferred = new URLSearchParams(window.location.search).get("platform");
    setPlatform(preferred === "mac" || preferred === "windows" ? preferred :
      navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform)
        ? "choose"
        : detectPlatform(navigator.userAgent, navigator.platform),
    );
    setReady(true);
    const readHandoff = () => setHandoff(parseHandoff(window.location.hash));
    readHandoff();
    window.addEventListener("hashchange", readHandoff);
    return () => window.removeEventListener("hashchange", readHandoff);
  }, []);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)"),
      change = () => setPaused(media.matches);
    change();
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  return (
    <div className="site">
      <a className="skip-link" href="#download">
        Skip to download
      </a>
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Moosik home">
          <img
            src={`/assets/icons/${icon}.png`}
            alt=""
            width="34"
            height="34"
          />
          moosik
        </a>
        <nav aria-label="Main navigation">
          <a href="/blog/">Blog</a>
          <a href="#preview">
            Preview <ArrowDown size={13} />
          </a>
          <a href={REPO} target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub <ArrowUpRight size={13} />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <Suspense fallback={null}>
            {ready && <OrbitScene paused={paused} />}
          </Suspense>
          <div className="hero-art">
            <button
              ref={logoRef}
              className={`real-icon ${paused ? "paused" : ""}`}
              aria-label="Rotate the Moosik icon. Drag or use arrow keys."
              onPointerMove={(e) => {
                if (paused) return;
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--rx",
                  `${-(e.clientY - r.top - r.height / 2) / 20}deg`,
                );
                e.currentTarget.style.setProperty(
                  "--ry",
                  `${(e.clientX - r.left - r.width / 2) / 18}deg`,
                );
              }}
              onPointerLeave={(e) => {
                e.currentTarget.style.setProperty("--rx", "0deg");
                e.currentTarget.style.setProperty("--ry", "0deg");
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight")
                  e.currentTarget.style.setProperty(
                    "--ry",
                    e.key === "ArrowLeft" ? "-18deg" : "18deg",
                  );
              }}
            >
              <img
                src={
                  icon === "ceramic"
                    ? "/assets/moosik-hero.webp"
                    : `/assets/hero-icons/${icon}-master.png`
                }
                width="1000"
                height="1000"
                fetchPriority="high"
                alt="Moosik eclipse app icon"
                draggable="false"
              />
            </button>
            <div className="space-controls">
              <span>Drag to orbit</span>
              <Button
                variant="ghost"
                aria-label={paused ? "Resume animation" : "Pause animation"}
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={12} /> : <Pause size={12} />}
              </Button>
            </div>
          </div>
          <div className="hero-content" id="download">
            <h1 id="hero-title">
              <span className="hero-name">moosik</span>{" "}
              <span className="hero-description">
                {handoff
                  ? handoff.kind === "join" ? "Listen along with a friend" : "Play this song"
                  : <>YouTube Music player<br /> <span>for Mac and Windows.</span></>}
              </span>
            </h1>
            {handoff ? (
              <div className="download-box">
                <Button asChild className="download-button">
                  <a href={handoff.uri} target="moosik-launch">Open in Moosik <ArrowUpRight size={17} /></a>
                </Button>
                {/* Keep the download page open if the browser declines the protocol. */}
                <iframe
                  hidden
                  title="Moosik app launcher"
                  name="moosik-launch"
                  src={window.top === window.self && !document.hidden ? handoff.uri : undefined}
                />
                <details className="handoff-download">
                  <summary>Download Moosik</summary>
                  <DownloadControls platform={platform} setPlatform={setPlatform} downloads={downloads} />
                </details>
              </div>
            ) : (
              <>
                <p className="hero-detail">
                  Share what’s playing on your Discord profile.
                  <br />
                  Friends can play the song or listen along in sync.
                </p>
                <DownloadControls platform={platform} setPlatform={setPlatform} downloads={downloads} />

              </>
            )}
            {!handoff && <a className="hero-demo-link" href="#discord">Try the Discord demo <ArrowDown size={14} /></a>}
          </div>
        </section>
        <AppPreview icon={icon} setIcon={setIcon} />
        <section
          className="closing-download"
          id="get-moosik"
          aria-labelledby="closing-title"
        >
          <img
            src={`/assets/icons/${icon}.png`}
            width="80"
            height="80"
            alt=""
          />
          <h2 id="closing-title">Download Moosik.</h2>
          <p>A free, open-source desktop app for YouTube Music.</p>
          <DownloadControls
            platform={platform}
            setPlatform={setPlatform}
            downloads={downloads}
          />
          <a className="closing-source" href={REPO}>
            <Github size={16} /> View the source <ArrowUpRight size={14} />
          </a>
        </section>
        <details className="install-notes">
          <summary>How to listen together on Discord <span>+</span></summary>
          <div><p>Both people need Moosik 0.1.26 or later. Open Discord desktop. In Moosik’s <strong>Settings → System → Integrations</strong>, enable <strong>Discord Rich Presence</strong> and <strong>Host Listen along</strong>. Play a YouTube Music song, then have your friend click <strong>Listen along</strong> on your Discord profile. <a href="/blog/youtube-music-discord/">Read the Discord setup guide ↗</a></p></div>
        </details>
        <details className="install-notes">
          <summary>
            Installation notes <span>+</span>
          </summary>
          <div>
            <p>
              <strong>macOS</strong> Open the {downloads.mac ? <a href={downloads.mac.url}>Apple Silicon DMG</a> : "DMG"} and drag Moosik to
              Applications. Apple Silicon only. You may need to approve it in
              Privacy &amp; Security. <a href="/blog/install-youtube-music-player-apple-silicon-mac/">Mac installation guide ↗</a>
            </p>
            <p>
              <strong>Windows</strong> Run the {downloads.windows ? <a href={downloads.windows.url}>experimental Windows x64 installer</a> : "experimental Windows x64 installer"}. It’s
              unsigned, so Windows may show a SmartScreen warning. <a href="/blog/youtube-music-windows-installer-or-portable/">Windows setup options ↗</a>
            </p>
            <p>
              Intended for YouTube Premium or YouTube Music Premium accounts.{" "}
              <a href="/download/">All downloads and requirements ↗</a>
            </p>
          </div>
        </details>
      </main>
      <footer>
        <span>moosik</span>
        <div>
          <a href={REPO}>
            Source code <ArrowUpRight size={12} />
          </a>
          <a href="/blog/">Blog</a>
          <a href="/about/">About</a>
          <a href={`${REPO}/releases`}>Releases</a>
          <a href="https://github.com/gridoe/refryt">Built on Refryt</a>
        </div>
        <p>Independent. Not affiliated with YouTube or Google.</p>
      </footer>
    </div>
  );
}
