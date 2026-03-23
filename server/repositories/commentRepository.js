import postgres from "postgres";

const sql = postgres();
//ppId = Parent Post Id
const create = async (userId, communityId, ppId, comment) => {          
    const result = await sql`
        INSERT INTO posts (community_id, content, parent_post_id, created_by)
        VALUES (${communityId}, ${comment.content}, ${ppId}, ${userId})                                    
        RETURNING *;`;
    return result[0];                         
};
const findAll = async (communityId, ppId) => {
    return await sql`
        SELECT * FROM posts
        WHERE community_id = ${communityId} AND parent_post_id = ${ppId}`;
};
const deleteComment = async (userId, communityId, ppId, commentId) => {
    const result = await sql`
        DELETE FROM posts
        WHERE id = ${commentId} 
            AND community_id = ${communityId} 
            AND parent_post_id = ${ppId}
            AND created_by = ${userId}
        RETURNING *;`;
    if (result.length === 0) {
        return undefined;
    }
    return result[0];
};

export {create, findAll, deleteComment};