<script>
    let { communityId, postId } = $props();
    import { usePostState } from "$lib/states/postState.svelte";
    let postState = usePostState();
</script>

<h1>{postState.getOne(communityId)?.find(post => post.id == postId)?.title ?? "Loading"}</h1>
<p>{postState.getOne(communityId)?.find(post => post.id == postId)?.content ?? "Loading"}</p>