import { getFromLS, saveToLS } from "./LS.js";
import {
  addNewTodo,
  listTodos,
  updateTodo,
  pending,
  completed,
} from "./utilities.js";
import { qs, clearInputs } from "./view.js";

let todos = [];
todos = getFromLS("todos");
console.log(todos);
if (todos != null) {
  listTodos(todos);
  qs("#all").classList.add("fade");
} else {
  todos = [];
  saveToLS("todos", todos);
}

//add new todo
qs("#addT").addEventListener("click", () => {
  if (qs("#todoText").value.length > 0) {
    qs("#todoText").classList.remove("inputAlert");
    addNewTodo();
    clearInputs();
  } else qs("#todoText").classList.add("inputAlert");
});

//updateTodo()
qs("#save").addEventListener("click", () => {
  if (qs("#edText").value.length > 0) {
    qs("#edText").classList.remove("inputAlert");
    updateTodo();
  } else qs("#edText").classList.add("inputAlert");
});

//pending todos
qs("#pending").addEventListener("click", () => {
  todos = getFromLS("todos");
  pending(todos);
  qs("#pending").classList.add("fade");
  qs("#addForm").classList.add("hide");
});

//completed todos
qs("#completed").addEventListener("click", () => {
  todos = getFromLS("todos");
  completed(todos);
  qs("#completed").classList.add("fade");
  qs("#addForm").classList.add("hide");
});

//all todos
qs("#all").addEventListener("click", () => {
  todos = getFromLS("todos");
  listTodos(todos);
  qs("#all").classList.add("fade");
  qs("#addForm").classList.remove("hide");
});
