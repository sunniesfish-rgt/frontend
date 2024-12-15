import { BookDetail } from "@/components/books/book-detail";
import { BookFetchError } from "@/components/books/book-fetch-error";
import Loading from "@/components/loading";
import { bookService } from "@/services/book";
import { Suspense } from "react";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const bookId = await params;
  try {
    const book = await bookService.getBookById(bookId.bookId);
    return (
      <Suspense fallback={<Loading />}>
        <BookDetail book={book} />
      </Suspense>
    );
  } catch (error) {
    console.log(error);
    return <BookFetchError />;
  }
}
