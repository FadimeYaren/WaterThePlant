let timer;
let minutes, seconds;
let mode = 'pomodoro';

// Mod seçme ve timer ayarlama
function selectMode(selectedMode) {
    mode = selectedMode;
    resetTimer();
    if (mode === 'pomodoro') {
        minutes = 25;
        seconds = 0;
    } else if (mode === 'countdown') {
        minutes = 5; // Örnek olarak 5 dakikalık bir geri sayım
        seconds = 0;
    } else if (mode === 'stopwatch') {
        minutes = 0;
        seconds = 0;
    }
    updateDisplay();
}

// Timer ekranını güncelleme
function updateDisplay() {
    document.getElementById("timer-display").textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Timer başlatma
function startTimer() {
    document.getElementById("start-button").style.display = 'none';
    document.getElementById("stop-button").style.display = 'inline-block';

    timer = setInterval(() => {
        if (mode === 'stopwatch') {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
        } else if (mode === 'pomodoro' || mode === 'countdown') {
            if (seconds === 0) {
                if (minutes === 0) {
                    stopTimer();
                    alert("Süre doldu!");
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
        }
        updateDisplay();
    }, 1000);
}

// Timer durdurma
function stopTimer() {
    clearInterval(timer);
    document.getElementById("start-button").style.display = 'inline-block';
    document.getElementById("stop-button").style.display = 'none';
    resetTimer();
}

// Timer sıfırlama
function resetTimer() {
    if (mode === 'pomodoro') {
        minutes = 25;
        seconds = 0;
    } else if (mode === 'countdown') {
        minutes = 5;
        seconds = 0;
    } else if (mode === 'stopwatch') {
        minutes = 0;
        seconds = 0;
    }
    updateDisplay();
}

// Kayan yıldız animasyonu
const stars = document.querySelectorAll('.shooting_star');

stars.forEach(star => {
    const randomTop = Math.random() * window.innerHeight; // Ekranın herhangi bir yüksekliğinden başlatır
    const randomRight = Math.random() * window.innerWidth; // Ekranın tamamında yatay rastgele bir konum

    const randomDelay = Math.random() * 10; // 0 ile 10 saniye arasında rastgele bir gecikme
    const randomDuration = 3 + Math.random() * 5; // 3 ile 8 saniye arasında rastgele bir süre

    star.style.top = `${randomTop}px`;
    star.style.right = `${randomRight}px`;
    star.style.animationDelay = `${randomDelay}s`;
    star.style.animationDuration = `${randomDuration}s`;
});




//WATER
let duration = 25 * 60; // Pomodoro süresi saniye olarak (25 dakika)
let elapsed = 0;

function startProgress() {
    const interval = setInterval(() => {
        elapsed += 1;
        let percentage = (elapsed / duration) * 100;

        // CSS değiştirerek ilerleme animasyonunu güncelle
        document.getElementById('progress-circle').style.background = `conic-gradient(
            #00f3ff ${percentage}%,
            transparent ${percentage}% 100%
        )`;

        // Timer tamamlandıysa durdur
        if (elapsed >= duration) {
            clearInterval(interval);
            alert("Süre doldu!");
        }
    }, 1000); // Her saniye güncelle
}

startProgress();
