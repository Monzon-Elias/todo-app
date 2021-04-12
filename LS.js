//save todos to local storage
export function saveToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
//retrieve todos from local storage
export function getFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
}