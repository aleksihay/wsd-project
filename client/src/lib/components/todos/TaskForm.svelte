<script>
    let { todoId } = $props();
    import { useTaskState } from "$lib/states/taskState.svelte";
    let taskState = useTaskState();
    let taskName = $state("");

    const addTask = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        const task = {
            description: data.description,
            is_done: !!data.is_done,
        };
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
    <input type="submit" value="Add Task" />
</form>

