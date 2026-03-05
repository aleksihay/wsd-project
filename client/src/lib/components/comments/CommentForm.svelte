<script>
    import { useCommentState } from "$lib/states/commentState.svelte";
    let { communityId, postId } = $props();
    let commentState = useCommentState();

    const addComment = (e) => {
        e.preventDefault();
        const comment = Object.fromEntries(new FormData(e.target));
        commentState.addComment(communityId, postId, comment);
        e.target.reset();
    };
</script>

<form onsubmit={addComment}>
    <label>
        <input type="text" placeholder="Comment content" name="content"/>
    </label>
    <input type="submit" value="Add comment"/>
</form>