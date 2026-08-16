export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type ProductImage = {
  id: string;
  url: string;
  altText: string | null;
  primary: boolean;
};

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  priceGnf: number;
  available: boolean;
  featured: boolean;
  category: Category;
  primaryImage: ProductImage | null;
};

export type ProductDetail = Omit<ProductSummary, "primaryImage"> & {
  description: string;
  stockQuantity: number;
  images: ProductImage[];
};

export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type ProductFilters = {
  q?: string;
  category?: string;
  available?: string;
  minPrice?: string;
  maxPrice?: string;
  featured?: string;
  page?: string;
  size?: string;
  sort?: string;
  direction?: string;
};
