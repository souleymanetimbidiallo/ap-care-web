import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const API_URL = process.env.AP_CARE_API_URL ?? "http://localhost:8080";

export async function proxy(request: NextRequest) {
  if (request.cookies.has("apcare_access")) return NextResponse.next();
  const refreshToken = request.cookies.get("apcare_refresh")?.value;
  if (!refreshToken) return NextResponse.redirect(new URL(`/connexion?returnTo=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ refreshToken }), cache: "no-store",
    });
    if (!response.ok) throw new Error("refresh failed");
    const session = await response.json() as { accessToken: string; refreshToken: string; expiresIn: number };
    const next = NextResponse.next();
    const options = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };
    next.cookies.set("apcare_access", session.accessToken, { ...options, maxAge: session.expiresIn });
    next.cookies.set("apcare_refresh", session.refreshToken, { ...options, maxAge: 30 * 24 * 60 * 60 });
    return next;
  } catch {
    const next = NextResponse.redirect(new URL(`/connexion?returnTo=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));
    next.cookies.delete("apcare_access");
    next.cookies.delete("apcare_refresh");
    return next;
  }
}

export const config = { matcher: ["/compte/:path*", "/checkout/:path*", "/commandes/:path*"] };
