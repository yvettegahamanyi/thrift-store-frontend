import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string({
    required_error: "First name is required",
  }),
  lastName: z.string({
    required_error: "Last name is required",
  }),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string({
    required_error: "Address is required",
  }),
  role: z.string(),
  status: z.string(),
});

export type UserType = z.infer<typeof userSchema>;
