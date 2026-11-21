import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.email("Enter a valid email address."),
  password: zod.string().min(1, "Enter your password."),
});
