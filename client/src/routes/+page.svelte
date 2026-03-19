<script>
  import { authFetch } from "$lib/utils/fetchUtils.js";
  import { PUBLIC_API_URL } from "$env/static/public";
  import { useAuthState } from "$lib/states/authState.svelte";
  let authState = useAuthState(); 
  let message = $state(null);

  const fetchData = async () => {
    try {
      const data = await authFetch(`${PUBLIC_API_URL}/api/secret`);
      message = data.message;
    } catch (error) {
      message = error.message;
    }
  };
</script>

{#if authState.user}
    <button onclick={fetchData}>Fetch Protected Data</button>
    <p>Message: {message}</p>
{:else}
    <p>Hello anonymous!</p>
{/if}