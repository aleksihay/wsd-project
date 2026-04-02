import { error } from "node:console";
import * as voteRepository from "../repositories/voteRepository.js";

const addUpvotePost = async (c) => {
    const id = Number(c.req.param("postId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid post id"}, 400);
    }
    await voteRepository.upvotePost(user.id, id);
    const voteData = await voteRepository.getVotes(id);
    if (!voteData) {
        return c.json({ error: "Couldn't find data for post"}, 404);
    }
    return c.json(voteData, 200);
};

const addDownvotePost = async (c) => {
    const id = Number(c.req.param("postId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid post id"}, 400);
    }
    await voteRepository.downvotePost(user.id, id);
    const voteData = await voteRepository.getVotes(id);
    if (!voteData) {
        return c.json({ error: "Couldn't find data for post"}, 404);
    }
    return c.json(voteData, 200);
};

const addDownvoteComment = async (c) => {
    const id = Number(c.req.param("commentId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid post id"}, 400);
    }
    await voteRepository.downvotePost(user.id, id);
    const voteData = await voteRepository.getVotes(id);
    if (!voteData) {
        return c.json({ error: "Couldn't find data for comment"}, 404);
    }
    return c.json(voteData, 200);
};
const addUpvoteComment = async (c) => {
    const id = Number(c.req.param("commentId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid post id"}, 400);
    }
    await voteRepository.upvotePost(user.id, id);
    const voteData = await voteRepository.getVotes(id);
    if (!voteData) {
        return c.json({ error: "Couldn't find data for comment"}, 404);
    }
    return c.json(voteData, 200);
};
export {addUpvotePost, addDownvotePost, addUpvoteComment, addDownvoteComment};