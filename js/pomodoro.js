
// Background - shooting stars
const stars = document.querySelectorAll('.shooting_star');

stars.forEach(star => {
    const randomTop = Math.random() * window.innerHeight; 
    const randomRight = Math.random() * window.innerWidth; 

    const randomDelay = Math.random() * 10; 
    const randomDuration = 3 + Math.random() * 5;

    star.style.top = `${randomTop}px`;
    star.style.right = `${randomRight}px`;
    star.style.animationDelay = `${randomDelay}s`;
    star.style.animationDuration = `${randomDuration}s`;
});


// PANELS




function activatePanel(panelId) {
    const panels = document.querySelectorAll('.p-panel');

    panels.forEach(panel => {
        if (panel.id === panelId) {
        
            panel.classList.add('active');
        } else {
        
            panel.classList.remove('active');
        }
    });
}



// MUSIC PANEL

let currentSongIndex = 0; 
let playlist = loadPlaylist(); 

// Local Storage load playlist
function loadPlaylist() {
    const storedPlaylist = localStorage.getItem('musicPlaylist');
    if (storedPlaylist) {
        return JSON.parse(storedPlaylist);
    } else {
    
        const defaultPlaylist = [
            { title: "Interstellar", url: "https://www.youtube.com/watch?v=p2zMXSXhZ9M&t=814s" },
            { title: "Rain", url: "https://www.youtube.com/watch?v=mPZkdNFkNps" },
            { title: "Lofi Radio", url: "https://www.youtube.com/watch?v=jfKfPfyJRdk" }
        ];
        localStorage.setItem('musicPlaylist', JSON.stringify(defaultPlaylist));
        return defaultPlaylist;
    }
}

// save playlist to localstor.
function savePlaylist(playlist) {
    localStorage.setItem('musicPlaylist', JSON.stringify(playlist));
}

// Playlist
function updatePlaylist() {
    playlist = loadPlaylist();
    updatePlaylistDisplay(); 
}

// while adding new songs upload playlist
document.getElementById('addMusicForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const musicName = document.getElementById('musicName').value;
    const youtubeLink = document.getElementById('youtubeLink').value;

    addSongToPlaylist(musicName, youtubeLink);

    
    currentSongIndex = playlist.length - 1; 
    updatePlaylist();
    document.getElementById('musicName').value = '';
    document.getElementById('youtubeLink').value = '';
});

// add song
function addSongToPlaylist(name, url) {
    const newSong = { title: name, url: url };
    playlist.push(newSong); 
    savePlaylist(playlist); 
    updatePlaylist(); 
}

// delete song
function deleteSongFromPlaylist(index) {
    playlist.splice(index, 1);
    savePlaylist(playlist); 
    updatePlaylist(); 

    if (currentSongIndex >= playlist.length) {
        currentSongIndex = Math.max(0, playlist.length - 1); 
    }
}

// play song
function loadVideo(videoId) {
    if (player) {
        player.loadVideoById(videoId);
        player.playVideo();
        isPlaying = true;
        document.getElementById('playPauseButton').innerHTML = '<i class="fas fa-pause"></i>';
        updateSongName(playlist[currentSongIndex].title);
    }
}

//start song
function playCurrentSong() {
    const currentVideoId = extractVideoId(playlist[currentSongIndex].url);
    loadVideo(currentVideoId);
}

// "Next" button click
document.getElementById('next').addEventListener('click', () => {
    if (playlist.length === 0) return;
    currentSongIndex = (currentSongIndex + 1) % playlist.length; 
    playCurrentSong();
});

// "Prev" button click
document.getElementById('prev').addEventListener('click', () => {
    if (playlist.length === 0) return;
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length; 
    playCurrentSong();
});



