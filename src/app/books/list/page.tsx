import { bookService } from "@/services/book";
import Books from "./component";
import Loading from "@/components/loading";
import { Suspense } from "react";

interface SearchParams {
  page?: string;
  title?: string | string[];
  author?: string | string[];
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const title = Array.isArray(params.title) ? params.title[0] : params.title;
  const author = Array.isArray(params.author)
    ? params.author[0]
    : params.author;
  const pageNumber = parseInt(params.page || "1", 10);

  const books = await bookService.getBooks({
    page: pageNumber,
    title,
    author,
  });

  return (
    <Suspense fallback={<Loading />}>
      <Books booksData={books} pageNo={pageNumber} />
    </Suspense>
  );
}
