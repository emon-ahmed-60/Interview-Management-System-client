import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

let applicants = [];

export const useApplicants = () => {
  return useQuery({
    queryKey: ["applicants"],
    queryFn: async () => applicants,
  });
};

// Add new applicant
export const useAddApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newApplicant) => {
      // Initialize all fields
      applicants.push({
        _id: Date.now().toString(),
        name: newApplicant.name,
        email: newApplicant.email,
        phone: newApplicant.phone,
        position: newApplicant.position,
        status: "Pending",
        interviewDate: "",
        interviewTime: "",
        marks: "",
        comment: "",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applicants"]);
    },
  });
};

// Update any field
export const useUpdateApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }) => {
      applicants = applicants.map(app =>
        app._id === id ? { ...app, ...updates } : app
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applicants"]);
    },
  });
};

// Delete applicant
export const useDeleteApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      applicants = applicants.filter(app => app._id !== id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applicants"]);
    },
  });
};