// YouTube video ID - url
function extractVideoId(url) {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// update song name
function updateSongName(songName) {
    const musicNameSection = document.querySelector('.music-name-section');
    if (musicNameSection) {
        musicNameSection.textContent = songName;
    }
}

function updatePlaylistDisplay() {
    const playlist = loadPlaylist(); 
    const playlistElement = document.getElementById('playlist');
    playlistElement.innerHTML = ''; 

    if (playlist.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Playlist boş! Şarkı ekleyin.';
        emptyMessage.style.color = 'gray';
        playlistElement.appendChild(emptyMessage);
        return;
    }

    playlist.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'playlist-item'; 

        // special class for active song
        if (index === currentSongIndex) {
            listItem.classList.add('active');
        }

        const titleSpan = document.createElement('span');
        titleSpan.textContent = item.title;
        titleSpan.style.paddingRight = '10px'; 

        const copyLink = document.createElement('i');
        copyLink.className = 'fas fa-copy'; 
        copyLink.onclick = (event) => {
            event.stopPropagation(); 
            copyToClipboard(item.url);
        };

        const openLink = document.createElement('i');
        openLink.className = 'fas fa-external-link-alt'; 
        openLink.onclick = (event) => {
            event.stopPropagation(); 
            openInNewTab(item.url);
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = (event) => {
            event.stopPropagation(); 
            deleteSongFromPlaylist(index);

            // if active song deleted upload currentSongIndex
            if (index === currentSongIndex) {
                currentSongIndex = Math.min(currentSongIndex, playlist.length - 2);
            }
            updatePlaylistDisplay(); 
        };

        //Extract the video ID and add it as data-video-id
        const videoId = extractVideoId(item.url);
        listItem.setAttribute('data-video-id', videoId);

        //Clicking on the song only loads the video into the player if the song name is clicked
        listItem.addEventListener('click', (event) => {
            if (event.target === titleSpan) { 
                currentSongIndex = index; 
                loadVideo(videoId); 
                updatePlaylistDisplay(); 
            }
        });

        listItem.appendChild(titleSpan);
        listItem.appendChild(copyLink);
        listItem.appendChild(openLink);
        listItem.appendChild(deleteButton);

        playlistElement.appendChild(listItem);
    });
}


// copy link
function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard!");
    }, () => {
        alert("Failed to copy link.");
    });
}

// open in new tab
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


// -------------------------------------------------------------------------------




// HISTORY PANEL



function groupRecordsByDate(records) {
    return records.reduce((grouped, record) => {
        const date = record.date; 
        if (!grouped[date]) grouped[date] = []; 
        grouped[date].push(record); 

        // Sort records within the same date in reverse order of time
        grouped[date].sort((a, b) => {
            const timeA = new Date(`1970-01-01T${a.time}Z`);
            const timeB = new Date(`1970-01-01T${b.time}Z`);
            return timeB - timeA; 
        });
        return grouped; 
    }, {});
}

function displayHistory() {
    const records = JSON.parse(localStorage.getItem('pomodoroRecords')) || [];
    const groupedRecords = groupRecordsByDate(records);

    const historyContainer = document.getElementById('history-container');
    historyContainer.innerHTML = ''; 

    Object.keys(groupedRecords)
        .sort((a, b) => new Date(b) - new Date(a))
        .forEach(date => {
            // history title add
            const dateElement = document.createElement('div');
            dateElement.className = 'history-date';
            dateElement.textContent = formatDate(date); 
            historyContainer.appendChild(dateElement);

            // Mesajları ekle
            groupedRecords[date].forEach(record => {
                const messageElement = document.createElement('div');
                messageElement.className = 'history-message';

                const timeElement = document.createElement('div');
                timeElement.className = 'history-message-time';
                timeElement.textContent = formatTime(record.time);

                const textElement = document.createElement('div');
                textElement.className = 'history-message-text';
                textElement.textContent = `You got ${record.type} by ${record.mode} (${record.duration}m)`;

                messageElement.appendChild(timeElement);
                messageElement.appendChild(textElement);
                historyContainer.appendChild(messageElement);
            });
        });
}

// show history
function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
        console.error("Invalid date format:", dateString);
        return "Invalid Date";
    }
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}


function formatTime(timeString) {
    if (!timeString || typeof timeString !== 'string') {
        console.error("Invalid or undefined time value:", timeString);
        return "Invalid Time";
    }

    const timeParts = timeString.match(/^(\d{1,2}):(\d{2})(:\d{2})?\s?(AM|PM)?$/i);

    if (!timeParts) {
        console.error("Invalid time format:", timeString);
        return "Invalid Time";
    }

    let hours = parseInt(timeParts[1], 10); 
    const minutes = parseInt(timeParts[2], 10); 
    const period = timeParts[4];

    // if AM/PM change 24 hour format
    if (period) {
        if (period.toUpperCase() === 'PM' && hours < 12) {
            hours += 12; 
        }
        if (period.toUpperCase() === 'AM' && hours === 12) {
            hours = 0; 
        }
    }

    // if invalid - error
    if (isNaN(hours) || isNaN(minutes)) {
        console.error("Invalid time components:", timeString);
        return "Invalid Time";
    }


    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}



