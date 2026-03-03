import { browser } from "$app/environment";
import { json } from "@sveltejs/kit";
import * as communitiesApi from "$lib/apis/communitiesApi.js";

let communityState = $state([]);


const initCommunities = async () => {
    if (browser) {
        communityState = await communitiesApi.readCommunities();
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
        addCommunity: async (community) => {
            const newCommunity = await communitiesApi.createCommunity(community);
            communityState.push(newCommunity);
        },
        removeCommunity: async (id) => {
            communityState = communityState.filter(com => com.id != id);
            await communitiesApi.deleteCommunity(id);
        }
    };
};

export { useCommunityState, initCommunities };