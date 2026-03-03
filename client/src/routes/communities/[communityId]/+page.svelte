<script>
    import { page } from "$app/state";
    import { initCommunities } from "$lib/states/communityState.svelte";
    import Community from "$lib/components/communities/Community.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";
    import AddPost from "$lib/components/posts/AddPost.svelte";
    import AddCommunity from "$lib/components/communities/CommunityForm.svelte";
    let communityId = $derived(parseInt(page.params.communityId))
    $effect(() => {
        initCommunities();
    });
</script>

<Community communityId={communityId} />
<PostList communityId={communityId} />
<AddPost communityId={communityId} />

