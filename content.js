class YtVideo {
    constructor() {
        this.isInitalized = false;
    }
    async addSpeedBtn() {
        if (this.isInitalized) {
            return;
        }

        this.isInitalized = true;
        const btn = await fetch(chrome.runtime.getURL("assets/btn.html"))
            .then((res) => res.text())
            .then((html) => {
                const div = document.createElement("div");
                div.innerHTML = html;
                div.style.cssText =
                `align-self: center;
                display: flex;
                position: relative;`

                return div;
            });

        let ytp_right_controls =
            document.getElementsByClassName("ytp-right-controls")[0];
        let ytp_chrome_controls = document.getElementsByClassName(
            "ytp-chrome-controls"
        )[0];

        ytp_chrome_controls.insertBefore(btn, ytp_right_controls);
        btn.addEventListener("click", this.#speedUp);
    }
    #speedUp() {
        const videoElem = document.querySelector("video");
        if (videoElem.playbackRate == 3) {
            videoElem.playbackRate = 1;
        } else {
            videoElem.playbackRate = 3.0;
        }
    }
}
const ytVideo = new YtVideo();

chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj && obj.type && obj.type === "NEW") {
        ytVideo.addSpeedBtn();
    }
});
