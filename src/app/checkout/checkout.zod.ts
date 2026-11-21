import * as zod from "zod";

export const shippingAddressSchema = zod.object({
  city: zod.string().trim().min(2, "Please enter your city."),
  details: zod.string().trim().min(5, "Please enter your street address (at least 5 characters)."),
  phone: zod
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "Enter an 11-digit Egyptian mobile number starting with 010, 011, 012, or 015."),
});

export const checkoutSchema = shippingAddressSchema.extend({
  paymentMethod: zod.enum(["cash", "card"]),
});