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
        WHERE community_id = ${communityId} AND parent_post_id IS NULL`;
};
const findById = async (id) => {
    const result = await sql`
        SELECT * FROM posts
        WHERE id = ${id}`;
    if (result.length === 0) {
        return undefined;
    }
    return result[0];
};
const deleteById = async (id) => {
    const result = await sql`
        DELETE FROM posts
        WHERE id = ${id}
        RETURNING *;`;
    if (result.length === 0) {
        return undefined;
    }
    return result[0];
};

export {create, findAll, findById, deleteById};