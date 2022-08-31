// Запрос списка дел
export async function getTodoList(owner) {
    let tasks=localStorage.getItem(owner);
    if (tasks === null) tasks='[]';
    return JSON.parse(tasks);
}

// Записать задачу
export async function createTodoItem({owner, name}) {
    let task = {};
    task.name = name;
    task.done = false;
    const delay =(new Date()).getTime();
    do  {console.log('Маленькая пауза')} while ( (delay == (new Date()).getTime()) )
    task.id = (new Date()).getTime();
    let tasks = localStorage.getItem(owner);
    if (tasks === null) tasks='[]';
    let tasksArr = JSON.parse(tasks);
    tasksArr.push(task);
    localStorage.setItem(owner, JSON.stringify(tasksArr));
    task.owner=owner;
    return task
}


export async function switchTodoItemDone(todoItem){
    const tasksArr = JSON.parse(localStorage.getItem(todoItem.owner));
    const index = tasksArr.findIndex(el => el.id == todoItem.id);
    tasksArr[index].done = !tasksArr[index].done;
    localStorage.setItem(todoItem.owner, JSON.stringify(tasksArr));
}

export async function deleteTodoItem(todoItem){
    const tasksArr = JSON.parse(localStorage.getItem(todoItem.owner));
    const index = tasksArr.findIndex(el => el.id == todoItem.id);
    tasksArr.splice(index, 1);
    localStorage.setItem(todoItem.owner, JSON.stringify(tasksArr));
}
