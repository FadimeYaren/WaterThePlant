console.log("starting Notes app....");

const title = document.getElementById('input-title');
const text = document.getElementById('input-text');
const addBtn = document.getElementById('add-btn');
const displaynotes = document.getElementById('showNotes');

settingLocalStorage();

function settingLocalStorage() {
    if (localStorage.getItem('notes') == null) {
        console.log("setting up local storage......");
        localStorage.setItem('notes', JSON.stringify([]));
    }
}

function addNoteonClick() {
    console.log("click working");
    console.log(title.value + "--" + text.value);

    if (title.value === "") {
        alert("Please add a title");
        return;
    }

    if (text.value === "") {
        alert("Empty notes cannot be added");
        return;
    }

    const noteObj = {
        Title: title.value,
        Text: text.value,
        Completed: false // New field
    };

    let prevSavedNotes = JSON.parse(localStorage.getItem('notes'));
    prevSavedNotes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(prevSavedNotes));

    title.value = ""; // Clear input
    text.value = ""; // Clear input
    showNotes();
}

function showNotes() {
    let savedNotes = JSON.parse(localStorage.getItem('notes'));
    displaynotes.innerHTML = ""; // Clear previous notes before showing new ones

    savedNotes.forEach((note, index) => {
        let noteDiv = document.createElement('div');
        noteDiv.className = 'note'; // Add class to each note
        noteDiv.innerHTML = `
            <div class="${note.Completed ? 'completed' : ''}">
                <div id="show-title">${note.Title}</div>
                <div id="show-text">${note.Text}</div>
                <button class="complete-btn" onclick="markAsCompleted(${index})">
                    ${note.Completed ? '✔️ Completed' : '🟢 Complete'}
                </button>
                <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
                <button class="download-btn" onclick="downloadNote(${index})">Download</button>
            </div>
        `;
        displaynotes.appendChild(noteDiv);
    });
}

function markAsCompleted(index) {
    let savedNotes = JSON.parse(localStorage.getItem('notes'));
    savedNotes[index].Completed = !savedNotes[index].Completed; // Toggle completion status
    localStorage.setItem('notes', JSON.stringify(savedNotes));
    showNotes(); // Show updated notes
}

function deleteNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem('notes'));
    savedNotes.splice(index, 1); // Remove note
    localStorage.setItem('notes', JSON.stringify(savedNotes));
    showNotes(); // Show updated notes
}

function downloadNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem('notes'));
    const note = savedNotes[index];
    const noteContent = `Title: ${note.Title}\n\n${note.Text}`;
    const blob = new Blob([noteContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${note.Title}.txt`;
    link.click();
}

// Show notes on page load
showNotes();

// Execute addNoteonClick function when the button is clicked
addBtn.addEventListener('click', addNoteonClick);
