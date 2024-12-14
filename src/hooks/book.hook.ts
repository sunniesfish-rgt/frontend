import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bookService } from "@/services/book";
import { useQuery } from "@tanstack/react-query";
import {
  BookSearchData,
  CreateBookDto,
  GetBooksParams,
  UpdateBookDto,
} from "@/types/book.type";
import { PaginatedResponse } from "@/types/common.type";

export function useBooksQuery(
  pageNo: number,
  params: GetBooksParams,
  initialData?: PaginatedResponse<BookSearchData>
) {
  return useQuery({
    queryKey: ["books"],
    queryFn: () =>
      bookService.getBooks({
        page: pageNo,
        ...params,
      }),
    staleTime: 1000 * 60 * 5,
    initialData: initialData ?? undefined,
  });
}

export function useBooksMutations() {
  const queryClient = useQueryClient();
  return {
    createBook: useMutation({
      mutationFn: (newBook: CreateBookDto) => bookService.createBook(newBook),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
      },
    }),
    updateBook: useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateBookDto }) =>
        bookService.updateBook(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
      },
    }),
    deleteBook: useMutation({
      mutationFn: (bookId: string) => bookService.deleteBook(bookId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
      },
    }),
  };
}
