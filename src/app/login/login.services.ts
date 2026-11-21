"use server";

import type { LoginActionResult, LoginFormType, LoginResponseType } from "./login.interface";
import { loginSchema } from "./login.zod";

export async function signInUser(data: LoginFormType): Promise<LoginActionResult> {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Enter a valid email and password." };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return { success: false, message: "The sign in service is not configured. Please try again later." };
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: parsed.data.email, password: parsed.data.password }),
    });
    const responseData: LoginResponseType = await response.json();

    if (response.ok && responseData.message === "success" && responseData.token) {
      return { success: true, message: "Signed in successfully.", token: responseData.token };
    }

    return {
      success: false,
      message: responseData.message && responseData.message !== "success"
        ? responseData.message
        : "Email or password is incorrect. Please try again.",
    };
  } catch {
    return { success: false, message: "Could not reach the server. Please try again." };
  }
}
