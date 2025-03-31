import api from "@/lib/axios";
import { User } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => await api.get("/user").then((res) => res.data.data),
  });
};

export const useGetUsersById = (id: string) => {
  return useQuery({
    queryKey: ["user-id"],
    queryFn: async () => await api.get(`/user/${id}`).then((res) => res.data),
  });
};
