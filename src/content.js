const windowQuery = window.location.search;
const urlParams = new URLSearchParams(windowQuery);
const loadfs = urlParams.get('fs');

//inject script and wait for it to load then call init
//the script that is injected can talk to the pages window object, like the video player

function goFullscreen() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    
}

const buttonClicked = () => {
    goFullscreen()
    document.dispatchEvent(new CustomEvent('setupPlayer'));
}

const init = ()=>{
    console.log("INIT new build 1")
    let button = document.createElement('button');
    button.textContent = 'Go Fullscreen';
    button.style.position = 'absolute';
    button.style.zIndex = '9999';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.addEventListener('click', buttonClicked);
    document.body.appendChild(button);
    let script = document.createElement('script');
    script.src = chrome.runtime.getURL('inject.js');
    script.onload = function () {
        document.dispatchEvent(new CustomEvent('initInjected'));
        if(loadfs)document.dispatchEvent(new CustomEvent('setupPlayer'));
    };
    document.head.appendChild(script);
    
}
init()





