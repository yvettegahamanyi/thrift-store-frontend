import { User } from "./auth";
import { Product } from "./product";
import { z } from "zod";

export type Order = {
  id: string;
  status: OrderStatus;
  refNumber: string;
  totalAmount: number;
  shippingAddress: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  products: Product[];
};

export enum OrderStatus {
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export const OrderSchema = z.object({
  shippingAddress: z.string({
    required_error: "Shipping address is required",
  }),
  paymentNumber: z.string({
    required_error: "Payment number is required",
  }),
  cartId: z.string().optional(),
});

export type OrderType = z.infer<typeof OrderSchema>;
