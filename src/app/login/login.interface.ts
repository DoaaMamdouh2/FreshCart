import type * as zod from "zod";
import { loginSchema } from "./login.zod";

export type LoginFormType = zod.infer<typeof loginSchema>;

export interface LoginUser {
  name: string;
  email: string;
  role: string;
}

export interface LoginResponseType {
  message: string;
  statusMsg?: string;
  token?: string;
  user?: LoginUser;
}

export interface LoginActionResult {
  success: boolean;
  message: string;
  token?: string;
}
