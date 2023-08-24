import { waitForElement, onElementAdded } from './utils/utils.js'

const addListeners = () => {
    //when the 'are you still watching' message comes up
    onElementAdded('.quiver-cam-timeout__message button', onTimeoutMessage)
    //when 'buffering' comes up
    onElementAdded(`[class*="CamError"]`, reload)
}

const onTimeoutMessage = async () => {
    console.log("%conTimeoutMessage", "color: #fff; background: #f00; font-size: 24px; padding: 10px; border-radius: 5px;")
    const reloadBtn = await waitForElement('.quiver-cam-timeout__message button')
    reloadBtn.click()
    await waitForElement('video-js')
    setupStyles()
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
}

const setupPlayer = async (e) => {
    addListeners()
    setupStyles()
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            document.location.reload()
        }
    });
}
const initInjected = async () => {

}
document.addEventListener('initInjected', initInjected);
document.addEventListener('setupPlayer', setupPlayer);
