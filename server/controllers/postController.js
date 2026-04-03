import * as postRepository from "../repositories/postRepository.js";

const create = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    const user = c.get("user");
    if (!Number.isInteger(communityId)) {
        return c.json({ error: "Invalid community id"}, 400);
    }
    const post = await c.req.json();
    if (!post.title || !post.content) {
        return c.json({ error: "Missing required fields"}, 400);
    }
    const newPost = await postRepository.create(user.id, communityId, post);
    return c.json(newPost, 201);
};
const readAll = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    if (!Number.isInteger(communityId)) {
        return c.json({ error: "Invalid community id"}, 400);
    }
    const posts = await postRepository.findAll(communityId);
    return c.json(posts, 200);
};
const readOne = async (c) => {
    const id = Number(c.req.param("postId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid post id"}, 400);
    }
    const post = await postRepository.findById(id);
    if (!post) {
        return c.json({ error: "Post not found"}, 404);
    }
    return c.json(post, 200);
};
const deleteOne = async (c) => {
    const id = Number(c.req.param("postId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid post id"}, 400);
    }
    const deletePost = await postRepository.deleteById(user.id, id);
    if (!deletePost) {
        return c.json({ error: "Post not found"}, 404);
    }
    return c.json(deletePost, 200);
};

const addUpvotePost = async (c) => {
    const id = Number(c.req.param("postId"));
    const user = c.get("user");
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid post id"}, 400);
    }
    await postRepository.upvotePost(user.id, id);
    const voteData = await postRepository.findById(id);
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
    await postRepository.downvotePost(user.id, id);
    const voteData = await postRepository.findById(id);
    if (!voteData) {
        return c.json({ error: "Couldn't find data for post"}, 404);
    }
    return c.json(voteData, 200);
};



export {create, readAll, readOne, deleteOne, addDownvotePost, addUpvotePost};