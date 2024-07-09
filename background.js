var lastActiveTab = 0;

const map = new Map();

//Ausführung, wenn der aktive Tab gewechselt wird
chrome.tabs.onActivated.addListener(moveToFirstPosition);

//Ausführung, wenn die URL in einem Tab geändert wird
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
      console.log("Test1");
      console.log("Test2");

  }
});

async function moveToFirstPosition(activeInfo) {
  try {
    //await chrome.tabs.move(activeInfo.tabId, {index: 0});
       var zeitAktuell = Date.now();
       //TabID auslesen
       chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        my_tabid=tabs[0].id;
        //Aktuelle Zeit im Dict speichern
        map.set(my_tabid, [zeitAktuell, tabs[0].url]);
        //Zeit ermitteln und Dauer vom alten Tab speichern
        
        //Startzeit vom letzten Tab ermittlen. Fehler, wenn es der 1. Tab der Fensters ist.
        try{
            var result = map.get(lastActiveTab);
            console.log(result);
            var startZeit = result[0];
            var letzteURL  = result[1];
            dauer = zeitAktuell - startZeit;
            //Daten in Objekt speichern
            var obj = {};       
            var key = zeitAktuell;  
            obj[key] = [letzteURL, dauer];
            
            console.log(letzteURL);
            console.log(dauer);
            chrome.storage.local.set(obj).then(() => {
            });

            //Entfernen???
            chrome.storage.local.get([String(zeitAktuell)]).then((result) => {
            });
            
          }catch{
          console.log("Fehler beim Speichern der Zeit")
        }
        //Nun die aktuelle TabId einfügen.
        lastActiveTab = my_tabid;

      });


  } catch (error) {
    if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    } else {
    }
  }
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

            //console.log(`Timer: ${elapsedSeconds} Sekunden`);

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




