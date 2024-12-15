"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useBooksMutations } from "@/hooks/book.hook";

const bookFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  author: z.string().min(1, "저자를 입력해주세요"),
  publishedDate: z.date(),
  description: z.string().min(10, "설명은 최소 10자 이상 입력해주세요"),
  coverImage: z.string(),
  metadata: z.object({
    stockQuantity: z.number().min(0, "재고는 0 이상이어야 합니다"),
    price: z.number().min(0, "가격은 0 이상이어야 합니다"),
  }),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

const defaultValues: BookFormValues = {
  title: "",
  author: "",
  publishedDate: new Date(),
  description: "",
  coverImage: "/placeholder.svg?height=600&width=400",
  metadata: {
    stockQuantity: 0,
    price: 0,
  },
};

export default function AdminNewBookPage() {
  const router = useRouter();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
  });

  const { createBook } = useBooksMutations();

  const onSubmit = async (data: BookFormValues) => {
    try {
      await createBook.mutateAsync(data);
      router.push("/admin/books");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Create New Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Image
                src={form.watch("coverImage")}
                alt="Book cover"
                width={400}
                height={600}
                className="w-full rounded-lg shadow-lg"
              />
              <Button type="button" className="mt-4 w-full">
                Upload Image
              </Button>
            </div>
            <div className="md:w-2/3 space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Published Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value.toISOString().split("T")[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Create Book</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
