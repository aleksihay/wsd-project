<script>
    import { useCommunityState, initCommunities } from "$lib/states/communityState.svelte";
    import { useAuthState } from "$lib/states/authState.svelte";
    let communityState = useCommunityState();
    let authState = useAuthState();
    $effect(() => {
        initCommunities();
    });
</script>

<div class="flex items-center p-4 mb-6">
<ul>
    {#each communityState.communities as com}
        <li>
            <h2 class="anchor"><a href={`/communities/${com.id}`}>{com.name}</a></h2>
            <p class="anchor">{com.description}</p>
            {#if authState.user?.id == com.created_by}
                <button class="anchor button" onclick={() => communityState.removeCommunity(com.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>
</div>