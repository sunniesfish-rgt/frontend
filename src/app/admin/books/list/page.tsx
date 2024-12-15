import { bookService } from "@/services/book";
import AdminBooks from "./component";
import { BookFetchError } from "@/components/books/book-fetch-error";
import Loading from "@/components/loading";
import { Suspense } from "react";

interface SearchParams {
  page?: string;
  title?: string;
  author?: string;
}

export default async function AdminBooksPage({
  searchParams: rawSearchParams,
}: {
  searchParams: SearchParams;
}) {
  try {
    const searchParams = await Promise.resolve(rawSearchParams);
    const pageNumber = parseInt(searchParams.page || "1", 10);
    const title = Array.isArray(searchParams.title)
      ? searchParams.title[0]
      : searchParams.title;
    const author = Array.isArray(searchParams.author)
      ? searchParams.author[0]
      : searchParams.author;
    const books = await bookService.getBooks({
      page: pageNumber,
      title,
      author,
    });

    return (
      <Suspense fallback={<Loading />}>
        <AdminBooks booksData={books} pageNo={pageNumber} />
      </Suspense>
    );
  } catch (error) {
    console.error("도서 목록 조회 실패:", error);
    return <BookFetchError />;
  }
}