function addRecord(mode, duration) {
    const records = JSON.parse(localStorage.getItem('pomodoroRecords')) || [];

    const now = new Date();
    const record = {
        date: now.toISOString().split('T')[0], 
        time: now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }), // HH:mm formatında saat
        mode: mode,
        type: "Olive Tree", 
        duration: duration 
    };

    records.push(record); 
    localStorage.setItem('pomodoroRecords', JSON.stringify(records)); 

    console.log(`Record added: ${JSON.stringify(record)}`); 
}


document.addEventListener('DOMContentLoaded', () => {
    displayHistory();
});


// -------------------------------------------------------------------------------





// POMODORO PANEL

let timer;
let minutes, seconds;
let mode = 'pomodoro';
let pomodoroSettings = null;
let isBreak = false;


// Mod 
function selectMode(selectedMode) {
    mode = selectedMode;
    resetTimer(); 

  
    const pomodoroSettingsElement = document.getElementById("pomodoro-settings");
    const countdownSettingsElement = document.getElementById("countdown-settings");
    const stopwatchSettingsElement = document.getElementById("stopwatch-settings");

    switch (mode) {
        case 'pomodoro':
        
            if (!pomodoroSettings) {
                pomodoroSettings = {
                    pomodoroCount: 4, 
                    pomodoroDuration: 25, 
                    breakDuration: 5 // 
                };
            }
            currentPomodoro = 1; 
            minutes = pomodoroSettings.pomodoroDuration; 
            seconds = 0;

            
            pomodoroSettingsElement.style.display = "block";
            countdownSettingsElement.style.display = "none";
            stopwatchSettingsElement.style.display = "none";
            break;

        case 'countdown':
            
            minutes = 30; 
            seconds = 0;

            
            pomodoroSettingsElement.style.display = "none";
            countdownSettingsElement.style.display = "block";
            stopwatchSettingsElement.style.display = "none";
            break;

        case 'stopwatch':
            
            minutes = 0;
            seconds = 0;

            
            pomodoroSettingsElement.style.display = "none";
            countdownSettingsElement.style.display = "none";
            stopwatchSettingsElement.style.display = "block";
            break;
    }

    updateDisplay(); 
}



function updateDisplay() {
    document.getElementById("timer-display").textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


// Pomodoro 


function startPomodoroTimer() {
    if (currentPomodoro > pomodoroSettings.pomodoroCount) {
        alert("Tüm Pomodoro'lar tamamlandı!");
        return;
    }

    isBreak = false; 
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



//Countdown 
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
            }, 10000); 
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


//Stopwatch 
let magicSeedCount = 0;

function startStopwatch() {
    document.getElementById("start-button").style.display = 'none';
    document.getElementById("stop-button").style.display = 'inline-block';

    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;

            
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
        minutes = 30; 
        seconds = 0;
    } else if (mode === 'stopwatch') {
        minutes = 0;
        seconds = 0;
    }
    updateDisplay();
}

function applySettings() {
    if (mode === 'pomodoro') {
        const pomodoroCount = parseInt(document.getElementById("pomodoro-count").value);
        const pomodoroDuration = parseInt(document.getElementById("pomodoro-duration").value);
        const breakDuration = parseInt(document.getElementById("break-duration").value);

        if (pomodoroCount < 1 || pomodoroDuration < 10 || breakDuration > pomodoroDuration) {
            alert("Geçersiz değerler girdiniz. Lütfen kontrol edin.");
            return;
        }

        pomodoroSettings = { pomodoroCount, pomodoroDuration, breakDuration };
        minutes = pomodoroDuration;
        seconds = 0;
    } else if (mode === 'countdown') {
        const countdownDuration = parseInt(document.getElementById("countdown-duration").value);
        if (countdownDuration < 1) {
            alert("Geri Sayım Süresi 1 dakikadan az olamaz.");
            return;
        }
        minutes = countdownDuration;
        seconds = 0;
    }

    if (mode === 'stopwatch') {
        alert("Stopwatch modunda ayar yapılmaz.");
    }


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

    
    startTrackingTimer();

    document.getElementById("start-button").style.display = 'none';
    document.getElementById("stop-button").style.display = 'inline-block';
}

function startTrackingTimer() {
    console.log("Tracking started...");
}


function stopTimer() {
    clearInterval(timer);
    document.getElementById("start-button").style.display = 'inline-block'; 
    document.getElementById("stop-button").style.display = 'none'; 
    resetTimer(); 
    alert("Zamanlayıcı durduruldu.");
}


