<script>
    import { usePostState } from "$lib/states/postState.svelte";
    import { initPosts } from "$lib/states/postState.svelte";
    let { communityId } = $props();
    let postState = usePostState();
    $effect(() => {
        initPosts(communityId);
    });
</script>

<ul>
    {#each postState.getOne(communityId) ?? []  as post}
        <li>
            <a href={`/communities/${communityId}/posts/${post.id}`}>{post.title}</a>
            <p>{post.content}</p>
            <button onclick={() => postState.removePost(communityId, post.id)}>Remove</button>
        </li>
    {/each}
</ul>