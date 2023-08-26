
## Chrome Extension for Surfline.com
<p align="center">
  <img src="https://github.com/dsaisho/chrome-extension-surfline/blob/master/images/promo.jpg?raw=true" alt="alt text">
</p>

## Purpose
The primary goal of this extension is to enable premium surfline users to watch videos in fullscreen continuously on Surfline.com without the interruption of the 'are you watching' popup every ~15 minutes.

## Why
Because they think its cool to limit your content even when your a paying premium member...

## Features
- Introduces a 'fullscreen' action icon on Surfline.com web pages.
- Automatically detects and clicks the 'yes' button when the 'are you watching' popup appears.
- Detects when there's a stream error (e.g., 'refreshing stream message') and reloads the page in fullscreen mode.

## How to Use
1. Activate your browser's fullscreen mode (usually by pressing F11).
2. Click on the 'fullscreen' action icon ![alt text](https://github.com/dsaisho/chrome-extension-surfline/blob/master/images/off.png?raw=true)
to turn it on ![alt text](https://github.com/dsaisho/chrome-extension-surfline/blob/master/images/on.png?raw=true)
3. Click the icon again to turn it off and go back to the original view of the site.
- Hint* Pin the extension for better ease of use.

## Installation
1. **Open Chrome Extensions Page**:
   - download the `surfline-extensions` directory from this repo. (or build it)

2. **Open Chrome Extensions Page**:
   - Open the Google Chrome browser.
   - Click on the three vertical dots (⋮) on the top right corner to open the browser menu.
   - Navigate to `More tools` > `Extensions` or simply type `chrome://extensions/` in the address bar and hit Enter.

3. **Enable Developer Mode**:
   - On the Extensions page, you'll see a toggle switch at the top right corner labeled "Developer mode." Switch it on.

4. **Load Unpacked Extension**:
   - Click on the `Load unpacked` button that appears.
   - Navigate to where you downloaded `surfline-extensions`, ensure `manifest.json` is within that directory.
   - Select the directory (or folder) and click on the `Select Folder` button.

5. **Extension Loaded**:
   - You should now see your extension listed on the Extensions page. If there are any errors in your extension, they will be displayed here.
   - Pin the extension for better ease of use.
## Development
- `npm run dev` to develop with watch mode
- `npm run build` will build the chrome-extension package and then zip it up
- `src/background` service worker
- `src/content` runs on the extension side (only access to dom)
- `src/inject` gets injected on the web page and allows communication with the websites window object

## Notes
- webpack is setup to NOT minify files.
- `web_accessible_resources` on the manifest is needed to inject scripts
- node 17