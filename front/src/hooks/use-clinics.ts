"use client";

import { apiClient } from "@/lib/api-client";
import { ClinicFormValues } from "@/lib/validations/clinic";
import { Clinic, PaginatedResult } from "@/types/clinic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useClinics(pageNumber = 1, pageSize = 10) {
  return useQuery({
    queryKey: ["clinics", pageNumber, pageSize],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResult<Clinic>>(
        "/clinics",
        {
          params: { pageNumber, pageSize },
        },
      );
      return data;
    },
  });
}

export function useCreateClinic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ClinicFormValues) => {
      const { data } = await apiClient.post<{ id: string }>("/clinics", values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
    },
  });
}

export function useUpdateClinic(){
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: async ({
        id,
        values,
      }: {
        id: string;
        values: ClinicFormValues & { isActive: boolean };
      }) => {
        await apiClient.put(`/clinics/${id}`, { id, ...values });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["clinics"] });
      },
    });
}