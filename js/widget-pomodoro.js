import Widget from './widget.js';

// Pomodoro Widget Sınıfı
class PomodoroWidget {
    constructor() {
        this.widget = new Widget(
            'pomodoro-widget', // Widget ID
            2, // Minimum genişlik (2 hücre)
            1, // Minimum yükseklik (1 hücre)
            this.getPomodoroContent() // Widget içeriği
        );
    }

    // Pomodoro Widget İçeriği
    getPomodoroContent() {
        return `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <h3>Pomodoro Timer</h3>
                <div id="timer-display">25:00</div>
                <div>
                    <button id="start-btn">Start</button>
                    <button id="stop-btn">Stop</button>
                </div>
            </div>
        `;
    }

    // Widget'ı bir container'a ekle
    appendTo(container) {
        this.widget.appendTo(container);

        // Timer işlevlerini başlat
        this.initTimerLogic();
    }

    // Pomodoro Timer Mantığı
    initTimerLogic() {
        const timerDisplay = document.getElementById('timer-display');
        const startButton = document.getElementById('start-btn');
        const stopButton = document.getElementById('stop-btn');

        let timer;
        let remainingTime = 25 * 60; // 25 dakika

        const updateDisplay = () => {
            const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
            const seconds = (remainingTime % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
        };

        startButton.addEventListener('click', () => {
            if (!timer) {
                timer = setInterval(() => {
                    if (remainingTime > 0) {
                        remainingTime--;
                        updateDisplay();
                    } else {
                        clearInterval(timer);
                        timer = null;
                        alert('Pomodoro tamamlandı!');
                    }
                }, 1000);
            }
        });

        stopButton.addEventListener('click', () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        });

        // İlk başta ekranı güncelle
        updateDisplay();
    }
}

// Stopwatch Widget Sınıfı
class StopwatchWidget {
    constructor() {
        this.widget = new Widget(
            'stopwatch-widget',
            2,
            1,
            this.getStopwatchContent()
        );
    }

    getStopwatchContent() {
        return `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <h3>Stopwatch</h3>
                <div id="stopwatch-display">00:00</div>
                <div>
                    <button id="start-stopwatch-btn">Start</button>
                    <button id="stop-stopwatch-btn">Stop</button>
                </div>
            </div>
        `;
    }

    appendTo(container) {
        this.widget.appendTo(container);
        this.initStopwatchLogic();
    }

    initStopwatchLogic() {
        const stopwatchDisplay = document.getElementById('stopwatch-display');
        const startButton = document.getElementById('start-stopwatch-btn');
        const stopButton = document.getElementById('stop-stopwatch-btn');

        let timer;
        let elapsedTime = 0;

        const updateDisplay = () => {
            const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
            const seconds = (elapsedTime % 60).toString().padStart(2, '0');
            stopwatchDisplay.textContent = `${minutes}:${seconds}`;
        };

        startButton.addEventListener('click', () => {
            if (!timer) {
                timer = setInterval(() => {
                    elapsedTime++;
                    updateDisplay();
                }, 1000);
            }
        });

        stopButton.addEventListener('click', () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        });

        updateDisplay();
    }
}

// Countdown Widget Sınıfı
class CountdownWidget {
    constructor(initialMinutes = 10) {
        this.widget = new Widget(
            'countdown-widget',
            2,
            1,
            this.getCountdownContent(initialMinutes)
        );
        this.remainingTime = initialMinutes * 60;
    }

    getCountdownContent(initialMinutes) {
        return `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <h3>Countdown Timer</h3>
                <div id="countdown-display">${initialMinutes}:00</div>
                <div>
                    <button id="start-countdown-btn">Start</button>
                    <button id="stop-countdown-btn">Stop</button>
                </div>
            </div>
        `;
    }

    appendTo(container) {
        this.widget.appendTo(container);
        this.initCountdownLogic();
    }

    initCountdownLogic() {
        const countdownDisplay = document.getElementById('countdown-display');
        const startButton = document.getElementById('start-countdown-btn');
        const stopButton = document.getElementById('stop-countdown-btn');

        let timer;

        const updateDisplay = () => {
            const minutes = Math.floor(this.remainingTime / 60).toString().padStart(2, '0');
            const seconds = (this.remainingTime % 60).toString().padStart(2, '0');
            countdownDisplay.textContent = `${minutes}:${seconds}`;
        };

        startButton.addEventListener('click', () => {
            if (!timer) {
                timer = setInterval(() => {
                    if (this.remainingTime > 0) {
                        this.remainingTime--;
                        updateDisplay();
                    } else {
                        clearInterval(timer);
                        timer = null;
                        alert('Countdown tamamlandı!');
                    }
                }, 1000);
            }
        });

        stopButton.addEventListener('click', () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        });

        updateDisplay();
    }
}

export { CountdownWidget, PomodoroWidget, StopwatchWidget };

