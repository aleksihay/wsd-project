import { PUBLIC_API_URL } from "$env/static/public";

const readTodos = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/todos`);
    return await response.json();
};
const readTodo = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/todos/${id}`);
    return await response.json();
};
const createTodo = async (todo) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/todos`,{
        headers: {"Content-Type": "application/json",},
        method: "POST",
        body: JSON.stringify(todo),
    });
    return await response.json();
};
const updateTodo = async (id, todo) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/todos/${id}`, {
        headers: {"Content-Type": "application/json",},
        method: "PUT",
        body: JSON.stringify(todo),
    });
    return await response.json();
};
const deleteTodo = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/todos/${id}`, {
        method: "DELETE",
    });
    return await response.json();
};
export { readTodo, readTodos, createTodo, updateTodo, deleteTodo }; 