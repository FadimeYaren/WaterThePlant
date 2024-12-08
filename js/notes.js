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
        Category: category,
        Tags: tags,
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
        noteDiv.draggable = true;
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

        // Add drag events
        noteDiv.addEventListener('dragstart', handleDragStart);
        noteDiv.addEventListener('dragover', handleDragOver);
        noteDiv.addEventListener('dragleave', handleDragLeave);
        noteDiv.addEventListener('drop', handleDrop);
        noteDiv.addEventListener('dragend', handleDragEnd);

        displayNotes.appendChild(noteDiv);
    });
}

// Drag and Drop Handlers
let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;
    this.style.opacity = '0.5'; // Make the item semi-transparent
}

function handleDragOver(e) {
    e.preventDefault();
    const draggingOver = e.target.closest('.note');
    if (draggingOver && draggingOver !== draggedItem) {
        draggingOver.style.border = "2px dashed #317773"; // Highlight target
    }
}

function handleDragLeave(e) {
    const draggingOver = e.target.closest('.note');
    if (draggingOver) {
        draggingOver.style.border = "none"; // Remove highlight
    }
}

function handleDrop(e) {
    e.preventDefault();
    const draggingOver = e.target.closest('.note');
    if (draggingOver && draggingOver !== draggedItem) {
        const draggingIndex = parseInt(draggedItem.dataset.index);
        const overIndex = parseInt(draggingOver.dataset.index);
        const savedNotes = JSON.parse(localStorage.getItem('notes'));

        // Swap the notes in the array
        [savedNotes[draggingIndex], savedNotes[overIndex]] = [savedNotes[overIndex], savedNotes[draggingIndex]];
        localStorage.setItem('notes', JSON.stringify(savedNotes));
        displayNotesList();
    }
}

function handleDragEnd() {
    this.style.opacity = '1'; // Reset opacity
    document.querySelectorAll('.note').forEach(note => note.style.border = "none"); // Remove highlight
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