import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils";

const readTodos = async () => {
    return await authFetch(`${PUBLIC_API_URL}/api/todos`);
};
const readTodo = async (id) => {
    return await authFetch(`${PUBLIC_API_URL}/api/todos/${id}`);
};
const createTodo = async (todo) => {
    return await authFetch(`${PUBLIC_API_URL}/api/todos`,{
        headers: {"Content-Type": "application/json",},
        method: "POST",
        body: JSON.stringify(todo),
    });
};
const updateTodo = async (id, todo) => {
    return await authFetch(`${PUBLIC_API_URL}/api/todos/${id}`, {
        headers: {"Content-Type": "application/json",},
        method: "PUT",
        body: JSON.stringify(todo),
    });
};
const deleteTodo = async (id) => {
    return await authFetch(`${PUBLIC_API_URL}/api/todos/${id}`, {
        method: "DELETE",
    });
};
export { readTodo, readTodos, createTodo, updateTodo, deleteTodo }; 