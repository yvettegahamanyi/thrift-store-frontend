import api from "@/lib/axios";
import { Donation } from "@/types/donations";
import { useQuery } from "@tanstack/react-query";

export const useGetDonations = () => {
  return useQuery<Donation[], Error>({
    queryKey: ["donations"],
    queryFn: async () =>
      await api.get("/donation").then((res) => res.data.data),
  });
};

export const useGetDonationById = (id: string) => {
  return useQuery<Donation, Error>({
    queryKey: ["donation-id"],
    queryFn: async () =>
      await api.get(`/donation/${id}`).then((res) => res.data.data),
  });
};
