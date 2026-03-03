import { PUBLIC_API_URL } from "$env/static/public";

const createCommunity = async (community) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities`, {
        headers: {"Content-Type": "application/json",},
        method: "POST",
        body: JSON.stringify(community),
    });
    return await response.json();
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
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${id}`, {
        method: "DELETE",
    });
    return await response.json();
};

export { createCommunity, readCommunities, readCommunity, deleteCommunity };