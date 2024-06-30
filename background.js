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
                    iconUrl: 'hello_extensions.png',
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
