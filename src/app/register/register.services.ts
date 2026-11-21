"use server"

import { RegisterFormType, RegisterResponseType } from "./register.interface";
import { registerSchema } from "./register.zod";

export async function signUpUser(data: RegisterFormType) {
    const parsed = registerSchema.safeParse(data);

    if (!parsed.success) {
        return { success: false, message: "Invalid data. Please check the form and try again." };
    }

    const { name, email, password, rePassword, phone } = parsed.data;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password, rePassword, phone })
        })
        const responseData: RegisterResponseType = await response.json();

        if (responseData.message === "success") {
            return { success: true, message: "Account created successfully." };
        }

        return { success: false, message: responseData.message || "Registration failed. Please try again." };
    } catch {
        return { success: false, message: "Could not reach the server. Please try again." };
    }
}
