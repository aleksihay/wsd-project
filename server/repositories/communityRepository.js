import postgres from "postgres";

const sql = postgres();

const create = async (comm) => {
    const result = await sql`
        INSERT INTO communities
        (name, description)
        VALUES (${comm.name}, ${comm.description})
        RETURNING *;`;
    return result[0];
};
const deleteById = async (id) => {
    const result = await sql`
        DELETE FROM communities
        WHERE id = ${id}
        RETURNING *;`;
    if (result.length === 0) {
        return undefined;
    }
    return result[0];
};
const findAll = async () => {
    return await sql`SELECT * FROM communities`;
};
const findById = async (id) => {
    const result = await sql`
        SELECT * FROM communities
        WHERE id = ${id}`;
    if (result.length === 0) {
        return undefined;
    }
    return result[0];
};

export {create, findAll, findById, deleteById};