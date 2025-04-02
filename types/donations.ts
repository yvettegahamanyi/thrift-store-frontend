import { User } from "./auth";
import { z } from "zod";
import { Product } from "./product";

export const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
export const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

export function formatDate(value: string): string {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export type Donation = {
  id: string;
  title: string;
  description: string;
  pickupDate: string;
  status: DonationStatus;
  pickupAddress: string;
  donor: User;
  products: Product[];
};

export enum DonationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const DonationSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  pickupDate: z
    .string({
      required_error: "Reported date is required",
    })
    .refine((value) => dateFormatRegex.test(value))
    .transform(formatDate),
  pickupAddress: z.string({
    required_error: "Pickup address is required",
  }),
});

export type DonationType = z.infer<typeof DonationSchema>;
