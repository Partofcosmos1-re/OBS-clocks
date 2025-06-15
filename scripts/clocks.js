// Main clock update function
function updateAllClocks() {
    const now = new Date();
    const urlParams = new URLSearchParams(window.location.search);
    const clockType = urlParams.get('clock');
    
    // If a specific clock is requested, update only that one
    if (clockType) {
        updateClock(clockType, now);
        return;
    }
    
    // Otherwise update all clocks on the page
    updateClock('digital-simple', now);
    updateClock('digital-modern', now);
    updateClock('analog-simple', now);
    updateClock('analog-minimal', now);
    updateClock('date-display', now);
    updateClock('timezone', now);
    
    // Stopwatch and countdown are handled separately
}

function updateClock(clockId, now) {
    const clockElement = document.getElementById(clockId);
    if (!clockElement) return;
    
    switch(clockId) {
        case 'digital-simple':
            updateDigitalSimple(clockElement, now);
            break;
        case 'digital-modern':
            updateDigitalModern(clockElement, now);
            break;
        case 'analog-simple':
        case 'analog-minimal':
            updateAnalogClock(clockElement, now);
            break;
        case 'date-display':
            updateDateDisplay(clockElement, now);
            break;
        case 'timezone':
            updateTimezoneClock(clockElement, now);
            break;
    }
}

function updateDigitalSimple(element, now) {
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    element.textContent = `${hours}:${minutes}:${seconds}`;
}

function updateDigitalModern(element, now) {
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    element.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

function updateAnalogClock(element, now) {
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDegrees = (hours * 30) + (minutes * 0.5);
    const minuteDegrees = minutes * 6;
    const secondDegrees = seconds * 6;
    
    const hourHand = element.querySelector('.hour-hand');
    const minuteHand = element.querySelector('.minute-hand');
    const secondHand = element.querySelector('.second-hand');
    
    if (hourHand) hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    if (minuteHand) minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    if (secondHand) secondHand.style.transform = `rotate(${secondDegrees}deg)`;
}

function updateDateDisplay(element, now) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    element.textContent = now.toLocaleDateString(undefined, options);
}

function updateTimezoneClock(element, now) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeString = now.toLocaleTimeString(undefined, { 
        timeZone: timezone,
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZoneName: 'short' 
    });
    element.textContent = `${timeString}`;
}

// Stopwatch functionality
let stopwatchStartTime = null;
let stopwatchElapsed = 0;
let stopwatchInterval = null;

function updateStopwatch() {
    const stopwatchElement = document.getElementById('stopwatch');
    if (!stopwatchElement) return;
    
    const now = stopwatchStartTime ? new Date() : null;
    let elapsed = stopwatchElapsed;
    
    if (now && stopwatchStartTime) {
        elapsed += now.getTime() - stopwatchStartTime.getTime();
    }
    
    const hours = Math.floor(elapsed / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((elapsed % 1000) / 10).toString().padStart(2, '0');
    
    stopwatchElement.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startStopwatch() {
    if (!stopwatchInterval) {
        stopwatchStartTime = new Date();
        stopwatchInterval = setInterval(updateStopwatch, 10);
    }
}

function stopStopwatch() {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        if (stopwatchStartTime) {
            stopwatchElapsed += new Date().getTime() - stopwatchStartTime.getTime();
            stopwatchStartTime = null;
        }
    }
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchElapsed = 0;
    updateStopwatch();
}

// Countdown timer functionality
let countdownEndTime = null;
let countdownInterval = null;
const DEFAULT_COUNTDOWN_MINUTES = 25;

function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const now = new Date();
    let remaining = 0;
    
    if (countdownEndTime) {
        remaining = Math.max(0, countdownEndTime.getTime() - now.getTime());
    } else {
        // Set default countdown (25 minutes)
        countdownEndTime = new Date(now.getTime() + DEFAULT_COUNTDOWN_MINUTES * 60 * 1000);
        remaining = DEFAULT_COUNTDOWN_MINUTES * 60 * 1000;
    }
    
    const minutes = Math.floor(remaining / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000).toString().padStart(2, '0');
    
    countdownElement.textContent = `${minutes}:${seconds}`;
    
    if (remaining <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        countdownElement.style.backgroundColor = '#e74c3c';
    }
}

function startCountdown(minutes) {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    const now = new Date();
    countdownEndTime = new Date(now.getTime() + (minutes || DEFAULT_COUNTDOWN_MINUTES) * 60 * 1000);
    
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.style.backgroundColor = '#27ae60';
    }
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function resetCountdown(minutes) {
    stopCountdown();
    countdownEndTime = null;
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.style.backgroundColor = '#27ae60';
    }
    startCountdown(minutes || DEFAULT_COUNTDOWN_MINUTES);
}

// Initialize based on URL parameters
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const clockType = urlParams.get('clock');
    
    if (clockType === 'stopwatch') {
        // Add control buttons for stopwatch
        document.body.innerHTML += `
            <div class="stopwatch-controls">
                <button onclick="startStopwatch()">Start</button>
                <button onclick="stopStopwatch()">Stop</button>
                <button onclick="resetStopwatch()">Reset</button>
            </div>
            <style>
                .stopwatch-controls {
                    position: fixed;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 10px;
                }
                .stopwatch-controls button {
                    padding: 5px 10px;
                    background: #3498db;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                }
            </style>
        `;
        updateStopwatch();
    } else if (clockType === 'countdown') {
        // Add control buttons for countdown
        document.body.innerHTML += `
            <div class="countdown-controls">
                <button onclick="startCountdown(25)">Start 25m</button>
                <button onclick="startCountdown(5)">Start 5m</button>
                <button onclick="stopCountdown()">Stop</button>
                <button onclick="resetCountdown()">Reset</button>
            </div>
            <style>
                .countdown-controls {
                    position: fixed;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 10px;
                }
                .countdown-controls button {
                    padding: 5px 10px;
                    background: #3498db;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                }
            </style>
        `;
        updateCountdown();
    } else if (clockType) {
        // For other clocks, just update them
        updateAllClocks();
        setInterval(updateAllClocks, 1000);
        
        // Add OBS mode class to body
        document.body.classList.add('obs-mode');
    } else {
        // Main page with all clocks
        updateAllClocks();
        setInterval(updateAllClocks, 1000);
    }
});
