import * as communityRepository from "../repositories/communityRepository.js";

const create = async (c) => {
    const comm = await c.req.json();
    if (!comm.name || !comm.description) {
        return c.json({ error: "Missing required fields"}, 400);
    }
    const newCommunity = await communityRepository.create(comm);
    return c.json(newCommunity, 201);
};
const readAll = async (c) => {
    const communities = await communityRepository.findAll();
    return c.json(communities, 200);
};
const readOne = async (c) => {
    const id = Number(c.req.param("communityId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid community id"}, 400);
    }
    const community = await communityRepository.findById(id);
    if (!community) {
        return c.json({ error: "Community not found"}, 404);
    }
    return c.json(community, 200);
};
const deleteOne = async (c) => {
    const id = Number(c.req.param("communityId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid community id"});
    }
    const deleteCommunity = await communityRepository.deleteById(id);
    if (!deleteCommunity) {
        return c.json({ error: "Community not found"}, 404);
    }
    return c.json(deleteCommunity, 200);
};

export {create, readAll, readOne, deleteOne};