import "server-only";

import type {
  Category,
  PageResponse,
  ProductDetail,
  ProductFilters,
  ProductSummary,
} from "@/lib/api/types";

const apiBaseUrl = process.env.AP_CARE_API_URL ?? "http://localhost:8080";

export class ApiNotFoundError extends Error {}

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    throw new ApiNotFoundError("La ressource demandée est introuvable.");
  }
  if (!response.ok) {
    throw new Error(`AP Care API responded with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function getCategories() {
  return apiFetch<Category[]>("/api/v1/public/categories");
}

export function getCategory(slug: string) {
  return apiFetch<Category>(`/api/v1/public/categories/${encodeURIComponent(slug)}`);
}

export function getProducts(filters: ProductFilters = {}) {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, value);
  });
  const suffix = query.size ? `?${query.toString()}` : "";
  return apiFetch<PageResponse<ProductSummary>>(`/api/v1/public/products${suffix}`);
}

export function getProduct(slug: string) {
  return apiFetch<ProductDetail>(`/api/v1/public/products/${encodeURIComponent(slug)}`);
}
