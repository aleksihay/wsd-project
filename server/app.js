import { Hono } from "@hono/hono";
import postgres from "postgres";

const app = new Hono();
const counts = new Map();
const sql = postgres();


app.post("/", async (c) => {
  const data = await c.req.json();
  const message = data.message ?? "Message missing";
  return c.json({ message });
});

const getCount = (resource) => {
  let count = 0;
  if (counts.has(resource)) {
    count = counts.get(resource);
  }
  return count;
}

app.get("/api/count/:resource", (c) => {
  const resource = c.req.param("resource");
  let count = getCount(resource);
  return c.json({ count });
});


app.post("/api/count/:resource", (c) => {
  const resource = c.req.param("resource");

  let count = getCount(resource);
  count++;
  counts.set(resource, count);

  return c.json({ count });
});


app.delete("/api/count/:resource", (c) => {
  const resource = c.req.param("resource");

  let count = getCount(resource);
  count--;
  counts.set(resource, count);

  return c.json({ count });
});

app.get("/api/books/:bookId", async (c) => {
  const id = Number(c.req.param("bookId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid book id" }, 400);
  }

  const result = await sql`SELECT *
    FROM books
    WHERE id = ${id}`;
  if (result.length === 0) {
    return c.json({ error: "Book not found" }, 404);
  }
  return c.json(result[0]);
});

app.post("/api/books", async (c) => {
  const book = await c.req.json();

  if (!book.title ||
    !book.description ||
    !book.published_at ||
    !book.page_count) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const result = await sql`INSERT INTO books
    (title, description, published_at, page_count)
    VALUES (${book.title}, ${book.description}, ${book.published_at}, ${book.page_count})
    RETURNING *;`;

  return c.json(result[0], 201);
});
app.post("/api/todos/:todoId/tasks", taskController.create);
app.get("/api/todos/:todoId/tasks", taskController.readAll);
app.get("/api/todos/:todoId/tasks/:taskId", taskController.readOne);
app.put("/api/todos/:todoId/tasks/:taskId", taskController.update);
app.delete("/api/todos/:todoId/tasks/:taskId", taskController.deleteOne);
app.get("/api/todos", todoController.readAll);
app.get("/api/todos/:todoId", todoController.readOne);
app.post("/api/todos", todoController.create);
app.put("/api/todos/:todoId", todoController.update);
app.delete("/api/todos/:todoId", todoController.deleteOne);

export default app;