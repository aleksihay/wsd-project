<script>
    let { communityId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";
    let postState = usePostState();
    let postTitle = $state("");
    let postContent = $state("");

    const addPost = () => {
        postState.addPost(communityId, postTitle, postContent);
        postTitle = "";
        postContent = "";
    };
</script>

<input bind:value={postTitle} type="text" placeholder="Post title" />
<input bind:value={postContent} type="text" placeholder="Post content" />
<button onclick={addPost}>Add Post</button>

