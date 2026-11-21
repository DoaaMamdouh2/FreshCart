import * as zod from "zod";
import { checkoutSchema } from "./checkout.zod";

export type CheckoutFormType = zod.infer<typeof checkoutSchema>

export interface Address {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}

export interface AddressesResult {
  success: boolean
  message: string
  addresses: Address[]
}

export interface CheckoutResult {
  success: boolean
  message: string
  url?: string
}