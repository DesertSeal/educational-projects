// Запрос списка дел
export async function getTodoList(owner) {
    const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    return await response.json();
}

// Записать задачу
export async function createTodoItem({owner, name}) {
    const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, owner, done: false })
    });
    return await response.json();
}


export async function switchTodoItemDone(todoItem){
    await fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ done: todoItem.done }),
        headers: { 'Content-Type': 'application/json',}
    })
}

export async function deleteTodoItem(todoItem){
    const response = await fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'DELETE',
    })
    return response.ok
}

// кнопки
// const handlers = {
//     async onDone( todoItem ) {
//         await fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
//             method: 'PATCH',
//             body: JSON.stringify({ done: todoItem.done }),
//             headers: { 'Content-Type': 'application/json',}
//         })
//     },
//     async onDelete( todoItem ) {
//         const response = await fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
//             method: 'DELETE',
//         })
//         return response.ok
//     },
// };


// Запрос списка дел
// const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
// let todoItemList = await response.json();


// Записать задачу (конкретно дефаултную)
// const response = await fetch('http://localhost:3000/api/todos', {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({ name: taskItem.name, owner: owner, done: taskItem.done })
// });
// task = await response.json();


// Записать задачу (конкретно из строчки)
// const response = await fetch('http://localhost:3000/api/todos', {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({ name: todoItemForm.input.value.trim(), owner: owner, done: false })
// });
// let task= await response.json();