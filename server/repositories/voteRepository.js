import postgres from "postgres";

const sql = postgres();

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
            COUNT(*) FILTER (WHERE votes.vote = 'upvote') AS upvotes,
            COUNT(*) FILTER (WHERE votes.vote = 'downvote') AS downvotes,
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
export {upvotePost, downvotePost, getVotes};