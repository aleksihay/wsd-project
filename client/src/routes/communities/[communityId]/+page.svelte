<script>
    import { page } from "$app/state";
    import { initCommunities } from "$lib/states/communityState.svelte";
    import { initPosts } from "$lib/states/postState.svelte";
    import Community from "$lib/components/communities/Community.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";
    import AddPost from "$lib/components/posts/PostForm.svelte";
    import AddCommunity from "$lib/components/communities/CommunityForm.svelte";
    let communityId = $derived(parseInt(page.params.communityId))
    $effect(() => {
        initCommunities();
        initPosts(communityId);
    });
</script>

<Community communityId={communityId} />
<PostList communityId={communityId} />
<AddPost communityId={communityId} />

