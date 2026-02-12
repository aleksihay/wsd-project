import postgres from "postgres";

const sql = postgres();

const create = async (communityId, post) => {
    const result = await sql`
        INSERT INTO posts (community_id, title, content)
        VALUES (${communityId}, ${post.title}, ${post.content})
        RETURNING *;`;
    return result[0];
};
const findAll = async (communityId) => {
    return await sql`
        SELECT * FROM posts
        WHERE community_id = ${communityId}`;
};
const findById = async (id) => {
    return await sql`
        SELECT * FROM posts
        WHERE id = ${id}`;
};
const deleteById = async (id) => {
    const result = sql`
        DELETE FROM posts
        WHERE id = ${id}
        RETURNING *;`;
    return result[0];
};

export {create, findAll, findById, deleteById};