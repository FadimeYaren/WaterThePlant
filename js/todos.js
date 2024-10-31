console.log("starting To-Do app....");

const title = document.getElementById('input-title');
const text = document.getElementById('input-text');
const addBtn = document.getElementById('add-btn');
const displaynotes = document.getElementById('showNotes');


settingLocalStorage();

// localStorage.setItem('notes', "");
// console.log(title);
// console.log(text);
// console.log(addBtn);

//////////////////////////////////////////////////////////////////////////////////////////////

function settingLocalStorage() {

    if(localStorage.getItem('notes') == null){
        console.log("setting up local storage......")
        localStorage.setItem('notes', "");
    }


}

//////////////////////////////////////////////////////////////////////////////////////////////

function addNoteonClick() {

    console.log("click working");
    console.log(title.value + "--" + text.value);

    if (title.value == "") {
        alert("Please add title");
        return;
    }

    if (text.value == "") {
        alert("Can not add empty note");
        return;
    }

    const noteObj = {
        Title: title.value,
        Text: text.value
    }

    let prevSavedNotes = localStorage.getItem('notes');

    let prevSavedNotesArray = []

    if(prevSavedNotes.length!=0)
    {
        prevSavedNotesArray = JSON.parse(prevSavedNotes);
    }

    prevSavedNotesArray.push(noteObj);

    let updatedSavedNotes = JSON.stringify(prevSavedNotesArray);

    localStorage.setItem('notes', updatedSavedNotes);

    showAllNotes();

}

//////////////////////////////////////////////////////////////////////////////////////////////

function showAllNotes() {

    let prevSavedNotes_LS = localStorage.getItem('notes');

    // console.log("local storage Length : - ", prevSavedNotes_LS.length);

    if(prevSavedNotes_LS.length==0)
    {
        displaynotes.style.display = "none";
        return;
    }

    // console.log("local storage : - ", prevSavedNotes_LS);

    let prevSavedNotes_LS_Array = [];

    prevSavedNotes_LS_Array = JSON.parse(prevSavedNotes_LS);

    // console.log("local storage : - ", prevSavedNotes_LS);

    let str = "";
    
    for (let i = 0; i < prevSavedNotes_LS_Array.length; i++) {
        // console.log(prevSavedNotes_LS_Array[i].Title);
        // console.log(prevSavedNotes_LS_Array[i].Text);

        str += `<div id="note1">
                    <div id="show-title">${prevSavedNotes_LS_Array[i].Title}</div>
                    <div id="show-text">${prevSavedNotes_LS_Array[i].Text}</div>
                    <button class="delete-btn" id="delete-btn-${i}" onclick="deleteNoteonClick(${i})"> Delete </button>
                </div>
        `;
    }

    if (prevSavedNotes_LS_Array.length > 0) {
        displaynotes.style.display = "flex";
    }

    displaynotes.innerHTML = str;
}


///////////////////////////////////////////////////////////////////////////////////////

function deleteNoteonClick(index){

    console.log("delete click working --> index : ", index );

    prevSavedNotesLS = localStorage.getItem('notes');

    prevSavedNotesArray = JSON.parse(prevSavedNotesLS);

    updatedArray = []

    n = prevSavedNotesArray.length;

    for(let i=0;i<n;i++)
    {
        if(i!=index)
        {
            updatedArray.push(prevSavedNotesArray[i]);
        }
    }

    updatedNotesString = JSON.stringify(updatedArray);

    localStorage.setItem('notes', updatedNotesString);

    showAllNotes();

}

//////////////////////////////////////////////////////////////////////////////////////////////

addBtn.addEventListener('click', addNoteonClick);

showAllNotes();