document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('checkbox');

   
    chrome.storage.sync.get('focusMode', function (data) {
        checkbox.checked = data.focusMode || false;
      
    });

    checkbox.addEventListener('change', function () {
        const focusMode = checkbox.checked;
        chrome.storage.sync.set({ 'focusMode': focusMode }, function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: toggleFocusMode,
                    args: [focusMode]
                });
            });
        });
    });
});

chrome.storage.sync.get('focusMode', function (data) {
    if (data.focusMode) {
        toggleFocusMode(true);
    }
});

function toggleFocusMode(focusMode) {
    if (focusMode) {
        // Add CSS to hide distracting elements
        const style = document.createElement('style');
        style.id = 'focusModeStyle';
        style.textContent = `
            ytd-rich-grid-renderer, ytd-guide-renderer {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    } else {
        // Remove the CSS
        const style = document.getElementById('focusModeStyle');
        if (style) {
            style.remove();
        }
    }
}


