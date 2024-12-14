import {
  BookSearchData,
  CreateBookDto,
  UpdateBookDto,
} from "@/types/book.type";
import { Book, GetBooksParams } from "@/types/book.type";
import { apiClient } from "./api-client";
import { PaginatedResponse } from "@/types/common.type";

export const bookService = {
  getBooks: async (
    params?: GetBooksParams
  ): Promise<PaginatedResponse<BookSearchData>> => {
    const response = await apiClient.get("/books", params);
    return response.data as PaginatedResponse<BookSearchData>;
  },

  getBookById: async (id: string): Promise<Book> => {
    const response = await apiClient.get(`/books/${id}`);
    return response.data as Book;
  },

  createBook: async (book: CreateBookDto): Promise<Book> => {
    const response = await apiClient.post("/books", book);
    return response.data as Book;
  },

  updateBook: async (id: string, book: UpdateBookDto): Promise<boolean> => {
    const response = await apiClient.put(`/books/${id}`, book);
    return response.data as boolean;
  },

  deleteBook: async (id: string): Promise<boolean> => {
    const response = await apiClient.delete(`/books/${id}`);
    return response.data;
  },
};
