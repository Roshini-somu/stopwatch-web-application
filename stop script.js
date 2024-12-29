let startTime, updatedTime, difference, tInterval, running = false, lapTimes = [];

// Bubble Effect
document.body.addEventListener('click', function (e) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 100 + 50; // Size of the bubble
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${e.clientX - size / 2}px`;
    bubble.style.top = `${e.clientY - size / 2}px`;

    document.body.appendChild(bubble);

    // Remove bubble after animation ends
    setTimeout(() => {
        bubble.remove();
    }, 2000);
});

// Toggle Start/Pause Button
function toggleTimer() {
    const startStopBtn = document.querySelector('#startStopBtn');
    if (running) {
        clearInterval(tInterval);
        running = false;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
        startStopBtn.textContent = 'Pause';
    }
}

// Update Time Display
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = String(Math.floor(difference / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((difference % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((difference % 60000) / 1000)).padStart(2, '0');

    document.querySelector('.time-display').textContent = `${hours}:${minutes}:${seconds}`;
}

// Reset Timer
function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    document.querySelector('.time-display').textContent = '00:00:00';
    document.querySelector('#startStopBtn').textContent = 'Start';
}

// Lap Time Function
function lapTime() {
    if (running) {
        let lapTime = document.querySelector('.time-display').textContent;
        lapTimes.push(lapTime);
        const lapList = document.querySelector('#lapList');
        let li = document.createElement('li');
        li.textContent = `Lap: ${lapTime}`;
        lapList.appendChild(li);
    }
}

// Clear Lap History
function clearLapHistory() {
    lapTimes = [];
    document.querySelector('#lapList').innerHTML = '';
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const themeButton = document.querySelector('#toggle-theme');
    themeButton.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🌙';
}

// Event Listeners
document.querySelector('#startStopBtn').addEventListener('click', toggleTimer);
document.querySelector('#resetBtn').addEventListener('click', resetTimer);
document.querySelector('#lapBtn').addEventListener('click', lapTime);
document.querySelector('#clearHistoryBtn').addEventListener('click', clearLapHistory);
document.querySelector('#toggle-theme').addEventListener('click', toggleDarkMode);
