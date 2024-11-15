// DOM Elements
const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const addTaskForm = document.getElementById('add-task-form');
const cancelTaskForm = document.getElementById('cancel-task-form');

// Show Add Task Form
document.getElementById('show-add-task-form').addEventListener('click', () => {
  addTaskForm.style.display = 'block';
});

// Hide Add Task Form
cancelTaskForm.addEventListener('click', () => {
  addTaskForm.style.display = 'none';
});

// Add Task
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const taskName = taskNameInput.value;
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  // Get the status from the radio buttons
  const status = document.querySelector('input[name="status"]:checked').value;

  // Create the task row
  const taskRow = document.createElement('tr');
  const taskStatus = status === 'Completed' ? 'Completed' : 'Pending';

  // Determine if task is completed or pending based on due date
  const currentDate = new Date();
  const dueDateObject = new Date(dueDate);
  const isPastDue = dueDateObject < currentDate;

  const statusClass = isPastDue ? 'completed' : 'pending';
  const statusText = isPastDue ? 'Completed' : 'Pending';

  taskRow.innerHTML = `
    <td class="task-name">${taskName}</td>
    <td class="task-due-date">${dueDate}</td>
    <td class="task-priority">${priority}</td>
    <td class="task-status ${statusClass}">${statusText}</td>
    <td>
      <button class="edit-task">Edit</button>
      <button class="delete-task">Delete</button>
    </td>
  `;
  
  // Append task to table
  taskTable.appendChild(taskRow);
  addTaskForm.style.display = 'none';  // Hide form after task is added
  
  // Clear form after submission
  taskNameInput.value = '';
  dueDateInput.value = '';
  priorityInput.value = 'low';
  document.getElementById('status-pending').checked = true;  // Default status as Pending
});

// Delete Task
taskTable.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-task')) {
    e.target.closest('tr').remove();
  }
});

// Edit Task
taskTable.addEventListener('click', function (e) {
  if (e.target.classList.contains('edit-task')) {
    const row = e.target.closest('tr');
    const taskName = row.querySelector('.task-name').textContent;
    const dueDate = row.querySelector('.task-due-date').textContent;
    const priority = row.querySelector('.task-priority').textContent;
    
    // Pre-fill the form with task details
    taskNameInput.value = taskName;
    dueDateInput.value = dueDate;
    priorityInput.value = priority;

    // Change form action to edit
    document.getElementById('task-form').setAttribute('data-editing', row.rowIndex);
    addTaskForm.style.display = 'block';
  }
});

// Update Task (when editing)
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const editingRowIndex = taskForm.getAttribute('data-editing');
  if (editingRowIndex !== null) {
    const taskName = taskNameInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    // Get the status from the radio buttons
    const status = document.querySelector('input[name="status"]:checked').value;

    // Create the task row
    const taskRow = taskTable.rows[editingRowIndex];
    const taskStatus = status === 'Completed' ? 'Completed' : 'Pending';

    // Determine if task is completed or pending based on due date
    const currentDate = new Date();
    const dueDateObject = new Date(dueDate);
    const isPastDue = dueDateObject < currentDate;

    const statusClass = isPastDue ? 'completed' : 'pending';
    const statusText = isPastDue ? 'Completed' : 'Pending';

    taskRow.innerHTML = `
      <td class="task-name">${taskName}</td>
      <td class="task-due-date">${dueDate}</td>
      <td class="task-priority">${priority}</td>
      <td class="task-status ${statusClass}">${statusText}</td>
      <td>
        <button class="edit-task">Edit</button>
        <button class="delete-task">Delete</button>
      </td>
    `;

    // Clear form and hide it
    taskForm.removeAttribute('data-editing');
    addTaskForm.style.display = 'none';
    taskNameInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'low';
    document.getElementById('status-pending').checked = true;  // Default status as Pending
  }
});

// Settings - Theme Switcher
function changeTheme() {
  const theme = document.getElementById('theme').value;
  document.body.className = theme;

  // Save theme in localStorage
  localStorage.setItem('theme', theme);
}

// Show Settings Form
document.getElementById('show-settings-form').addEventListener('click', function () {
  document.getElementById('settings-form').style.display = 'block';
});

// Close Settings Form
document.getElementById('close-settings').addEventListener('click', function () {
  document.getElementById('settings-form').style.display = 'none';
});

// Apply the saved theme from localStorage (if available)
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.className = savedTheme;
document.getElementById('theme').value = savedTheme;
