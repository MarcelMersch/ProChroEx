document.addEventListener('DOMContentLoaded', (event) => {
    const timerDisplay = document.getElementById('timerDisplay');
    const progressBar = document.getElementById('progressBar');

    function formatTime(seconds) {
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    }

    function updateProgressBar(seconds) {
        const progress = (seconds / 3600) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.floor(progress)}%`;
    }

    function updateTimer() {
        chrome.storage.local.get(['timer'], (result) => {
            const timer = result.timer || 0;
            timerDisplay.textContent = formatTime(timer);
            updateProgressBar(timer);
        });
    }

    updateTimer();
    setInterval(updateTimer, 1000);
});
