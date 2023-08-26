/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};

const sendMessage = (message) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        if (activeTab)
            chrome.tabs.sendMessage(activeTab.id, message);
    });
}

const setBadgeOn = () => {
    chrome.storage.local.set({ isOn: true })
    chrome.action.setBadgeText({ text: 'on' });
    chrome.action.setBadgeBackgroundColor({ color: '#0d7f01' });
}

const setBadgeOff = () => {
    chrome.storage.local.set({ isOn: false })
    chrome.action.setBadgeText({ text: 'off' });
    chrome.action.setBadgeBackgroundColor({ color: '#7f2501' });
}

const toggleBadge = async () => {
    const { isOn } = await chrome.storage.local.get('isOn');
    isOn ? setBadgeOff() : setBadgeOn()
    sendMessage({ message: "actionEvent", isOn: !isOn })
}

const init = async () => {
    const { isOn } = await chrome.storage.local.get('isOn')
    isOn ? setBadgeOn() : setBadgeOff()
    chrome.action.onClicked.addListener(toggleBadge)
    console.log('Surfline Extension: Background Script Initialized')
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.status === 'content_script_loaded') {
        init()
    }
});




/******/ })()
;