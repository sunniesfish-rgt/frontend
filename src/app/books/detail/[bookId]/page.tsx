import { Layout } from "@/components/layout";
import { BookDetail } from "@/components/book-detail";
import { bookService } from "@/services/book";

export default async function BookDetailPage({
  params,
}: {
  params: { bookId: string };
}) {
  const book = await bookService.getBookById(params.bookId);
  return (
    <Layout showAdminLogin>
      <BookDetail book={book} />
    </Layout>
  );
}
