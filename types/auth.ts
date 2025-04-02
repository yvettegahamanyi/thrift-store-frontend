import { z } from "zod";

export const LoginPayloadSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

export type LoginPayload = z.infer<typeof LoginPayloadSchema>;

export const SignUpPayloadSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(6, {
        message: "Confirm password must be at least 6 characters long",
      }),
    role: z.string().min(1, {
      message: "Role is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpPayload = z.infer<typeof SignUpPayloadSchema>;

export enum Role {
  CUSTOMER = "CUSTOMER",
  DONOR = "DONOR",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  address: string;
  phoneNumber: string;
  createdAt: string;
  status: UserStatus;
};
