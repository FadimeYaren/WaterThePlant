
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task
addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText) {
    const task = {
      text: taskText,
      completed: false,
    };
    addTaskToDOM(task); // Add the task to the DOM
    saveTaskToStorage(task); // Save the task to localStorage
    input.value = ''; 
  }
});

// Function to add a task to the DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');

  // Task text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = task.text;
  if (task.completed) {
    taskSpan.classList.add('completed');
  }
  li.appendChild(taskSpan);

  // Mark complete button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔';
  completeBtn.style.backgroundColor = '#4CAF50';
  completeBtn.style.marginLeft = '10px';
  completeBtn.addEventListener('click', () => {
    taskSpan.classList.toggle('completed');
    updateTaskInStorage(task.text, taskSpan.classList.contains('completed'));
  });
  li.appendChild(completeBtn);

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑';
  deleteBtn.style.backgroundColor = '#E74C3C';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    deleteTaskFromStorage(task.text);
  });
  li.appendChild(deleteBtn);


  todoList.appendChild(li);
}


function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach((task) => addTaskToDOM(task));
}

function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

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
