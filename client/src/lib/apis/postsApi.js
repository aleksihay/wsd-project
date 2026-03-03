import { PUBLIC_API_URL } from "$env/static/public";

const createPost = async (id, post) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${id}/posts`, {
        headers: {"Content-Type": "application/json",},
        method: "POST",
        body: JSON.stringify(post),
    });
    return await response.json();
};
const readPosts = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${id}/posts`);
    return await response.json();
};
const readPost = async (communityId, postId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}`);
    return await response.json();
};
const deletePost = async (communityId, postId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}`, {
        method: "DELETE",
    });
    return await response.json();
};
export { createPost, readPost, readPosts, deletePost };