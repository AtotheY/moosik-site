import type { GuidePost } from "./types";

const stats = "https://github.com/AtotheY/moosik/blob/moosik-v0.1.26/docs/listening-stats.md";
const release = "https://github.com/AtotheY/moosik/releases/tag/moosik-v0.1.16";

export const listeningPosts: GuidePost[] = [
  {
    slug: "custom-youtube-music-recap",
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["export-listening-stats", "compare-listening-periods"],
    title: "Make a listening recap for any week, month, or trip",
    description: "Pick your own dates, find your top songs and biggest listening day, and save a recap you can edit.",
    category: "Listening stats",
    body: `<p>Want to know what you played over a long weekend? Moosik can make a recap as soon as you get home. It uses the music you played in this installation, so choose a period when you were actually listening here. Songs played on your phone won’t appear in the recap.</p>
<h2>Pick the dates you care about</h2>
<ol><li>Open <strong>Listening stats</strong> in the sidebar and choose <strong>Custom dates</strong> from the period menu.</li><li>Enter the first and last day in <strong>YYYY-MM-DD</strong> format. A Friday-to-Monday trip includes both Friday and Monday. Leave <strong>All sources</strong> selected to include any local files you played along with YouTube Music.</li><li>Choose <strong>My recap</strong>. Look for your top song, top artist, and biggest listening day. Under <strong>Your milestones</strong>, a new song means the first time Moosik heard you play it, even if you’ve owned the album for years.</li></ol>
<figure class="article-figure"><a href="/assets/stats-guide/plays-last-seven-days.webp"><img src="/assets/stats-guide/plays-last-seven-days.webp" alt="The Songs tab in Moosik’s listening stats, filtered to the last seven days." loading="lazy"></a><figcaption>The period and source menus sit above the report tabs. Sample listening data.</figcaption></figure>
<h2>Keep a copy</h2>
<p>Choose <strong>Export recap</strong> to save an editable Markdown file. You can add the trip dates and a note about why one song kept coming back, then share just that document. For a spreadsheet or database backup, <a href="/blog/export-listening-stats/">choose a different export format</a>. For a calendar month that has already ended, set the dates explicitly. <strong>Last 30 days</strong> moves forward each day and can include part of the following month.</p>
<p><a href="${stats}#what-you-can-explore">Recap contents and supported date ranges</a></p>`,
  },
  {
    slug: "what-counts-as-a-play",
    publishedAt: "2026-11-06T06:53:37Z",
    updatedAt: "2026-11-06T07:17:45Z",
    related: ["compare-listening-periods", "listening-history"],
    title: "What counts as a play, a skip, or a completed listen?",
    searchTitle: "See your personal YouTube Music play counts in Moosik",
    description: "See why a track can count as both a play and a skip, and how replaying one section affects completion.",
    category: "Listening stats",
    body: `<p>You played the first 45 seconds of a four-minute song, then chose something else. Moosik can count that session as one play <em>and</em> one skip. A play tells you that you spent enough time listening. A skip tells you how the session ended.</p>
<h2>Three numbers for one song</h2>
<ul><li><strong>Play.</strong> One session qualifies after 30 seconds of audible listening, or half the song’s known duration, whichever comes first. A 40-second interlude can qualify at 20 seconds. Two separate 15-second attempts at a four-minute track won’t combine into a play.</li><li><strong>Completed listen.</strong> A finished session needs at least 90% distinct coverage of a known-length track. Looping a favorite 30-second chorus builds listening time, but each part of the chorus counts only once toward coverage.</li><li><strong>Skip.</strong> Replacing a partly heard track before 90% coverage can count as a skip. Pausing it or closing the player does not register one.</li></ul>
<h2>Check a particular track</h2>
<p>Open <strong>Listening stats → Songs</strong>, find the track, and open <strong>View listening details</strong>. When comparing reports, use the same date range. A session crossing midnight can qualify for a play across two days together even if neither day contains enough audible seconds on its own. Moosik excludes pauses, buffering, and time muted inside the app from listening time.</p>
<h2>One song, two date ranges</h2>
<p>We checked “Late checkout” by Studio Four in a sample library. With <strong>Last 7 days</strong> and <strong>All sources</strong> selected, Songs showed one play and 2m 45s listened. After switching to <strong>All time</strong>, the same song’s details showed three plays, zero skips and 8m 15s. Two sessions were outside the seven-day window. We exported the all-time song stats as CSV and checked the same row: three plays, zero skips, three completed listens and 495 listening seconds.</p>
<div class="queue-proof"><figure class="article-figure"><a href="/assets/stats-guide/plays-last-seven-days.webp"><img src="/assets/stats-guide/plays-last-seven-days.webp" width="1560" height="1022" loading="lazy" alt="Moosik Songs report for Last 7 days: Late checkout has one play."></a><figcaption>Last 7 days: one play in this sample library.</figcaption></figure>
<figure class="article-figure"><a href="/assets/stats-guide/plays-all-time-details.webp"><img src="/assets/stats-guide/plays-all-time-details.webp" width="1560" height="1022" loading="lazy" alt="All-time song details for Late checkout show three plays and eight minutes fifteen seconds listened."></a><figcaption>All time: three plays of the same track.</figcaption></figure></div>
<p>These are counts of your plays recorded in Moosik. YouTube’s public video view counter measures a different population. <a href="${stats}#definitions">Full counting rules and recording limits</a>.</p>`,
  },
  {
    slug: "artist-genre-listening-totals",
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["rate-songs-and-tag-moods", "custom-youtube-music-recap"],
    title: "Why your artist and genre listening totals can overlap",
    description: "Follow one collaboration through the stats and see how Moosik credits each artist and each genre you assign.",
    category: "Listening stats",
    body: `<p>Suppose you listen to a four-minute duet straight through. The overall listening total increases by about four minutes. If the track credits two artists, each artist also gains about four minutes. Adding their rows gives eight minutes because the two rows describe the same listen from different artists’ perspectives.</p>
<h2>Trace a collaboration</h2>
<p>Open <strong>Listening stats</strong> and choose the dates when you played the duet. In <strong>Artists</strong>, open one credited artist’s row to explore the songs behind their total. Do the same for the other artist. If the track appears under both, that’s the shared credit. Use <strong>Overview</strong> for the total time you spent listening across the whole period.</p>
<h2>Read the genre breakdown the same way</h2>
<p>A track you label both <em>soul</em> and <em>jazz</em> contributes its full listening time to each genre. The genre rows answer “how long did I listen to music with this label?” If you want mutually exclusive categories to use in a pie chart, assign one primary genre per song. Keep extra descriptions such as <em>late night</em> in <strong>Tags &amp; moods</strong>.</p>
<p>Genre labels are yours to assign. In <strong>Genres</strong>, use <strong>Tag songs</strong> when untagged listening appears. Updating a song’s genres applies the labels across its recorded history, so revisiting an older period can give a different breakdown.</p>
<p><a href="${stats}#what-you-can-explore">Artist credit, genre labels, and Unknown entries</a></p>`,
  },
  {
    slug: "rediscover-forgotten-favorites",
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["rate-songs-and-tag-moods", "what-counts-as-a-play"],
    title: "Make a playlist of favorites you haven’t heard in a month",
    description: "Use Forgotten favorites to bring back songs you used to play and save a playlist that updates as you listen.",
    category: "Listening stats",
    body: `<p>A shuffle can miss the song you played every day last spring. Moosik’s <strong>Forgotten favorites</strong> starts from a different question: which tracks earned repeat plays on this computer and then fell out of rotation?</p>
<h2>Save the collection</h2>
<ol><li>Open <strong>Listening history</strong> in the sidebar, then <strong>Rediscover</strong>.</li><li>Select <strong>Forgotten favorites</strong>. A track needs at least three qualified plays and its last recorded session must be more than 30 days ago. A song you played five times two months ago can appear; one you played again yesterday has to wait.</li><li>Choose <strong>Keep as smart playlist</strong>, give it a name, and save it. Open it from the sidebar when you want to revisit the collection. Moosik checks the rule again when you open it.</li></ol>
<h2>When the list is empty</h2>
<p>The rule uses the listening record in this installation. If you started using Moosik last week, even an old favorite won’t have a month of recorded absence yet. Try <strong>Recent discoveries</strong> while the record grows, or rate a few songs and open <strong>Five-star songs</strong>.</p>
<p>Playing a forgotten favorite brings it back into rotation and eventually takes it out of the collection. To keep a particular song regardless of when you play it next, use the song’s <strong>Save privately</strong> action.</p>
<p><a href="${release}">Rediscover and smart playlists in the release notes</a> · <a href="${stats}#listening-history-and-rediscovery-0116">Collection rules</a></p>`,
  },
  {
    slug: "rate-songs-and-tag-moods",
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["rediscover-forgotten-favorites", "artist-genre-listening-totals"],
    title: "Rate a song and find it again by mood",
    description: "Add private star ratings and mood tags, then search your listening stats for exactly the tracks you want.",
    category: "Listening stats",
    body: `<p>If a track belongs on both a late-night mix and a focus playlist, tag it once with both moods. You can find it later even if you forget the artist. Moosik saves these labels locally, so you can use your own shorthand without changing the song on YouTube.</p>
<h2>Add a rating and mood</h2>
<ol><li>Open <strong>Listening stats → Songs</strong>. Choose a date range that includes the track, or select <strong>All time</strong>. Find the song and open its info button, <strong>View listening details</strong>.</li><li>In <strong>Tags &amp; moods</strong>, enter a couple of labels separated by commas, such as <em>late night, focus</em>. Use the separate <strong>Genres</strong> field for musical styles you want to appear in the genre rankings.</li><li>Under <strong>Rating</strong>, choose a number from 1 to 5, then <strong>Save</strong>. The dash clears the rating.</li></ol>
<h2>Find a track for tonight</h2>
<p>Return to <strong>Songs</strong> and enter <em>focus</em> in <strong>Search songs, artists or tags</strong>. Choose <strong>Star rating</strong> from the sort menu to bring your highest-rated matches to the top. Keep the same spelling when tagging more tracks so one search can find the set.</p>
<p>For a collection of all your five-star picks, open <strong>Listening history → Rediscover → Five-star songs</strong>. Choose <strong>Keep as smart playlist</strong> if you want it in your sidebar.</p>
<p><a href="${stats}#what-you-can-explore">Song details, tags, ratings, and sorting</a></p>`,
  },
  {
    slug: "export-listening-stats",
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["custom-youtube-music-recap", "listening-history"],
    title: "Export listening stats, share a recap, or back up the database",
    description: "Choose the right file for a spreadsheet, a shareable listening summary, or a complete personal archive.",
    category: "Listening stats",
    body: `<p>The file to send a friend is different from the one to keep in your backup folder. Start in <strong>Listening stats</strong>, choose the period and source you want, then open the <strong>•••</strong> menu labeled <strong>Export and more</strong>.</p>
<ul><li><strong>Export recap</strong> saves a Markdown summary for the selected range. Open it in a text editor, trim anything you’d rather keep private, and share the result.</li><li><strong>Export song stats</strong> saves a CSV for the selected dates and source. For example, select <strong>Last 30 days</strong> and <strong>Local files</strong> for a spreadsheet of local tracks. The search box and sort order in the Songs tab only affect the screen. Filter or sort the exported rows in your spreadsheet.</li><li><strong>Export all history</strong> saves JSON containing the selected report plus the entire listening record, including other dates, playback events, and tag edits. Local track identifiers can include file paths. Check the contents before sending it anywhere.</li><li><strong>Back up database</strong> creates a SQLite snapshot of committed records. Use it to preserve a consistent copy while Moosik is running. Copying only the live database file can miss recently committed writes.</li></ul>
<p>Choose a destination and keep the file somewhere you can find again. Moosik does not upload it automatically. A database backup is useful for safekeeping; the current release has no in-app import or restore workflow.</p>
<p><a href="${stats}#exports">Exactly what goes into each export</a></p>`,
  },
  {
    slug: "compare-listening-periods",
    publishedAt: "2026-11-06T06:53:37Z",
    related: ["what-counts-as-a-play", "artist-genre-listening-totals"],
    title: "Compare two weeks of listening and spot rising artists",
    description: "Read Moosik’s change in listening time and discover which artists gained the most minutes over the previous period.",
    category: "Listening stats",
    body: `<p>Your most-played artist and your fastest-rising artist can be different people. If you listened to one artist for two hours in each of two weeks, they may still lead the chart. Another artist who went from five minutes to forty gained 35 minutes and can appear under <strong>On the rise</strong>.</p>
<h2>Compare a finished week</h2>
<p>In <strong>Listening stats</strong>, select <strong>Custom dates</strong> and enter a completed week from Monday through Sunday. Open <strong>Overview</strong>. Moosik compares listening time with the immediately preceding interval of equal length. Pick <strong>All sources</strong> for the broadest comparison, or choose <strong>Local files</strong> to compare only local-file playback in both periods.</p>
<p>If the earlier interval had four hours and the selected one has five, the headline shows a 25% increase. <strong>On the rise</strong> lists up to three artists, ordered by minutes gained. An artist needs at least one extra minute to appear. The increase beside each name is time, while the headline change is a percentage.</p>
<h2>If there’s no comparison</h2>
<p><strong>All time</strong> has no earlier interval to compare. A bounded period also needs earlier recorded listening for the comparison to appear. If you installed Moosik halfway through the earlier week, a large increase may say more about when recording began than about your habits. Compare two complete weeks of use before drawing conclusions.</p>
<p><a href="${stats}#listening-history-and-rediscovery-0116">Period comparisons</a> · <a href="https://github.com/AtotheY/moosik/blob/moosik-v0.1.26/crates/refryt/src/ui/listening.rs">Released ranking logic</a></p>`,
  },
];
