document.addEventListener('DOMContentLoaded', function() {
    let startBtn = document.getElementById('start');
    let stopBtn = document.getElementById('stop');
    let resetBtn = document.getElementById('reset');

    let minute, second, timer;
    let isRunning = false;

    // Restore the timer state from storage
    chrome.storage.local.get(['minute', 'second', 'isRunning', 'startTime'], function(result) {
        if (result.minute !== undefined && result.second !== undefined) {
            minute = result.minute;
            second = result.second;
        } else {
            minute = 25;
            second = 0;
        }
        isRunning = result.isRunning || false;
        if (isRunning) {
            let elapsed = Math.floor((Date.now() - result.startTime) / 1000);
            minute -= Math.floor(elapsed / 60);
            second -= elapsed % 60;
            if (second < 0) {
                second += 60;
                minute--;
            }
            if (minute < 0) {
                minute = 0;
                second = 0;
                clearInterval(timer);
                playPomodoroSound();
                startBtn.disabled = false;
            } else {
                timer = setInterval(updateTimer, 1000);
                startBtn.disabled = true;
            }
        }
        updateDisplay();
    });

    startBtn.addEventListener('click', function () {
        chrome.storage.local.set({startTime: Date.now(), isRunning: true});
        timer = setInterval(updateTimer, 1000);
        startBtn.disabled = true;
    });

    stopBtn.addEventListener('click', function () {
        clearInterval(timer);
        isRunning = false;
        chrome.storage.local.set({isRunning: false});
        startBtn.disabled = false;
    });

    resetBtn.addEventListener('click', function () {
        clearInterval(timer);
        minute = 25;
        second = 0;
        isRunning = false;
        chrome.storage.local.set({minute: 25, second: 0, isRunning: false});
        updateDisplay();
        startBtn.disabled = false;
    });

    function updateTimer() {
        if (second === 0) {
            if (minute === 0) {
                clearInterval(timer);
                playPomodoroSound();
                chrome.storage.local.set({isRunning: false});
                startBtn.disabled = false;
            } else {
                minute--;
                second = 59;
            }
        } else {
            second--;
        }
        chrome.storage.local.set({minute: minute, second: second});
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
});
