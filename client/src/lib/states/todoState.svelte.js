import { browser } from "$app/environment";
import * as todosApi from "$lib/apis/todosApi.js";

let todoState = $state([]);

const initTodos = async () => {
    if (browser) {
        todoState = await todosApi.readTodos(); 
    }
};

const useTodoState = () => {
    return {
        get todos() {
            return todoState;
        },
        addTodo: async (todo) => {
            const newTodo = await todosApi.createTodo(todo);
            if (newTodo.name) {
                todoState.push(newTodo);
            }
        },
        removeTodo: async (id) => {
            todoState = todoState.filter(todo => todo.id != id);
            await todosApi.deleteTodo(id);
        },
        editTodo: async (id, todo) => {
            const newTodo = await todosApi.updateTodo(id, todo);
            todoState = todoState.map(t => t.id === newTodo.id ? newTodo : t);
        },
    };
};

export { useTodoState, initTodos };