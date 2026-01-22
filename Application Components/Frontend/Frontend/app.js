let tasks = [];
let editTaskId = null;

const addTaskBtn = document.getElementById('addTaskBtn');
const taskModal = document.getElementById('taskModal');
const closeBtn = document.querySelector('.close-btn');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const modalTitle = document.getElementById('modalTitle');
const filterButtons = document.querySelectorAll('.filter-btn');

function openModal(edit = false, task = null) {
    taskModal.classList.remove('hidden');
    if (edit && task) {
        modalTitle.textContent = 'Edit Task';
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        document.getElementById('status').value = task.status;
        editTaskId = task.id;
    } else {
        modalTitle.textContent = 'Add Task';
        taskForm.reset();
        editTaskId = null;
    }
}

function closeModal() {
    taskModal.classList.add('hidden');
}

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => filter === 'all' ? true : task.status === filter);
    filteredTasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <div class="actions">
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskCard);
    });
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) openModal(true, task);
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks(getActiveFilter());
}

function getActiveFilter() {
    const activeBtn = document.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.dataset.status : 'all';
}

// Event Listeners
addTaskBtn.addEventListener('click', () => openModal());
closeBtn.addEventListener('click', closeModal);

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    if (editTaskId) {
        const task = tasks.find(t => t.id === editTaskId);
        task.title = title;
        task.description = description;
        task.status = status;
    } else {
        tasks.push({
            id: Date.now(),
            title,
            description,
            statu
