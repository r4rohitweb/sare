# NOOLAM ? React showroom

A React 19 and Vite site for the NOOLAM silk saree showroom. The existing design, scroll-driven video, galleries, shopping bag, favourites, bridal collection and canvas weave are preserved.

## Develop

Requires Node.js 22 or later and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173). Vite reloads the page when source files change.

## Build and run in XAMPP

```sh
npm run build
```

Keep Apache running and open http://localhost/testing/saree/. The project .htaccess serves dist/index.html and its assets at this existing URL. Apache needs mod_rewrite and AllowOverride enabled. Rebuild after editing source to update the XAMPP version.

For another static host, upload the contents of dist. For a local production preview:

```sh
npm run preview
```

## Project structure

- src/main.jsx: React entry point and Strict Mode.
- src/App.jsx: page composition and the interaction lifecycle.
- src/components/: separate JSX components for the header, hero, archive, looks, colour edit, rack, festive silks, muse, silk stories, bridal collection, weave, footer, dialogs and ticker.
- src/styles.css: original responsive styling and animations.
- src/experience/index.js: existing shared catalogue, storage, scroll/video, carousel and canvas behavior, migrated from the four classic scripts into a scoped ES module. React renders the page; this module manages the existing DOM-driven interactions after commit. It is deliberately retained to preserve the complex motion behavior, rather than rewriting every interaction into React state in this migration.
- src/experience/lifecycle.js: removes listeners, timers, observers, animation frames and animations on unmount, restores generated DOM and page attributes, and ignores late asynchronous results. This also supports React Strict Mode and remounting.
- public/assets/: source images, hero video, browser alternate and provenance documents. Vite copies these into dist/assets during a build.
- tests/: browser regression tests and a development-only remount fixture.
- dist/: generated production output; ignored by Git.

Edit JSX components for page content, src/styles.css for presentation, and src/experience/index.js for existing interactive behavior. Do not edit dist files directly. There is no inline HTML injection or runtime loading of the previous classic scripts.

## Validate

```sh
npx playwright install chromium
npm test
```

The tests start and stop their own Vite server on port 5174. They cover all ten sections, asset loading, responsive widths from 320 to 1440 pixels, the SVG archive crops, bag deduplication/persistence/removal, rack filters, favourites, weave selections, keyboard and mobile controls, campaign/bridal shopping, hero media fallback, and complete unmount/remount cleanup.

To check the production build through Apache in PowerShell:

```powershell
$env:TEST_BASE_URL = 'http://localhost/testing/saree/'
npm test
Remove-Item Env:TEST_BASE_URL
```

The remount fixture is intentionally skipped against a production build. External Google Fonts requests are stubbed in browser tests so checks also work offline; the site retains its existing font fallbacks.

## Content and behavior

The shared bag and favourites persist in this browser with the original localStorage keys, preserving existing saved selections. The bag is a styling list, not checkout. Product descriptions and campaign images are illustrative; availability and pricing are confirmed in store.

The hero seeks the user-supplied muted walking-and-sitting video as the page scrolls. It retains WebM, poster and generated-scene fallbacks, lazy media loading and reduced-motion behavior. Campaign galleries use photographs. Other behavior includes accessible dialogs, keyboard navigation, swipe gestures, paused automatic rotation and native scrolling.

Image provenance and the hero source/encoding details remain in public/assets/*.md. Historical reference scripts remain under .reference; npm test is the maintained regression suite.
