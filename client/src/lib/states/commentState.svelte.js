import { browser } from "$app/environment";
import * as commentsApi from "$lib/apis/commentsApi.js";

let commentState = $state({});

const initComments = async (communityId, postId) => {
    if (browser) {
        commentState[postId] = await commentsApi.readComments(communityId, postId);
    }
};

const useCommentState = () => {
    return {
        get comments() {
            return commentState;
        },
        getOne: (id) => {
            return commentState[id] ?? [];
        },
        addComment: async (communityId, postId, comment) => {
            if (!commentState[postId]) {
                commentState[postId] = [];
            }
            const newComment = await commentsApi.createComment(communityId, postId, comment);
            commentState[postId].push(newComment);
        },
        deleteComment: async (communityId, postId, commentId) => {
            commentState[postId] = commentState[postId].filter(comment => comment.id !== commentId);
            await commentsApi.deleteComment(communityId, postId, commentId);
        },
        upvoteComment: async (commmunityId, postId, commentId) => {
            const votedComment = await commentsApi.upvoteComment(commmunityId, postId, commentId);
            if (votedComment) {
                commentState[postId] = commentState[postId].filter(comment => comment.id !== commentId);
                commentState[postId].push(votedComment);
            }
        },
        downvoteComment: async (commmunityId, postId, commentId) => {
            const votedComment = await commentsApi.downvoteComment(commmunityId, postId);
            if (votedComment) {
                commentState[postId] = commentState[postId].filter(comment => comment.id !== commentId);
                commentState[postId].push(votedComment);
            }
        }
    };
};

export { initComments, useCommentState };