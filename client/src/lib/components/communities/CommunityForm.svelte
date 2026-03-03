<script>
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();
    const addCommunity = (e) => {
        e.preventDefault();
        const community = Object.fromEntries(new FormData(e.target));
        communityState.addCommunity(community);
        e.target.reset();
    };
</script>

<form onsubmit={addCommunity}>
    <label>
        Community name
        <input id="name" name="name" type="text"/>
    </label>
    <label>
        Community description
        <input id="description" name="description" type="text"/>
    </label>
    <input type="submit" value="Add community"/>
</form>