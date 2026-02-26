<script>
    import { page } from "$app/state";
    import Todo from "$lib/components/todos/Todo.svelte";
    import { initTodos } from "$lib/states/todoState.svelte";
    let todoId = $derived(parseInt(page.params.todoId));

    $effect(() => {
        initTodos();
    });
</script>

<Todo todoId={todoId} />