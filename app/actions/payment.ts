"use server";

import { redirect } from "next/navigation";
import { createPayment, PaymentApiError } from "@/lib/payments/api";

export type PaymentState = { message?: string };

export async function startPaymentAction(_state: PaymentState, data: FormData): Promise<PaymentState> {
  const reference = String(data.get("reference") ?? "").trim();
  if (!reference) return { message: "La référence de commande est invalide." };

  let destination: string;
  try {
    const payment = await createPayment(reference);
    destination = payment.redirectUrl ?? `/commandes/${encodeURIComponent(reference)}/confirmation?payment=pending`;
  } catch (error) {
    return { message: error instanceof PaymentApiError ? error.message : "Le service de paiement est indisponible." };
  }
  redirect(destination);
}
