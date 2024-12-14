"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as z from "zod";
import { Layout } from "@/components/layout";
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

const bookFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  author: z.string().min(1, "저자를 입력해주세요"),
  publishDate: z.string().min(1, "출판일을 선택해주세요"),
  description: z.string().min(10, "설명은 최소 10자 이상 입력해주세요"),
  coverImage: z.string(),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

const defaultValues: BookFormValues = {
  title: "",
  author: "",
  publishDate: "",
  description: "",
  coverImage: "/placeholder.svg?height=600&width=400",
};

export default function AdminNewBookPage() {
  const router = useRouter();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
  });

  const onSubmit = (data: BookFormValues) => {
    // TODO: Implement create logic
    console.log("Create new book", data);
    router.push("/admin/books");
  };

  return (
    <Layout showLogout>
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
                name="publishDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
    </Layout>
  );
}
