"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, registerAction } from "@/app/actions/auth";
import type { AuthFormState } from "@/lib/auth/types";

const initialState: AuthFormState = {};
const inputClass = "h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

export function AuthForm({ mode, returnTo }: { mode: "login" | "register"; returnTo?: string }) {
  const action = mode === "login" ? loginAction : registerAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  const register = mode === "register";
  return (
    <form action={formAction} className="mt-8 space-y-5">
      {returnTo && <input type="hidden" name="returnTo" value={returnTo} />}
      {register && <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom" name="firstName" error={state.fieldErrors?.firstName} inputClass={inputClass} autoComplete="given-name" />
        <Field label="Nom" name="lastName" error={state.fieldErrors?.lastName} inputClass={inputClass} autoComplete="family-name" />
      </div>}
      <Field label="Téléphone" name="phone" type="tel" error={state.fieldErrors?.phone} inputClass={inputClass} autoComplete="tel" placeholder="+224 621 12 34 56" />
      {register && <Field label="Email (facultatif)" name="email" type="email" error={state.fieldErrors?.email} inputClass={inputClass} autoComplete="email" />}
      <Field label="Mot de passe" name="password" type="password" error={state.fieldErrors?.password} inputClass={inputClass} autoComplete={register ? "new-password" : "current-password"} hint={register ? "8 caractères minimum, avec une lettre et un chiffre." : undefined} />
      {register && <Field label="Confirmer le mot de passe" name="passwordConfirmation" type="password" error={state.fieldErrors?.passwordConfirmation} inputClass={inputClass} autoComplete="new-password" />}
      {state.message && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>}
      <button disabled={pending} className="h-12 w-full rounded-xl bg-emerald-700 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60">
        {pending ? "Veuillez patienter…" : register ? "Créer mon compte" : "Se connecter"}
      </button>
      <p className="text-center text-sm text-slate-600">
        {register ? "Vous avez déjà un compte ?" : "Vous n’avez pas encore de compte ?"}{" "}
        <Link className="font-semibold text-emerald-700 hover:underline" href={register ? "/connexion" : "/inscription"}>{register ? "Se connecter" : "Créer un compte"}</Link>
      </p>
    </form>
  );
}

function Field({ label, name, type = "text", error, inputClass, hint, ...props }: { label: string; name: string; type?: string; error?: string; inputClass: string; hint?: string; autoComplete?: string; placeholder?: string }) {
  return <label className="block text-sm font-medium text-slate-700">{label}<input required={name !== "email"} name={name} type={type} className={`${inputClass} mt-2`} {...props} />{hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}{error && <span className="mt-1 block text-xs text-red-600">{error}</span>}</label>;
}
