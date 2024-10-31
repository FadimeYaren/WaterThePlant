console.log("Starting To-Do app...");

const title = document.getElementById('input-title');
const text = document.getElementById('input-text');
const addBtn = document.getElementById('add-btn');
const displayNotes = document.getElementById('showNotes');

settingLocalStorage();

// LocalStorage ayarlarını yapılandır
function settingLocalStorage() {
    if (localStorage.getItem('notes') === null) {
        console.log("Setting up local storage...");
        localStorage.setItem('notes', JSON.stringify([]));
    }
}

// Not ekleme işlevi
function addNoteOnClick() {
    console.log("Click event triggered");
    
    if (title.value === "") {
        alert("Please add a title");
        return;
    }

    if (text.value === "") {
        alert("Cannot add an empty note");
        return;
    }

    const noteObj = {
        Title: title.value,
        Text: text.value
    };

    let prevSavedNotes = JSON.parse(localStorage.getItem('notes'));
    prevSavedNotes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(prevSavedNotes));

    title.value = "";  // Clear the input fields
    text.value = "";   // Clear the input fields
    showAllNotes();
}

// Notları gösterme işlevi
function showAllNotes() {
    const prevSavedNotes = JSON.parse(localStorage.getItem('notes'));
    displayNotes.innerHTML = ""; // Clear previous notes display

    if (prevSavedNotes.length === 0) {
        displayNotes.style.display = "none";
        return;
    }

    let str = "";
    for (let i = 0; i < prevSavedNotes.length; i++) {
        str += `<div class="note">
                    <h4 id="show-title">${prevSavedNotes[i].Title}</h4>
                    <p id="show-text">${prevSavedNotes[i].Text}</p>
                    <button class="delete-btn" onclick="deleteNote(${i})">Delete</button>
                </div>`;
    }
    displayNotes.innerHTML = str; // Add new notes to display
}

// Not silme işlevi
function deleteNote(index) {
    let prevSavedNotes = JSON.parse(localStorage.getItem('notes'));
    prevSavedNotes.splice(index, 1); // Remove the note at index
    localStorage.setItem('notes', JSON.stringify(prevSavedNotes));
    showAllNotes();
}

// Butona tıklama olayı ekleme
addBtn.addEventListener('click', addNoteOnClick);

// Sayfa yüklendiğinde notları göster
window.onload = showAllNotes;
