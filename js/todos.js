// Check if there's existing data in localStorage, if so, parse and use it.
function getTodoListFromLocalStorage() {
    const storedList = localStorage.getItem('todoList');
    return storedList ? JSON.parse(storedList) : [
      { id: 1, label: "Learn VueJs", done: true },
      { id: 2, label: "Code a todo list", done: false },
      { id: 3, label: "Learn something else", done: false }
    ];
  }
  
  // Save the current todo list to localStorage
  function saveTodoListToLocalStorage(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
  
  // Function to create the toggle button element
  function createToggleButton(label, name, checked) {
    const wrapper = document.createElement('div');
    wrapper.className = `togglebutton-wrapper ${checked ? 'togglebutton-checked' : ''}`;
  
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', name);
  
    const spanLabel = document.createElement('span');
    spanLabel.className = 'togglebutton-label';
    spanLabel.textContent = label;
  
    const boxSpan = document.createElement('span');
    boxSpan.className = 'togglebutton-box';
  
    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('id', name);
    checkboxInput.setAttribute('name', name);
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.checked = checked;
  
    // Event listener for toggling the checkbox state
    checkboxInput.addEventListener('change', function () {
      sortTodosByStatus(checkboxInput.checked);
    });
  
    labelElement.appendChild(spanLabel);
    labelElement.appendChild(boxSpan);
    labelElement.appendChild(checkboxInput);
    wrapper.appendChild(labelElement);
  
    return wrapper;
  }
  
  // Function to render the todo list
  function renderTodoList() {
    const todoListElement = document.getElementById('todolist');
    const todoList = getTodoListFromLocalStorage();
    const sortByStatus = document.getElementById('sortToggle').checked;
  
    // Sort todos by done status if needed
    const sortedTodos = sortByStatus ? [
      ...todoList.filter(todo => !todo.done),
      ...todoList.filter(todo => todo.done)
    ] : todoList;
  
    // Clear current todo list rendering
    todoListElement.innerHTML = '';
  
    // Render each todo item
    sortedTodos.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.className = 'todo-item';
  
      const label = document.createElement('span');
      label.textContent = todo.label;
      todoItem.appendChild(label);
  
      const toggleButton = document.createElement('button');
      toggleButton.textContent = todo.done ? 'Mark as Not Done' : 'Mark as Done';
      toggleButton.addEventListener('click', function () {
        todo.done = !todo.done;
        saveTodoListToLocalStorage(todoList);
        renderTodoList();
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        const index = todoList.indexOf(todo);
        todoList.splice(index, 1);
        saveTodoListToLocalStorage(todoList);
        renderTodoList();
      });
  
      // Change background color of item upon clicking
      todoItem.addEventListener('click', function () {
        todoItem.style.backgroundColor = todoItem.style.backgroundColor === 'lightyellow' ? '' : 'lightyellow';
      });
  
      todoItem.appendChild(toggleButton);
      todoItem.appendChild(deleteButton);
      todoListElement.appendChild(todoItem);
    });
  }
  
  // Function to handle adding a new item
  function addNewItem() {
    const newItemInput = document.getElementById('newitem');
    const newItemText = newItemInput.value.trim();
  
    if (newItemText) {
      const todoList = getTodoListFromLocalStorage();
      const newItem = {
        id: Date.now(), // unique ID based on timestamp
        label: newItemText,
        done: false
      };
      todoList.push(newItem);
      saveTodoListToLocalStorage(todoList);
      renderTodoList();
      newItemInput.value = ''; // Clear input field
    }
  }
  
  // Function to handle sorting by status toggle
  function sortTodosByStatus(isSorted) {
    renderTodoList(); // This will automatically re-render based on the new sort state
  }
  
  // Initial rendering
  document.addEventListener('DOMContentLoaded', function () {
    const todoList = getTodoListFromLocalStorage();
    renderTodoList();
  
    // Add event listener to the add button
    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', addNewItem);
  
    // Add event listener for the toggle button
    const sortToggle = createToggleButton('Sort by Status', 'sortToggle', false);
    sortToggle.querySelector('input').addEventListener('change', function (e) {
      sortTodosByStatus(e.target.checked);
    });
    document.getElementById('toggleWrapper').appendChild(sortToggle);
  });
  