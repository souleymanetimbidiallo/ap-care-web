import { NextResponse } from "next/server";
import { authRequest } from "@/lib/auth/api";
import { REFRESH_COOKIE, saveSession } from "@/lib/auth/session";
import type { AuthResponse } from "@/lib/auth/types";
import { cookies } from "next/headers";

export async function POST() {
  const refreshToken = (await cookies()).get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return NextResponse.json({ message: "Session absente." }, { status: 401 });
  try {
    const session = await authRequest<AuthResponse>("/refresh", { method: "POST", body: JSON.stringify({ refreshToken }) });
    await saveSession(session);
    return NextResponse.json({ user: session.user });
  } catch {
    return NextResponse.json({ message: "Session expirée." }, { status: 401 });
  }
}
