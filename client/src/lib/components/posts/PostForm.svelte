<script>
    let { communityId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";
    import { useAuthState } from "$lib/states/authState.svelte";
    let postState = usePostState();
    let authState = useAuthState();
    let postTitle = $state("");
    let postContent = $state("");

    const addPost = (e) => {
        e.preventDefault();
        const post = Object.fromEntries(new FormData(e.target));
        postState.addPost(communityId, post);
        e.target.reset();
    };
</script>

{#if authState.user}
    <form onsubmit={addPost}>
        <label>
            <input type="text" placeholder="Post title" name="title"/>
        </label>
        <label>
            <input type="text" placeholder="Post content" name="content"/>
        </label>
        <input type="submit" value="Add post"/>
    </form>
{/if}