import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils";

const readTasks = async (todoId) => {
    return await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks`);
};
const readTask = async (todoId, taskId) => {
    return await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`);
}
const createTask = async (todoId, task) => {
    return await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks`, {
        headers: {"Content-Type": "application/json",},
        method: "POST",
        body: JSON.stringify(task),
    });
};
const updateTask = async (todoId, taskId, task) => {
    return await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`, {
        headers: {"Content-Type": "application/json",},
        method: "PUT",
        body: JSON.stringify(task),
    });
};
const deleteTask = async (todoId, taskId) => {
    return await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`, {
        method: "DELETE",
    });
};

export { readTasks, readTask, createTask, updateTask, deleteTask };