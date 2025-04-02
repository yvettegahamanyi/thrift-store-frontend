import api from "@/lib/axios";
import { Order } from "@/types/orders";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: async () => await api.get("/order").then((res) => res.data.data),
  });
};

export const useGetOrderById = (id: string) => {
  return useQuery<Order, Error>({
    queryKey: ["order-id"],
    queryFn: async () =>
      await api.get(`/order/${id}`).then((res) => res.data.data),
  });
};
