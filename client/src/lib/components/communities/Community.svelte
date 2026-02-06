<script>
    let { communityId } = $props();
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();
</script>

<h1>{communityState.getOne(communityId)?.name ?? "Loading..."}</h1>
<p>{communityState.getOne(communityId)?.description ?? "Loading..."}</p>