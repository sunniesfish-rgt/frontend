import { BookDetail } from "@/components/book-detail";
import { bookService } from "@/services/book";

export default async function AdminBookDetailPage({
  params,
}: {
  params: { bookId: string };
}) {
  const book = await bookService.getBookById(params.bookId);
  return <BookDetail book={book} isAdmin={true} />;
}
