import { PUBLIC_API_URL } from "$env/static/public";

const readTasks = async (todoId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks`);
    return await response.json();
};
const readTask = async (todoId, taskId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`);
    return await response.json();
}
const createTask = async (todoId, task) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks`, {
        headers: {"Content-Type": "application/json",},
        method: "POST",
        body: JSON.stringify(task),
    });
    return await response.json();
};
const updateTask = async (todoId, taskId, task) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`, {
        headers: {"Content-Type": "application/json",},
        method: "PUT",
        body: JSON.stringify(task),
    });
    return await response.json();
};
const deleteTask = async (todoId, taskId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`, {
        method: "DELETE",
    });
    return await response.json();
};

export { readTasks, readTask, createTask, updateTask, deleteTask };