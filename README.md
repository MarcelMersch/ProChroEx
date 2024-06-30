# ProChroEx

## Übersicht
**ProChroEx** ist eine Chrome-Erweiterung, die verschiedene Funktionen zur Produktivitätssteigerung bietet, einschließlich eines Pomodoro-Timers, eines Hydration-Timers, Wetterinformationen und eines Fokus-Modus für YouTube.

## Funktionen
- **Pomodoro-Timer**: Unterstützt konzentrierte Arbeitsphasen.
- **Hydration-Timer**: Erinnerungen, um regelmäßig Wasser zu trinken.
- **Fokus-Modus**: Blendet ablenkende Elemente auf YouTube aus.
- **Wetterinformationen**: Zeigt die aktuelle Temperatur und einen Countdown bis zum nächsten Regen an.
- **Werbeblocker**: Blockiert Werbeanzeigen, die durch Anfragen an `doubleclick.net` und `googleadservices.com` erstellt werden.

## Installation

1. Klone dieses Repository:
   ```bash
   git clone https://github.com/MarcelMersch/ProChroEx.git
   ```

   Oder klicke auf den grünen "<> Code" Knopf und downloade die ZIP-Datei, entpacke diese.

2. Öffne deinen Browser und gehe zu chrome://extensions/.

3. Aktiviere den Entwicklermodus.

4. Klicke auf "Entpackte Erweiterung laden" und wähle das Verzeichnis ProChroEx aus.


## Entwicklung

   Diese Chrome Extension wird im Rahmen einer Projektarbeit einer Hochschule entwickelt von Marcel und Yannick.
   Dokumentation zum Code befindet sich im Reiter "Projects" bei den Tickets dort.
   U.a. wird dort festgehalten, in welchen Dateien welche Funktionalitäten geregelt werden.
   

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

## Technische Dokumentation

   Die Datei manifest.json enthält alle notwendigen Konifgurationen für die Chrome-Erweiterung.

   Index.html enthält den Code für das Dashboard der Erweiterung.

   Popup.html enthält den Code für das Popup-Fenster, welches sich bei Anklicken auf das ProChroEx Symbol oben rechts im Browser öffnet.

   Pomodoro.js, Hydration.js und Wetter.js enthalten den JavaScript Code für die jeweiligen Funktionalitäten.

   Weitere Anmerkungen zu den Funktionen sind als Kommentare im Code hinterlegt.

   


