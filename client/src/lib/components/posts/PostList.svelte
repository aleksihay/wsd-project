<script>
    import { usePostState } from "$lib/states/postState.svelte";
    import { initPosts } from "$lib/states/postState.svelte";
    import { useAuthState } from "$lib/states/authState.svelte";
    let { communityId } = $props();
    let postState = usePostState();
    let authState = useAuthState();
    $effect(() => {
        initPosts(communityId);
    });
</script>
<div class="flex items-center p-4 mb-6">
<ul>
    {#each postState.getOne(communityId) ?? []  as post}
        <li>
            <a class="anchor" href={`/communities/${communityId}/posts/${post.id}`}>{post.title}</a>
            <p class="anchor">{post.content}</p>
            <p class="anchor">{post.upvotes}|{post.downvotes}</p>
            {#if authState.user}
                <button class="anchor button" onclick={() => postState.upvotePost(communityId, post.id)}>Upvote</button>
                <button class="anchor button" onclick={() => postState.downvotePost(communityId, post.id)}>Downvote</button>
            {/if}
            {#if authState.user?.id == post.created_by}
                <button class="anchor button" onclick={() => postState.removePost(communityId, post.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>
</div>