function startProgress() {
    elapsed = 0;
    duration = minutes * 60 + seconds; 

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
    }, 1000); 
}




// TREE COUNTS  ---- DATA FOR HISTORY AND COLLECTION INFO and more... 

if (minutes === 0 && seconds === 0) { 
    clearInterval(timer); 
    addRecord("Pomodoro", pomodoroSettings.pomodoroDuration);
}

if (minutes === 0 && seconds === 0) { 
    clearInterval(timer); 
    addRecord("Countdown", duration);
}

if (minutes % 10 === 0 && seconds === 0) { 
    addRecord("Stopwatch", 10);
}




function addRecord(mode, duration) {
    const records = JSON.parse(localStorage.getItem('pomodoroRecords')) || [];

    const now = new Date();
    const record = {
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString(),
        mode: mode,
        type: "Olive Tree", 
        duration: duration 
    };

    records.push(record);
    localStorage.setItem('pomodoroRecords', JSON.stringify(records));

    displayTotalRecords(); 
}




function getTotalRecords() {
    try {
        const records = JSON.parse(localStorage.getItem('pomodoroRecords')) || [];
        return Array.isArray(records) ? records.length : 0;
    } catch (e) {
        console.error("LocalStorage verisi okunurken hata oluştu:", e);
        return 0;
    }
}


function displayTotalRecords() {
    const totalRecords = getTotalRecords();
    const treeCountElement = document.getElementById('tree-count');
    if (treeCountElement) {
        treeCountElement.textContent = totalRecords;
    } else {
        console.error("tree-count ID'si bulunamadı.");
    }
}

document.addEventListener('DOMContentLoaded', displayTotalRecords);





function toggleSettings() {
    const pomodoroPanel = document.getElementById("pomodoro-p-panel");

    if (pomodoroPanel.classList.contains("right-section-visible")) {
        pomodoroPanel.classList.remove("right-section-visible");
    } else {
        pomodoroPanel.classList.add("right-section-visible");
    }
}



//WATER
let duration = 25 * 60; 
let elapsed = 0;

function startProgress() {
    const interval = setInterval(() => {
        elapsed += 1;
        let percentage = (elapsed / duration) * 100;

        
        document.getElementById('progress-circle').style.background = `conic-gradient(
            #00f3ff ${percentage}%,
            transparent ${percentage}% 100%
        )`;

        
        if (elapsed >= duration) {
            clearInterval(interval);
            alert("Süre doldu!");
        }
    }, 1000); 
}

startProgress();




// PLANT


let stopwatchTimerInterval;
let currentStageIndex = 0;
const plantStages = [
    'img/pomodoro/plants/olive-tree/stage1.png', 
    'img/pomodoro/plants/olive-tree/stage2.png', 
    'img/pomodoro/plants/olive-tree/stage3.png', 
    'img/pomodoro/plants/olive-tree/stage4.png'
];
const finalStage = 'img/pomodoro/plants/olive-tree/stage5.png'; 
const stageDuration = 150; 
const fullCycleDuration = 600; 
let startTime; 

function startStopwatchWithDynamicTimer() {
    startTime = Date.now(); 
    const plantElement = document.getElementById("plant-stage");

    stopwatchTimerInterval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000); 
        console.log(`Elapsed Seconds: ${elapsedSeconds}`); 

        
        if (elapsedSeconds < fullCycleDuration) {
            const stage = Math.min(Math.floor(elapsedSeconds / stageDuration), plantStages.length - 1); 
            if (stage !== currentStageIndex) {
                currentStageIndex = stage;
                plantElement.src = plantStages[currentStageIndex];
                console.log(`Stage updated to: ${plantStages[currentStageIndex]}`);
            }
        }

    
        if (elapsedSeconds === fullCycleDuration) {
            plantElement.src = finalStage; 
            console.log(`Final stage reached: ${finalStage}`);
            setTimeout(() => {
                currentStageIndex = 0; 
                plantElement.src = plantStages[currentStageIndex];
                console.log(`Reset to stage: ${plantStages[currentStageIndex]}`);
            }, 5000); 
        }
    }, 500); 
}

function stopStopwatchWithDynamicTimer() {
    clearInterval(stopwatchTimerInterval); 
    const plantElement = document.getElementById("plant-stage");
    currentStageIndex = 0; 
    plantElement.src = plantStages[currentStageIndex]; 
    console.log("Stopwatch stopped and reset.");
}
