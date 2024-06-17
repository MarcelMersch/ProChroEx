let timer = 0;
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

    timer = 0;
    chrome.storage.local.set({ timer: timer }, () => {
        intervalId = setInterval(() => {
            timer++;
            chrome.storage.local.set({ timer: timer });
            console.log(`Timer: ${timer} Sekunden`);

            if (timer >= 3600) {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'hello_extensions.png',
                    title: 'Hydration Timer',
                    message: 'Zeit für ein Glas Wasser :)',
                    priority: 2
                });
                chrome.storage.local.set({ timer: 0 });
                
                timer = 0;
                chrome.storage.local.set({ timer: timer });
            }
        }, 1000); // 1000 ms = 1 Sekunde
    });
}
