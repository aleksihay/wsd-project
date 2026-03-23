import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";

import * as taskController from "./controllers/taskController.js";
import * as todoController from "./controllers/todoController.js";
import * as communityController from "./controllers/communityController.js";
import * as postController from "./controllers/postController.js";
import * as commentController from "./controllers/commentController.js";
import * as middlewares from "./middlewares.js";
import * as authController from "./controllers/authController.js";
import * as readingProgressController from "./controllers/readingProgressController.js";
import * as userController from "./controllers/userController.js";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//todo tasks
app.use("/api/todos/:todoId/tasks/*", middlewares.authenticate);
app.post("/api/todos/:todoId/tasks", taskController.create);
app.get("/api/todos/:todoId/tasks", taskController.readAll);
app.get("/api/todos/:todoId/tasks/:taskId", taskController.readOne);
app.put("/api/todos/:todoId/tasks/:taskId", taskController.update);
app.delete("/api/todos/:todoId/tasks/:taskId", taskController.deleteOne);
//todos
app.use("/api/todos/*", middlewares.authenticate);
app.get("/api/todos", todoController.readAll);
app.get("/api/todos/:todoId", todoController.readOne);
app.post("/api/todos", todoController.create);
app.put("/api/todos/:todoId", todoController.update);
app.delete("/api/todos/:todoId", todoController.deleteOne);
//communtities

app.get("/api/communities", communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);
app.post("/api/communities", middlewares.authenticate, communityController.create);
app.delete("/api/communities/:communityId", middlewares.authenticate, communityController.deleteOne);
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

//Verify user permissions (user role)
app.use("/api/admin/*", middlewares.authenticate, middlewares.requireAnyRole("ADMIN"));
app.get("/api/admin/users", userController.getAllUsers);
app.get("/api/admin/stats", userController.getStats);

app.use("/api/secret", middlewares.authenticate);
app.get("/api/secret", (c) => {
  return c.json({ message: "This is a secret message!" });
});
//book progress
app.use("/api/reading-progress/*", middlewares.authenticate);
app.get("/api/reading-progress", readingProgressController.getUserProgress);
app.get("/api/reading-progress/book/:bookId", readingProgressController.getUserProgressForBook);
app.post("/api/reading-progress/book/:bookId", readingProgressController.createOrUpdateProgress);
app.delete("/api/reading-progress/book/:bookId", readingProgressController.deleteProgress);

export default app;