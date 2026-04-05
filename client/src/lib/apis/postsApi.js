import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils";

const createPost = async (id, post) => {
    return await authFetch(`${PUBLIC_API_URL}/api/communities/${id}/posts`, {
        headers: {"Content-Type": "application/json",},
        method: "POST",
        body: JSON.stringify(post),
    });
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
    return await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}`, {
        method: "DELETE",
    });
};
const upvotePost = async (communityId, postId) => {
    return await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/upvote`, {
        method: "POST",
    });
};
const downvotePost = async (communityId, postId) => {
    return await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/downvote`, {
        method: "POST",
    });
};
const getHomepageData = async () => {
    return await authFetch(`${PUBLIC_API_URL}/api/homepage`);
};

export { createPost, readPost, readPosts, deletePost, upvotePost, downvotePost, getHomepageData };