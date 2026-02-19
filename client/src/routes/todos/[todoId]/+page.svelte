<script>
    import { page } from "$app/state";
    import Todo from "$lib/components/todos/Todo.svelte";
</script>

<Todo todoId={page.params.todoId} />