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
<div class="max-w-md mx-auto">
{#if authState.user}
    <form onsubmit={addComment} class="space-y-4">
        <label class="label">
            <input class="input" type="text" placeholder="Comment content" name="content"/>
        </label>
        <input class="input" type="submit" value="Add comment"/>
    </form>
{/if}
</div>