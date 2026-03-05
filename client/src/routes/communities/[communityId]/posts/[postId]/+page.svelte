<script>
    import { page } from "$app/state";
    import Post from "$lib/components/posts/Post.svelte";
    import { initPosts } from "$lib/states/postState.svelte";
    import { initComments } from "$lib/states/commentState.svelte";
    import CommentForm from "$lib/components/comments/CommentForm.svelte";
    import CommentList from "$lib/components/comments/CommentList.svelte";
    let communityId = $derived(parseInt(page.params.communityId));
    let postId = $derived(parseInt(page.params.postId));
    $effect(() => {
        initPosts(communityId);
        initComments(communityId, postId);
    });
</script>

<Post communityId={communityId} postId={postId} />
<CommentForm communityId={communityId} postId={postId} />
<CommentList communityId={communityId} postId={postId}/>