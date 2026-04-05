<script>
  import { useAuthState } from "$lib/states/authState.svelte.js";
  const authState = useAuthState();
</script>

<header class="flex items-center bg-primary-100 p-4 mb-6">
  <span class="text-lg text-primary-900">
    {#if authState.user}
      Hello, ({authState.user.email})!
      {#if authState.user.roles?.includes("ADMIN")}
            <ul class="flex space-x-4">
                <li><a class="anchor" href="/admin">Admin</a></li>
            </ul>
        {/if}
    {/if}
        <ul>
            <li><a class="anchor" href="/communities">Communities</a></li>
            <li><a class="anchor" href="/">Home</a></li>
        </ul>
  </span>
  <nav class="ml-4">
    <ul class="flex space-x-4">
      {#if authState.user}
        <li>
          <button class="anchor" onclick={() => authState.logout()}>
            Logout
          </button>
        </li>¨
        <li><a class="anchor" href="/todos">Go to your todos</a></li>
      {:else}
        <li><a class="anchor" href="/auth/login">Login</a></li>
        <li><a class="anchor" href="/auth/register">Register</a></li>
      {/if}
    </ul>
  </nav>
</header>