//cross-out todo
export function crossOutTodo(el) {
    el.classList.add('completed');
}
//clear user input
export function clearInputs() {
    qs('#todoText').value = '';
}
//get list element
export function qs(selector) {
    return document.querySelector(selector);
}