import { assertEquals } from "@std/assert";
import app from "@server/app.js";

Deno.test("GET / returns { message: 'Hello World!' }", async () => {
  const res = await app.request("/");
  const body = await res.json();
  assertEquals(body, { message: "Hello World!" });
});