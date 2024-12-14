import { Book } from "@/types/book.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BookState {
  books: Record<string, Book>;
  setBook: (book: Book) => void;
  getBook: (id: string) => Book | undefined;
  removeBook: (id: string) => void;
}

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      books: {},
      setBook: (book) =>
        set((state) => ({ books: { ...state.books, [book.id]: book } })),
      getBook(id) {
        return this.books[id];
      },
      removeBook(id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _, ...books } = this.books;
        set({ books });
      },
    }),
    {
      name: "book-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({ books: state.books }),
      onRehydrateStorage: (state) => {
        console.log("onRehydrateStorage", state);
      },
      migrate: (state, version) => {
        console.log("migrate", state, version);
        return state;
      },
    }
  )
);
