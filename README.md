# SAC Widget Add-On: Tooltip Mini-Chart (GitHub Pages ready)

This folder is tailored for your repo **luk89gra/SAC-addon-tooltip** and uses **GitHub Pages** as host.

## Quick publish
1. Copy **mini-tooltip.js**, **mini-tooltip-builder.js** to the root of your GitHub repo `SAC-addon-tooltip`.
2. Enable GitHub Pages: *Settings → Pages → Build and deployment → Deploy from branch*; Branch: **main**; Folder: **/** (root).
3. After Pages builds, your site will be: **https://luk89gra.github.io/SAC-addon-tooltip/**.
4. Upload **tooltip-addon.json** to SAC (Stories → Widget Add‑Ons → Create → select JSON). It already points to `https://luk89gra.github.io/SAC-addon-tooltip`.

## Use in a story
- Select a built‑in chart → **Builder → Custom Add‑Ons → Enable → + Add Add‑On** → pick "Tooltip Mini‑Chart Add‑On".
- Configure **dimension** and **measure** (technical names), choose **bar/line**, etc.

## Local dev (optional)
- Serve locally with: `npx http-server -p 8088` and adjust the JSON accordingly.

MIT License.
