<script>
    import { useCommentState } from "$lib/states/commentState.svelte";
    import { useAuthState } from "$lib/states/authState.svelte";
    let { communityId, postId } = $props();
    let commentState = useCommentState();
    let authState = useAuthState();

    const addComment = (e) => {
        e.preventDefault();
        const comment = Object.fromEntries(new FormData(e.target));
        commentState.addComment(communityId, postId, comment);
        e.target.reset();
    };
</script>

{#if authState.user}
    <form onsubmit={addComment}>
        <label>
            <input type="text" placeholder="Comment content" name="content"/>
        </label>
        <input type="submit" value="Add comment"/>
    </form>
{/if}