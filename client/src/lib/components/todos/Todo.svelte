<script>
    let { todoId } = $props();
    import { useTodoState } from "$lib/states/todoState.svelte";
    import { useTaskState } from "$lib/states/taskState.svelte";
    import TaskForm from "./TaskForm.svelte";
    import TaskList from "./TaskList.svelte";
    let todoState = useTodoState();
    let taskState = useTaskState();
</script>

<h1>Todo {todoState.getOne(todoId)?.name ?? ""}</h1>
<TaskForm todoId={todoId}/>
<TaskList todoId={todoId}/>