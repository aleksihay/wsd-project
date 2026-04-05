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

<div class="max-w-md mx-auto">
{#if authState.user}
    <form onsubmit={addCommunity} class="space-y-4">
        <label class="label">
            Community name
            <input class="input" id="name" name="name" placeholder="Community name" type="text"/>
        </label>
        <label class="label">
            Community description
            <input class="input" id="description" name="description" placeholder="Community description" type="text"/>
        </label>
        <input class="input" type="submit" value="Add community"/>
    </form>
{/if}
</div>