"use server";

import { revalidatePath } from "next/cache";
import { addCartItem, CartApiError, removeCartItem, updateCartItem } from "@/lib/cart/api";
import type { CartActionState } from "@/lib/cart/types";

function fields(formData: FormData) { return { slug: String(formData.get("productSlug") ?? ""), quantity: Number(formData.get("quantity") ?? 1) }; }
function failure(error: unknown): CartActionState { return { message: error instanceof CartApiError ? error.message : "Le panier est momentanément indisponible." }; }
function refresh() { revalidatePath("/", "layout"); revalidatePath("/panier"); }

export async function addToCartAction(_state: CartActionState, formData: FormData): Promise<CartActionState> {
  const { slug, quantity } = fields(formData);
  try { await addCartItem(slug, quantity); refresh(); return { success: true, message: "Produit ajouté au panier." }; } catch (error) { return failure(error); }
}
export async function updateCartAction(formData: FormData) {
  const { slug, quantity } = fields(formData);
  try { await updateCartItem(slug, quantity); } catch {} refresh();
}
export async function removeCartAction(formData: FormData) {
  try { await removeCartItem(String(formData.get("productSlug") ?? "")); } catch {} refresh();
}
