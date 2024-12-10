document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('categorySelect');
  const todoListElements = {
      work: document.getElementById('todo-list-work'),
      personal: document.getElementById('todo-list-personal'),
      education: document.getElementById('todo-list-education'),
  };
  const newItemInput = document.getElementById('newitem');
  const newForm = document.getElementById('newform');
  const emptyMessage = document.getElementById('empty-message');
  const prioritySlider = document.getElementById('prioritySlider');
  const priorityValue = document.getElementById('priorityValue');
  const STORAGE_KEY = 'todoListWithCategories';

  // Load data from localStorage
  let todoList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { work: [], personal: [], education: [] };

  // Save data to localStorage
  function saveToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
  }

  // Dynamically update slider value
  prioritySlider.addEventListener('input', () => {
      priorityValue.textContent = `Priority: ${prioritySlider.value}`;
  });

  // Render todos
  function renderTodos() {
      Object.keys(todoList).forEach((category) => {
          const listElement = todoListElements[category];
          listElement.innerHTML = '';

          if (todoList[category].length === 0) {
              emptyMessage.style.display = 'block';
          } else {
              emptyMessage.style.display = 'none';
          }

          todoList[category].forEach((todo, index) => {
              const li = document.createElement('li');
              li.className = `list-group-item d-flex justify-content-between align-items-center ${todo.done ? 'done' : ''}`;

              const date = new Date(todo.date);
              const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

              li.innerHTML = `
                  <span>
                      <span class="label">${todo.label}</span>
                      <br><small class="task-date">${formattedDate}</small>
                      <br><span class="badge badge-secondary">Priority: ${todo.priority}</span>
                  </span>
                  <div class="actions">
                      <button class="btn-picto toggle-btn" aria-label="${todo.done ? 'Undone' : 'Done'}">
                          ${todo.done ? '✔' : '☐'}
                      </button>
                      <button class="btn-picto delete-btn" aria-label="Delete">🗑</button>
                  </div>
              `;

              // Toggle 'done' status with animation
              li.querySelector('.toggle-btn').addEventListener('click', () => {
                  todoList[category][index].done = !todoList[category][index].done;
                  saveToLocalStorage();
                  renderTodos(); // Re-render to update the UI
              });

              // Delete task with fade-out-right animation
              li.querySelector('.delete-btn').addEventListener('click', () => {
                  li.classList.add('fade-out-right'); // Add fade-out-right class
                  setTimeout(() => {
                      todoList[category].splice(index, 1);
                      saveToLocalStorage();
                      renderTodos();
                  }, 500); // Wait for animation to complete before removing
              });

              // Append the list item with fade-in-up animation
              listElement.appendChild(li);
              setTimeout(() => {
                  li.classList.add('fade-in-up'); // Add fade-in-up class after rendering
              }, 10);
          });
      });

      if (Object.keys(todoList).every((key) => todoList[key].length === 0)) {
          emptyMessage.style.display = 'block';
      }
  }

  // Add new task
  newForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newItemText = newItemInput.value.trim();
      const selectedCategory = categorySelect.value;
      const priority = prioritySlider.value;

      if (newItemText) {
          const newTask = {
              label: newItemText,
              done: false,
              date: new Date().toISOString(),
              priority, // Include priority level
          };

          todoList[selectedCategory].push(newTask);
          newItemInput.value = '';
          prioritySlider.value = '3'; // Reset slider to default
          priorityValue.textContent = 'Priority: 3'; // Reset slider text
          saveToLocalStorage();
          renderTodos();
      } else {
          alert('Please enter a task!');
      }
  });

  renderTodos();
});
