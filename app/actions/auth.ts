"use server";

import { redirect } from "next/navigation";
import { AuthApiError, authenticate, authRequest } from "@/lib/auth/api";
import { clearSession, REFRESH_COOKIE, saveSession } from "@/lib/auth/session";
import type { AuthFormState } from "@/lib/auth/types";
import { cookies } from "next/headers";

function value(formData: FormData, key: string) { return String(formData.get(key) ?? "").trim(); }
function safeReturnTo(formData: FormData) {
  const target = value(formData, "returnTo");
  return target.startsWith("/") && !target.startsWith("//") ? target : "/compte";
}
function failure(error: unknown): AuthFormState {
  if (error instanceof AuthApiError) return { message: error.message, fieldErrors: error.fieldErrors };
  return { message: "Le service est momentanément indisponible. Réessayez." };
}

export async function loginAction(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  let destination = "/compte";
  try {
    const session = await authenticate("/login", { phone: value(formData, "phone"), password: value(formData, "password") });
    await saveSession(session);
    destination = safeReturnTo(formData);
  } catch (error) { return failure(error); }
  redirect(destination);
}

export async function registerAction(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const password = value(formData, "password");
  if (password !== value(formData, "passwordConfirmation")) return { message: "Les mots de passe ne correspondent pas.", fieldErrors: { passwordConfirmation: "Confirmez le même mot de passe." } };
  try {
    const session = await authenticate("/register", {
      firstName: value(formData, "firstName"), lastName: value(formData, "lastName"),
      phone: value(formData, "phone"), email: value(formData, "email") || null, password,
    });
    await saveSession(session);
  } catch (error) { return failure(error); }
  redirect("/compte");
}

export async function logoutAction() {
  const refreshToken = (await cookies()).get(REFRESH_COOKIE)?.value;
  if (refreshToken) await authRequest<void>("/logout", { method: "POST", body: JSON.stringify({ refreshToken }) }).catch(() => undefined);
  await clearSession();
  redirect("/");
}
