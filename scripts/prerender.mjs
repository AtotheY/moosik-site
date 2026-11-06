import { readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

// Render the same components the browser hydrates, including the release links.
const vite = await createServer({
  server: { middlewareMode: true, ws: false, hmr: false, watch: null },
  appType: "custom",
});
try {
  const pages = [
    ["/src/App.tsx", "../dist/index.html"],
    ["/src/DownloadPage.tsx", "../dist/download/index.html"],
  ];
  for (const [component, relativePath] of pages) {
    const { default: Page } = await vite.ssrLoadModule(component);
    const file = new URL(relativePath, import.meta.url);
    const template = await readFile(file, "utf8");
    const root = '<div id="root"></div>';
    if (!template.includes(root)) throw new Error("Missing page root in " + relativePath);
    const markup = renderToString(createElement(Page));
    await writeFile(file, template.replace(root, () => `<div id="root">${markup}</div>`));
  }
} finally {
  await vite.close();
}
