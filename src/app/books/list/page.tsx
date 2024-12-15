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
  searchParams: rawSearchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchParams = await Promise.resolve(rawSearchParams);

  const title = Array.isArray(searchParams.title)
    ? searchParams.title[0]
    : searchParams.title;
  const author = Array.isArray(searchParams.author)
    ? searchParams.author[0]
    : searchParams.author;
  const pageNumber = parseInt(searchParams.page || "1", 10);

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
