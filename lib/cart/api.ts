import "server-only";
import { cookies } from "next/headers";
import type { Cart } from "@/lib/cart/types";

const API_URL = process.env.AP_CARE_API_URL ?? "http://localhost:8080";
const CART_COOKIE = "apcare_cart";

export class CartApiError extends Error {}

async function request(path = "", init: RequestInit = {}): Promise<Cart> {
  const store = await cookies();
  const token = store.get(CART_COOKIE)?.value;
  const response = await fetch(`${API_URL}/api/v1/public/cart${path}`, {
    ...init, cache: "no-store", headers: { Accept: "application/json", "Content-Type": "application/json", ...(token ? { "X-Cart-Token": token } : {}), ...init.headers },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null) as { message?: string } | null;
    throw new CartApiError(error?.message ?? "Impossible de mettre à jour le panier.");
  }
  const cart = await response.json() as Cart;
  if (cart.token && cart.token !== token) store.set(CART_COOKIE, cart.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 30 * 24 * 60 * 60 });
  return cart;
}

export function getCart() { return request(); }
export function addCartItem(productSlug: string, quantity: number) { return request("/items", { method: "POST", body: JSON.stringify({ productSlug, quantity }) }); }
export function updateCartItem(productSlug: string, quantity: number) { return request("/items", { method: "PATCH", body: JSON.stringify({ productSlug, quantity }) }); }
export function removeCartItem(productSlug: string) { return request(`/items?productSlug=${encodeURIComponent(productSlug)}`, { method: "DELETE" }); }
