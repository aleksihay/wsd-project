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

<ul>
    {#each postState.getOne(communityId) ?? []  as post}
        <li>
            <a href={`/communities/${communityId}/posts/${post.id}`}>{post.title}</a>
            <p>{post.content}</p>
            {#if authState.user?.id == post.created_by}
                <button onclick={() => postState.removePost(communityId, post.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>