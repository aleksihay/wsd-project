<script>
    import { page } from "$app/state";
    import { taskInit } from "$lib/states/taskState.svelte";
    import { initTodos } from "$lib/states/todoState.svelte";
    import Task from "$lib/components/todos/Task.svelte";
    let todoId = $derived(parseInt(page.params.todoId));
    let taskId = $derived(parseInt(page.params.taskId));
    $effect(() => {
        taskInit(todoId);
        initTodos();
    });
</script>

<Task todoId={todoId} taskId={taskId} />