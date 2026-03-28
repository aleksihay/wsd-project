<script>
  import { useAuthState } from "$lib/states/authState.svelte.js";
  import Header from "$lib/components/layout/Header.svelte";
  import "../app.css";
  let { children } = $props();
  const authState = useAuthState();
</script>

<div class="flex flex-col h-full">
  <Header />

  <main class="container mx-auto max-w-2xl grow">
    {@render children()}
  </main>

  <footer class="p-4 border-t-2 border-gray-300">
    <p class="text-center">My Cool Todo Application</p>
  </footer>
</div>