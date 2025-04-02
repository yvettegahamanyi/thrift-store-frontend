import { boolean, string, z } from "zod";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  isActive: boolean;
  createdAt: string;
};
export type Cart = {
  id: string;
  userId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products: Product[];
};

export const productSchema = z.object({
  name: z.string({
    required_error: "Product name is required",
  }),
  description: z.string({
    required_error: "Product description is required",
  }),
  price: z
    .number()
    .nonnegative("Price must be a non-negative number")
    .multipleOf(0.01),
  donationId: z.string().optional(),
});

export type ProductType = z.infer<typeof productSchema>;
