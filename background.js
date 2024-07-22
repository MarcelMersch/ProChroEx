var lastActiveTab = 0;

chrome.storage.local.set({ 123: [23, 56] }).then(() => {
  console.log("Value is set");
});

chrome.storage.local.get(["123"]).then((result) => {
  console.log("Value is " + result[123][0]);
});


const map = new Map();






async function dauerSpeichern(activeInfo){
  console.log("Tab geschlossen")
}

function datenAbrufen(){
  console.log("==================")
            console.log(lastActiveTab);
            chrome.storage.local.get([String(12345678)]).then((result) => {
              console.log("Value is " + result[12345678]);
            });
}

//Part von Yannick

let intervalId;

chrome.runtime.onStartup.addListener(() => {
    resetAndStartTimer();
});

chrome.runtime.onInstalled.addListener(() => {
    resetAndStartTimer();
});

function resetAndStartTimer() {
    if (intervalId) {
        clearInterval(intervalId);
    }

    const currentTime = Date.now();

    chrome.storage.local.get(['startTime', 'lastKnownTime'], (result) => {
        let startTime = result.startTime;
        let lastKnownTime = result.lastKnownTime;

        // If lastKnownTime is not available or a large gap exists, reset the timer
        if (!lastKnownTime || (currentTime - lastKnownTime > 3600000)) {
            startTime = currentTime;
            chrome.storage.local.set({ startTime: startTime, timer: 0 });
        }

        chrome.storage.local.set({ lastKnownTime: currentTime });

        intervalId = setInterval(() => {
            const elapsedMilliseconds = Date.now() - startTime;
            const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
            chrome.storage.local.set({ timer: elapsedSeconds, lastKnownTime: Date.now() });

            console.log(`Timer: ${elapsedSeconds} Sekunden`);

            if (elapsedSeconds >= 3600) {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'wasserglas.png',
                    title: 'Hydration Timer',
                    message: 'Zeit für ein Glas Wasser :)',
                    priority: 2
                });
                startTime = Date.now();
                chrome.storage.local.set({ startTime: startTime, timer: 0, lastKnownTime: Date.now() });
            }
        }, 1000); // 1000 ms = 1 Sekunde
    });
}
