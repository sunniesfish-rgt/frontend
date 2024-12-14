export interface BookSearchData extends BookMetadata {
  coverImageThumbnail: string;
}

export interface BookMetadata {
  id: string;
  title: string;
  author: string;
  stockQuantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publishedDate: Date;
  coverImage: string;
  description: string;
  metadata: BookMetadata;
}

export interface CreateBookDto {
  title: string;
  author: string;
  publishedDate: Date;
  description?: string;
  coverImage?: string;
  coverImageThumbnail?: string;
  metadata?: {
    stockQuantity?: number;
    price?: number;
  };
}

export type UpdateBookDto = Partial<CreateBookDto>;

export interface GetBooksParams {
  page?: number;
  limit?: number;
  order?: "ASC" | "DESC";
  title?: string;
  author?: string;
}
