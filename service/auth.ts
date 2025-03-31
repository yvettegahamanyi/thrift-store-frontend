import api from "@/lib/axios";
import { useAuthStore } from "../store/authStore";
import { useQuery } from "@tanstack/react-query";

export const logout = async () => {
  useAuthStore.getState().logout();
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => await api.get("/user/me").then((res) => res.data),
  });
};
