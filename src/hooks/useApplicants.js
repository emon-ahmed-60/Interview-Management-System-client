import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api/axios";

export const useApplicants = () => {
  return useQuery({
    queryKey: ["applicants"],
    queryFn: async () => {
      const res = await API.get("/applicants");
      return res.data;
    },
  });
};

export const useAddApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newApplicant) => {
      const res = await API.post("/applicants", newApplicant);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applicants"]);
    },
  });
};

export const useUpdateApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const res = await API.patch(`/applicants/${id}`, updates);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applicants"]);
    },
  });
};

export const useDeleteApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await API.delete(`/applicants/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applicants"]);
    },
  });
};
