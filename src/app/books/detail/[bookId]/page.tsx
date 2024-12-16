import { Metadata } from "next";
import { BookDetail } from "@/components/books/book-detail";
import { BookFetchError } from "@/components/books/book-fetch-error";
import Loading from "@/components/loading";
import { bookService } from "@/services/book";
import { Suspense } from "react";

interface Props {
  params: { bookId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await bookService.getBookById(params.bookId);

  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: `${book.title} | RGT 도서관리 시스템`,
      description: `작가 : ${book.author} 설명 : ${book.description}`,
      images: [
        {
          url: book.coverImage,
          width: 800,
          height: 600,
          alt: book.title,
        },
      ],
    },
  };
}

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
