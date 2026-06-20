# DandDsRTT.github.io

This repository backs **<https://danddsrtt.github.io/>**, which **redirects to the live app**:

➡️ **<https://danddsrtt-app.onrender.com/>** — D&D's RTT App (a Regular Temperament Theory tool)

## What this repo is (and isn't)

It used to publish the static build of the old TypeScript/React frontend (`rtt-app`).
The app has since been rewritten as a Python / [NiceGUI](https://nicegui.io) monolith
([`DandDsRTT/rtt-python`](https://github.com/DandDsRTT/rtt-python)), which runs as a web
service on [Render](https://render.com). A NiceGUI app needs a live server — it can't be
served as static files — so GitHub Pages can't host it directly. This repo therefore now
contains only a small redirect:

- **`index.html`** — sends visitors to the Render-hosted app, forwarding any `?query`
  string and `#hash` so shared links keep their state.
- **`.nojekyll`** — tells GitHub Pages to serve the files as-is (skips the Jekyll build).

> Note: the app runs on Render's free tier, which sleeps after ~15 minutes of inactivity,
> so the first visit after idle can take ~1 minute to wake up.

## Source code

The app itself lives in **[DandDsRTT/rtt-python](https://github.com/DandDsRTT/rtt-python)**.
