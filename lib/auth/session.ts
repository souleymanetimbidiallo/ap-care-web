import "server-only";

import { cookies } from "next/headers";
import { fetchCurrentUser } from "@/lib/auth/api";
import type { AuthResponse, AuthUser } from "@/lib/auth/types";

export const ACCESS_COOKIE = "apcare_access";
export const REFRESH_COOKIE = "apcare_refresh";

const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };

export async function saveSession(session: AuthResponse) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, session.accessToken, { ...cookieOptions, maxAge: session.expiresIn });
  store.set(REFRESH_COOKIE, session.refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  try { return await fetchCurrentUser(token); } catch { return null; }
}
