import { PUBLIC_API_URL } from "$env/static/public";

const readBooks = async () => {
  const response = await fetch(`${PUBLIC_API_URL}/api/books`);
  return await response.json();
};
const readBook = async (id) => {
  const response = await fetch(`${PUBLIC_API_URL}/api/books/${id}`);
  return await response.json();
};
const createBook = async (book) => {
  const response = await fetch(`${PUBLIC_API_URL}/api/books`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(book),
  });

  return await response.json();
};
const updateBook = async (id, book) => {
  const response = await fetch(`${PUBLIC_API_URL}/api/books/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(book),
  });

  return await response.json();
};


export { readBooks, readBook, createBook, updateBook };