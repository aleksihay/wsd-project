import * as userRepository from "../repositories/userRepository.js";

const getAllUsers = async (c) => {
  const users = await userRepository.getAllUsers();
  return c.json(users);
};

const getStats = async (c) => {
    const todo_count = await userRepository.getTodoTotal();
    const task_count = await userRepository.getTaskTotal();
    return c.json( { "todos": todo_count,
                     "tasks": task_count});
};
export { getAllUsers, getStats };