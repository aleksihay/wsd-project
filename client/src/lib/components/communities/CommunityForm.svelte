<script>
    import { useCommunityState } from "$lib/states/communityState.svelte";
    import { useAuthState } from "$lib/states/authState.svelte";
    let communityState = useCommunityState();
    let authState = useAuthState();
    const addCommunity = (e) => {
        e.preventDefault();
        const community = Object.fromEntries(new FormData(e.target));
        communityState.addCommunity(community);
        e.target.reset();
    };
</script>

{#if authState.user}
    <form onsubmit={addCommunity}>
        <label>
            Community name
            <input id="name" name="name" placeholder="Community name" type="text"/>
        </label>
        <label>
            Community description
            <input id="description" name="description" placeholder="Community description" type="text"/>
        </label>
        <input type="submit" value="Add community"/>
    </form>
{/if}