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

<form class="max-w-sm mx-auto mt-6">
  <h2 class="text-2xl mb-4">Add a book</h2>

  <div class="mb-4">
    <label>
      Title
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Book title"
        class="w-full"
      />
    </label>
  </div>

  <div class="mb-4">
    <label>
      Description
      <textarea
        id="description"
        name="description"
        placeholder="Enter book description"
        class="w-full"
      ></textarea>
    </label>
  </div>

  <div class="mb-4">
    <label>
      Published at
      <input id="published_at" name="published_at" type="date" class="w-full" />
    </label>
  </div>

  <div class="mb-4">
    <label>
      Page count
      <input id="page_count" name="page_count" type="number" class="w-full" />
    </label>
  </div>

  <input
    type="submit"
    value="Add Book"
    class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
  />
</form>