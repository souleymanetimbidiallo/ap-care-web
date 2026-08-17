"use client";

import { useActionState } from "react";
import { startPaymentAction } from "@/app/actions/payment";

export function PaymentButton({ reference }: { reference: string }) {
  const [state, action, pending] = useActionState(startPaymentAction, {});
  return (
    <form action={action} className="mt-6">
      <input type="hidden" name="reference" value={reference} />
      <button disabled={pending} className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-emerald-700 px-6 font-semibold text-white disabled:opacity-60">
        {pending ? "Connexion à Djomy…" : "Payer avec Djomy"}
      </button>
      <p className="mt-2 text-xs text-slate-500">Orange Money, MTN MoMo ou carte bancaire sur le portail sécurisé Djomy.</p>
      {state.message && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{state.message}</p>}
    </form>
  );
}
