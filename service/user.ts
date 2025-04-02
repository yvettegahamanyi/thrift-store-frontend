import api from "@/lib/axios";
import { User } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (searchQuery?: string) => {
  return useQuery<User[], Error>({
    queryKey: ["users", searchQuery],
    queryFn: async () =>
      await api
        .get(`/user${searchQuery ? `?searchKey=${searchQuery}` : ""}`)
        .then((res) => res.data.data),
  });
};

export const useGetUsersStats = () => {
  return useQuery<any, Error>({
    queryKey: ["user-stats"],
    queryFn: async () =>
      await api.get(`/statistics/admin`).then((res) => res.data),
  });
};

export const useGetDonorStats = () => {
  return useQuery<any, Error>({
    queryKey: ["donor-stats"],
    queryFn: async () =>
      await api.get(`/statistics/donor`).then((res) => res.data),
  });
};

export const useGetUsersById = (id: string) => {
  return useQuery({
    queryKey: ["user-id", id],
    queryFn: async () => await api.get(`/user/${id}`).then((res) => res.data),
  });
};
