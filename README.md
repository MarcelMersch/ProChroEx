# ProChroEx

## Übersicht
**ProChroEx** ist eine Chrome-Erweiterung, die verschiedene Funktionen zur Produktivitätssteigerung bietet, einschließlich eines Pomodoro-Timers, eines Hydration-Timers, Wetterinformationen und eines Fokus-Modus für YouTube.

## Installation

1. Klone dieses Repository:
   ```bash
   git clone https://github.com/MarcelMersch/ProChroEx.git
   ```

   Oder klicke auf den grünen "<> Code" Knopf und downloade die ZIP-Datei, entpacke diese.

2. Öffne deinen Browser und gehe zu chrome://extensions/.

3. Aktiviere den Entwicklermodus.

4. Klicke auf "Entpackte Erweiterung laden" und wähle das Verzeichnis ProChroEx aus.

5. Über das Puzzle Symbol oben rechts kann nun das Icon der Erweiterung angepinnt werden.


## Nutzung

### Pomodoro-Timer

    Öffne die Erweiterung und stelle den Pomodoro-Timer ein.
    Klicke auf Start, um den Timer zu beginnen, und auf Stop, um ihn anzuhalten.
    Klicke auf Reset, um den Timer zurückzusetzen.

### Hydration-Timer

    Die Erweiterung beginnt automatisch, die Zeit seit dem letzten Trinkvorgang zu verfolgen und benachrichtigt dich nach einer Stunde.

### Fokus-Modus

    Schalte den Fokus-Modus im Popup ein, um ablenkende Elemente auf YouTube auszublenden.

### Wetterinformationen

    Die Erweiterung zeigt die aktuelle Temperatur und die Zeit bis zum nächsten Regen an.

### Dashboard

    Das Dashboard zeigt die Nutzungszeiten der vom Nutzer besuchten Webseiten an. Dies hilft, dem Nutzer sichtbar zu machen wieviel Zeit pro Woche auf welchen Webseiten verbracht wird.

Eine nähere Erklärung wird beim Hovern über die Icons bzw. der Funktionen als Tooltip angezeigt.

## Technische Dokumentation

   Die Datei manifest.json enthält alle notwendigen Konifgurationen für die Chrome-Erweiterung.

   Index.html enthält den Code für das Dashboard der Erweiterung.

   Popup.html enthält den Code für das Popup-Fenster, welches sich bei Anklicken auf das ProChroEx Symbol oben rechts im Browser öffnet.

   Pomodoro.js, Hydration.js und Wetter.js enthalten den JavaScript Code für die jeweiligen Funktionalitäten.

   Die Dateien wetter.test.js und package.json sind notwendig für das Testen der globalen Nutzung der Wetter API. Außerdem benötigt man für das Testen die .js-Bibliotheken Puppeteer und Jest. Für die Installation dieser in die Kommandozeile folgenden bash-Befehl eingeben: "npm install puppeteer jest". Danach in das Verzeichnis navigieren und in der Kommandozeile "npm test" eingeben für den Start des Tests.

   Background.js wird bei der Verwendung der Erweiterung im Hintergrund ausgeführt und enthält die EventListener für das Speichern der Nutzungszeit aber auch Timerstart-Funktionen.

   In der Datei Dashboard.js werden die gespeicherten Daten der Nutzungszeit gelesen und aufbereitet. Weiterhin wird mit der Bibliothek CanvasJS das Diagramm für das Dashboard erzeugt.
   Die Datei canvas.min.js enthält den Code der Bibliothek CanvasJS und ist hier lokal erforderlich, da Chrome Erweiterungen keine externen Skripte laden können.
   
   Der Ad-Blocker wird in der Datei rules.json definiert. Die geblockten Werbeanbieter werden in den Objekten festgehalten.

   Weitere Anmerkungen zu den Funktionen sind als Kommentare im Code hinterlegt.

## Entwicklung
   
   Diese Chrome Extension wird im Rahmen einer Projektarbeit der FOM-Hochschule entwickelt von Marcel und Yannick.
   Das Repository ist öffentlich einsehbar, ProChroEx ist eine Open-Source Software. Das Projekt wird weiterhin von Marcel und Yannick verwaltet.

   


