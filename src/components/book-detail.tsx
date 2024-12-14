"use client";

import { Book } from "@/types/book.type";
import Image from "next/image";
import { BookDetailContent } from "./book-detail-content";
import { useBookStore } from "@/store/book-store";
import { useEffect } from "react";
export interface BookDetailProps {
  book: Book;
  isAdmin?: boolean;
}

export function BookDetail({ book, isAdmin = false }: BookDetailProps) {
  const { setBooks } = useBookStore();
  useEffect(() => {
    setBooks({ [book.id]: book });
  }, [book, setBooks]);
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <Image
          src={book.coverImage}
          alt={book.title}
          width={400}
          height={600}
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-2/3">
        <BookDetailContent book={book} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
