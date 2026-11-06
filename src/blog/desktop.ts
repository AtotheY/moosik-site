import cached from '../lib/release-cache.json';
import { selectDownloads } from '../lib/releases.mjs';
import type { GuidePost } from './types';

const release = 'https://github.com/AtotheY/moosik/releases/latest';
const published = selectDownloads(cached);
const macDMG = published.mac?.url ?? '/download/#mac';
const winSetup = published.windows?.url ?? '/download/#windows';
const tagged = 'https://github.com/AtotheY/moosik/blob/moosik-v0.1.26';

export const desktopPosts: GuidePost[] = [
  {
    slug: 'compare-youtube-music-desktop-clients',
    publishedAt: "2026-11-06T06:53:37Z",
    updatedAt: "2026-11-06T07:17:45Z",
    related: ["youtube-music-desktop-web-app-or-native-player", "listening-history"],
    title: 'Which YouTube Music desktop player fits how you listen?',
    searchTitle: 'YouTube Music desktop players compared for Mac and Windows',
    description: 'Compare Moosik, Cellar, Nixie and YTMDesktop+ for local history, cross-device listening, queue editing and Discord.',
    category: 'Desktop player',
    body: `<p>If you already pay for YouTube Music, the choice is often about what happens around the song: finding it again, keeping a queue across restarts, or listening with a friend. We make Moosik. For this November 2026 comparison, we checked what each project documents publicly. Choose the job you care about first.</p>
<h2>Find a track by when you heard it</h2>
<p>For a listener who uses one computer and remembers an artist but not a title, Moosik has a concrete workflow: open Recently played, select Last 7 days, search the artist and choose Play next. It records local listens from the moment you start using it. <a href="/blog/listening-history/">See the search and resulting queue in Moosik.</a></p>
<p>For someone who starts an album on one computer and finishes on another, <a href="https://cellar.fm/features">Cellar documents synced history and cross-device resume</a>. It also supports Last.fm and Libre.fm for listeners who already keep their plays there. Moosik’s detailed local ledger stays with its installation.</p>
<h2>Build a queue you want to keep</h2>
<p>Moosik lets you select several upcoming tracks, move them together, and <a href="/blog/save-youtube-music-radio-queue/">save the current mix as a private playlist</a>. Cellar also documents multi-selection and queue reordering. If your main concern is returning to exactly where you left off, <a href="https://nixieplayer.com/">Nixie documents restoration of the queue, track, position and shuffle state</a>. It also offers selectable loudness targets and a build for Intel Macs. The <a href="/download/#mac">Mac installer</a> for Moosik 0.1.26 requires Apple Silicon and macOS 26.0 or later.</p>
<h2>Listen with a friend on Discord</h2>
<p>Moosik 0.1.26 lets a friend open a song independently or follow the host’s pauses, skips and seeks. <a href="https://ytmdesktopplus.com/">YTMDesktop+</a> also documents a Listen Along button on Discord. Its guests can listen in a browser. Moosik’s guests install the desktop player on their own computer. <a href="https://cellar.fm/features/listening-party">Cellar’s listening parties</a> offer a different setup: guests can suggest tracks inside Cellar and the host controls playback. For Moosik’s version, <a href="/blog/youtube-music-discord/">see the setup and try the interactive demo</a>.</p>
<h2>A quick way to decide</h2>
<p>Take one track you remember playing yesterday and five songs you want to play next. On the same computer, try finding the first track, moving the five upcoming songs together, and reopening the player. Use songs heard in that client for the history test. This makes the difference between a searchable history, a recently played list and a restored queue apparent in a few minutes.</p>`,
  },
  {
    slug: 'install-youtube-music-player-apple-silicon-mac',
    publishedAt: "2026-11-06T06:53:37Z",
    updatedAt: "2026-11-06T07:06:57Z",
    related: ["check-install-moosik-desktop-updates", "mac-play-key-opens-apple-music"],
    title: 'Install Moosik on an Apple Silicon Mac',
    description: 'Pick the right disk image, open Moosik from Applications, and understand the first-launch macOS prompt.',
    category: 'Desktop player',
    body: `<p>Open the Apple menu and choose <strong>About This Mac</strong>. Look for a Chip entry such as Apple M1, M2, M3 or later. Those Macs use the <strong>arm64</strong> download. Check the macOS version on that same screen. Moosik 0.1.26 requires macOS 26.0 or later, according to its <a href="https://github.com/AtotheY/moosik/releases/download/moosik-v0.1.26/appcast.xml">published update feed</a>. The release has no Intel installer.</p>
<h2>Choose the disk image</h2>
<ol><li>Download the <a href="${macDMG}">official Apple Silicon disk image</a>, or check versions on the <a href="/download/#mac">Moosik downloads page</a>. The file ends in <code>macos-arm64.dmg</code>. The Mac ZIP on the same page is used for app updates.</li><li>Open the DMG in Finder and drag <strong>Moosik</strong> into <strong>Applications</strong>. Eject the disk image and start the copy in Applications. This also gives the updater a permanent copy to replace later.</li><li>Sign in inside Moosik to browse your YouTube Music account. Moosik is designed for YouTube Premium or YouTube Music Premium subscribers.</li></ol>
<h2>What the first-launch warning means</h2>
<p>Moosik’s Mac download is self-signed and has not been notarized by Apple. If macOS says it cannot verify the developer, confirm that you chose the official release. If you trust that copy, Apple documents an app-specific <strong>Open Anyway</strong> option under <strong>System Settings → Privacy &amp; Security</strong> after an attempted launch. A message that Apple detected malware is a different warning. <a href="https://support.apple.com/en-ca/guide/mac-help/mh40616/mac">Apple’s first-launch instructions</a>.</p>`,
  },
  {
    slug: 'youtube-music-windows-installer-or-portable',
    publishedAt: "2026-11-06T06:53:37Z",
    updatedAt: "2026-11-06T07:06:57Z",
    related: ["check-install-moosik-desktop-updates", "youtube-music-discord"],
    title: 'Choose the Windows installer or portable ZIP',
    description: 'Get the right Moosik x64 build for your PC, keep the playback files together, and know how each copy updates.',
    category: 'Desktop player',
    body: `<p>For a Windows PC you use every day, choose the setup installer. It creates a Start menu entry and lets Moosik install future updates in the app. The portable ZIP makes sense when you want to unpack the program into a folder you choose and manage upgrades yourself.</p>
<h2>Download the right Windows build</h2>
<p>In Windows, open <strong>Settings → System → About</strong> and check <strong>System type</strong>. Moosik’s published Windows builds target x64 and are experimental. The <a href="${release}">release assets</a> include a Windows file ending in <code>x86_64-setup.exe</code> and another ending in <code>x86_64.zip</code>.</p>
<ul><li><strong>Setup EXE.</strong> Run the <a href="${winSetup}">Windows x64 setup installer</a>, then open Moosik from Start. The installer is unsigned, so SmartScreen may show a publisher warning. Verify the filename and download source before deciding to run it.</li><li><strong>Portable ZIP.</strong> Extract the entire archive. Open <code>refryt.exe</code> from the extracted folder. The executable still uses the upstream project’s internal name. Keep its DLLs alongside it; copying just the EXE can prevent the player from starting.</li></ul>
<p>For a portable upgrade, quit Moosik and extract the new ZIP into a fresh folder. Keep any shortcuts pointed at the new copy. “Portable” describes how the app files are distributed; settings and sign-in data can still live in your Windows user profile. <a href="${tagged}/docs/client-updates.md">Updater behavior by platform</a>.</p>`,
  },
  {
    slug: 'mac-play-key-opens-apple-music',
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["edit-shuffled-youtube-music-queue", "install-youtube-music-player-apple-silicon-mac"],
    title: 'Make the Mac play key resume Moosik',
    description: 'Choose what happens when the media key would launch Apple Music, including after you quit Moosik.',
    category: 'Desktop player',
    body: `<p>You pause a song in Moosik, quit the app, and later press the play key expecting to pick up where you left off. If the Mac opens Apple Music instead, Moosik has an optional fallback for that particular moment.</p>
<h2>Turn on the fallback</h2>
<ol><li>Open <strong>Settings → System → Media keys</strong> in Moosik. Enable <strong>Use Moosik instead of Apple Music</strong>.</li><li>If macOS asks for permission to run the helper in the background, use the <strong>Open System Settings</strong> button in Moosik and allow its background activity.</li><li>Try it with a song already in your queue. Quit Moosik and press play while no other player is active. When the key would open Apple Music, the helper starts Moosik and resumes the saved song.</li></ol>
<p>macOS still sends normal media controls to whichever player is active. If you are watching a video, play/pause may go there. The fallback responds to an Apple Music launch, and macOS does not distinguish pressing the key from deliberately clicking the Music icon. To open Apple Music yourself, turn the Moosik switch off first.</p>
<p>If you previously set up noTunes for this job, quit it and remove its Login Item before enabling Moosik’s bundled helper. <a href="${tagged}/docs/media-controls.md">Moosik’s media controls guide</a>.</p>`,
  },
  {
    slug: 'youtube-music-desktop-home-blank',
    publishedAt: "2026-11-06T07:17:45Z",
    related: ["listening-history", "check-install-moosik-desktop-updates"],
    title: 'YouTube Music opens, but Home is blank',
    description: 'Check whether the problem follows one account, then see when Moosik can recover the desktop Home feed.',
    category: 'Desktop player',
    body: `<p>If Library or Search still opens but Home is empty, test the Home feed separately. One <a href="https://www.reddit.com/r/YoutubeMusic/comments/1xkk1af/">desktop listener</a> saw the same blank page on two PCs and two networks, while another account worked. That symptom is a clue. It doesn’t identify the cause on its own.</p>
<h2>Check what still works</h2>
<ol><li>Open Search and find a song you already know. Then open Library. If those pages work, note that Home is the failing view.</li><li>Open <a href="https://music.youtube.com/">music.youtube.com</a> in a private browser window and compare the signed-out Home page. This lets you test another session without clearing your current sign-in. A signed-out feed contains different recommendations, so compare whether it loads rather than which songs appear.</li><li>If you can, try the affected account on another device. Record which account context and which page failed before changing settings. A failure across devices points you away from reinstalling a single desktop app as a first step.</li></ol>
<h2>What Moosik retries</h2>
<p>In Moosik 0.1.19 and later, the first unfiltered Home request has a fallback for a specific server rejection (HTTP 400). Moosik then tries the web homepage and checks that the feed belongs to the requested account. This retry applies to the initial Home feed. It won’t repair a playback error, a different failed request, or a missing section in an otherwise loaded feed. <a href="https://github.com/AtotheY/moosik/releases/tag/moosik-v0.1.19">Release notes</a> · <a href="https://github.com/AtotheY/moosik/blob/moosik-v0.1.26/crates/refryt/src/api/home_page.rs">Account matching in the released client</a>.</p>
<p>If you just want to get back to a song while Home is unavailable, open it from <strong>Library</strong> or <a href="/blog/listening-history/">your Moosik listening history</a>.</p>`,
  },
  {
    slug: 'check-install-moosik-desktop-updates',
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["install-youtube-music-player-apple-silicon-mac", "youtube-music-windows-installer-or-portable"],
    title: 'Check which Moosik update you’re installing',
    description: 'Use the toolbar arrow or About panel, check the release on GitHub, and distinguish a check failure from an up-to-date app.',
    category: 'Desktop player',
    body: `<p>The download arrow immediately to the left of your profile picture lights up when Moosik has an update to offer. With automatic checks enabled, the app checks at startup and every 15 minutes while it is running.</p>
<h2>Check now and install</h2>
<ol><li>Open <strong>Settings → About → Updates</strong> for a manual check. Compare the offered version with the <a href="${release}">latest Moosik release</a>. The installer and update feed come from the AtotheY/moosik project.</li><li>Click the lit toolbar arrow or <strong>Update now</strong>. On Mac, Sparkle installs the prepared update or brings its installer forward. Allow Moosik to restart. The app saves the queue and playback position before that relaunch.</li><li>On Windows, a setup installation downloads the installer and verifies its checksum. A portable installation opens the releases page so you can download the replacement ZIP yourself.</li></ol>
<h2>If a newer version appears to be missing</h2>
<p>An offline check, a rate limit or a server error leaves the result unknown. Retry when connected and compare the actual release with the version in About. A Git tag by itself may precede the downloadable installer. On Mac, a failed archive signature check leaves the installed app in place. Moosik verifies update archives with its own signing key; Apple’s notarization process is separate. <a href="${tagged}/docs/client-updates.md">How Moosik verifies and installs updates</a>.</p>`,
  },
  {
    slug: 'youtube-music-desktop-web-app-or-native-player',
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["compare-youtube-music-desktop-clients", "install-youtube-music-player-apple-silicon-mac"],
    title: 'YouTube Music’s web app or Moosik on desktop?',
    description: 'Compare Google’s installable web player with an independent desktop app that uses the same YouTube Music account.',
    category: 'Desktop player',
    body: `<p>If all you want is YouTube Music in its own window, start with Google’s installable web app. Open <a href="https://music.youtube.com/">YouTube Music</a> in Chrome, sign in, and use the install option for the site. You get the familiar YouTube Music controls and a shortcut you can launch without first finding a browser tab. Google also documents casting from the web player to a supported speaker, display or TV. <a href="https://support.google.com/youtubemusic/answer/9231765?hl=en">Google’s desktop app and device guide</a>.</p>
<h2>When a separate player is worth installing</h2>
<p>Moosik connects to your YouTube Music account through a native desktop interface. For example, you can select several upcoming songs, move them together, and save the queue as a private playlist on that computer. You can search the songs and artists you heard in Moosik and narrow the results by date. Those local records begin when you use the app; switching over today cannot recover something you played on your phone last week.</p>
<p>Choose Google’s web player if you want the official interface, casting workflow, or a computer outside Moosik’s packaged platforms. Consider Moosik if you want those local library tools and use an Apple Silicon Mac or a Windows x64 PC. The Windows build is experimental, and Moosik is intended for Premium accounts. <a href="${release}">Moosik desktop downloads</a>.</p>`,
  },
  {
    slug: 'youtube-music-synced-lyrics-desktop',
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["compare-youtube-music-desktop-clients", "custom-youtube-music-desktop-themes"],
    title: 'Follow synced lyrics and jump to a line',
    description: 'Open the lyrics panel, seek to a verse, and tell the difference between timed words, plain text, and a missing match.',
    category: 'Desktop player',
    body: `<p>Play a song and open <strong>Lyrics</strong> from the player controls. Moosik uses the right side of the window for either lyrics or the queue, so opening one replaces the other. The current song keeps playing when you switch panels.</p>
<h2>Jump back to a verse</h2>
<p>On a track with timed lyrics, the active line changes color as playback advances. Click a line to seek to its start. This works at line level: you can return to the beginning of a chorus without scrubbing the progress bar. Pause the song if you want to scroll ahead and read without the active line moving.</p>
<h2>Why some songs show plain text</h2>
<p>Moosik looks up the recording using its title and artist and, when available, album and duration. It uses timed lyrics from LRCLIB when it finds them. LRCLIB may return plain text instead; when the lookup misses, Moosik also tries YouTube’s lyrics. Plain lyrics can be read and scrolled, but individual lines have no playback time to jump to.</p>
<p>If one track has no match, check which recording you selected. A live take and its studio version can have different durations and different lyric matches. Trying the album version is a simple way to compare. <a href="${tagged}/crates/refryt/src/backend.rs">Lyric lookup implementation</a> · <a href="${tagged}/crates/refryt/src/ui/lyrics.rs">Player controls for timed lines</a>.</p>`,
  },
  {
    slug: 'custom-youtube-music-desktop-themes',
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["mac-play-key-opens-apple-music", "youtube-music-synced-lyrics-desktop"],
    title: 'Use a different Moosik theme for day and night',
    description: 'Choose separate light and dark palettes, follow your system appearance, or make a small custom theme.',
    category: 'Desktop player',
    body: `<p>You can use a light player during the day and keep a different dark palette ready for the evening. Moosik remembers one choice for each mode, so changing your system appearance can switch the entire player without another trip to Settings.</p>
<h2>Set up both palettes</h2>
<ol><li>Open <strong>Settings → Appearance → Colours</strong>. Set <strong>Mode</strong> to <strong>Light</strong>, then choose a light palette under <strong>Theme</strong>, such as Catppuccin Latte.</li><li>Switch Mode to <strong>Dark</strong> and choose a dark palette, such as Catppuccin Mocha. The menu shows themes for the currently selected mode.</li><li>Choose <strong>System</strong> to follow the computer’s appearance. If you prefer one palette all day, leave the matching Light or Dark mode selected.</li></ol>
<figure class="article-figure"><a href="/assets/themes.jpg"><img src="/assets/themes.jpg" alt="Moosik Appearance settings with System, Dark and Light under Colours, and the Rosé Pine theme selected." loading="lazy"></a><figcaption>Mode follows the system or stays dark or light. Theme chooses the palette within that mode.</figcaption></figure>
<h2>Try a color of your own</h2>
<p>Under <strong>Your own themes</strong>, choose <strong>Open folder</strong>. Copy a theme file before editing and give the copy a distinct name. For a small change, edit only its <code>--accent</code> color and keep the existing <code>--base</code>, <code>--text</code> and <code>color-scheme</code> declarations. Save the file and return to Moosik, then pick the copy by name. If it is missing from the list, check that the file’s light or dark scheme matches the current mode. <a href="${tagged}/docs/THEMES.md">Supported theme colors and file format</a>.</p>`,
  },
];
