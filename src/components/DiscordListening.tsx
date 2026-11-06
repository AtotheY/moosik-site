import { useEffect, useState } from "react";
import { AudioLines, Check, Headphones, Music2, Pause, Play, X } from "lucide-react";

type Song = { title: string; artist: string; art: string; album: string; duration: string };

export function clockLabel(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function durationSeconds(song: Song) {
  const [minutes, seconds] = song.duration.split(":").map(Number);
  return minutes * 60 + seconds;
}

export default function DiscordListening({ song, playing, time, onPlay, onNext }: {
  song: Song; playing: boolean; time: number; onPlay: () => void; onNext: () => void;
}) {
  const [guest, setGuest] = useState<"along" | { song: Song; elapsed: number } | null>(null);
  const separate = guest !== null && guest !== "along";
  useEffect(() => {
    if (!separate) return;
    const id = window.setInterval(() => setGuest(g =>
      g && g !== "along" && g.elapsed < durationSeconds(g.song) ? { ...g, elapsed: g.elapsed + 1 } : g
    ), 1000);
    return () => window.clearInterval(id);
  }, [separate]);

  const guestSong = guest === "along" ? song : guest?.song;
  const guestTime = guest === "along" ? time : guest?.elapsed;
  return (
    <div className="listen-stage">
      <div className="listen-host">
        <span className="listen-caption"><Music2 size={15} /> Your Moosik player</span>
        <div className="sleeve">
          <img src={`/assets/music/${song.art}.svg`} alt={`${song.album} cover`} />
        </div>
        <strong className="sleeve-title">{song.title}</strong>
        <span className="sleeve-artist">{song.artist}</span>
        <div className="listen-host-actions">
          <button onClick={onPlay}>{playing ? <Pause size={14} /> : <Play size={14} />}{playing ? "Pause" : "Play"}</button>
          <button onClick={onNext}>Next song →</button>
        </div>
      </div>
      <div className="listen-discord">
        <span className="listen-caption"><Headphones size={15} /> Your friend’s view on Discord</span>
        <div className="profile-popout">
          <div className="profile-band" />
          <div className="profile-person">
            <span className="profile-avatar" aria-hidden="true"><i /></span>
            <div><strong>Alex</strong><small>{song.title} - {song.artist}</small></div>
          </div>
          <div className="profile-activity">
            <div className="activity-heading">Listening to YouTube Music via Moosik.dev</div>
            <div className="activity-song">
              <div className="activity-art">
                <img src={`/assets/music/${song.art}.svg`} alt="" />
                <picture>
                  <source media="(prefers-reduced-motion: reduce)" srcSet="/assets/discord/paused.png" />
                  <img className="activity-badge" src={playing ? "/assets/discord/playing.gif" : "/assets/discord/paused.png"} alt="" />
                </picture>
              </div>
              <div><strong>{song.title}</strong><span>{song.artist}</span><small>{song.album}</small></div>
            </div>
            <div className="activity-progress"><i style={{width: `${time / durationSeconds(song) * 100}%`}} /></div>
            <div className="activity-times"><span>{clockLabel(time)}</span><span>{song.duration}</span></div>
            <div className="activity-buttons">
              <button onClick={() => setGuest({song, elapsed: 0})}><Play size={14} />Play song</button>
              <button aria-pressed={guest === "along"} onClick={() => setGuest(guest === "along" ? null : "along")}>
                {guest === "along" ? <Check size={15} /> : <Headphones size={15} />}
                {guest === "along" ? "Listening along" : "Listen along"}
              </button>
            </div>
          </div>
        </div>
        {guestSong && <div className="guest-transport">
          <AudioLines size={18} />
          <div><span>Friend’s player · {guest === "along" ? (playing ? "In sync" : "Paused with you") : "Independent playback"}</span>
          <strong>{guestSong.title} <small>{clockLabel(guestTime ?? 0)}</small></strong></div>
          <button aria-label="Leave friend playback demo" onClick={() => setGuest(null)}><X size={14} /></button>
        </div>}
      </div>
    </div>
  );
}
