// DOM elements
const todoInput = document.getElementById('newitem');
const todoList = document.querySelector('#todolist ul');
const todoForm = document.querySelector('#todolist form');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task when the form is submitted
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = todoInput.value.trim();

  if (taskText) {
    const task = {
      text: taskText,
      completed: false,
    };
    addTaskToDOM(task); // Add the task to the DOM
    saveTaskToStorage(task); // Save the task to localStorage
    todoInput.value = ''; // Clear the input field
  }
});

// Function to add a task to the DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = task.completed ? 'done' : '';

  // Task label
  const label = document.createElement('span');
  label.textContent = task.text;
  label.className = 'label';
  li.appendChild(label);

  // Action buttons container
  const actions = document.createElement('div');
  actions.className = 'actions';

  // Mark as done/undone button
  const doneButton = document.createElement('button');
  doneButton.className = 'btn-picto';
  doneButton.setAttribute('aria-label', task.completed ? 'Undone' : 'Done');
  doneButton.title = task.completed ? 'Undone' : 'Done';
  doneButton.innerHTML = `<i class="material-icons">${task.completed ? 'check_box' : 'check_box_outline_blank'}</i>`;
  doneButton.addEventListener('click', () => {
    task.completed = !task.completed;
    li.classList.toggle('done');
    doneButton.innerHTML = `<i class="material-icons">${task.completed ? 'check_box' : 'check_box_outline_blank'}</i>`;
    doneButton.setAttribute('aria-label', task.completed ? 'Undone' : 'Done');
    doneButton.title = task.completed ? 'Undone' : 'Done';
    updateTaskInStorage(task.text, task.completed);
  });
  actions.appendChild(doneButton);

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn-picto';
  deleteButton.setAttribute('aria-label', 'Delete');
  deleteButton.title = 'Delete';
  deleteButton.innerHTML = `<i class="material-icons">delete</i>`;
  deleteButton.addEventListener('click', () => {
    li.remove();
    deleteTaskFromStorage(task.text);
  });
  actions.appendChild(deleteButton);

  li.appendChild(actions);
  todoList.appendChild(li);
}

// Function to save a task to localStorage
function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach((task) => addTaskToDOM(task));
}

// Function to get tasks from localStorage
function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Function to update a task's completed status in localStorage
function updateTaskInStorage(taskText, completed) {
  const tasks = getTasksFromStorage();
  const updatedTasks = tasks.map((task) => {
    if (task.text === taskText) {
      return { ...task, completed };
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Function to delete a task from localStorage
function deleteTaskFromStorage(taskText) {
  const tasks = getTasksFromStorage();
  const filteredTasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}
