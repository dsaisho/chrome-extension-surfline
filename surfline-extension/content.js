/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "actionEvent") {
            console.log("Surfline Extension: actionEvent", request.isOn)
            if (request.isOn) {
                document.dispatchEvent(new CustomEvent('setupPlayer'));
            } else document.location.reload()
        } 
    }
);

const init = async () => {
    if (window.location.href.includes('surf-report')) {
        const { isOn } = await chrome.storage.local.get('isOn')
        let script = document.createElement('script');
        script.src = chrome.runtime.getURL('inject.js');
        script.id = 'myInjectedScript';
        script.onload = function () {
            chrome.runtime.sendMessage({ status: 'content_script_loaded' });
            if (isOn) document.dispatchEvent(new CustomEvent('setupPlayer'));
            console.log('Surfline Extension: Injected',isOn)
        };
        document.head.appendChild(script);
    }
}

init()
/******/ })()
;