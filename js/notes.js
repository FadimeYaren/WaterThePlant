console.log("Starting Notes app....");

const titleInput = document.getElementById('input-title');
const textInput = document.getElementById('input-text');
const addBtn = document.getElementById('add-btn');
const displayNotes = document.getElementById('showNotes');
const categoryInput = document.getElementById('input-category');
const tagsInput = document.getElementById('input-tags');

let selectedColor = null; // Başlangıçta seçilen renk yok

// Initialize local storage
initializeLocalStorage();

function initializeLocalStorage() {
    if (localStorage.getItem('notes') === null) {
        console.log("Setting up local storage...");
        localStorage.setItem('notes', JSON.stringify([]));
    }
}

// Add a new note when the button is clicked
function addNoteOnClick() {
    console.log("Click detected");

    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();
    const tags = tagsInput.value.trim().split(',').map(tag => tag.trim());

    if (!title) {
        alert("Please add a title");
        return;
    }

    if (!text) {
        alert("Empty notes cannot be added");
        return;
    }

// Varsayılan renk belirleme
    const defaultColor = document.body.classList.contains('dark-mode') 
    ? '#1F2937' // Karanlık mod için daha koyu bir gri
    : '#9CA3AF'; // Açık mod için orta gri

    const noteColor = selectedColor || defaultColor; // Renk seçilmemişse varsayılanı kullan

    const noteObj = {
        Title: title,
        Text: text,
        Color: noteColor, // Seçilen ya da varsayılan rengi kaydet
        Category: category,
        Tags: tags,
        Completed: false
    };

    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    savedNotes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(savedNotes));

    // Alanları temizle
    titleInput.value = "";
    textInput.value = "";
    categoryInput.value = "";
    tagsInput.value = "";
    selectedColor = null; // Seçimi sıfırla

    displayNotesList();
}

// Display saved notes
function displayNotesList() {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    displayNotes.innerHTML = ""; // Önceki notları temizle

    savedNotes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.style.backgroundColor = note.Color;
        noteDiv.dataset.index = index;

        noteDiv.innerHTML = `
            <div class="note-content">
                <div id="show-title">${note.Title}</div>
                <div id="show-text">${note.Text}</div>
                <div id="show-category"><strong>Category:</strong> ${note.Category || 'No category'}</div>
                <div id="show-tags"><strong>Tags:</strong> ${note.Tags.length ? note.Tags.join(', ') : 'No tags'}</div>
            </div>
            <div class="note-actions">
                <span class="delete-btn" onclick="deleteNote(${index})">❌</span>
            </div>
        `;

        displayNotes.appendChild(noteDiv);
    });
}

// Delete the note when the X is clicked
function deleteNote(index) {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    savedNotes.splice(index, 1); // Notu sil
    localStorage.setItem('notes', JSON.stringify(savedNotes));
    displayNotesList(); // Notları yeniden göster
}

// Set note color
function setNoteColor(color) {
    selectedColor = color; // Seçilen rengi kaydet
}

// Execute addNoteOnClick when the button is clicked
addBtn.addEventListener('click', addNoteOnClick);

// Show notes on page load
displayNotesList();

// Karanlık mod toggling işlemi
const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // LocalStorage'a karanlık mod tercihini kaydet
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Karanlık mod tercihini sayfa yüklenirken kontrol et
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}
