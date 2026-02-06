import { browser } from "$app/environment";
import { json } from "@sveltejs/kit";

let communityState = $state([]);
const COM_KEY = "comms";

if (browser) {
    const stored = localStorage.getItem(COM_KEY);

    if(stored){
        communityState = JSON.parse(stored);
    }
    else{
        localStorage.setItem(COM_KEY, JSON.stringify(communityState));
    }
}

const pushChanges = () => {
    if(browser){
        localStorage.setItem(COM_KEY, JSON.stringify(communityState));
    }
};

const useCommunityState = () => {
    return {
        get communities() {
            return communityState;
        },
        getOne: (id) => {
            return communityState.find(com => com.id == id);
        },
        addCommunity: (comName, comDesc) => {
            communityState.push({ id: communityState.length + 1, name: comName, description: comDesc});
            pushChanges();
        },
        removeCommunity: (id) => {
            communityState = communityState.filter(com => com.id != id);
            pushChanges();
        }
    };
};

export { useCommunityState };