import { bookService } from "@/services/book";
import AdminBooks from "./component";

export default async function AdminBooksPage({
  params,
}: {
  params: { pageNo: number };
}) {
  const books = await bookService.getBooks({
    page: params.pageNo,
  });
  return (
    <>
      <AdminBooks booksData={books} pageNo={params.pageNo} />
    </>
  );
}
