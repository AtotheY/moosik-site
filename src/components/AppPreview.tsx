import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type CSSProperties,
} from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Home,
  Library,
  ListMusic,
  History,
  TrendingUp,
  Plus,
  Search,
  ChevronLeft,
  UserCircle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat2,
  ThumbsUp,
  Volume2,
  ChevronDown,
  PanelLeft,
  GripVertical,
  X,
  Check,
} from "lucide-react";
import { Button } from "./ui/button";
import DiscordListening, { clockLabel, durationSeconds } from "./DiscordListening";
import themes from "../lib/themes.json";
const icons = [
  "ceramic",
  "celadon",
  "midnight",
  "obsidian",
  "amber",
  "frost",
  "travertine",
  "copper",
  "ink",
  "bloom",
];
const songs = [
  {
    title: "Night Signal",
    artist: "Signal House",
    album: "Shortwave",
    art: "shortwave",
    duration: "4:22",
    minutes: 284,
  },
  {
    title: "Late Checkout",
    artist: "Studio Four",
    album: "Room Keys",
    art: "room-keys",
    duration: "5:06",
    minutes: 372,
  },
  {
    title: "Out on the Coast",
    artist: "Coastline",
    album: "Offshore",
    art: "offshore",
    duration: "4:18",
    minutes: 304,
  },
  {
    title: "Soft Focus",
    artist: "The Pines",
    album: "Afterimage",
    art: "afterimage",
    duration: "5:06",
    minutes: 193,
  },
  {
    title: "In the Morning",
    artist: "North End",
    album: "First Light",
    art: "first-light",
    duration: "4:55",
    minutes: 156,
  },
];
type View =
  | "discord"
  | "appearance"
  | "home"
  | "library"
  | "listening"
  | "history"
  | "album"
  | "artist"
  | "playlist"
  | "queue";
