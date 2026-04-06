import { assertEquals } from "@std/assert";

const fun = () => {
  return "hello world!";
};

Deno.test("Fun should return 'hello world'", () => {
  assertEquals(fun(), "hello world");
});