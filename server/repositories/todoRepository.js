import postgres from "postgres";

const sql = postgres();

const create = async (userId, todo) => {
    const result = await sql`
        INSERT INTO todos
        (name, user_id)
        VALUES (${todo.name}, ${userId})
        RETURNING *;`;
    return result[0];
};

const deleteById = async (userId, todoId) => {
    const result = await sql`
        DELETE FROM todos
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING *;`;
    if (result.length === 0) {
        return undefined;
    }
    return result[0];
};

const findAll = async (userId) => {
    return await sql`
        SELECT * FROM todos
        WHERE user_id = ${userId}`;
};

const findById = async (userId, todoId) => {
    const result = await sql`
        SELECT * FROM todos
        WHERE id = ${id} AND user_id = ${userId}`;
    if (result.length === 0) {
        return undefined;
    }
    return result[0];
};

const updateById = async (userId, todoId, todo) => {
    const result = await sql `
        UPDATE todos SET
            name = ${todo.name}
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING *;`;
    if (result[0] === 0) {
        return undefined;
    }
    return result[0];
};

export { create, deleteById, findAll, findById, updateById }