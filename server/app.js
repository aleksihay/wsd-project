import { Hono } from "@hono/hono";
import postgres from "postgres";

const app = new Hono();
const counts = new Map();


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

export default app;