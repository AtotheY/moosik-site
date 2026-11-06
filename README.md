# Moosik website

Source for the [Moosik landing page](https://moosik.dev), download page, interactive player demo, and guides. The [desktop player and releases](https://github.com/AtotheY/moosik) live in a separate repository.

## Run locally

Use Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

Run `npm test` for the release and handoff tests. Run `npm run build` to generate the static site in `dist/` and verify its pages and installer links. The demo uses fictional music and original illustrations.

## License and credits

The site code and original demo illustrations are licensed under [GPL-3.0-or-later](LICENSE). The desktop interface shown in the guides comes from Moosik, an independent fork of [Refryt](https://github.com/gridoe/refryt) by gridoe and contributors. Third-party components retain their own licenses. See the [shadcn/ui notice](notices/shadcn-ui.txt) for the adapted UI components. The Moosik name and logos identify the official project.
