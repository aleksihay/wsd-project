<script>
  import { useAuthState } from "$lib/states/authState.svelte.js";
  import "../app.css";
  let { children } = $props();
  const authState = useAuthState();
</script>

<div class="flex flex-col h-full">
<header class="flex flex-col sm:flex-row sm:items-center bg-primary-100 p-4 mb-6">
  <!--<div class="text-lg text-primary-900">-->
    <span class="text-lg md:text-xl text-primary-900 mb-2 sm:mb-0">
      Todo App
    </span>
    <div class="sm:ml-4">
    {#if authState.user}
    <div class="flex flex-col sm:flex-row sm:items-center gap-2">
      Hello, {authState.user.email}!
      {#if authState.user.roles?.length}
        (Roles: {authState.user.roles.join(", ")})
      {/if}
      <button class="btn btn-sm variant-filled-secondary" onclick={() => authState.logout()}>Logout</button>
      <nav>
	    <ul class="flex space-x-4">
    	  <li><a class="anchor" href="/communities">Go to communities</a></li>
    	  <li><a class="anchor" href="/todos">Go to your todos</a></li>
    	  <li><a class="anchor" href="/temperature">Temperature</a></li>
	    </ul>
      {#if authState.user.roles?.includes("ADMIN")}
        <ul class="flex space-x-4">
          <li><a class="anchor" href="/admin">Admin</a></li>
        </ul>
      {/if}
      </nav>
    </div>
  {:else}
    <nav>
      <ul class="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <li><a class="anchor" href="/auth/login">Login</a></li>
        <li><a class="anchor" href="/auth/register">Register</a></li>
      </ul>
    </nav>
  {/if}
  </div>
  <!--</div>-->
</header>

<main class="container mx-auto max-w-2xl grow">
  {@render children()}
</main>

<footer class="p-4 border-t-2 border-gray-300">
  <p class="text-center">My Cool Todo Application</p>
</footer>

</div>