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
    try {
      const response = await apiClient.get<PaginatedResponse<BookSearchData>>(
        "/books",
        params
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("책 목록을 불러오는 중 오류가 발생했습니다.");
    }
  },

  getBookById: async (id: string): Promise<Book> => {
    try {
      const response = await apiClient.get<Book>(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("책 정보를 불러오는 중 오류가 발생했습니다.");
    }
  },

  createBook: async (book: CreateBookDto): Promise<Book> => {
    try {
      const response = await apiClient.post<Book, CreateBookDto>(
        "/books",
        book
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("책 생성 중 오류가 발생했습니다.");
    }
  },

  updateBook: async (id: string, book: UpdateBookDto): Promise<boolean> => {
    try {
      const response = await apiClient.put<boolean, UpdateBookDto>(
        `/books/${id}`,
        book
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("책 업데이트 중 오류가 발생했습니다.");
    }
  },

  deleteBook: async (id: string): Promise<boolean> => {
    try {
      const response = await apiClient.delete<boolean>(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("책 삭제 중 오류가 발생했습니다.");
    }
  },
};
