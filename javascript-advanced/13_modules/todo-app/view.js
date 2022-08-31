
function createAppTitle(title) {      //Создаем и возвращаем заголовок приложения
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title
    return appTitle;
}

function createTodoItemForm() {   //Создаем и возвращаем форму для создания дела
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-croup-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";

    button.disabled = true;   //Деактивируем кнопку по умолчанию

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    input.addEventListener("input", function(e) {    // функция активации кнопки при тексте в input
        e.preventDefault();
        button.disabled = input.value.length > 0 ? false : true
    });

    return { form, input, button };
};

//Создать задачу, признак выполнения, кнопки,
function createTodoItemElement(name, id, done = false, owner, { onDone, onDelete }) {
    let item = document.createElement("li");
    //Кнопки перемещаем в элемент, который красиво их покажет в одной группе
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    //Устанавливаем стили для элемента списка, а так же для размещения кнопок
    //в его правой части с помощью flex
    item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    item.owner = owner
    item.id = id
    item.done = done
    item.textContent = name;

    if (done == true) item.classList.add("list-group-item-success");

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    doneButton.addEventListener('click', async function() {
        item.done=!item.done
        item.classList.toggle('list-group-item-success');
        onDone( item )
    });
    deleteButton.addEventListener('click', async function() {
        if (confirm('Вы уверены?')) {

            if (onDelete(item)) item.remove();
            else confirm('Не удалось удалить дело')
        }
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return { item, doneButton, deleteButton };
};

//Создаем и возвращаем список элементов (будующий)
function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add('list-group');
    return list;
};


async function createTodoApp(container, {
    title = 'Список дел',
    owner,
    defaultTasks,
    todoItemList = [],
    onCreateFormSubmit,
    onDoneClick,
    onDeleteClick,
}) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    const  handlers = {onDone: onDoneClick, onDelete: onDeleteClick};
 
    //Сначала разберем LocslStorage или сервер
    if (typeof (defaultTasks) == "undefined") defaultTasks = [];

     //Если нет задач, то добавим на сервер дефаултные
    if (todoItemList.length == 0) {
        for (let taskItem of defaultTasks){
            const task = await onCreateFormSubmit({ owner, name: taskItem.name, done: taskItem.done })
            todoItemList.push(task)
        }
    }
    // Раскручиваем список задач
    for (let taskItem of todoItemList) {
        const todoItemElement = createTodoItemElement(taskItem.name, taskItem.id, taskItem.done, owner, handlers);  // Создать задачу (имя, выполнение)
        todoList.append(todoItemElement.item);
    }

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    //браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!todoItemForm.input.value) return; //игнорируем создание элемента, если пользователь ни чего не ввел в поле
        const task = await onCreateFormSubmit({ owner, name: todoItemForm.input.value.trim() })
        const todoItemElement = createTodoItemElement(task.name, task.id, task.done, owner, handlers);  //создаем новую введенную задачу
        todoList.append(todoItemElement.item);
        todoItemForm.input.value = '';          //обнуляем значение в поле, что бы не пришлось стирать его вручную
        todoItemForm.button.disabled = true;   //Делаем кнопку не активной
    });
}

export { createTodoApp }; 
