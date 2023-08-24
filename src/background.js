let active = false

const sendMessage = (message) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
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

    if (active) sendMessage({ message: "actionEvent", isOn:!isOn })
    console.log('doing a toggle, isOn:',!isOn, 'is active:',active)
}

const init = async () => {
    active = true
    const { isOn } = await chrome.storage.local.get('isOn')
    chrome.action.setTitle({ title: 'TKS' });
    console.log('doing init- isOn:',isOn)
    sendMessage({ message: "init", isOn })
}

chrome.action.onClicked.addListener(toggleBadge)

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('ON TAB UPDATE')
    if (changeInfo.status === 'complete' && tab.url.includes('surfline.com')) {
        init()
    } else active = false
});

chrome.runtime.onInstalled.addListener(() => {
    console.log("installed", new Date().getTime())
    setBadgeOff()
});