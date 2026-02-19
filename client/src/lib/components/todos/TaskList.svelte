<script>
    let { todoId } = $props();
    import { useTaskState } from "$lib/states/taskState.svelte";
    import { useTodoState } from "$lib/states/todoState.svelte";
    let taskState = useTaskState();
    let todoState = useTodoState();
</script>

<ul>
    {#each (taskState.tasks[todoId] ?? []) as task}
        <li>
            {#if !task.is_done}
                <a href={`/todos/${todoId}/tasks/${task.id}`}>{task.description}</a>
                <button onclick={() => taskState.markAsDone(todoId, task.id)}>Mark done</button>
            {:else}
                <s>{task.description}</s>
                <button onclick={() => taskState.markAsUndone(todoId, task.id)}>Mark not done</button>
            {/if}
           
            <button onclick={() => taskState.removeTask(todoId, task.id)}>Remove</button>
        </li>
    {/each}
</ul>