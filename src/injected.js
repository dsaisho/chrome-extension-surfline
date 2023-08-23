import { waitForElement } from './utils/utils.js'

const addListeners = () => {
    const isJWplayer = jwplayer()?.on ? true : false
    if (isJWplayer) addJWPlayerListeners()
    else addVJSListeners()
    console.log("Video Player::", isJWplayer ? 'JWPlayer' : 'VideoJS')
}

const addJWPlayerListeners = () => {
    jwplayer().on('all', (e) => {
        if (e == 'remove') {
            handleRemove()
        }
    })
}

const addVJSListeners = () => {
    const events = [
        "abort",
        "addtrack",
        "audiotrackchange",
        "beforemodalclose",
        "beforemodalempty",
        "beforemodalfill",
        "beforemodalopen",
        "beforepluginsetup",
        "beforepluginsetup:$name",
        "canplay",
        "canplaythrough",
        "change",
        "close",
        "componentresize",
        "controlsdisabled",
        "controlsenabled",
        "dispose",
        "durationchange",
        "emptied",
        "enabledchange",
        "ended",
        "enterFullWindow",
        "enterpictureinpicture",
        "error",
        "exitFullWindow",
        "fullscreenchange",
        "labelchange",
        "languagechange",
        "leavepictureinpicture",
        "loadeddata",
        "loadedmetadata",
        "loadstart",
        "modalclose",
        "modalempty",
        "modalfill",
        "modalopen",
        "modechange",
        "pause",
        "play",
        "playbackrateschange",
        "playerresize",
        "playing",
        "pluginsetup",
        "pluginsetup:$name",
        "posterchange",
        // "progress",
        "ratechange",
        "ready",
        "removetrack",
        "resize",
        "seeked",
        "seeking",
        "selectedchange",
        "slideractive",
        "sliderinactive",
        "sourceset",
        "stalled",
        "statechanged",
        "suspend",
        "tap",
        "textdata",
        "texttrackchange",
        // "timeupdate",
        "useractive",
        "userinactive",
        "usingcustomcontrols",
        "usingnativecontrols",
        "videotrackchange",
        "volumechange",
        "vttjsloaded",
        "waiting"
    ]

    const cam = videojs(document.querySelector('.video-js'));

    events.forEach(function (event) {
        cam.on(event, function (e) {
            console.log('Event triggered:', event, e);
            if (event == 'dispose') {
                handleRemove()
            }
        });
    });
}

const handleRemove = async () => {

    console.log("%chandleRemove", "color: #fff; background: #f00; font-size: 24px; padding: 10px; border-radius: 5px;")
    const cancelBtn = await waitForElement('.quiver-cam-timeout__message button')
    cancelBtn.click()
    await waitForElement('video-js')
    console.log('adding glisteners')
    addListeners()
    console.log('setting up styles')
    setupStyles()

    setTimeout(() => {
        alert('checking reload')
    }, 10000)

}

const setupStyles = () => {
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
    }, 1000)
}

const reload = () => {
    document.location.search = document.location.search + '&fs=true'
    //   window.location.reload()
}
//reload()

// setTimeout(() => {
//     addListeners()
//     setupStyles()
// }, 1000)
const initInjected = async (e) => {
    //await waitForElement('[class*="SpotReportCams_multiCamContainer"]')
    addListeners()
    setupStyles()
}

document.addEventListener('initInjected', initInjected);

///CamError_camErrorWrapper__W8LjK MuiBox-root mui-style-0
