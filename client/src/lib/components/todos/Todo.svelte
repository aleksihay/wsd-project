<script>
    let { todoId } = $props();
    import { useTodoState } from "$lib/states/todoState.svelte";
    import { useTaskState } from "$lib/states/taskState.svelte";
    import TaskForm from "./TaskForm.svelte";
    import TaskList from "./TaskList.svelte";
    let todoState = useTodoState();
    let taskState = useTaskState();
    let todo = $derived(todoState.todos.find(t => t.id === todoId));
</script>

<h1>Todo {todo?.name ?? "LOADING..."}</h1>
<TaskForm todoId={todoId}/>
<TaskList todoId={todoId}/>