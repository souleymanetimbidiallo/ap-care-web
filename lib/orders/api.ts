import "server-only";
import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "@/lib/auth/session";

const API_URL = process.env.AP_CARE_API_URL ?? "http://localhost:8080";
export type Order = { reference: string; status: string; deliveryMode: string; subtotalGnf: number; deliveryFeeGnf: number; totalGnf: number };
export class CheckoutApiError extends Error {}

export async function createOrder(payload: unknown): Promise<Order> {
  const store = await cookies(); const access = store.get(ACCESS_COOKIE)?.value; const cart = store.get("apcare_cart")?.value;
  if (!access) throw new CheckoutApiError("Votre session a expiré. Reconnectez-vous.");
  if (!cart) throw new CheckoutApiError("Votre panier est vide.");
  const response = await fetch(`${API_URL}/api/v1/orders`, { method: "POST", cache: "no-store", headers: { "Content-Type": "application/json", Authorization: `Bearer ${access}`, "X-Cart-Token": cart }, body: JSON.stringify(payload) });
  if (!response.ok) { const error = await response.json().catch(() => null) as { message?: string } | null; throw new CheckoutApiError(error?.message ?? "Impossible de créer la commande."); }
  return response.json() as Promise<Order>;
}

export async function getOrder(reference: string): Promise<Order> {
  const access = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!access) throw new CheckoutApiError("Votre session a expiré.");
  const response = await fetch(`${API_URL}/api/v1/orders/${encodeURIComponent(reference)}`, { cache: "no-store", headers: { Authorization: `Bearer ${access}` } });
  if (!response.ok) throw new CheckoutApiError("Commande introuvable.");
  return response.json() as Promise<Order>;
}
