/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/utils.js
/**
 * Waits for an element matching the given selector to exist in the DOM.
 * @param {string} selector - The CSS selector of the element to wait for.
 * @returns {Promise<HTMLElement>} - A promise that resolves with the element once it exists.
 */
const waitForElement = async (selector) => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(selector)) {
            // If element already exists, resolve the promise immediately
            resolve(document.querySelector(selector));
            return;
        }

        // Otherwise, use a MutationObserver to detect when the DOM changes
        const observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
                if (mutation.addedNodes.length) {
                    const element = mutation.target.querySelector(selector);
                    if (element) {
                        // If the element now exists, resolve the promise and disconnect the observer
                        resolve(element);
                        observer.disconnect();
                        return;
                    }
                }
            }
        });

        // Start observing the document with the configured parameters
        observer.observe(document, { childList: true, subtree: true });
    });
}
// Usage:
// onElementAdded('.myTargetElementClass', (element) => {
//     console.log('Target element added:', element);
// });
function onElementAdded(selector, callback) {
    // Create a MutationObserver instance
    const observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length) {
                const element = mutation.target.querySelector(selector);
                if (element) {
                    callback();
                    return;
                }
            }
        }
    });

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
}





;// CONCATENATED MODULE: ./src/injected.js


const addListeners = () => {
    //when the 'are you still watching' message comes up
    onElementAdded('.quiver-cam-timeout__message button', onTimeoutMessage)
    //when 'buffering' comes up
    onElementAdded(`[class*="CamError"]`, reload)
}

const onTimeoutMessage = async () => {
    console.log('Surfline Extension: Popup Shown')
    const reloadBtn = await waitForElement('.quiver-cam-timeout__message button')
    reloadBtn.click()
    setTimeout(() => {  
        setupStyles()
    },200)
}

const setupStyles = async () => {
    await waitForElement('[class*="SpotReportCams_multiCamContainer"]')
    //////////////// POSITION STATICS TO CLEAR RELATIVES
    const relativeEls = document.querySelectorAll(`
    [class*="SpotReportCams_multiCamContainer"], 
    [class*="SpotReportCam_multiCam"],
    [class*="SpotReportCams_spotReportCams"],
    [class*="SpotCurrentConditionsSection_currentConditions"]
    `)

    relativeEls.forEach(el => {
        el.style.position = 'static'
    })

    ///////////////// CLEAR GRADIENT (that white overlay on the video bottom)
    // Create a style element
    let style = document.createElement('style');
    // Add the CSS rule to the style element
    style.innerHTML = `
  [class*="SpotCurrentConditionsSection_currentConditionsGradient"]::after {
    display:none;
  }
`;
    // Append the style element to the head of the document
    document.head.appendChild(style)

    //////////////// CLEAR CONTROLS
    const displayNoneEls = document.querySelectorAll(`
[class*="MuiStack-root"], 
[class*="nearbyCams"],
[class*="sl-spot-page__below-the-fold"],
[class*="sl-current-conditions"],
[class*="Header"],
[class*="Footer"]
`)

    displayNoneEls.forEach(el => {
        el.style.display = 'none'
    })

    ///update colors
    document.querySelector('[class*="SpotCurrentConditionsSection_camOuterContainer"]').style.backgroundColor = 'black'
    document.querySelector('body').style.backgroundColor = 'black'
    setTimeout(() => {
        var body = document.body,
            html = document.documentElement;

        var height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        //vertically center the video
        const cam = document.querySelector('.sl-spot-report-page__camera')
        const camW = document.querySelector('.sl-persistent-spot-report-cam')
        // 50% of page height / (elementHeight / 2)
        const camTop = parseInt((height / 2) - (camW.offsetHeight / 2))
        cam.style.top = `${camTop}px`
    }, 500)
}

const reload = () => {
    setTimeout(() => {
        console.log('Surfline Extension: Reloaded')
        document.location.reload(true)
    }, 500)
}

const setupPlayer = async (e) => {
    addListeners()
    setupStyles()
    console.log('Surfline Extension: Player Setup')
}

document.addEventListener('setupPlayer', setupPlayer);


/******/ })()
;