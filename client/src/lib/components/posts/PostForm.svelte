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
<div class="max-w-md mx-auto">
{#if authState.user}
    <form onsubmit={addPost} class="space-y-4">
        <label class="label">
            <input class="input" type="text" placeholder="Post title" name="title"/>
        </label>
        <label class="label">
            <input class="input" type="text" placeholder="Post content" name="content"/>
        </label>
        <input class="input" type="submit" value="Add post"/>
    </form>
{/if}
</div>