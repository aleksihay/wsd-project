<script>
    import { useCommentState, initComments } from "$lib/states/commentState.svelte";
    import { useAuthState } from "$lib/states/authState.svelte";
    let { communityId, postId } = $props();
    let commentState = useCommentState();
    let authState = useAuthState();
    $effect(() => {
        initComments(postId);
    });
</script>

<ul>
    {#each commentState.getOne(postId) as comment}
        <li>
            {comment.content}
            {#if authState.user?.id == comment.created_by}
                <button onclick={() => commentState.deleteComment(communityId, postId, comment.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>