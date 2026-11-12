# Repository Instructions

## Deployment identity

- This repository is the source for the BLNT Trade testnet UI at
  `https://blent.trade`.
- The `main` branch is automatically deployed to `https://blent.trade`.
- Use this local checkout to inspect the testnet site's source. Do not fetch or
  scrape the live site merely to determine what the repository deploys.
- The corresponding mainnet UI is the sibling checkout at `../../blnt-ui`; its
  `main` branch is automatically deployed to `https://blnt.trade`.
- Keep shared branding, legal terms, and common UI behavior aligned with the
  mainnet repository while preserving intentional testnet configuration,
  warnings, titles, and banners. Do not confuse `blent.trade` (testnet) with
  `blnt.trade` (mainnet).

## Local development server

- Use `http://localhost:3001` by default unless the user explicitly requests a
  different port.
- Before starting or restarting the UI, check for a listener on the selected
  TCP port, whether it is the default or an explicit override. If a process
  owns the port, terminate that exact process gracefully and wait for the port
  to become available.
- Start the default server with `npm run dev:testnet -- -p 3001`. Do not accept
  Next.js's automatic fallback to a different port; only use another port when
  the user explicitly overrides the default, and pass that port with `-p`.

Do not commit, push, or publish changes unless the user explicitly requests it.
