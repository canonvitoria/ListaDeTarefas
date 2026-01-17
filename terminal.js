const inputTask = document.querySelector('.input-newTask');
const btnTask = document.querySelector('.btn-addTask');
const tasksList = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li');
    return li;
}

function createDeleteButton(li) {
    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'Apagar';
    btnDelete.setAttribute('class', 'delete');
    btnDelete.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(btnDelete);
}

function cleanInput() {
    inputTask.value = '';
    inputTask.focus();
}

function saveTasks() {
    const liTasks = tasksList.querySelectorAll('li');
    const listOfTasks = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        listOfTasks.push(taskText);
    }

    const tasksJSON = JSON.stringify(listOfTasks);
    localStorage.setItem('tasks', tasksJSON);
}

function createTask(textInput) {
    const li = createLi();
    li.innerText = textInput;
    tasksList.appendChild(li);
    createDeleteButton(li);
    saveTasks();
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const listOfTasks = JSON.parse(tasks) || [];
    
    for (let task of listOfTasks) {
        createTask(task);
    }
}

// Eventos
inputTask.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (!inputTask.value) return;
        createTask(inputTask.value);
        cleanInput();
    }
});

btnTask.addEventListener('click', function() {
    if (!inputTask.value) return;
    createTask(inputTask.value);
    cleanInput();
});

document.addEventListener('click', function(e) {
    const el = e.target;
    
    if (el.classList.contains('delete')) {
        // Remove o elemento pai do botão (o li)
        el.parentElement.remove();
        saveTasks();
    }
});

// Inicializa
addSavedTasks();