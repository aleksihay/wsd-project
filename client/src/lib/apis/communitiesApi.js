import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils";

const createCommunity = async (community) => {
    return await authFetch(`${PUBLIC_API_URL}/api/communities`, {
        headers: {"Content-Type": "application/json",},
        method: "POST",
        body: JSON.stringify(community),
    });
};
const readCommunities = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities`);
    return await response.json();
};
const readCommunity = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${id}`);
    return await response.json();
};
const deleteCommunity = async (id) => {
    return await authFetch(`${PUBLIC_API_URL}/api/communities/${id}`, {
        method: "DELETE",
    });
};

export { createCommunity, readCommunities, readCommunity, deleteCommunity };