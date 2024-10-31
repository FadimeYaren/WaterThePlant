console.log("Starting Notes app...");

const titleInput = document.getElementById('input-title');
const textInput = document.getElementById('input-text');
const addButton = document.getElementById('add-btn');
const notesContainer = document.getElementById('showNotes');

// LocalStorage ayarlarını yapılandır
initializeLocalStorage();

// LocalStorage'ı başlat
function initializeLocalStorage() {
    if (localStorage.getItem('notes') === null) {
        console.log("Setting up local storage...");
        localStorage.setItem('notes', JSON.stringify([]));
    }
}

// Not ekleme işlevi
function addNote() {
    console.log("Add note button clicked");

    if (titleInput.value === "") {
        alert("Please add a title");
        return;
    }

    if (textInput.value === "") {
        alert("Cannot add an empty note");
        return;
    }

    const note = {
        title: titleInput.value,
        text: textInput.value
    };

    let existingNotes = JSON.parse(localStorage.getItem('notes'));
    existingNotes.push(note);
    localStorage.setItem('notes', JSON.stringify(existingNotes));

    titleInput.value = "";  // Giriş alanlarını temizle
    textInput.value = "";   // Giriş alanlarını temizle
    displayNotes();
}

// Notları görüntüleme işlevi
function displayNotes() {
    const existingNotes = JSON.parse(localStorage.getItem('notes'));
    notesContainer.innerHTML = ""; // Önceki notları temizle

    if (existingNotes.length === 0) {
        notesContainer.style.display = "none";
        return;
    }

    let notesHTML = "";
    for (let i = 0; i < existingNotes.length; i++) {
        notesHTML += `<div class="note">
            <h4 id="show-title">${existingNotes[i].title}</h4>
            <p id="show-text">${existingNotes[i].text}</p>
            <button class="delete-btn" onclick="deleteNote(${i})">Delete</button>
        </div>`;
    }
    notesContainer.innerHTML = notesHTML; // Notları ekle
    notesContainer.style.display = "flex"; // Notları göster
}

// Not silme işlevi
function deleteNote(index) {
    console.log(`Deleting note at index ${index}`);
    let existingNotes = JSON.parse(localStorage.getItem('notes'));
    existingNotes.splice(index, 1); // Belirtilen indeksteki notu kaldır
    localStorage.setItem('notes', JSON.stringify(existingNotes));
    displayNotes();
}

// Butona tıklama olayı ekleme
addButton.addEventListener('click', addNote);

// Sayfa yüklendiğinde notları göster
window.onload = displayNotes;
