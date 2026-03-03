<script>
    let { communityId } = $props();
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();
    let community = $derived(communityState.getOne(communityId))
</script>

<h1>{community?.name ?? "Loading..."}</h1>
<p>{community?.description ?? "Loading..."}</p>