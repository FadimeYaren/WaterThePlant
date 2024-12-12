let timer;
let minutes, seconds;
let mode = 'pomodoro';
let pomodoroSettings = null;
let isBreak = false;

//Ana Pencere
// Mod Seç
function selectMode(selectedMode) {
    mode = selectedMode;
    resetTimer(); // Zamanlayıcıyı resetle

    switch (mode) {
        case 'pomodoro':
            if (!pomodoroSettings) {  // Eğer ayarlar daha önce yapılmamışsa varsayılan değerleri kullan
                pomodoroSettings = {
                    pomodoroCount: 4,
                    pomodoroDuration: 25,
                    breakDuration: 5
                };
            }
            minutes = pomodoroSettings.pomodoroDuration;
            seconds = 0;
            break;
        case 'countdown':
            minutes = 30;  // Varsayılan geri sayım süresi
            seconds = 0;
            break;
        case 'stopwatch':
            minutes = 0;
            seconds = 0;
            break;
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
    const pomodoroPanel = document.getElementById("pomodoro-p-panel");

    if (pomodoroPanel.classList.contains("right-section-visible")) {
        pomodoroPanel.classList.remove("right-section-visible");
    } else {
        pomodoroPanel.classList.add("right-section-visible");
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


//P-PANEL

function activatePanel(panelId) {
    const panels = document.querySelectorAll('.p-panel');

    panels.forEach(panel => {
        if (panel.id === panelId) {
            // Tıklanan panel aktif hale gelir
            panel.classList.add('active');
        } else {
            // Diğer panellerin aktifliği kaldırılır
            panel.classList.remove('active');
        }
    });
}



// MUSIC PANEL

// Local Storage'dan müzik listesini yüklemek için fonksiyon
function loadPlaylist() {
    const storedPlaylist = localStorage.getItem('musicPlaylist');
    if (storedPlaylist) {
        return JSON.parse(storedPlaylist);
    } else {
        // Local storage boşsa, varsayılan şarkılar ekleyin
        const defaultPlaylist = [
            { title: "Default Song 1", url: "https://www.youtube.com/watch?v=example1" },
            { title: "Default Song 2", url: "https://www.youtube.com/watch?v=example2" }
        ];
        localStorage.setItem('musicPlaylist', JSON.stringify(defaultPlaylist));
        return defaultPlaylist;
    }
}

// Müzik listesini Local Storage'a kaydetmek için fonksiyon
function savePlaylist(playlist) {
    localStorage.setItem('musicPlaylist', JSON.stringify(playlist));
}

// Playlist'i güncellemek için fonksiyonlar
function addSongToPlaylist(name, url) {
    const playlist = loadPlaylist();
    playlist.push({ title: name, url: url });
    savePlaylist(playlist);
    updatePlaylistDisplay();
}

function deleteSongFromPlaylist(index) {
    const playlist = loadPlaylist();
    playlist.splice(index, 1);
    savePlaylist(playlist);
    updatePlaylistDisplay();
}

// Playlist'i HTML'de göstermek için fonksiyon
function updatePlaylistDisplay() {
    const playlist = loadPlaylist();
    const playlistElement = document.getElementById('playlist');
    playlistElement.innerHTML = '';  // Listeyi temizle
    playlist.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'playlist-item'; // Stil için sınıf ekle

        const titleSpan = document.createElement('span');
        titleSpan.textContent = item.title;
        titleSpan.style.paddingRight = '10px'; // Sağa padding ekle

        const copyLink = document.createElement('i');
        copyLink.className = 'fas fa-copy'; // Kopyalama ikonu
        copyLink.onclick = () => copyToClipboard(item.url);

        const openLink = document.createElement('i');
        openLink.className = 'fas fa-external-link-alt'; // Yeni sekme ikonu
        openLink.onclick = () => openInNewTab(item.url);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteSongFromPlaylist(index);

        listItem.appendChild(titleSpan);
        listItem.appendChild(copyLink);
        listItem.appendChild(openLink);
        listItem.appendChild(deleteButton);

        playlistElement.appendChild(listItem);
    });
}

document.getElementById('addMusicForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const musicName = document.getElementById('musicName').value;
    const youtubeLink = document.getElementById('youtubeLink').value;
    addSongToPlaylist(musicName, youtubeLink);
    document.getElementById('musicName').value = '';
    document.getElementById('youtubeLink').value = '';
});

// Linki kopyalamak için fonksiyon
function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard!");
    }, () => {
        alert("Failed to copy link.");
    });
}

// Linki yeni sekmede açmak için fonksiyon
function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

document.getElementById('add-music-button').addEventListener('click', function() {
    document.getElementById('music-controls-section').style.display = 'none';
    document.getElementById('add-music-section').style.display = 'block';
});

document.getElementById('show-playlist-button').addEventListener('click', function() {
    document.getElementById('music-controls-section').style.display = 'block';
    document.getElementById('add-music-section').style.display = 'none';
});

// Sayfa yüklendiğinde playlist'i göster
document.addEventListener('DOMContentLoaded', updatePlaylistDisplay);






// JSON objesine dönüştürmek ve bir dosya olarak indirmek
// Örnek veri yapısı
let data = {
    playlist: playlist,  // Daha önce oluşturduğunuz playlist array
    timers: {
        pomodoro: {
            sessions: 4,
            length: 25,
            break: 5
        },
        countdown: {
            duration: 15
        },
        stopwatch: {
            elapsed: 123 // Örnek olarak geçen süre (saniye)
        }
    },
    settings: {
        volume: 75,
        darkMode: true
    }
};

function downloadData() {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pomodoro_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// İndirme fonksiyonunu tetiklemek için buton oluşturma
document.getElementById('download-data-button').addEventListener('click', downloadData);







// history and data panel

// sürükle bırak

// Sürükle ve bırak için event listener'lar
let dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
});

dropArea.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.dataTransfer.files;
    processFile(files[0]);
});

document.getElementById('drop-area').addEventListener('click', () => {
    document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function() {
    if (this.files.length > 0) {
        processFile(this.files[0]);
    }
});

function processFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        console.log('Data loaded:', data);
        // Burada verileri işleyip uygulamaya yükleyebilirsiniz
    };
    reader.readAsText(file);
}
