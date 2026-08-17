import "server-only";
import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "@/lib/auth/session";

const API_URL = process.env.AP_CARE_API_URL ?? "http://localhost:8080";

export type Payment = {
  id: string;
  transactionId: string;
  provider: string;
  status: string;
  amountGnf: number;
  redirectUrl: string | null;
};

export class PaymentApiError extends Error {}

export async function createPayment(reference: string): Promise<Payment> {
  const access = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!access) throw new PaymentApiError("Votre session a expiré. Reconnectez-vous.");
  const response = await fetch(`${API_URL}/api/v1/orders/${encodeURIComponent(reference)}/payments`, {
    method: "POST",
    cache: "no-store",
    headers: { Authorization: `Bearer ${access}` },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null) as { message?: string } | null;
    throw new PaymentApiError(error?.message ?? "Impossible de démarrer le paiement.");
  }
  return response.json() as Promise<Payment>;
}
