export const REPO = 'https://github.com/AtotheY/moosik';
export function detectPlatform(userAgent, platform = '') {
  if (/Android|iPhone|iPad|iPod/i.test(userAgent)) return 'choose';
  if (/Win/i.test(platform || userAgent)) return 'windows';
  if (/Mac/i.test(platform || userAgent)) return 'mac';
  return 'choose';
}
export function selectDownloads(releases) {
  const result = { mac: null, windows: null };
  for (const release of releases) {
    if (release.draft || release.prerelease || !/^moosik-v\d+\.\d+\.\d+$/.test(release.tag_name)) continue;
    for (const asset of release.assets || []) {
      const url = asset.browser_download_url;
      if (typeof url !== 'string' || !url.startsWith(REPO + '/releases/download/')) continue;
      const item = { url, version: release.tag_name.replace('moosik-v',''), size: asset.size || 0, name: asset.name };
      if (!result.mac && /^moosik-.*-macos-arm64\.dmg$/.test(asset.name)) result.mac = item;
      if (!result.windows && /^moosik-.*-windows-x86_64-setup\.exe$/.test(asset.name)) result.windows = item;
    }
  }
  return result;
}
