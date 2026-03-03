<script>
    let { communityId, postId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";
    let postState = usePostState();
    let post = $derived(postState.getOne(communityId).find(post => post.id === postId));
</script>

<h1>{post?.title ?? "Loading"}</h1>
<p>{post?.content ?? "Loading"}</p>