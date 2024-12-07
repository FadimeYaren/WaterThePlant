console.log("Starting Notes app....");

const titleInput = document.getElementById('input-title');
const textInput = document.getElementById('input-text');
const addBtn = document.getElementById('add-btn');
const displayNotes = document.getElementById('showNotes');
const categoryInput = document.getElementById('input-category');
const tagsInput = document.getElementById('input-tags');

let selectedColor = "#ffffff"; // Default color

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

    const noteObj = {
        Title: title,
        Text: text,
        Color: selectedColor,
        Category: category, // New category field
        Tags: tags, // New tags field
        Completed: false
    };

    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    savedNotes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(savedNotes));

    // Clear inputs
    titleInput.value = "";
    textInput.value = "";
    categoryInput.value = "";
    tagsInput.value = "";
    selectedColor = "#ffffff"; // Reset to default color

    displayNotesList();
}

// Display saved notes
function displayNotesList() {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    displayNotes.innerHTML = ""; // Clear previous notes

    savedNotes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.style.backgroundColor = note.Color;

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
    savedNotes.splice(index, 1); // Remove note
    localStorage.setItem('notes', JSON.stringify(savedNotes));
    displayNotesList(); // Re-render notes
}

// Set note color
function setNoteColor(color) {
    selectedColor = color;
}

// Execute addNoteOnClick when the button is clicked
addBtn.addEventListener('click', addNoteOnClick);

// Show notes on page load
displayNotesList();
