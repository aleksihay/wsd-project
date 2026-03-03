<script>
    import { useCommunityState, initCommunities } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();
    $effect(() => {
        initCommunities();
    });
</script>

<ul>
    {#each communityState.communities as com}
        <li>
            <h2><a href={`/communities/${com.id}`}>{com.name}</a></h2>
            <p>{com.description}</p>
            <button onclick={() => communityState.removeCommunity(com.id)}>Remove</button>
        </li>
    {/each}
</ul>