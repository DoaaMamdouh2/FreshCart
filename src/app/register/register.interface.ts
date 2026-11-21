import * as zod from "zod";
import { registerSchema } from "./register.zod";

export type RegisterFormType = zod.infer<typeof registerSchema>

export interface RegisterResponseType {
  message: "success" | "Account Already Exists"
  statusMsg: "fail"
  user: User
  token: string
}

export interface User {
  name: string
  email: string
  role: string
}

