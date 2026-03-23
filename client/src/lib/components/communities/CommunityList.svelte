<script>
    import { useCommunityState, initCommunities } from "$lib/states/communityState.svelte";
    import { useAuthState } from "$lib/states/authState.svelte";
    let communityState = useCommunityState();
    let authState = useAuthState();
    $effect(() => {
        initCommunities();
    });
</script>

<ul>
    {#each communityState.communities as com}
        <li>
            <h2><a href={`/communities/${com.id}`}>{com.name}</a></h2>
            <p>{com.description}</p>
            {#if authState.user?.id == com.created_by}
                <button onclick={() => communityState.removeCommunity(com.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>