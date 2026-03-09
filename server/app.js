import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";

import * as taskController from "./controllers/taskController.js";
import * as todoController from "./controllers/todoController.js";
import * as communityController from "./controllers/communityController.js";
import * as postController from "./controllers/postController.js";
import * as commentController from "./controllers/commentController.js";

import * as authController from "./controllers/authController.js";

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/", async (c) => {
  const data = await c.req.json();
  const message = data.message ?? "Message missing";
  return c.json({ message });
});

//todo tasks
app.post("/api/todos/:todoId/tasks", taskController.create);
app.get("/api/todos/:todoId/tasks", taskController.readAll);
app.get("/api/todos/:todoId/tasks/:taskId", taskController.readOne);
app.put("/api/todos/:todoId/tasks/:taskId", taskController.update);
app.delete("/api/todos/:todoId/tasks/:taskId", taskController.deleteOne);
//todos
app.get("/api/todos", todoController.readAll);
app.get("/api/todos/:todoId", todoController.readOne);
app.post("/api/todos", todoController.create);
app.put("/api/todos/:todoId", todoController.update);
app.delete("/api/todos/:todoId", todoController.deleteOne);
//communtities
app.get("/api/communities", communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);
app.post("/api/communities", communityController.create);
app.delete("/api/communities/:communityId", communityController.deleteOne);
//community posts
app.get("/api/communities/:communityId/posts", postController.readAll);
app.get("/api/communities/:communityId/posts/:postId", postController.readOne);
app.post("/api/communities/:communityId/posts", postController.create);
app.delete("/api/communities/:communityId/posts/:postId", postController.deleteOne);
//post comments
app.get("/api/communities/:communityId/posts/:postId/comments", commentController.readAll);
app.post("/api/communities/:communityId/posts/:postId/comments", commentController.create);
app.delete("/api/communities/:communityId/posts/:postId/comments/:commentId", commentController.deleteComment);

//auth users
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);



export default app;