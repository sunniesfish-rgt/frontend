"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBooksMutations } from "@/hooks/book.hook";
import { useBookStore } from "@/store/book-store";
import { UpdateBookDto } from "@/types/book.type";

export default function AdminBookEditPage({
  params,
}: {
  params: { bookId: string };
}) {
  const router = useRouter();
  const { books } = useBookStore();
  const { updateBook } = useBooksMutations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBookDto>({
    defaultValues: {
      title: books[params.bookId].title,
      author: books[params.bookId].author,
      publishedDate: books[params.bookId].publishedDate,
      description: books[params.bookId].description,
      coverImage: books[params.bookId].coverImage,
      metadata: books[params.bookId].metadata,
    },
  });

  const onSubmit = async (data: UpdateBookDto) => {
    try {
      await updateBook.mutateAsync({ id: params.bookId, data });
      router.push(`/admin/books/${params.bookId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Image
              src={books[params.bookId].coverImage}
              alt={books[params.bookId].title}
              width={400}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
            <Button type="button" className="mt-4 w-full">
              Change Image
            </Button>
          </div>
          <div className="md:w-2/3 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Input
                id="title"
                {...register("title", { required: "제목을 입력해주세요" })}
                aria-invalid={errors.title ? "true" : "false"}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <Input
                id="author"
                {...register("author", { required: "저자를 입력해주세요" })}
                aria-invalid={errors.author ? "true" : "false"}
              />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="publishDate"
                className="block text-sm font-medium text-gray-700"
              >
                Publish Date
              </label>
              <Input
                id="publishDate"
                type="date"
                {...register("publishedDate", {
                  required: "출판일을 입력해주세요",
                })}
                aria-invalid={errors.publishedDate ? "true" : "false"}
              />
              {errors.publishedDate && (
                <p className="text-red-500 text-sm">
                  {errors.publishedDate.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "설명을 입력해주세요",
                })}
                rows={6}
                aria-invalid={errors.description ? "true" : "false"}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </>
  );
}
