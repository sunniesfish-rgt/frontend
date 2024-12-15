import Image from "next/image";
import Link from "next/link";
import { BookSearchData } from "@/types/book.type";

interface BookListProps {
  books: BookSearchData[];
  isAdmin?: boolean;
}

export function BookList({ books, isAdmin = false }: BookListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Link
          href={isAdmin ? `/admin/books/${book.id}` : `/books/${book.id}`}
          key={book.id}
        >
          <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <Image
              src={book.coverImageThumbnail}
              alt={book.title}
              width={300}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-sm font-medium mt-2">
                ${book.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Stock: {book.stockQuantity}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
