let timer;
let minutes, seconds;
let mode = 'pomodoro';
let pomodoroSettings = null;
let isBreak = false;

//Ana Pencere
// Mod Seç
function selectMode(selectedMode) {
    mode = selectedMode;
    resetTimer();

    if (mode === 'pomodoro') {
        // Kullanıcıdan alınan girişlerle pomodoro süresi ve mola süresi ayarlanabilir
        const pomodoroCount = parseInt(prompt("Kaç Pomodoro yapmak istiyorsunuz? (1-∞)", 1));
        const pomodoroDuration = parseInt(prompt("Her Pomodoro süresi kaç dakika? (En az 10)", 25));
        const breakDuration = parseInt(prompt("Mola süresi kaç dakika? (Pomodoro süresinden uzun olamaz)", 5));

        if (pomodoroCount < 1 || pomodoroDuration < 10 || breakDuration > pomodoroDuration) {
            alert("Geçersiz değerler girdiniz. Lütfen tekrar deneyin.");
            return;
        }

        minutes = pomodoroDuration;
        seconds = 0;
        pomodoroSettings = { pomodoroCount, pomodoroDuration, breakDuration }; // Ayarları kaydet
    } else if (mode === 'countdown') {
        // Kullanıcıdan süre alınabilir
        const countdownDuration = parseInt(prompt("Geri sayım süresi kaç dakika olsun? (1-∞)", 10));
        if (countdownDuration < 1) {
            alert("Geçersiz süre girdiniz.");
            return;
        }

        minutes = countdownDuration;
        seconds = 0;
    } else if (mode === 'stopwatch') {
        minutes = 0;
        seconds = 0;
    }

    updateDisplay();
}

function updateDisplay() {
    document.getElementById("timer-display").textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


// Pomodoro Çalıştırma
let currentPomodoro = 1;

function startPomodoroTimer() {
    if (currentPomodoro > pomodoroSettings.pomodoroCount) {
        alert("Tüm Pomodoro'lar tamamlandı!");
        return;
    }

    let isBreak = false;
    document.getElementById("start-button").style.display = 'none';
    document.getElementById("stop-button").style.display = 'inline-block';

    timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                if (isBreak) {
                    alert(`Mola tamamlandı! Sıradaki Pomodoro'ya geçiliyor.`);
                    currentPomodoro++;
                    startPomodoroTimer();
                } else {
                    alert(`Pomodoro ${currentPomodoro} tamamlandı! Şimdi mola vakti.`);
                    isBreak = true;
                    minutes = pomodoroSettings.breakDuration;
                    seconds = 0;
                    updateDisplay();
                    startPomodoroTimer();
                }
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}


//Countdown Çalıştırma
function startCountdownTimer() {
    document.getElementById("start-button").style.display = 'none';
    document.getElementById("stop-button").style.display = 'inline-block';

    let countdownStarted = false;

    timer = setInterval(() => {
        if (!countdownStarted) {
            countdownStarted = true;
            setTimeout(() => {
                if (countdownStarted) {
                    alert("Başlatma süresi geçti. Bitki kaybedildi!");
                    stopTimer();
                }
            }, 10000); // İlk 10 saniye
        }

        if (seconds === 0) {
            if (minutes === 0) {
                stopTimer();
                alert("Countdown tamamlandı!");
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}


//Stopwatch çalıştırma
let magicSeedCount = 0;

function startStopwatch() {
    document.getElementById("start-button").style.display = 'none';
    document.getElementById("stop-button").style.display = 'inline-block';

    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;

            // 10 dakikada bir sihirli tohum kazanımı
            if (minutes % 10 === 0) {
                magicSeedCount++;
                alert(`Tebrikler! ${magicSeedCount}. Sihirli tohumu kazandınız!`);
            }
        }
        updateDisplay();
    }, 1000);
}

// reset pomodoro, countdown, stopwatch
function resetTimer() {
    clearInterval(timer);
    if (mode === 'pomodoro' && pomodoroSettings) {
        minutes = pomodoroSettings.pomodoroDuration;
        seconds = 0;
    } else if (mode === 'countdown') {
        minutes = 5; // Varsayılan süre
        seconds = 0;
    } else if (mode === 'stopwatch') {
        minutes = 0;
        seconds = 0;
    }
    updateDisplay();
}

function applySettings() {
    // Ayarları al
    const pomodoroCount = parseInt(document.getElementById("pomodoro-count").value);
    const pomodoroDuration = parseInt(document.getElementById("pomodoro-duration").value);
    const breakDuration = parseInt(document.getElementById("break-duration").value);

    // Geçersiz değer kontrolü
    if (pomodoroCount < 1 || pomodoroDuration < 10 || breakDuration > pomodoroDuration) {
        alert("Geçersiz değerler girdiniz. Lütfen kontrol edin.");
        return;
    }

    // Ayarları kaydet
    pomodoroSettings = { pomodoroCount, pomodoroDuration, breakDuration };
    minutes = pomodoroDuration;
    seconds = 0;

    // Güncellemeyi ekrana yansıt
    updateDisplay();
    alert("Ayarlar başarıyla uygulandı!");
}


function startTimer() {
    if (mode === 'pomodoro') {
        startPomodoroTimer();
    } else if (mode === 'countdown') {
        startCountdownTimer();
    } else if (mode === 'stopwatch') {
        startStopwatch();
    }
    document.getElementById("start-button").style.display = 'none';
    document.getElementById("stop-button").style.display = 'inline-block';
}


function stopTimer() {
    clearInterval(timer); // Zamanlayıcıyı durdur
    document.getElementById("start-button").style.display = 'inline-block'; // Başlat butonunu görünür yap
    document.getElementById("stop-button").style.display = 'none'; // Bitir butonunu gizle
    resetTimer(); // Zamanlayıcıyı sıfırla
    alert("Zamanlayıcı durduruldu.");
}


function startProgress() {
    elapsed = 0;
    duration = minutes * 60 + seconds; // Mevcut süreyi saniyeye çevir

    const interval = setInterval(() => {
        elapsed++;
        let percentage = (elapsed / duration) * 100;

        document.getElementById('progress-circle').style.background = `conic-gradient(
            #00f3ff ${percentage}%,
            transparent ${percentage}% 100%
        )`;

        if (elapsed >= duration) {
            clearInterval(interval);
            alert("Süre doldu!");
        }
    }, 1000); // Her saniye güncelle
}

function toggleSettings() {
    const rightSection = document.getElementById('right-section');
    const leftSection = document.getElementById('left-section');
    const toggleButton = document.getElementById('toggle-settings');

    if (rightSection.classList.contains('visible')) {
        // Ayar panelini kapat
        rightSection.classList.remove('visible');
        toggleButton.textContent = ">";
        leftSection.style.flex = "1"; // Sol bölümü ortaya al
    } else {
        // Ayar panelini aç
        rightSection.classList.add('visible');
        toggleButton.textContent = "<";
        leftSection.style.flex = "2"; // Sol bölümü küçült
    }
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

