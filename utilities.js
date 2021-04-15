import { Todo } from "./Todos.js";
import { crossOutTodo, qs } from "./view.js";
import { getFromLS, saveToLS } from "./LS.js";

//this variable temporarily stores the id of the edited todo
let _id = 0;

//add new todo
export function addNewTodo() {
  const newTodo = new Todo();
  newTodo.todoDate = qs("#date").value;
  newTodo.text = qs("#todoText").value;
  newTodo.completed = false;
  let todos = [];
  todos = getFromLS("todos");
  todos.push(newTodo);
  saveToLS("todos", todos);
}

function inputChecked(e) {
  // get id of Todo that was clicked
  let todoId = e.target.value;
  // find the todo that was clicked from the todo array
  let todos = [];
  todos = getFromLS("todos");
  let todo = todos.find((todoItem) => todoItem.id == todoId);
  // change the completed property to its opposite
  todo.completed = !todo.completed;
  console.log(todo);
  //save to LS
  saveToLS("todos", todos);
  //list the todos
  listTodos();
}

function getDoneCount(todos) {
  let done = todos.filter((todoItem) => todoItem.completed == true);
  let unDone = todos.filter((todoItem) => todoItem.completed == false);
  done.length > 1
    ? (qs(
        "#doneCount"
      ).innerHTML = `You have <b>${done.length}</b> todos completed`)
    : (qs(
        "#doneCount"
      ).innerHTML = `You have <b>${done.length}</b> todo completed`);
  unDone.length > 1
    ? (qs(
        "#unDoneCount"
      ).innerHTML = `You have <b>${unDone.length}</b> todos incompleted`)
    : (qs(
        "#unDoneCount"
      ).innerHTML = `You have <b>${unDone.length}</b> todo incompleted`);
}

//edit budget item
function editTodo(e) {
  qs("#addForm").classList.add("hide");
  qs("#editForm").classList.remove("hide");
  //_editMode = true;
  let todoId = e.target.id;
  _id = todoId;
  console.log(todoId);
  let todos = [];
  todos = getFromLS("todos");
  let todo = todos.find((todo) => todo.id == todoId);
  //put the values of this element back on the input fields so the user can edit them
  qs("#edText").value = todo.text;
  qs("#edDate").value = todo.todoDate;
}

//update budget item
export function updateTodo() {
  qs("#addForm").classList.remove("hide");
  qs("#editForm").classList.add("hide");
  let todos = [];
  todos = getFromLS("todos");
  let todo = todos.find((todo) => todo.id == _id);
  //the user edit the values of the todo
  todo.text = qs("#edText").value;
  todo.todoDate = qs("#edDate").value;
  let index = todos.indexOf(todo);
  //I remove the old todo and store the edited one back to the array.
  todos.splice(index, 1, todo);
  //save to LS
  saveToLS("todos", todos);
  listTodos();
  _id = 0;
}

function deleteTodo(e) {
  let todoId = e.target.id;
  console.log(todoId);
  let todos = [];
  todos = getFromLS("todos");
  let todo = todos.find((todoItem) => todoItem.id == todoId);
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  //save to LS
  saveToLS("todos", todos);
  //list the todos
  listTodos();
}

export function listTodos() {
  // clear the table
  qs("#todoList").innerHTML = "";
  // add new tr for each Todo item
  let todos = [];
  todos = getFromLS("todos");
  todos.forEach((todo) => {
    let tr = document.createElement("tr");
    //create input[type=checkbox] with attributes
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("value", todo.id);
    //create span for the todo text
    let text = document.createElement("td");
    text.textContent = todo.text;
    //create span for the todo date
    let date = document.createElement("td");
    date.textContent = todo.todoDate;
    //add event listener for the checkbox and reference inputChecked method on it
    checkbox.addEventListener("click", inputChecked);
    //create img for the delete feature
    let trashIcon = document.createElement("img");
    trashIcon.id = todo.id;
    trashIcon.setAttribute("src", "delete-24px.svg");
    trashIcon.addEventListener("click", deleteTodo);
    //append it inside its own td
    let deleteTd = document.createElement("td");
    deleteTd.appendChild(trashIcon);
    //create img for the edit feature
    let editIcon = document.createElement("img");
    editIcon.id = todo.id;
    editIcon.setAttribute("src", "edit-24px.svg");
    editIcon.addEventListener("click", editTodo);
    //append it inside its own td
    let editTd = document.createElement("td");
    editTd.appendChild(editIcon);
    if (todo.completed) {
      checkbox.checked = true;
      crossOutTodo(text);
    }
    //creating the li element
    tr.appendChild(checkbox);
    tr.appendChild(text);
    tr.appendChild(date);
    tr.appendChild(editTd);
    tr.appendChild(deleteTd);
    qs("#todoList").appendChild(tr);
  });
  //done and undone texts
  getDoneCount(todos);
}
