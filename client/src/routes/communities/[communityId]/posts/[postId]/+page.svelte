<script>
    import { page } from "$app/state";
    import Post from "$lib/components/posts/Post.svelte";
    import { initPosts } from "$lib/states/postState.svelte";
    let communityId = $derived(parseInt(page.params.communityId));
    let postId = $derived(parseInt(page.params.postId));
    $effect(() => {
        initPosts(communityId);
    });
</script>

<Post communityId={communityId} postId={postId} />