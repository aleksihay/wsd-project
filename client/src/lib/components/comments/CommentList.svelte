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
<div class="flex items-center p-4 mb-6">
<ul>
    {#each commentState.getOne(postId) as comment}
        <li>
            <p class="anchor">{comment.content}</p>
            <p class="anchor">{comment.upvotes}|{comment.downvotes}</p>
            {#if authState.user}
            <button class="button anchor" onclick={() => commentState.upvoteComment(communityId, postId, comment.id)}>Upvote</button>
            <button class="button anchor" onclick={() => commentState.downvoteComment(communityId, postId, comment.id)}>Downvote</button>
            {/if}
            {#if authState.user?.id == comment.created_by}
                <button class="button anchor" onclick={() => commentState.deleteComment(communityId, postId, comment.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>
</div>