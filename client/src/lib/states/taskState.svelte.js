import { browser } from "$app/environment";
import * as tasksApi from "$lib/apis/tasksApi.js";
const TASK_KEY = "tasks";

let taskState = $state({});


const taskInit = async (todoId) => {
    if (browser) {
        try{
        taskState[todoId] = await tasksApi.readTasks(todoId);
        } catch(err){
            console.error("Failed to load tasks:", err);
            taskState[todoId] = [];
        }
    }
};

const useTaskState = () => {
    return {
        get tasks() {
            return taskState;
        },
        getOne: (todoId, id) => {
            return (taskState[todoId] ?? []).find(task => task.id == id);
        },
        addTask: async (id, task) => {
            if (!taskState[id]) {
                taskState[id] = [];
            }
            const newTask = await tasksApi.createTask(id, task);
            taskState[id].push(newTask);
        },
        markAsDone: async (todoId, id) => {
            const current = taskState[todoId].find((task) => task.id === id);
            if (current) {
                current.is_done = true;
                const newTask = await tasksApi.updateTask(todoId, id, current);
                taskState[todoId] = taskState[todoId].map(t => t.id === newTask.id ? newTask : t);
            }
        },
        markAsUndone: async (todoId, id) => {
            const current = taskState[todoId].find((task) => task.id === id)
            if (current) {
                current.is_done = false;
                const newTask = await tasksApi.updateTask(todoId, id, current);
                taskState[todoId] = taskState[todoId].map(t => t.id === newTask.id ? newTask : t);
            }
        },
        removeTask: async (todoId, id) => {
            taskState[todoId] = (taskState[todoId] ?? []).filter(task => task.id != id);
            await tasksApi.deleteTask(todoId, id);
        }

    };
};

export { useTaskState, taskInit }