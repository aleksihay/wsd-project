<script>
    import { useCommunityState } from "$lib/states/communityState.svelte";
    let communityState = useCommunityState();
    let comName = $state("");
    let comDesc = $state("");
    const addCommunity = () => {
        communityState.addCommunity(comName, comDesc);
        comName = "";
        comDesc = "";
    };
</script>

<input type="text" bind:value={comName} placeholder="Community name" />
<input type="text" bind:value={comDesc} placeholder="Community description" />
<button onclick={addCommunity}>Add community</button>