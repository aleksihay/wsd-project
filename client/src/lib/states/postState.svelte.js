import { browser } from "$app/environment";

let postState = $state({});

const POST_KEY = "posts";
if (browser) {
    const stored = localStorage.getItem(POST_KEY);

    if(stored){
        postState = JSON.parse(stored);
    }
    else{
        localStorage.setItem(POST_KEY, JSON.stringify(postState));
    }
}

const pushChanges = () => {
    if(browser){
        localStorage.setItem(POST_KEY, JSON.stringify(postState));
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
        addPost: (id, postTitle, postContent) => {
            if(!postState[id]) {
                postState[id] = [];
            }
            postState[id].push({ id: postState[id].length + 1, title: postTitle, content: postContent});
            pushChanges();  
        },
        removePost: (comId, postId) => {
            postState[comId] = (postState[comId] ?? []).filter(post => post.id != postId);
            pushChanges();
        }

    };
};

export { usePostState };