document.addEventListener('DOMContentLoaded', function() {
    let startBtn = document.getElementById('start');
    let stopBtn = document.getElementById('stop');
    let resetBtn = document.getElementById('reset');

    let minute = 0;
    let second = 5; // Hier als Test auf 5 Sekunden gesetzt
    let timer;

    startBtn.addEventListener('click', function () {
        timer = setInterval(updateTimer, 1000);
        startBtn.disabled = true;
    });

    stopBtn.addEventListener('click', function () {
        clearInterval(timer);
        startBtn.disabled = false;
    });

    resetBtn.addEventListener('click', function () {
        clearInterval(timer);
        minute = 0;
        second = 5; // Hier als Test auf 5 Sekunden gesetzt
        updateDisplay();
        startBtn.disabled = false;
    });

    function updateTimer() {
        if (second === 0) {
            if (minute === 0) {
                clearInterval(timer);
                playPomodoroSound(); // Ton abspielen
                notificationDiv.style.display = 'block';
                setTimeout(function() {
                    notificationDiv.style.display = 'none';
                }, 5000); // Benachrichtigung nach 5 Sekunden ausblenden
                minute = 0;
                second = 5; // Zurücksetzen auf 5 Sekunden für den nächsten Test
                startBtn.disabled = false;
            } else {
                minute--;
                second = 59;
            }
        } else {
            second--;
        }
        updateDisplay();
    }

    function updateDisplay() {
        document.getElementById('min').textContent = minute < 10 ? '0' + minute : minute;
        document.getElementById('sec').textContent = second < 10 ? '0' + second : second;
    }

    function playPomodoroSound() {
        let audio = document.getElementById('audio');
        audio.play();
    }

    // Warte, bis die Seite vollständig geladen ist
    window.addEventListener('load', function() {
        hideElements();
    });

    // Falls das Dokument bereits vollständig geladen ist
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        hideElements();
    } else {
        document.addEventListener('DOMContentLoaded', hideElements);
    }
});
