import { ChevronRight } from "lucide-react";

import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import React from "react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  baseUrl: string;
}
export function Pagination({
  currentPage,
  lastPage,
  hasNextPage,
  hasPreviousPage,
  baseUrl,
}: PaginationProps) {
  const router = useRouter();

  const createPageUrl = (page: number) => {
    const url = new URL(baseUrl, window.location.origin);
    const searchParams = new URLSearchParams(window.location.search);
    url.searchParams.set("page", page.toString());
    return `${url.pathname}?${searchParams.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPreviousPage}
        onClick={() => router.push(createPageUrl(currentPage - 1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-1">
        {Array.from({ length: lastPage }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === lastPage ||
              (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .map((page, index, array) => {
            if (index > 0 && array[index - 1] !== page - 1) {
              return (
                <React.Fragment key={`ellipsis-${page}`}>
                  <span className="px-2">...</span>
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => router.push(createPageUrl(page))}
                  >
                    {page}
                  </Button>
                </React.Fragment>
              );
            }
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => router.push(createPageUrl(page))}
              >
                {page}
              </Button>
            );
          })}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        onClick={() => router.push(createPageUrl(currentPage + 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
