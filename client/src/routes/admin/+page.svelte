<script>
  import { useAuthState } from "$lib/states/authState.svelte.js";
  import { authFetch } from "$lib/utils/fetchUtils.js";
  import { PUBLIC_API_URL } from "$env/static/public";
  import { goto } from "$app/navigation";
  const authState = useAuthState();
  let users = $state([]);
  let stats = $state({ todos: 0, tasks: 0});
  const loadUsers = async () => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/admin/users`);
  };

  const getStats = async () => {
    stats = await authFetch(`${PUBLIC_API_URL}/api/admin/stats`);
  }

  $effect(() => {
    // this could go to a layout file, with a redirect to home if not admin
    if (!authState.user || !authState.user.roles?.includes("ADMIN")) {
      return;
    }
    getStats();
    loadUsers();
  });
</script>

<h1>Users</h1>
<p>Todos: {stats.todos}, tasks: {stats.tasks}</p>
<ul>
{#each users as user}
  <li>{user.email} - Roles: {user.roles?.join(", ")}</li>
{/each}
</ul>