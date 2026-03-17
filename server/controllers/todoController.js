import { error } from 'node:console';
import * as todoRepository from '../repositories/todoRepository.js';

const create = async (c) => {
    try {
        const user = c.get("user")
        const todo = await c.req.json();
        if (!todo.name) {
            return c.json({ "error": "Missing required fields"}, 400);
        }
        const newTodo = await todoRepository.create(user.id, todo);
        return c.json(newTodo, 201);
    } catch (err) {
        console.error(err);
        return c.json({ error: "Could not create a todo"}, 400);
    }
};
const readAll = async (c) => {
    const user = c.get("user");
    const todos = await todoRepository.findAll(user.id);
    return c.json(todos, 200);
};
const readOne = async (c) => {
    const user = c.get("user");
    const todoId = Number(c.req.param("todoId"));
    if (!Number.isInteger(todoId)) {
        return c.json({ "error": "Invalid todo id"}, 400);
    }
    const todo = await todoRepository.findById(user.id, todoId);
    if (!todo) {
        return c.json({ "error": "Todo not found"}, 404);
    }
    return c.json(todo, 200);
};
const update = async (c) => {
    const user = c.get("user");
    const todoId = Number(c.req.param("todoId"));
    if (!Number.isInteger(todoId)) {
        return c.json({ "error": "Invalid todo id"}, 400);
    }
    const todo = await c.req.json();
    if (!todo.name) {
        return c.json({ "error": "Missing required fields"}, 400);
    }
    const updateTodo = await todoRepository.updateById(user.id, todoId, todo);
    if (!updateTodo) {
        return c.json({ "error": "Todo not found"}, 404);
    }
    return c.json(updateTodo, 200);
};
const deleteOne = async (c) => {
    const user = c.get("user");
    const todoId = Number(c.req.param("todoId"));
    if (!Number.isInteger(todoId)) {
        return c.json({ "error": "Invalid todo id"}, 400);
    }
    const deleteTodo = await todoRepository.deleteById(user.id, todoId);
    if (!deleteTodo) {
        return c.json({ "error": "Todo not found"}, 404);
    }
    return c.json(deleteTodo, 200);
};
export { create, readAll, readOne, update, deleteOne };