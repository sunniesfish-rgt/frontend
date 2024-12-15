import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book } from "@/types/book.type";

export interface BookDetailContentProps {
  book: Book;
  isAdmin: boolean;
}

export function BookDetailContent({ book, isAdmin }: BookDetailContentProps) {
  const [stock, setStock] = useState(book.metadata.stockQuantity);

  const handleStockChange = (amount: number) => {
    setStock((prev: number) => Math.max(0, prev + amount));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">{book.title}</h2>
        {isAdmin && (
          <Button variant="outline" onClick={() => {}}>
            Edit Information
          </Button>
        )}
      </div>
      <p className="text-xl text-gray-600 mb-4">{book.author}</p>
      <p className="mb-2">
        Published: {book.publishedDate.toLocaleDateString()}
      </p>
      {isAdmin ? (
        <div className="flex items-center space-x-2 mb-4">
          <p>Stock:</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStockChange(-1)}
          >
            -
          </Button>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-20 text-center"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStockChange(1)}
          >
            +
          </Button>
        </div>
      ) : (
        <p className="mb-4">Stock: {book.metadata.stockQuantity}</p>
      )}
      <h3 className="text-xl font-semibold mb-2">Description</h3>
      <p className="text-gray-700">{book.description}</p>
    </>
  );
}
