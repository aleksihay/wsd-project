<script>
    let { todoId, taskId } = $props();
    import { useTodoState, initTodos } from "$lib/states/todoState.svelte";
    import { useTaskState, taskInit } from "$lib/states/taskState.svelte";
    let taskState = useTaskState();
    let todoState = useTodoState();
    let todo = $derived(todoState.todos.find(t => t.id === todoId));
    let task = $derived(taskState.getOne(todoId, taskId));
</script>

<h1>Todo {todo?.name ?? "Loading..."}, task {task?.description ?? "Loading..."}</h1>