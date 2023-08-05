const addTaskBtn = document.querySelector('.input__submit');
const removeAllBtn = document.querySelector('.remove-all');

// const todoList = [
//     {
//         task: "Ăn cơm",
//         isChecked: true
//     },
//     {
//         task: "Đánh răng",
//         isChecked: false
//     },
//     {
//         task: "Rửa mặt",
//         isChecked: true
//     },
//     {
//         task: "Tập thể dục",
//         isChecked: false
//     },
//     {
//         task: "Đi học",
//         isChecked: false
//     },
// ]


const storageKey = "todoList";
// localStorage.setItem(storageKey,JSON.stringify(todoList));
const todoList = JSON.parse(localStorage.getItem(storageKey))||[
    {
        task: "Ăn cơm",
        isChecked: true
    },
    {
        task: "Đánh răng",
        isChecked: false
    },
    {
        task: "Rửa mặt",
        isChecked: true
    },
];

// Render Task List
function renderTask(){
    const list = document.querySelector(".list");
    let htmls = todoList.map(function(item, index){
        return `
            <li class="task">
                <span class="task__desc  ${item.isChecked?"checked":""}">${item.task}</span>
                <i class="fa-solid fa-check check" onclick="checkTask(this,${index})"></i>
                <i class="fa-solid fa-x delete" onclick="deleteTask(${index})"></i>
            </li>
        `
    })
    list.innerHTML = htmls.join('');
}

// Add task
function addTask(){
    const input = document.querySelector('.input__value');
    const task = document.querySelector('.input__value').value.trim();
    input.value = '';
    if(task){
        todoList.unshift({
            task: task,
            isChecked: false
        });
    }
    renderTask();
    localStorage.setItem(storageKey,JSON.stringify(todoList));
}

// Remove single task
function deleteTask(index){
    todoList.splice(index,1);
    renderTask();
    localStorage.setItem(storageKey,JSON.stringify(todoList));
}

// Set one task checked
function checkTask(element, index){
    element.closest('.task').querySelector('.task__desc').classList.add('checked');
    todoList[index].isChecked = true;
    localStorage.setItem(storageKey,JSON.stringify(todoList));
}

// Remove all task
function removeAllTask(){
    todoList.splice(0);
    renderTask();
    localStorage.setItem(storageKey,JSON.stringify(todoList));
}

addTaskBtn.addEventListener('click',function(){
    addTask();
});

document.addEventListener('keydown',function(e){
    if(e.keyCode === 13)
        addTask();
})

removeAllBtn.addEventListener('click',function(){
    removeAllTask();
})

renderTask();