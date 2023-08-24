# Chrome Extension for Surfline.com
- because they think its cool to limit your content even when your a paying premium member...
## Purpose
The primary goal of this extension is to enable premium surfline users to watch videos in fullscreen continuously on Surfline.com without the interruption of the 'are you watching' popup every ~15 minutes.

## Features
- Introduces a 'fullscreen' button on Surfline.com web pages.
- Automatically detects and clicks the 'yes' button when the 'are you watching' popup appears.
- Detects when there's a stream error (e.g., 'refreshing stream message') and reloads the page with `&fs=true` as a parameter. This parameter instructs the website to load the video player in fullscreen mode immediately.

## How to Use
1. Activate your browser's fullscreen mode (usually by pressing F11).
2. Click on the 'fullscreen' button located at the bottom right of the web page.

## Development
- `npm run dev` to develop with watch mode
- `npm run build` will build the chrome-extension package and then zip it up
- `src/content` runs on the extension side
- `src/inject` gets injected on the web page and allows communication with the websites window object

## Notes
- webpack is setup to NOT minify files.
- web_accessible_resources on the manifest is needed to inject scripts
- node 17