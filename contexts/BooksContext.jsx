import { createContext, useState } from "react";

const DATABASE_ID = "682b87090014d379973e";
const COLLECTION_ID = "682b872900160213fa5f";

export const BooksContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchBookById(id) {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createBook(data) {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteBook(id) {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBookById,
        createBook,
        deleteBook,
      }}
    >
        { children }
    </BooksContext.Provider>
  );
}
