export class Todo {
    constructor(todoDate, text, completed) {
        this.id = Date.now(),
        this.todoDate = todoDate;
        this.text = text;
        this.completed = completed;
    }

    date() {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var date = day + "-" + month + "-" + year;
        return this.todoDate = date;
    }
}