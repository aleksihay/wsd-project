import { Hono } from "@hono/hono";
import postgres from "postgres";
import * as taskController from "./controllers/taskController.js";
import * as todoController from "./controllers/todoController.js";
import * as communityController from "./controllers/communityController.js";
const app = new Hono();
const counts = new Map();
const sql = postgres();


app.post("/", async (c) => {
  const data = await c.req.json();
  const message = data.message ?? "Message missing";
  return c.json({ message });
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

app.get("/api/communities", communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);
app.post("/api/communities", communityController.create);
app.delete("/api/communities/:communityId", communityController.deleteOne);

export default app;