<script>
    import { useCommentState, initComments } from "$lib/states/commentState.svelte";
    let { communityId, postId } = $props();
    let commentState = useCommentState();
    $effect(() => {
        initComments(postId);
    });
</script>

<ul>
    {#each commentState.getOne(postId) as comment}
        <li>
            {comment.content}
            <button onclick={() => commentState.deleteComment(communityId, postId, comment.id)}>Remove</button>
        </li>
    {/each}
</ul>