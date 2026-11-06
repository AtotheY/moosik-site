import { useEffect, useState } from "react";
import cached from "./release-cache.json";

export interface Release {
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
  assets: Array<{name:string; size:number; browser_download_url:string}>;
}

export function useReleaseCatalog(): Release[] {
  const [releases, setReleases] = useState<Release[]>(cached);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    fetch("https://api.github.com/repos/AtotheY/moosik/releases?per_page=30", {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    }).then(async response => {
      if (!response.ok) return;
      const list = await response.json();
      if (!controller.signal.aborted && Array.isArray(list)) {
        const valid = list.filter(item => item && typeof item.tag_name === "string" &&
          Array.isArray(item.assets) && item.assets.every((file: Release["assets"][number]) =>
            file && typeof file.name === "string" && typeof file.browser_download_url === "string"));
        if (!list.length || valid.length) setReleases(valid);
      }
    }).catch(() => { /* Keep the release snapshot on a network failure. */ })
      .finally(() => clearTimeout(timer));
    return () => { controller.abort(); clearTimeout(timer); };
  }, []);
  return releases;
}
