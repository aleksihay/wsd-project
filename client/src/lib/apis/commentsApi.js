import { command } from "$app/server";
import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils";

const readComments = async (communityId, postId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments`);
    return await response.json();
};
const createComment = async (communityId, postId, comment) => {
    return await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments`, {
        headers: { "Content-Type": "application/json", },
        method: "POST",
        body: JSON.stringify(comment),
    });
};
const deleteComment = async (communityId, postId, commentId) => {
    return await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
    });
};
const upvoteComment = async (communityId, postId, commentId) => {
    return await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments/${commentId}/upvote`, {
        method: "POST",
    });
};
const downvoteComment = async (communityId, postId, commentId) => {
    return await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments/${commentId}/downvote`, {
        method: "POST",
    });
};
export { createComment, readComments, deleteComment, upvoteComment, downvoteComment };