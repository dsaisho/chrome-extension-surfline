let active = false

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
    if (active) sendMessage({ message: "actionEvent", isOn: !isOn })
}

const init = async () => {
    console.log('INIT BACKGROUND.js')
    active = true
    const { isOn } = await chrome.storage.local.get('isOn')
    chrome.action.setTitle({ title: 'TKS' });
    sendMessage({ message: "init", isOn })
    isOn ? setBadgeOn() : setBadgeOff()
    chrome.action.onClicked.addListener(toggleBadge)
}

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    console.log('historyupdate')
    if (details.url.includes('surf-report')) {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ['content.js']
        }).then(() => {
            init()
        })
    }
});



chrome.runtime.onInstalled.addListener(() => {
   
});
