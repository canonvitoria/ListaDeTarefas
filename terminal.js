const inputTask = document.querySelector('.input-newTask');
const botao = document.querySelector('.btn-addTask');
const task = document.querySelector('.tasks')

inputTask.addEventListener('keypress', function(event) {
    if(event.keyCode === 13) {
        if (!inputTask.value) return;
        getTask(inputTask.value);
    }
});

function getLi() {
    const li = document.createElement('li');
    return li;
}

function cleanInput() {
    inputTask.value = '';
    inputTask.focus();
};

function getButtonDelete(li) {
    li.innerText += ' ';
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText= 'APAGAR';
    buttonDelete.setAttribute('class', 'delete');
    li.appendChild(buttonDelete);
}

function getTask(textInput) {
    const li = getLi();
    li.innerText = textInput;
    task.appendChild(li);
    cleanInput();
    getButtonDelete(li);
    salveTasks();
};

function salveTasks() {
    const liTasks = task.querySelectorAll('li');
    const listTasks = [];

    for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace('delete', '').trim();
    listTasks.push(taskText);
    }

    const tasksJSON = JSON.stringify(listTasks);
    localStorage.setItem('tasks', tasksJSON);
};

function addTasksSalvas() {
    const task = localStorage.getItem('tasks');
    const  listTasks = JSON.parse(task);
    
    for (let  task of listTasks) {
        getTask(task);
    }
}
addTasksSalvas();

botao.addEventListener('click', function(event) {
    if (!inputTask.value) return;
    getTask(inputTask.value);
});

document.addEventListener('click', function(event) {
    const elemento = event.target;
    
    if (elemento.classList.contains('delete')) {
        elemento.parentElement.remove();
        salveTasks();
    }
})
