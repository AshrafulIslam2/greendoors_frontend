import { object, string } from "zod";
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),

  password: string({ required_error: "Password is required" })
    .min(1, "password required")
    .min(6, "password must be more than 8 characters")
    .max(32, "password must be less than 32 characters"),
});
