import { command } from "$app/server";
import { PUBLIC_API_URL } from "$env/static/public";

const readComments = async (communityId, postId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments`);
    return await response.json();
};
const createComment = async (communityId, postId, comment) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments`, {
        headers: { "Content-Type": "application/json", },
        method: "POST",
        body: JSON.stringify(comment),
    });
    return await response.json();
};
const deleteComment = async (communityId, postId, commentId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
    });
    return await response.json();
};
export { createComment, readComments, deleteComment };