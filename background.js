var lastActiveTab = 0;

chrome.storage.local.set({ 123: [23, 56] }).then(() => {
  console.log("Value is set");
});

chrome.storage.local.get(["123"]).then((result) => {
  console.log("Value is " + result[123][0]);
});


const map = new Map();


//Warum kann ich gerade im local storage keine Daten abrufen? Kein Fehler, aber undefined als rueckgabe.

//Muss noch erfassen, wenn sie die Website innerhalb eines Tabs ändert.
//Wie? Current URL erfassen. Alle 5 Sek. die aktuelle URL erfassen und abgleichen?? Oder gibt es event?



chrome.tabs.onActivated.addListener(moveToFirstPosition);

chrome.tabs.onRemoved.addListener(dauerSpeichern);

async function moveToFirstPosition(activeInfo) {
  
  try {
    await chrome.tabs.move(activeInfo.tabId, {index: 0});
       var zeitAktuell = Date.now();
       //TabID auslesen
       chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
        my_tabid=tabs[0].id;
        //Aktuelle Zeit im Dict speichern
        map.set(my_tabid, zeitAktuell);
        //Zeit ermitteln und Dauer vom alten Tab speichern
        
        //Startzeit vom letzten Tab ermittlen. Fehler, wenn es der 1. Tab der Fensters ist.
        try{
           var result = map.get(lastActiveTab);
            dauer = zeitAktuell - result;
            //Daten in Objekt speichern
            var obj = {};       
            var key = zeitAktuell;  
            obj[key] = [tabs[0].url, dauer];
            
            chrome.storage.local.set(obj).then(() => {
              console.log("Dauer gespeichert: " + dauer);
            });

            chrome.storage.local.get([String(zeitAktuell)]).then((result) => {
              console.log("Value is " + result[zeitAktuell]);
            });
            
          }catch{
          console.log("Fehler beim Auslesen der Zeit")
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

// Lass den Timer bei Browseraufruf und Installation starten

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




