const windowQuery = window.location.search;
const urlParams = new URLSearchParams(windowQuery);
const loadfs = urlParams.get('fs');

//inject script and wait for it to load then call init
//the script that is injected can talk to the pages window object, like the video player

const init = (_loadfs = false)=>{
    let script = document.createElement('script');
    script.src = chrome.runtime.getURL('inject.js');
    script.onload = function () {
        if(_loadfs)document.dispatchEvent(new CustomEvent('setupPlayer'));
    };
    document.head.appendChild(script);

}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message === "actionEvent") {
            console.log("actionEvent", request.isOn)
            if(request.isOn) {
                document.dispatchEvent(new CustomEvent('setupPlayer'));
            }else document.location.reload()
        }else if(request.message === "init") {
            init(request.isOn)
        }
    }
);

