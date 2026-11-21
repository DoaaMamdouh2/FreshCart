import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

const cookieNames = ["__Secure-authjs.session-token", "authjs.session-token"];

export async function getAuthToken(): Promise<string | null> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  const cookieStore = await cookies();

  for (const name of cookieNames) {
    const raw = cookieStore.get(name)?.value;
    if (!raw) continue;

    try {
      const decoded = await decode({ token: raw, secret, salt: name });
      const accessToken = decoded?.accessToken;
      return typeof accessToken === "string" ? accessToken : null;
    } catch {
      return null;
    }
  }

  return null;
}