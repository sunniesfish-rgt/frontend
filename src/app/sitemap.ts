import { MetadataRoute } from "next";
import { bookService } from "@/services/book";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rgt-pi.vercel.app/";

  const books = await bookService.getBooks({ page: 1, limit: 100 });

  const bookUrls = books.data.map((book) => ({
    url: `${baseUrl}/books/detail/${book.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}/books/list`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...bookUrls,
  ];
}
