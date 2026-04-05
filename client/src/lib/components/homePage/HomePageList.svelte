<script>
    import { useHomePageState, postListInit } from "$lib/states/homePageState.svelte";
    let homePageState = useHomePageState();
    $effect(() => {
        postListInit();
    });
</script>

<ul>
    {#each homePageState.posts as post}
    <a href={`/communities/${post.community_id}/posts/${post.id}`}>{post.title}</a>
    <p>{post.content}</p>
    <p>↑ {post.upvotes} | ↓ {post.downvotes}</p>
    <p>{post.comments} comments</p>
    {/each}
</ul>
