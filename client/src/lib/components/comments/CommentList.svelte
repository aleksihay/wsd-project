<script>
    import { useCommentState, initComments } from "$lib/states/commentState.svelte";
    import { useAuthState } from "$lib/states/authState.svelte";
    let { communityId, postId } = $props();
    let commentState = useCommentState();
    let authState = useAuthState();
    $effect(() => {
        initComments(communityId, postId);
    });
</script>

<ul>
    {#each commentState.getOne(postId) as comment}
        <li>
            <p>{comment.content}</p>
            <p>{comment.upvotes}|{comment.downvotes}</p>
            {#if authState.user}
            <button onclick={() => commentState.upvoteComment(communityId, postId, comment.id)}>Upvote</button>
            <button onclick={() => commentState.downvoteComment(communityId, postId, comment.id)}>Downvote</button>
            {/if}
            {#if authState.user?.id == comment.created_by}
                <button onclick={() => commentState.deleteComment(communityId, postId, comment.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>