const features = [
  {
    id: "discord",
    label: "Discord",
    title: "Listen along on Discord",
    detail: "Join from the profile, then pause or skip in Moosik. Watch both players follow the same song.",
  },
  {
    id: "appearance",
    label: "Appearance",
    title: "Make the player yours",
    detail:
      "Pick a theme, change the app icon, or give your albums more room by hiding the sidebar.",
  },
  {
    id: "listening",
    label: "Listening stats",
    title: "Your listening stats",
    detail:
      "See top songs for any date range, then search your local listening history by song or artist.",
  },
  {
    id: "library",
    label: "Your library",
    title: "Your entire library",
    detail:
      "Your YouTube Music library, playlists, local files, and downloads in one app.",
  },
  {
    id: "queue",
    label: "Queue",
    title: "Control what’s next",
    detail:
      "Move several tracks together in Up Next, undo an edit, or save the whole queue as a private playlist.",
  },
];
function Art({ index, className = "" }: { index: number; className?: string }) {
  return (
    <img
      className={`music-art ${className}`}
      src={`/assets/music/${songs[index].art}.svg`}
      alt={`${songs[index].album} artwork`}
      loading="lazy"
    />
  );
}
export default function AppPreview({
  icon,
  setIcon,
}: {
  icon: string;
  setIcon: (icon: string) => void;
}) {
  const [theme, setTheme] = useState(0),
    [opacity, setOpacity] = useState(76),
    [compact, setCompact] = useState(false),
    [view, setView] = useState<View>("discord"),
    [chapter, setChapter] = useState(0),
    [queueOpen, setQueueOpen] = useState(true),
    [queue, setQueue] = useState([0, 1, 2, 4]),
    [dragged, setDragged] = useState<number | null>(null),
    [current, setCurrent] = useState(3),
    [playing, setPlaying] = useState(true),
    [liked, setLiked] = useState([0, 1]),
    [query, setQuery] = useState(""),
    [libraryTab, setLibraryTab] = useState("Albums"),
    [statTab, setStatTab] = useState("Overview"),
    [period, setPeriod] = useState("All time"),
    [album, setAlbum] = useState(0);
  const [time, setTime] = useState(84);
  const [visible, setVisible] = useState(false);
  const [demoSize, setDemoSize] = useState({ width: 1200, height: 760, scale: 1 });
  const palette = themes[theme],
    song = songs[current];
  const style = {
    ...Object.fromEntries(
      Object.entries(palette)
        .filter(([k]) => k !== "name")
        .map(([k, v]) => [`--app-${k}`, v]),
    ),
    "--app-opacity": `${opacity}%`,
    "--demo-width": `${demoSize.width}px`,
    "--demo-scale": demoSize.scale,
    "--demo-rendered-width": `${demoSize.width * demoSize.scale}px`,
    "--demo-rendered-height": `${demoSize.height * demoSize.scale}px`,
    "--demo-height": `${demoSize.height}px`,
  } as CSSProperties;
  useEffect(() => setCompact(window.innerWidth < 700), []);
  const filtered = songs
    .map((s, id) => ({ ...s, id }))
    .filter((s) =>
      `${s.title} ${s.artist} ${s.album}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  const setPage = (next: View) => {
    setView(next);
    setQuery("");
  };
  const previewSong = (id: number) => {
    setTime(0);
    setCurrent(id);
    setPlaying(true);
  };
  const toggleLike = (id: number) =>
    setLiked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollChapter = useRef(-1);
  const interacting = useRef(false);
  useEffect(() => {
    if (!pinRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(pinRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setInterval(() => setTime(t => (t + 1) % durationSeconds(song)), 1000);
    return () => window.clearInterval(timer);
  }, [song, playing, visible]);
  useEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth < 700;
      const available = trackRef.current?.clientWidth || window.innerWidth;
      const mobileDiscord = mobile && view === "discord";
      const width = mobileDiscord ? available : mobile ? (compact ? 496 : 640) : 1200;
      const height = mobileDiscord ? 625 : view === "discord" ? 610 : 760;
      const heightScale =
        window.innerHeight <= 620
          ? 1
          : (window.innerHeight - (window.innerWidth < 700 ? 260 : 190)) / height;
      setDemoSize({
        width, height,
        scale: mobileDiscord ? 1 : Math.min(1, available / width, heightScale),
      });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [compact, view]);
  const applyChapter = useCallback((index: number) => {
    setChapter(index);
    setView(features[index].id as View);
    setQuery("");
    if (features[index].id === "listening") setStatTab("Overview");
    if (features[index].id === "library") setLibraryTab("Albums");
    if (features[index].id === "queue") setQueueOpen(true);
  }, []);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (interacting.current) return;
      const track = trackRef.current,
        pin = pinRef.current;
      if (!track || !pin || getComputedStyle(pin).position !== "sticky") return;
      const distance = track.offsetHeight - pin.offsetHeight;
      const progress = Math.max(
        0,
        Math.min(1, (16 - track.getBoundingClientRect().top) / distance),
      );
      const index = Math.min(
        features.length - 1,
        Math.floor(progress * features.length),
      );
      // Only a chapter boundary changes the screen. Interacting inside the app
      // remains under the visitor's control between boundaries.
      if (index !== scrollChapter.current) {
        scrollChapter.current = index;
        applyChapter(index);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const release = () => { interacting.current = false; };
    const onKey = (e: KeyboardEvent) => {
      if (["PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"].includes(e.key)) release();
    };
    const openDiscord = () => {
      if (location.hash === "#discord") { scrollChapter.current = 0; applyChapter(0); }
    };
    openDiscord();
    window.addEventListener("hashchange", openDiscord);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", openDiscord);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [applyChapter]);
  const jumpToChapter = (index: number) => {
    applyChapter(index);
    const track = trackRef.current,
      pin = pinRef.current;
    if (!track || !pin || getComputedStyle(pin).position !== "sticky") return;
    const distance = track.offsetHeight - pin.offsetHeight;
    // Jump directly, avoiding intermediate screens flashing through on tab clicks.
    window.scrollTo({
      top:
        window.scrollY +
        track.getBoundingClientRect().top -
        16 +
        distance * (index / features.length + 0.025),
      behavior: "instant",
    });
  };
  const rows = (ids: number[], stat = false) => (
    <div className="native-rows">
      {ids.map((id, i) => (
        <div
          className={`native-row ${id === current ? "is-current" : ""}`}
          key={id}
        >
          <span className="row-rank">{i + 1}</span>
          <button
            className="song-target"
            onClick={() => previewSong(id)}
            aria-label={`Preview ${songs[id].title}`}
          >
            <Art index={id} />
            <span>
              <strong>{songs[id].title}</strong>
              <small>
                {songs[id].artist}
                {stat ? "" : ` · ${songs[id].album}`}
              </small>
            </span>
          </button>
          {stat ? (
            <span className="row-duration">
              {Math.floor(songs[id].minutes / 60)}h {songs[id].minutes % 60}m
            </span>
          ) : (
            <>
              <button
                className={`thumb ${liked.includes(id) ? "is-liked" : ""}`}
                aria-label={`Like ${songs[id].title}`}
                aria-pressed={liked.includes(id)}
                onClick={() => toggleLike(id)}
              >
                <ThumbsUp size={15} />
              </button>
              <span className="row-duration">{songs[id].duration}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
  return (
    <section
      id="preview"
      className="product-section"
      style={style}
      aria-labelledby={`feature-${features[chapter].id}`}
    >
      <div id="discord" className="showcase-track" ref={trackRef}>
        <div className="showcase-pin" ref={pinRef} onPointerDownCapture={() => { interacting.current = true; }}>
          <div className="showcase-heading">
            <div className="product-heading">
              {features.map((feature, index) => (
                <div key={feature.id} hidden={index !== chapter}>
                  <h2 id={`feature-${feature.id}`}>{feature.title}</h2>
                  <p className="feature-description">{feature.detail}</p>
                </div>
              ))}
            </div>
            <a className="showcase-download" href="#get-moosik">
              Download <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="showcase-controls">
            <div
              className="feature-tabs"
              role="group"
              aria-label="Explore Moosik features"
            >
              {features.map((f, index) => (
                <button
                  key={f.id}
                  aria-pressed={chapter === index}
                  onClick={() => jumpToChapter(index)}
                >
                  <span className="chapter-dot" />
                  {f.label}
                </button>
              ))}
            </div>
            <div className="theme-strip" role="group" aria-label="App theme">
              {themes.map((t, i) => (
                <button
                  key={t.name}
                  aria-label={t.name}
                  title={t.name}
                  aria-pressed={theme === i}
                  onClick={() => setTheme(i)}
                  style={
                    {
                      "--swatch": t.accent,
                      "--swatch-base": t.base,
                    } as CSSProperties
                  }
                >
                  <span>{theme === i && <Check size={12} />}</span>
                  <small>
                    {t.name
                      .replace("Catppuccin ", "")
                      .replace(" Polar Night", "")
                      .replace(" Dark", "")}
                  </small>
                </button>
              ))}
            </div>
          </div>
          <div className="native-stage" data-nosnippet="">
            <div
              className={`native-window ${view === "discord" ? "is-discord" : ""} ${compact ? "compact" : ""} ${queueOpen ? "has-queue" : ""}`}
            >
              <aside className="native-sidebar">
                <div className="native-window-controls" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <nav aria-label="App preview navigation">
                  {[
                    { id: "home" as const, icon: Home, label: "Home" },
                    { id: "library" as const, icon: Library, label: "Library" },
                    { id: "queue" as const, icon: ListMusic, label: "Queue" },
                    {
                      id: "history" as const,
                      icon: History,
                      label: "Listening history",
                    },
                    {
                      id: "listening" as const,
                      icon: TrendingUp,
                      label: "Listening stats",
                      title: "Your listening stats",
                    },
                  ].map((n) => (
                    <button
                      key={n.id}
                      title={n.label}
                      aria-label={n.label}
                      aria-current={n.id === view ? "page" : undefined}
                      onClick={() => setPage(n.id)}
                    >
                      <n.icon size={19} />
                      <span>{n.label}</span>
                    </button>
                  ))}
                </nav>
                <div className="sidebar-playlists">
                  <div>
                    Playlists <Plus size={15} />
                  </div>
                  <button
                    aria-label="Liked Music"
                    onClick={() => {
                      setPage("playlist");
                      setLibraryTab("Liked Music");
                    }}
                  >
                    <span className="liked-art">
                      <ThumbsUp fill="white" size={22} />
                    </span>
                    <span>Liked Music</span>
                  </button>
                  <button
                    aria-label="Sample playlist"
                    onClick={() => {
                      setPage("playlist");
                      setLibraryTab("Sample playlist");
                    }}
                  >
                    <Art index={0} />
                    <span>
                      Sample playlist<small>5 tracks</small>
                    </span>
                  </button>
                </div>
              </aside>
              <div className="native-workspace">
                <div className="native-toolbar">
                  <button
                    aria-label="Back to library"
                    onClick={() => setPage("library")}
                  >
                    <ChevronLeft size={19} />
                  </button>
                  <label className="native-search">
                    <Search size={18} />
                    <input
                      aria-label="Search preview music"
                      placeholder="What do you want to play?"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setView("library");
                        setLibraryTab("Songs");
                      }}
                    />
                    {query && (
                      <button
                        aria-label="Clear search"
                        onClick={() => setQuery("")}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </label>
                  <button
                    aria-label="Listening history"
                    onClick={() => setPage("history")}
                  >
                    <History size={19} />
                  </button>
                  <button
                    aria-label="Open appearance settings"
                    onClick={() => setPage("appearance")}
                  >
                    <UserCircle size={20} />
                  </button>
                </div>
                <div className="native-panels">
                  <div className={view === "discord" ? "native-page native-discord" : "native-page"} key={view}>
                    {view === "discord" && <DiscordListening song={song} playing={playing} time={time}
                      onPlay={() => setPlaying(!playing)} onNext={() => previewSong((current + 1) % songs.length)} />}
                    {view === "appearance" && (
                      <div className="appearance-page">
                        <h3>Settings</h3>
                        <div className="settings-tabs">
                          <span>Appearance</span>
                          <span>Playback</span>
                          <span>Library</span>
                          <span>System</span>
                          <span>Account</span>
                          <span>About</span>
                        </div>
                        <h4>App icon</h4>
                        <p>A different finish. The same Moosik.</p>
                        <div className="real-icon-grid">
                          {icons.map((name) => (
                            <button
                              key={name}
                              aria-label={`${name} app icon`}
                              aria-pressed={icon === name}
                              onClick={() => setIcon(name)}
                            >
                              <span>
                                <img
                                  src={`/assets/icons/${name}.png`}
                                  alt=""
                                  loading="lazy"
                                />
                              </span>
                              <strong>{name}</strong>
                              <small>
                                {icon === name ? "Selected" : "\u00a0"}
                              </small>
                            </button>
                          ))}
                        </div>
                        <h5>Colours</h5>
                        <div className="settings-card">
                          <div className="setting-row">
                            <div>
                              Theme<small>The colours used in dark mode.</small>
                            </div>
                            <select
                              aria-label="Theme in appearance settings"
                              value={theme}
                              onChange={(e) => setTheme(Number(e.target.value))}
                            >
                              {themes.map((t, i) => (
                                <option key={t.name} value={i}>
                                  {t.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="setting-row">
                            <div>
                              Window transparency
                              <small>Adjust the glass behind the panels.</small>
                            </div>
                            <label className="opacity-control">
                              <input
                                type="range"
                                min="35"
                                max="100"
                                value={opacity}
                                onChange={(e) =>
                                  setOpacity(Number(e.target.value))
                                }
                                aria-label="Window opacity"
                              />
                              <output>{opacity}%</output>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                    {view === "queue" && (
                      <>
                        <h3>Queue</h3>
                        <h4>Now playing</h4>
                        <div className="native-row">
                          <Art index={current} className="queue-page-art" />
                          <div>
                            <strong>{song.title}</strong>
                            <p>{song.artist}</p>
                          </div>
                          <span className="row-duration">{song.duration}</span>
                        </div>
                        <h4 className="content-section-title">Next up</h4>
                        <button
                          className="queue-clear"
                          onClick={() =>
                            setQueue(queue.length ? [] : [1, 2, 3, 4])
                          }
                        >
                          {queue.length ? "Clear" : "Restore demo queue"}
                        </button>
                        {queue.map((id) => (
                          <div
                            className="native-row queue-page-row"
                            key={id}
                            draggable
                            onDragStart={() => setDragged(id)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              if (dragged === null || dragged === id) return;
                              setQueue((p) => {
                                const next = p.filter((x) => x !== dragged);
                                next.splice(next.indexOf(id), 0, dragged);
                                return next;
                              });
                              setDragged(null);
                            }}
                          >
                            <button
                              className="song-target"
                              onClick={() => previewSong(id)}
                            >
                              <Art index={id} />
                              <span>
                                <strong>{songs[id].title}</strong>
                                <small>{songs[id].artist}</small>
                              </span>
                            </button>
                            <span className="row-duration">
                              {songs[id].duration}
                            </span>
                            <button
                              aria-label={`Move ${songs[id].title} first`}
                              onClick={() =>
                                setQueue((q) => [
                                  id,
                                  ...q.filter((x) => x !== id),
                                ])
                              }
                            >
                              <GripVertical size={15} />
                            </button>
                            <button
                              aria-label={`Remove ${songs[id].title}`}
                              onClick={() =>
                                setQueue((q) => q.filter((x) => x !== id))
                              }
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        {!queue.length && (
                          <div className="native-empty">
                            <ListMusic size={25} />
                            <p>Nothing up next</p>
                          </div>
                        )}
                      </>
                    )}
                    {view === "home" && (
                      <>
                        <h3>Listen again</h3>
                        <div className="native-albums">
                          {songs.map((s, id) => (
                            <button
                              key={s.art}
                              onClick={() => {
                                setAlbum(id);
                                setView("album");
                              }}
                            >
                              <Art index={id} />
                              <strong>{s.album}</strong>
                              <small>{s.artist}</small>
                            </button>
                          ))}
                        </div>
                        <h4 className="content-section-title">Quick picks</h4>
                        {rows([0, 1, 2, 3, 4])}
                      </>
                    )}
                    {view === "library" && (
                      <>
                        <h3>Your library</h3>
                        <div
                          className="native-pills"
                          role="group"
                          aria-label="Library category"
                        >
                          {[
                            "Playlists",
                            "Songs",
                            "Albums",
                            "Artists",
                            "Local",
                            "Downloads",
                          ].map((t) => (
                            <button
                              key={t}
                              aria-pressed={libraryTab === t}
                              onClick={() => setLibraryTab(t)}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        {libraryTab === "Local" ||
                        libraryTab === "Downloads" ? (
                          <div className="native-empty">
                            <Library size={28} />
                            <h4>
                              No{" "}
                              {libraryTab === "Local"
                                ? "local files"
                                : "downloads"}{" "}
                              in this preview
                            </h4>
                            <p>
                              {libraryTab === "Local"
                                ? "Moosik can add folders from your computer."
                                : "Downloaded music appears here in the app."}
                            </p>
                          </div>
                        ) : !filtered.length ? (
                          <div className="native-empty">
                            <Search size={28} />
                            <h4>No results</h4>
                            <Button
                              variant="ghost"
                              onClick={() => setQuery("")}
                            >
                              Clear search
                            </Button>
                          </div>
                        ) : libraryTab === "Songs" ? (
                          rows(filtered.map((s) => s.id))
                        ) : libraryTab === "Playlists" ? (
                          <div className="native-albums">
                            <button
                              onClick={() => {
                                setView("playlist");
                                setLibraryTab("Liked Music");
                              }}
                            >
                              <span className="playlist-liked">
                                <ThumbsUp size={60} fill="white" />
                              </span>
                              <strong>Liked Music</strong>
                            </button>
                            <button
                              onClick={() => {
                                setView("playlist");
                                setLibraryTab("Sample playlist");
                              }}
                            >
                              <Art index={0} />
                              <strong>Sample playlist</strong>
                              <small>5 tracks</small>
                            </button>
                          </div>
                        ) : (
                          <div
                            className={`native-albums library-albums ${libraryTab === "Artists" ? "artist-albums" : ""}`}
                          >
                            {filtered.map((s) => (
                              <button
                                key={s.id}
                                onClick={() => {
                                  setAlbum(s.id);
                                  setView(
                                    libraryTab === "Artists"
                                      ? "artist"
                                      : "album",
                                  );
                                }}
                              >
                                <Art index={s.id} />
                                <strong>
                                  {libraryTab === "Artists"
                                    ? s.artist
                                    : s.album}
                                </strong>
                                <small>
                                  {libraryTab === "Artists"
                                    ? "Artist"
                                    : s.artist}
                                </small>
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    {view === "playlist" && (
                      <>
                        <div className="native-album-header">
                          <span className="playlist-liked">
                            <ThumbsUp size={60} fill="white" />
                          </span>
                          <div>
                            <small>Playlist</small>
                            <h3>{libraryTab}</h3>
                            <p>
                              {libraryTab === "Liked Music"
                                ? "Music you like in any YouTube app will show here."
                                : "Sample playlist"}
                            </p>
                          </div>
                        </div>
                        {rows(
                          libraryTab === "Liked Music"
                            ? liked
                            : [0, 1, 2, 3, 4],
                        )}
                        {libraryTab === "Liked Music" && !liked.length && (
                          <div className="native-empty">
                            No liked songs in this preview.
                          </div>
                        )}
                      </>
                    )}
                    {view === "artist" && (
                      <>
                        <h3>{songs[album].artist}</h3>
                        <h4>Albums</h4>
                        <div className="native-albums">
                          <button onClick={() => setView("album")}>
                            <Art index={album} />
                            <strong>{songs[album].album}</strong>
                          </button>
                        </div>
                        <h4 className="content-section-title">Songs</h4>
                        {rows([album])}
                      </>
                    )}
                    {view === "album" && (
                      <>
                        <div className="native-album-header">
                          <Art index={album} />
                          <div>
                            <small>Album</small>
                            <h3>{songs[album].album}</h3>
                            <p>{songs[album].artist}</p>
                            <small>Sample track</small>
                          </div>
                        </div>
                        <button
                          className="native-big-play"
                          aria-label={`Preview album ${songs[album].album}`}
                          onClick={() => previewSong(album)}
                        >
                          <Play size={23} fill="currentColor" />
                        </button>
                        {rows([album])}
                      </>
                    )}
                    {(view === "listening" || view === "history") && (
                      <>
                        <h3>
                          {view === "history"
                            ? "Listening history"
                            : "Your listening"}
                        </h3>
                        <div className="stats-filters">
                          <select
                            aria-label="Listening period"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                          >
                            <option>All time</option>
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                          </select>
                          <span>
                            All sources <ChevronDown size={12} />
                          </span>
                        </div>
                        {view === "listening" && (
                          <div
                            className="native-pills stats-tabs"
                            role="group"
                            aria-label="Listening statistics view"
                          >
                            {[
                              "Overview",
                              "Songs",
                              "Artists",
                              "Albums",
                              "Genres",
                              "History",
                              "My recap",
                            ].map((t) => (
                              <button
                                key={t}
                                aria-pressed={statTab === t}
                                onClick={() => setStatTab(t)}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        )}
                        {view === "history" || statTab === "History" ? (
                          <>
                            <h4 className="content-section-title">
                              Recently played
                            </h4>
                            {rows([0, 2, 1, 4, 3])}
                          </>
                        ) : statTab === "Overview" ? (
                          <>
                            <div className="native-listening-card">
                              <div>
                                <span>Listening time</span>
                                <strong>
                                  {period === "Last 7 days"
                                    ? "16h 24m"
                                    : period === "Last 30 days"
                                      ? "64h 12m"
                                      : "68h 52m"}
                                </strong>
                                <small>
                                  {period} ·{" "}
                                  {period === "Last 7 days" ? "7" : "31"} active
                                  days
                                </small>
                              </div>
                              <div className="native-chart">
                                <span>Daily listening</span>
                                <div
                                  className="chart-bars"
                                  role="img"
                                  aria-label={`Sample daily listening activity for ${period}`}
                                >
                                  {(period === "Last 7 days"
                                    ? [51, 79, 63, 92, 56, 78, 61]
                                    : [
                                        61, 73, 48, 65, 64, 81, 72, 71, 56, 72,
                                        81, 55, 77, 63, 57, 49, 36, 59, 64, 53,
                                        66, 70, 74, 69, 65, 59, 61, 68, 60, 76,
                                      ]
                                  ).map((h, i) => (
                                    <i key={i} style={{ height: `${h}%` }} />
                                  ))}
                                </div>
                                <small>
                                  <span>
                                    {period === "Last 7 days"
                                      ? "Mon"
                                      : "Sep 27"}
                                  </span>
                                  <span>
                                    {period === "Last 7 days"
                                      ? "Sun"
                                      : "Oct 26"}
                                  </span>
                                </small>
                              </div>
                            </div>
                            <div className="native-metrics">
                              <div>
                                <strong>
                                  {period === "Last 7 days" ? "232" : "978"}
                                </strong>
                                <span>Plays</span>
                              </div>
                              <div>
                                <strong>
                                  {period === "Last 7 days" ? "24" : "40"}
                                </strong>
                                <span>Songs</span>
                              </div>
                              <div>
                                <strong>
                                  {period === "Last 7 days" ? "18" : "31"}
                                </strong>
                                <span>Artists</span>
                              </div>
                            </div>
                            <div className="stats-columns">
                              <div>
                                <h4>Top songs</h4>
                                {rows([1, 2, 0], true)}
                              </div>
                              <div>
                                <h4>Top artists</h4>
                                {[0, 1, 2].map((id, i) => (
                                  <div className="artist-stat" key={id}>
                                    <span>{i + 1}</span>
                                    <span className="artist-initial">
                                      {songs[id].artist.slice(0, 1)}
                                    </span>
                                    <div>
                                      <strong>{songs[id].artist}</strong>
                                      <small>
                                        {7 - i * 2} songs · {228 - i * 68} plays
                                      </small>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : statTab === "Songs" ? (
                          rows([1, 2, 0, 3, 4], true)
                        ) : statTab === "Artists" || statTab === "Albums" ? (
                          <div className="native-albums library-albums">
                            {songs.map((s, id) => (
                              <button
                                key={s.art}
                                onClick={() => {
                                  setAlbum(id);
                                  setView("album");
                                }}
                              >
                                <Art index={id} />
                                <strong>
                                  {statTab === "Artists" ? s.artist : s.album}
                                </strong>
                                <small>
                                  {Math.floor(s.minutes / 60)} hours listened
                                </small>
                              </button>
                            ))}
                          </div>
                        ) : statTab === "Genres" ? (
                          <div className="genre-list">
                            {[
                              "Alternative rock",
                              "Dream pop",
                              "Trip hop",
                              "Britpop",
                            ].map((g, i) => (
                              <div key={g}>
                                <span>{g}</span>
                                <div>
                                  <i style={{ width: `${90 - i * 19}%` }} />
                                </div>
                                <small>{40 - i * 9}%</small>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="recap-preview">
                            <span>{period.toUpperCase()}</span>
                            <h4>Your listening recap</h4>
                            <Art index={1} />
                            <strong>Late Checkout</strong>
                            <p>Your most played song · Studio Four</p>
                            <div>
                              <span>68h 52m listened</span>
                              <span>31 artists</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {queueOpen && view !== "discord" && (
                    <aside className="native-queue" aria-label="Preview queue">
                      <div className="queue-title">
                        Now playing
                        <button
                          aria-label="Close queue"
                          onClick={() => setQueueOpen(false)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="queue-track current-track">
                        <Art index={current} />
                        <div>
                          <strong>{song.title}</strong>
                          <small>{song.artist}</small>
                        </div>
                        <span>{song.duration}</span>
                      </div>
                      <div className="queue-title">Next up</div>
                      <button
                        className="queue-clear"
                        onClick={() =>
                          setQueue(queue.length ? [] : [1, 2, 3, 4])
                        }
                      >
                        {queue.length ? "Clear" : "Restore"}
                      </button>
                      <div className="queue-items">
                        {queue.map((id) => (
                          <div
                            className="queue-track"
                            key={id}
                            draggable
                            onDragStart={() => setDragged(id)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              if (dragged === null || dragged === id) return;
                              setQueue((p) => {
                                const next = p.filter((x) => x !== dragged);
                                next.splice(next.indexOf(id), 0, dragged);
                                return next;
                              });
                              setDragged(null);
                            }}
                          >
                            <Art index={id} />
                            <button
                              className="queue-song"
                              onClick={() => previewSong(id)}
                            >
                              <strong>{songs[id].title}</strong>
                              <small>{songs[id].artist}</small>
                            </button>
                            <button
                              className="queue-remove"
                              aria-label={`Remove ${songs[id].title} from queue`}
                              onClick={() =>
                                setQueue((q) => q.filter((x) => x !== id))
                              }
                            >
                              <X size={12} />
                            </button>
                            <button
                              className="queue-reorder"
                              aria-label={`Move ${songs[id].title} to top`}
                              onClick={() =>
                                setQueue((q) => [
                                  id,
                                  ...q.filter((x) => x !== id),
                                ])
                              }
                            >
                              <GripVertical size={14} />
                            </button>
                          </div>
                        ))}
                        {!queue.length && (
                          <p className="queue-empty">Queue is empty.</p>
                        )}
                      </div>
                    </aside>
                  )}
                </div>
              </div>
              <div className="native-player">
                <div className="native-now">
                  <Art index={current} />
                  <div>
                    <strong>{song.title}</strong>
                    <small>
                      {song.artist} · {song.album}
                    </small>
                  </div>
                  <button
                    className={`thumb ${liked.includes(current) ? "is-liked" : ""}`}
                    aria-label="Like current song"
                    aria-pressed={liked.includes(current)}
                    onClick={() => toggleLike(current)}
                  >
                    <ThumbsUp size={19} />
                  </button>
                </div>
                <div className="native-transport">
                  <div>
                    <button
                      aria-label="Shuffle sample queue"
                      onClick={() => setQueue((q) => [...q].reverse())}
                    >
                      <Shuffle size={17} />
                    </button>
                    <button
                      aria-label="Previous sample song"
                      onClick={() => previewSong((current + 4) % 5)}
                    >
                      <SkipBack size={19} fill="currentColor" />
                    </button>
                    <button
                      className="native-play"
                      aria-label={
                        playing ? "Pause visual preview" : "Play visual preview"
                      }
                      onClick={() => setPlaying(!playing)}
                    >
                      {playing ? (
                        <Pause size={20} fill="currentColor" />
                      ) : (
                        <Play size={20} fill="currentColor" />
                      )}
                    </button>
                    <button
                      aria-label="Next sample song"
                      onClick={() => previewSong((current + 1) % 5)}
                    >
                      <SkipForward size={19} fill="currentColor" />
                    </button>
                    <span>
                      <Repeat2 size={18} />
                    </span>
                  </div>
                  <div className="native-progress">
                    <span>{clockLabel(time)}</span>
                    <div>
                      <i style={{width: `${time / durationSeconds(song) * 100}%`}} />
                    </div>
                    <span>{song.duration}</span>
                  </div>
                </div>
                <div className="native-player-right">
                  <button
                    aria-label="Toggle preview queue"
                    aria-pressed={queueOpen && view !== "discord"}
                    onClick={() => { if (view === "discord") { setPage("queue"); setQueueOpen(true); } else setQueueOpen(!queueOpen); }}
                  >
                    <ListMusic size={20} />
                  </button>
                  <Volume2 size={20} />
                  <span className="volume-line" />
                </div>
              </div>
            </div>
          </div>
          <div className="preview-options">
            <button onClick={() => setCompact(!compact)} aria-pressed={compact}>
              <PanelLeft size={14} />
              {compact ? "Expand sidebar" : "Compact sidebar"}
            </button>
            <span>Interactive preview · sample listening data · no audio</span>
            {chapter < features.length - 1 ? (
              <button
                className="showcase-next"
                onClick={() => jumpToChapter(chapter + 1)}
              >
                <span className="scroll-label">Scroll to </span>
                {features[chapter + 1].label.toLowerCase()}{" "}
                <ArrowDown size={13} />
              </button>
            ) : (
              <a className="showcase-next" href="#get-moosik">
                Get Moosik <ArrowDown size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
