<script>
    import { useTodoState } from "$lib/states/todoState.svelte";
    const todoState = useTodoState();
    
    const addTodo = (e) => {
        e.preventDefault();
        const todo = Object.fromEntries(new FormData(e.target));
        todoState.addTodo(todo);
        e.target.reset();
    };
</script>

<form onsubmit={addTodo}>
    <label>
        Todo name
        <input id="name" name="name" type="text"/>
    </label>
    <input type="submit" value="Add todo"/>
</form>
