<script>
    let { communityId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";
    let postState = usePostState();
    let postTitle = $state("");
    let postContent = $state("");

    const addPost = (e) => {
        e.preventDefault();
        const post = Object.fromEntries(new FormData(e.target));
        postState.addPost(communityId, post);
        e.target.reset();
    };
</script>

<form onsubmit={addPost}>
    <label>
        <input type="text" placeholder="Post title" name="title"/>
    </label>
    <label>
        <input type="text" placeholder="Post content" name="content"/>
    </label>
    <input type="submit" value="Add post"/>
</form>