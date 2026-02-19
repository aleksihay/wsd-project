<script>
    let { todoId } = $props();
    import { useTaskState } from "$lib/states/taskState.svelte";
    let taskState = useTaskState();
    let taskName = $state("");

    const addTask = (e) => {
        e.preventDefault();
        const task = Object.fromEntries(new FormData(e.target));
        taskState.addTask(todoId, task);
        e.target.reset();
    };
</script>

<form onsubmit={addTask}>
    <label>
        Task description
        <input id="description" name="description" type="text" />
    </label>
    <label>
        Is done
        <input id="is_done" name="is_done" type="checkbox" />
    </label>
    <input type="submit" value="Add a task" />
</form>

