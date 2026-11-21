import * as zod from "zod";

export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordMessage = "Use at least 8 characters with uppercase and lowercase letters, a number, and a symbol (@$!%*?&).";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .min(2, "Enter your first and last name.")
      .regex(/^[A-Za-z]+( [A-Za-z]+)+$/, "Use English letters and include both your first and last name."),
    email: zod.email("Enter a valid email address."),
    password: zod.string().regex(passwordPattern, passwordMessage),
    rePassword: zod.string().regex(passwordPattern, passwordMessage),
    phone: zod.string().regex(/^01[0125][0-9]{8}$/, "Enter an 11-digit Egyptian mobile number starting with 010, 011, 012, or 015."),
    terms: zod.boolean().refine((accepted) => accepted, "Please accept the Terms of Service and Privacy Policy."),
  })
  .refine((values) => values.password === values.rePassword, {
    path: ["rePassword"],
    message: "Your passwords do not match.",
  });