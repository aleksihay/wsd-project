<script>
  import { authFetch } from "$lib/utils/fetchUtils.js";
  import { PUBLIC_API_URL } from "$env/static/public";
  import { useAuthState } from "$lib/states/authState.svelte";
  import HomePageList from "$lib/components/homePage/HomePageList.svelte";

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
<HomePageList />
{#if !authState.user}
    <p>Hello anonymous!</p>
{/if}
