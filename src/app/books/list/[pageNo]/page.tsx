import { bookService } from "@/services/book";
import Books from "./component";

export default async function BooksPage({
  params,
}: {
  params: { pageNo: number };
}) {
  const books = await bookService.getBooks();
  return (
    <>
      <Books booksData={books} pageNo={params.pageNo} />
    </>
  );
}
