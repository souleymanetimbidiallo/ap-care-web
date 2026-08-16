import "server-only";

import type { AuthResponse, AuthUser } from "@/lib/auth/types";

const API_URL = process.env.AP_CARE_API_URL ?? "http://localhost:8080";

export class AuthApiError extends Error {
  constructor(public status: number, public code: string, message: string, public fieldErrors: Record<string, string> = {}) {
    super(message);
  }
}

export async function authRequest<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}/api/v1/auth${path}`, {
    ...init,
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...init.headers },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null) as { code?: string; message?: string; fieldErrors?: Record<string, string> } | null;
    throw new AuthApiError(response.status, error?.code ?? "AUTH_ERROR", error?.message ?? "Impossible de traiter la demande.", error?.fieldErrors);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function authenticate(path: "/login" | "/register", body: unknown) {
  return authRequest<AuthResponse>(path, { method: "POST", body: JSON.stringify(body) });
}

export function fetchCurrentUser(accessToken: string) {
  return authRequest<AuthUser>("/me", { method: "GET", headers: { Authorization: `Bearer ${accessToken}` } });
}
