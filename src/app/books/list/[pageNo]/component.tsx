import { Layout } from "@/components/layout";
import { SearchForm } from "@/components/search-form";
import { BookList } from "@/components/book-list";
import { Pagination } from "@/components/pagination";
import { PaginatedResponse } from "@/types/common.type";
import { BookSearchData } from "@/types/book.type";
import { useBooksQuery } from "@/hooks/book.hook";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function Books({
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
    <Layout showAdminLogin>
      <SearchForm />
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <BookList books={booksPage?.data ?? []} />
          <Pagination
            currentPage={booksPage?.meta.page ?? 1}
            hasNextPage={booksPage?.meta.hasNextPage ?? false}
            hasPreviousPage={booksPage?.meta.hasPreviousPage ?? false}
            lastPage={booksPage?.meta.lastPage ?? 1}
            baseUrl="/books/list"
          />
        </>
      )}
    </Layout>
  );
}
