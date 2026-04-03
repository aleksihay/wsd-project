import postgres from "postgres";

const sql = postgres();
//ppId = Parent Post Id
const create = async (userId, communityId, ppId, comment) => {          
    const result = await sql`
        INSERT INTO posts (community_id, content, parent_post_id, created_by)
        VALUES (${communityId}, ${comment.content}, ${ppId}, ${userId})                                    
        RETURNING *;`;
    const newComment = result[0];
    return await getVotes(newComment.id);                         
};
const findAll = async (communityId, ppId) => {
    return await sql`
        SELECT
            posts.id,
            posts.title,
            posts.content,
            posts.community_id,
            posts.parent_post_id,
            COUNT(*) FILTER (WHERE votes.vote = 'upvote')::int AS upvotes,
            COUNT(*) FILTER (WHERE votes.vote = 'downvote')::int AS downvotes,
            posts.created_at
        FROM posts
        LEFT JOIN votes
            ON posts.id = votes.post_id
        WHERE posts.community_id = ${communityId} AND 
              posts.parent_post_id = ${ppId}
        GROUP BY
            posts.id,
            posts.title,
            posts.content,
            posts.community_id,
            posts.created_at;
        ORDER BY posts.created_at DESC;
            `;
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

const upvotePost = async (userId, postId) => {
    if (await findVote(userId, postId)){
        await deleteVote(userId, postId);
    }
    await sql`
        INSERT INTO votes (user_id, post_id, vote)
        VALUES (${userId}, ${postId}, 'upvote');`;
};

const downvotePost = async (userId, postId) => {
    if (await findVote(userId, postId)){
        await deleteVote(userId, postId);
    }
    await sql`
        INSERT INTO votes (user_id, post_id, vote)
        VALUES (${userId}, ${postId}, 'downvote');`;
};

const getVotes = async (postId) => {
    const result = await sql`
        SELECT
            posts.id,
            posts.title,
            posts.content,
            posts.community_id,
            posts.parent_post_id,
            COUNT(*) FILTER (WHERE votes.vote = 'upvote')::int AS upvotes,
            COUNT(*) FILTER (WHERE votes.vote = 'downvote')::int AS downvotes,
            posts.created_at
        FROM posts
        LEFT JOIN votes
            ON posts.id = votes.post_id
        WHERE posts.id = ${postId}
        GROUP BY
            posts.id,
            posts.title,
            posts.content,
            posts.community_id,
            posts.created_at;
            `;
    if (result.length === 0) {
        return undefined;
    }
    return result[0];
};

const findVote = async (userId, postId) => {
    const result = await sql`
        SELECT * FROM votes
        WHERE user_id = ${userId} AND post_id = ${postId};`;
    return result.length > 0;
};

const deleteVote = async (userId, postId) => {
    await sql`
        DELETE FROM votes
        WHERE user_id = ${userId} AND post_id = ${postId};`;
};

export {create, findAll, deleteComment, upvotePost, downvotePost, getVotes};