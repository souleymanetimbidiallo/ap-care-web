"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createOrder, CheckoutApiError, type Order } from "@/lib/orders/api";

export type CheckoutState = { message?: string; order?: Order };
const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();
export async function checkoutAction(_state: CheckoutState, data: FormData): Promise<CheckoutState> {
  let reference: string;
  try {
    const order = await createOrder({ idempotencyKey: text(data, "idempotencyKey"), deliveryMode: text(data, "deliveryMode"), recipientName: text(data, "recipientName"), recipientPhone: text(data, "recipientPhone"), city: text(data, "city"), district: text(data, "district"), addressLine: text(data, "addressLine"), deliveryNotes: text(data, "deliveryNotes") });
    reference = order.reference;
    revalidatePath("/", "layout"); revalidatePath("/panier");
  } catch (error) { return { message: error instanceof CheckoutApiError ? error.message : "Le service est indisponible." }; }
  redirect(`/commandes/${encodeURIComponent(reference)}/confirmation`);
}
