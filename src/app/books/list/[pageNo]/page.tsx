import { bookService } from "@/services/book";
import Books from "./component";
import Loading from "@/components/loading";
import { Suspense } from "react";
import { BookFetchError } from "@/components/books/book-fetch-error";

export const dynamicParams = true;
export default async function BooksPage({
  params,
}: {
  params: Promise<{ pageNo: string }>;
}) {
  const pageNo = await params;
  try {
    const books = await bookService.getBooks({ page: Number(pageNo.pageNo) });
    return (
      <Suspense fallback={<Loading />}>
        <Books booksData={books} pageNo={Number(pageNo.pageNo)} />
      </Suspense>
    );
  } catch (error) {
    console.log(error);
    return <BookFetchError />;
  }
}
