import { Todo } from './Todos.js';
import { crossOutTodo, qs } from './view.js';
import { getFromLS, saveToLS } from './LS.js';

//add new todo
export function addNewTodo() {
    const newTodo = new Todo();
    newTodo.todoDate = newTodo.date();
    newTodo.text = qs('#todoText').value;
    newTodo.completed = false;
    let todos = [];
    todos = getFromLS('todos');
    todos.push(newTodo);
    saveToLS('todos', todos);
}

function inputChecked(e) {
    // get id of Todo that was clicked
    let todoId = e.target.value;
    // find the todo that was clicked from the todo array
    let todos = [];
    todos = getFromLS('todos');
    let todo = todos.find((todoItem) => todoItem.id == todoId);
    // change the completed property to its opposite
    todo.completed = !todo.completed;
    console.log(todo);
    //save to LS
    saveToLS('todos', todos);
    //list the todos
    listTodos();
}

function getDoneCount(todos) {
    let done = todos.filter((todoItem) => todoItem.completed == true);
    let unDone = todos.filter((todoItem) => todoItem.completed == false);
    (done.length > 1) ?
        qs('#doneCount').innerHTML = `You have ${done.length} todos completed` :
        qs('#doneCount').innerHTML = `You have ${done.length} todo completed`;
    (unDone.length > 1) ?
        qs('#unDoneCount').innerHTML = `You have ${unDone.length} todos incompleted` :
        qs('#unDoneCount').innerHTML = `You have ${unDone.length} todo incompleted`;
}

function deleteTodo(e) {
    let todoId = e.target.id;
    console.log(todoId);
    let todos = [];
    todos = getFromLS('todos');
    let todo = todos.find((todoItem) => todoItem.id == todoId);
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    //save to LS
    saveToLS('todos', todos);
    //list the todos
    listTodos();
}

export function listTodos() {
    // clear the table
    qs('#todoList').innerHTML = '';
    // add new li for each Todo item
    let todos = [];
    todos = getFromLS('todos');
    todos.forEach(
        (todo) => {
            let li = document.createElement('li');
            //create input[type=checkbox] with attributes
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('value', todo.id);
            //create span for the todo text
            let text = document.createElement('span');
            text.textContent = todo.text;
            //create span for the todo date
            let date = document.createElement('span');
            date.textContent = todo.todoDate;
            //add event listener for the checkbox and reference inputChecked method on it
            checkbox.addEventListener('click', inputChecked);
            //create img for the delete feature
            let trashIcon = document.createElement('img');
            trashIcon.id = todo.id;
            trashIcon.setAttribute('src', 'delete-24px.svg');
            trashIcon.addEventListener('click', deleteTodo);
            if (todo.completed) {
                checkbox.checked = true;
                crossOutTodo(text);
            }
            //creating the li element
            li.appendChild(checkbox);
            li.appendChild(text);
            li.appendChild(date);
            li.appendChild(trashIcon);
            qs('#todoList').appendChild(li);
        }
    );
    //done and undone texts
    getDoneCount(todos);
}
