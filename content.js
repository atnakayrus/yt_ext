(() => {
    let youtubeControls, youtubePlayer;

    let currentVideo = "";
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        
        if (obj && obj.type && obj.type === "NEW") { //Short Circuit
            currentVideo = obj.videoId
            newVideoLoaded();
        }
    });

    const newVideoLoaded = async () => {
        const buttonExists = document.getElementsByClassName("speed-btn")[0];
        if (!buttonExists) {
            const speedButton = document.createElement("img");

            speedButton.src = chrome.runtime.getURL("assets/speed.png");
            speedButton.className = "speed-btn";
            speedButton.title = "click for 3x speed";

            youtubeControls = document.getElementsByClassName("ytp-right-controls")[0];

            youtubeControls.prepend(speedButton);
            speedButton.addEventListener("click", speedUp)
        }
    };

    const speedUp = () => {
        console.log("speed")
        const speeder = document.querySelector('video');
        if (speeder.playbackRate == 3) {
            speeder.playbackRate = 1;
        }
        else {
            speeder.playbackRate = 3.0;
        }
    }
    newVideoLoaded();
})();
