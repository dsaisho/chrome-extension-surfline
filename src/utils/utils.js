/**
 * Waits for an element matching the given selector to exist in the DOM.
 * @param {string} selector - The CSS selector of the element to wait for.
 * @returns {Promise<HTMLElement>} - A promise that resolves with the element once it exists.
 */
const waitForElement = async(selector) =>{
    return new Promise((resolve, reject) => {
        if (document.querySelector(selector)) {
            // If element already exists, resolve the promise immediately
            resolve(document.querySelector(selector));
            return;
        }

        // Otherwise, use a MutationObserver to detect when the DOM changes
        const observer = new MutationObserver(mutations => {
            for(let mutation of mutations) {
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


export{
    waitForElement
}