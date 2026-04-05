import { browser } from "$app/environment";
import { getHomepageData } from "$lib/apis/postsApi";

let posts = $state();
const postListInit = async () => {
    if (browser) {
        try {
           posts = await getHomepageData();
        } catch(err) {
            console.error("Failed to load data", err);
            posts = [];
        }
    }
};

const useHomePageState = () => {
    return {
        get posts() {
            return posts;
        }
    };
};

export { postListInit, useHomePageState };