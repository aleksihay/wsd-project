import { browser } from "$app/environment";

const TODO_KEY = "todos";

let todoState = $state([]);


if (browser) {
    const stored = localStorage.getItem(TODO_KEY);

    if (stored) {
        todoState = JSON.parse(stored);
    }
    else {
        localStorage.setItem(TODO_KEY, JSON.stringify(todoState));
    }
}

const pushChanges = () => {
    if (browser) {
        localStorage.setItem(TODO_KEY, JSON.stringify(todoState));
    }
};




const useTodoState = () => {
    return {
        get todos() {
            return todoState;
        },
        getOne: (id) => {
            return todoState.find(todo => todo.id == id);
        },
        addTodo: (todo) => {
            todo.id = todoState.length + 1;
            todoState.push(todo);
            pushChanges();
        },
        removeTodo: (id) => {
            todoState = todoState.filter(todo => todo.id != id);
            pushChanges();
        }
    };
};

export { useTodoState };