import * as commentRepository from "../repositories/commentRepository.js";

const create = async (c) => {
    const communityId = Number(c.req.param("communityId")); 
    const ppId = Number(c.req.param("postId"));
    if (!Number.isInteger(communityId) || !Number.isInteger(ppId)) {
        return c.json({ error: "Invalid community id or original post id"}, 400);
    }
    const comment = await c.req.json();
    if (!comment.content) {
        return c.json({ error: "Missing fields"}, 400);
    }
    const newComment = await commentRepository.create(communityId, ppId, comment);
    return c.json(newComment, 201);
};
const readAll = async (c) => {
    const communityId = Number(c.req.param("communityId")); 
    const ppId = Number(c.req.param("postId"));
    if (!Number.isInteger(communityId) || !Number.isInteger(ppId)) {
        return c.json({ error: "Invalid community id or original post id"}, 400);
    }
    const result = await commentRepository.findAll(communityId, ppId);
    return c.json(result, 200);
};
const deleteComment = async (c) => {
    const communityId = Number(c.req.param("communityId")); 
    const ppId = Number(c.req.param("postId"));
    const commentId = Number(c.req.param("commentId"));
    if (!Number.isInteger(communityId) || !Number.isInteger(ppId) || !Number.isInteger(commentId)) {
        return c.json({ error: "Invalid credentials"}, 400);
    }
    const result = await commentRepository.deleteComment(communityId, ppId, commentId);
    if (!result) {
        return c.json({ error: "Comment not found"}, 404);
    }
    return c.json(result, 200);
};

export {create, readAll, deleteComment};