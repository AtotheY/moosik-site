import type { GuidePost } from "./types";

const release = "https://github.com/AtotheY/moosik/releases/tag/moosik-v0.1.16";
const docs = "https://github.com/AtotheY/moosik/blob/moosik-v0.1.26/docs";

export const libraryPosts: GuidePost[] = [
  {
    slug: "youtube-music-play-several-songs-next",
    publishedAt: "2026-11-06T06:53:37Z",
    updatedAt: "2026-11-06T07:17:45Z",
    related: ["save-youtube-music-radio-queue", "edit-shuffled-youtube-music-queue"],
    title: "Play ten songs next, in the order you want",
    searchTitle: "Move multiple YouTube Music songs to Play next on desktop",
    description: "Move a group ahead of a long YouTube Music radio queue while the current track keeps playing.",
    category: "Queue & library",
    body: `<p>A <a href="https://www.reddit.com/r/YoutubeMusic/comments/1xowin4/">listener described a queue problem</a> that’s easy to reproduce: <strong>Add to queue</strong> puts a request behind a long radio mix, while using <strong>Play next</strong> ten times puts the last request first. In Moosik you can move the ten songs to the front as a group.</p>
      <h2>Put the requests ahead of the radio mix</h2>
      <ol><li>If the songs are from different albums, use each song’s menu to <strong>Add to queue</strong> as you collect the requests. They can sit at the end for a moment.</li>
      <li>Open <strong>Queue</strong> in the sidebar. Under <strong>Next up</strong>, <strong>⌘-click</strong> the first request on Mac or <strong>Ctrl-click</strong> it on Windows. Then <strong>Shift-click</strong> the last request to select everything between them. For scattered requests, keep ⌘ or Ctrl held and click just the rows you want.</li>
      <li>Right-click a selected row and choose <strong>Play next</strong> once. All selected songs move above the radio tracks in the order they appeared in the queue. The current song finishes normally.</li></ol>
      <p>For example, if the requests are A, B, C and you want C first, move the group to the front, then clear the selection with <strong>Esc</strong> and drag C above A. The order you click the rows doesn’t determine their playback order. You can then <a href="/blog/save-youtube-music-radio-queue/">save the finished sequence as a private playlist</a>. <a href="${docs}/queue.md">Queue controls and shortcuts</a>.</p>`,
  },
  {
    slug: "save-youtube-music-radio-queue",
    publishedAt: "2026-11-06T06:53:37Z",
    updatedAt: "2026-11-06T07:17:45Z",
    related: ["youtube-music-play-several-songs-next", "mix-local-files-youtube-music-playlist"],
    title: "Save a radio queue before the next songs change",
    searchTitle: "Save a YouTube Music queue as a private playlist in Moosik",
    description: "Keep the current song and upcoming tracks together as a named, private Moosik playlist.",
    category: "Queue & library",
    body: `<p>Sometimes the best part of a radio mix is the run of songs you haven’t played yet. One listener <a href="https://www.reddit.com/r/YoutubeMusic/comments/1xk7w2t/">lost that sequence to a refresh</a> while trying to build a playlist from it. Moosik can save the current lineup in one pass, even while the first track is still playing.</p>
      <h2>Capture the mix while it’s on screen</h2>
      <ol><li>Open <strong>Queue</strong> in Moosik’s sidebar. Read the current song and the list under <strong>Next up</strong>. Those are the tracks you’re about to save. If the mix has already played three songs, those earlier songs fall outside this selection.</li>
      <li>Choose <strong>Save as private playlist</strong>. Give it a name you’ll recognize later, such as “Friday radio, after dinner,” then choose <strong>Create</strong>. Moosik opens the new playlist.</li>
      <li>The next time you want that set, open the named playlist from the sidebar. You can keep listening to the original radio in the meantime. Songs it discovers later won’t be appended to your saved list.</li></ol>
      <h2>What actually survives a restart?</h2>
      <p>We tried this in the Mac app with a manually arranged sample queue. “In the morning” had already played. “Out on the coast” was playing, with “Late checkout” and “Soft focus” up next. We chose <strong>Save as private playlist</strong>, named it “Coastline after dark,” quit, and reopened the playlist. It contained the three current and upcoming songs in that order. The earlier song was excluded.</p>
      <div class="queue-proof"><figure class="article-figure"><a href="/assets/queue-guide/before-saving.webp"><img src="/assets/queue-guide/before-saving.webp" width="1560" height="1022" loading="lazy" alt="Moosik queue showing Out on the coast playing, then Late checkout and Soft focus."></a><figcaption>Before saving: one song playing, two up next.</figcaption></figure>
      <figure class="article-figure"><a href="/assets/queue-guide/saved-playlist.webp"><img src="/assets/queue-guide/saved-playlist.webp" width="1560" height="1022" loading="lazy" alt="The reopened private playlist Coastline after dark with the same three tracks in order."></a><figcaption>After reopening: the same three songs in the private playlist.</figcaption></figure></div>
      <p>If you’re taking requests, <a href="/blog/youtube-music-play-several-songs-next/">move the group to the front of Up Next</a> before saving. A radio may keep finding new songs as it plays. Saving preserves the lineup already in the queue.</p>
      <p>One detail matters for mixes with repeats: a private playlist keeps one entry per track ID. If the same recording appears twice in the queue, its first appearance is the one saved. The playlist lives on this computer and stores references to the songs. Streaming them again still requires access to the music. <a href="${docs}/queue.md#song-transfers-0116">How queue saving works.</a></p>`,
  },
  {
    slug: "mix-local-files-youtube-music-playlist",
    publishedAt: "2026-11-06T06:53:37Z",
    updatedAt: "2026-11-06T07:28:43Z",
    related: ["copy-songs-between-youtube-music-playlists", "save-youtube-music-radio-queue"],
    title: "Mix local files and YouTube Music in one playlist",
    description: "Put a rehearsal recording beside the streamed original without uploading your file to YouTube.",
    category: "Queue & library",
    body: `<p>Say you have a rehearsal take on your computer and want to hear it right after the studio recording on YouTube Music. A Moosik <strong>private playlist</strong> can hold both. The rehearsal file stays in its original folder, so keep it somewhere you expect to keep using.</p>
      <h2>Build a two-track rehearsal list</h2>
      <ol><li>In Moosik, open <strong>Settings → Library → Local files</strong>. Choose <strong>Add folder</strong> and select the folder that contains your recording. After the scan, look in <strong>Library → Local</strong> and open that folder.</li>
      <li>Find the studio recording through YouTube Music search. Open its song menu and choose <strong>Save privately → New private playlist…</strong>. Name it “Rehearsal references” and choose <strong>Create</strong>.</li>
      <li>Return to your recording in <strong>Library → Local</strong>. Drag its song row onto <strong>Rehearsal references</strong> in the sidebar. Open the playlist to check that the studio track and your take are both there.</li></ol>
      <p>The list belongs to this installation. It won’t appear among the playlists in the YouTube Music phone app, and adding the studio track doesn’t make an offline copy. Keep an external drive connected when playing a file stored on it. Moosik skips another save of the same track. <a href="${release}">Read the private-playlist release notes.</a></p>
      <h2>A mixed playlist, reopened</h2><p>We saved a small test queue as “Room and radio” on a signed-out Mac. It contained an eight-second local MP3, “Room tone study,” and a sample YouTube track reference, “Night signal.” After reopening the saved playlist in a fresh app process, both entries were there in order. The first still pointed to the file on disk; the second kept its track ID.</p><figure class="article-figure"><a href="/assets/library-guide/mixed-private-playlist.webp"><img src="/assets/library-guide/mixed-private-playlist.webp" alt="The reopened Room and radio private playlist contains Room tone study and Night signal." width="1340" height="956" loading="lazy"></a><figcaption>A local file and a catalog-style reference in one private playlist. This example used synthetic tracks to test storage; live streaming was not tested.</figcaption></figure>
      <h2>Need the same recording on your phone?</h2><p>In that case, consider <a href="https://support.google.com/youtubemusic/answer/9716522?hl=en">uploading your recording to your own YouTube Music library</a>. Google supports playlists that mix your uploads with catalog tracks. Only you can play the uploaded recording, including when you share the playlist. Choose Moosik’s private playlist when the file should stay on the computer.</p>`,
  },
  {
    slug: "edit-shuffled-youtube-music-queue",
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["youtube-music-play-several-songs-next", "mac-play-key-opens-apple-music"],
    title: "Move a song in shuffle and keep its place",
    description: "Put a favorite between two shuffled tracks and return to the edited sequence when you reopen Moosik.",
    category: "Queue & library",
    body: `<p>Shuffle turns up a song you want to hear, but it’s eight tracks away. You can bring that one song forward in Moosik and leave the rest of the shuffled run in place. The list under <strong>Next up</strong> shows the order the player will actually use.</p>
      <h2>Change just the transition you care about</h2>
      <p>With shuffle on and music playing, open <strong>Queue</strong>. Suppose the next songs are A, B and C, and you want the eighth song between A and B. Drag its row toward the top of B. Release when the insertion line sits between A and B. Check the first three upcoming rows: they should now be A, your pick, then B. The playing song stays at its current position.</p>
      <p>Quit Moosik normally when you finish listening. Open it again and return to <strong>Queue</strong>. Moosik restores the saved queue paused, including the edited shuffle order. Press play to continue from that session. Opening the source playlist and starting it again begins a different listening session.</p>
      <p>This edit belongs to the queue. If you want the original album again tomorrow, its track list still has the artist’s order. <a href="${docs}/queue.md">Queue behavior with shuffle</a> · <a href="${docs}/media-controls.md#explicit-resume-launch">What Moosik restores at launch</a>.</p>`,
  },
  {
    slug: "clear-youtube-music-queue-keep-current-song",
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["save-youtube-music-radio-queue", "edit-shuffled-youtube-music-queue"],
    title: "Let the last song finish, then stop autoplay",
    description: "Clear upcoming radio tracks in Moosik and undo the clear if you change your mind.",
    category: "Queue & library",
    body: `<p>If you’re packing up while the last song plays, you may want its ending and nothing after it. Removing radio recommendations one by one leaves you watching the queue. Moosik’s <strong>Clear queue</strong> handles the upcoming tracks and stops the active radio mix from filling their places.</p>
      <h2>Clear what comes after the current track</h2>
      <p>Open <strong>Queue</strong> in the sidebar. If you want silence after this track, make sure repeat is off. Check the song at the top, then look under <strong>Next up</strong>. Choose <strong>Clear queue</strong> above the upcoming list. In a narrow queue panel the same button reads <strong>Clear</strong>. The upcoming list empties while the player continues from the same instant in the current song.</p>
      <p>Picked the wrong moment? Choose <strong>Undo</strong> in the queue right away. You can also press <strong>⌘Z</strong> on Mac or <strong>Ctrl+Z</strong> on Windows with the queue focused. This restores the queue edit while playback continues. Moosik keeps one level of queue undo; a later queue change or a different playing song can invalidate it.</p>
      <p>If you might want the mix next weekend, <a href="/blog/save-youtube-music-radio-queue/">save the lineup before clearing it</a>. Choose <strong>Save as private playlist</strong> on the full Queue page and give it a name. That gives you something to reopen long after the undo window has passed. <a href="${docs}/queue.md">See the clear and undo behavior.</a></p>`,
  },
  {
    slug: "copy-songs-between-youtube-music-playlists",
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["mix-local-files-youtube-music-playlist", "youtube-music-play-several-songs-next"],
    title: "Copy several songs to a playlist you can open on your phone",
    description: "Choose the right destination for tracks selected in Moosik, including what syncs to your YouTube account.",
    category: "Queue & library",
    body: `<p>You’ve found three songs for a road trip while listening on your laptop. If you want them in the YouTube Music app on your phone, the destination needs to be an editable <strong>YouTube account playlist</strong>. A private Moosik playlist works well for organizing a set at home. It lives on the computer where you created it.</p>
      <h2>Copy the three tracks</h2>
      <ol><li>Sign into the YouTube account you use on your phone. Make sure the destination playlist is visible in Moosik’s sidebar and that you can edit it.</li>
      <li>In an album, playlist or other song list, hold <strong>⌘</strong> on Mac or <strong>Ctrl</strong> on Windows and click your three streamed tracks. You can select upcoming tracks in the Queue page the same way.</li>
      <li>Drag one of the selected rows onto the destination playlist. When the playlist is outlined, release. Open that playlist in YouTube Music on your phone under the same account to check the result. The songs remain in their source list.</li></ol>
      <h2>If the playlist won’t accept the drop</h2>
      <p>Check the whole selection for a local file. A YouTube playlist accepts streamed tracks, a file playlist accepts local files, and a private playlist accepts both. A smart playlist fills itself from its listening rule. For a mixed selection, pick just the streamed tracks for your phone and keep the complete set in a private playlist on desktop. <a href="${docs}/queue.md#song-transfers-0116">See Moosik’s transfer rules.</a></p>`,
  },
];
