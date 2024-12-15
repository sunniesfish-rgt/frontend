"use client";

import { PaginatedResponse } from "@/types/common.type";
import { BookList } from "@/components/books/book-list";
import { SearchForm } from "@/components/books/search-form";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookSearchData } from "@/types/book.type";
import { useSearchParams } from "next/navigation";
import { useBooksQuery } from "@/hooks/book.hook";
import { Spinner } from "@/components/ui/spinner";
import { Pagination } from "@/components/pagination";

export default function AdminBooks({
  booksData,
  pageNo,
}: {
  booksData: PaginatedResponse<BookSearchData>;
  pageNo: number;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const {
    data: booksPage,
    isLoading,
    isError,
    error,
  } = useBooksQuery(
    pageNo,
    {
      author: query,
      title: query,
      limit: 10,
      page: pageNo,
      order: "DESC",
    },
    booksData
  );
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Book Management</h2>
        <Link href="/admin/books/new">
          <Button>Create New Book</Button>
        </Link>
      </div>
      <SearchForm />
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <BookList books={booksPage?.data ?? []} isAdmin />
          <Pagination
            currentPage={booksPage?.meta.page ?? 1}
            lastPage={booksPage?.meta.lastPage ?? 1}
            hasNextPage={booksPage?.meta.hasNextPage ?? false}
            hasPreviousPage={booksPage?.meta.hasPreviousPage ?? false}
            baseUrl="/admin/books/list"
          />
        </>
      )}
    </>
  );
}
