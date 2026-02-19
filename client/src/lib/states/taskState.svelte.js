import { browser } from "$app/environment";

const TASK_KEY = "tasks";

let taskState = $state({});


if (browser) {
    const stored = localStorage.getItem(TASK_KEY);

    if (stored) {
        taskState = JSON.parse(stored);
    }
    else {
        localStorage.setItem(TASK_KEY, JSON.stringify(taskState));
    }
}

const pushToStorage = () => {
    if ( browser){
        localStorage.setItem(TASK_KEY, JSON.stringify(taskState));
    }
}

const useTaskState = () => {
    return {
        get tasks() {
            return taskState;
        },
        getOne: (todoId, id) => {
            return (taskState[todoId] ?? []).find(task => task.id == id);
        },
        addTask: (id, task) => {
            if (!taskState[id]) {
                taskState[id] = [];
            }
            task.id = taskState[id].length + 1;
            taskState[id].push(task);
            pushToStorage();
        },
        markAsDone: (todoId, id) => {
            taskState[todoId].find((task) => task.id === id).is_done = true;
            pushToStorage();
        },
        markAsUndone: (todoId, id) => {
            taskState[todoId].find((task) => task.id === id).is_done = false;
            pushToStorage();
        },
        removeTask: (todoId, id) => {
            taskState[todoId] = (taskState[todoId] ?? []).filter(task => task.id != id);
            pushToStorage();
        }

    };
};

export { useTaskState }