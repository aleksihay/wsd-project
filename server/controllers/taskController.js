import { error } from 'node:console';
import * as taskRepository from '../repositories/taskRepository.js';

const create = async (c) => {
    const id = Number(c.req.param("todoId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid todo id"}, 400);
    }
    const task = await c.req.json();
    if (!task.description || typeof task.is_done !== "boolean") {
        return c.json({ error: "Missing required fields"}, 400);
    }
    const newTask = await taskRepository.create(user.id, id, task);
    if (!newTask) {
        return c.json({ error: "Could not create task"}, 404);
    }
    return c.json(newTask, 201);
};
const readAll = async (c) => {
    const id = Number(c.req.param("todoId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid todo id"}, 400);
    }
    const tasks = await taskRepository.findAll(user.id, id);
    if (!tasks) {
        return c.json({ error: "Todo not found"}, 404);
    }
    return c.json(tasks, 200);
};
const readOne = async (c) => {
    const id = Number(c.req.param("taskId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid task id"}, 400);
    }
    const task = await taskRepository.findById(user.id, id);
    if (!task) {
        return c.json({ error: "Task not found"}, 404);
    }
    return c.json(task, 200);
};
const update = async (c) => {
    const id = Number(c.req.param("taskId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid task id"}, 400);
    }
    const task = await c.req.json();
    if (typeof task.description !== "string" || typeof task.is_done !== "boolean") {
        return c.json({ error: "Missing required fields"}, 400);
    }
    const updatedTask = await taskRepository.updateById(user.id, id, task);
    if (!updatedTask) {
        return c.json({ error: "Task not found"}, 404);
    }
    return c.json(updatedTask, 200);
};
const deleteOne = async (c) => {
    const id = Number(c.req.param("taskId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid task id"}, 400);
    }
    const task = await taskRepository.deleteById(user.id, id);
    if (!task) {
        return c.json({ error: "Task not found"}, 404);
    }
    return c.json(task, 200);
}
// add controller functions here and export them
export {create, readAll, readOne, update, deleteOne};