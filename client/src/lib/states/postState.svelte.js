import { browser } from "$app/environment";
import * as postsApi from "$lib/apis/postsApi.js";

let postState = $state({});

const initPosts = async (id) => {
    if (browser) {
        postState[id] = await postsApi.readPosts(id);
    }
};

const usePostState = () => {
    return {
        get posts() {
            return postState;
        },
        getOne: (id) => {
            return postState[id] ?? [];
        },
        addPost: async (id, post) => {
            if(!postState[id]) {
                postState[id] = [];
            }
            const newPost = await postsApi.createPost(id, post);
            postState[id].push(newPost);
        },
        removePost: async (commmunityId, postId) => {
            postState[commmunityId] = (postState[commmunityId] ?? []).filter(post => post.id != postId);
            await postsApi.deletePost(commmunityId, postId);
        }

    };
};

export { usePostState, initPosts };