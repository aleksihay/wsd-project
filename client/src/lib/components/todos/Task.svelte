<script>
    let { todoId, taskId } = $props();
    import { useTodoState } from "$lib/states/todoState.svelte";
    import { useTaskState } from "$lib/states/taskState.svelte";
    let taskState = useTaskState();
    let todoState = useTodoState();
</script>

<h1>Todo {todoState.getOne(todoId)?.name ?? ""}, task {taskState.getOne(todoId, taskId)?.description ?? ""}</h1>