import { getFromLS, saveToLS } from "./LS.js";
import {
  addNewTodo,
  listTodos,
  updateTodo,
  pending,
  completed,
  displayAll,
} from "./utilities.js";
import { qs, clearInputs } from "./view.js";

let _pending = false;
let _completed = false;

let todos = [];
todos = getFromLS("todos");
console.log(todos);

if (todos != null) {
  displayAll();
} else {
  todos = [];
  saveToLS("todos", todos);
}

//add new todo
qs("#addT").addEventListener("click", () => {
  if (qs("#todoText").value.length > 0) {
    qs("#todoText").classList.remove("inputAlert");
    addNewTodo();
    todos = getFromLS("todos");
    if (_pending) {
      pending(todos);
    } else if (_completed) {
      completed(todos);
    } else {
      displayAll();
    }
  } else qs("#todoText").classList.add("inputAlert");
  clearInputs();
});

//updateTodo()
qs("#save").addEventListener("click", () => {
  if (qs("#edText").value.length > 0) {
    qs("#edText").classList.remove("inputAlert");
    updateTodo();
    todos = getFromLS("todos");
    if (_pending) {
      pending(todos);
    } else if (_completed) {
      completed(todos);
    } else {
      listTodos(todos);
    }
  } else qs("#edText").classList.add("inputAlert");
});

//pending todos
qs("#pending").addEventListener("click", () => {
  todos = getFromLS("todos");
  pending(todos);
  qs("#pending").disabled = true;
  //qs("#addForm").classList.add("hide");
  _pending = true;
  _completed = false;
});

//completed todos
qs("#completed").addEventListener("click", () => {
  todos = getFromLS("todos");
  completed(todos);
  qs("#completed").disabled = true;
  //qs("#addForm").classList.add("hide");
  _completed = true;
  _pending = false;
});

//all todos
qs("#all").addEventListener("click", () => {
  _completed = false;
  _pending = false;
  displayAll();
  qs("#addForm").classList.remove("hide");
});
