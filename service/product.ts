import api from "@/lib/axios";
import { Cart, Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => await api.get("/product").then((res) => res.data.data),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product-id", id],
    queryFn: async () =>
      await api.get(`/product/${id}`).then((res) => res.data.data),
  });
};

export const useGetActiveUserCart = () => {
  return useQuery<Cart, Error>({
    queryKey: ["user-cart"],
    queryFn: async () =>
      await api.get(`/cart/getUserCart`).then((res) => res.data.data),
  });
};
