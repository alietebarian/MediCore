"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { PaginatedPatients, PatientDetail } from "@/types/patient";

export function usePatients(pageNumber = 1, pageSize = 10, search = "") {
  return useQuery({
    queryKey: ["patients", pageNumber, pageSize, search],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedPatients>("/patients", {
        params: { pageNumber, pageSize, search: search || undefined },
      });
      return data;
    },
  });
}

export function usePatientDetail(patientId: string) {
  return useQuery({
    queryKey: ["patients", patientId],
    queryFn: async () => {
      const { data } = await apiClient.get<PatientDetail>(
        `/patients/${patientId}`,
      );
      return data;
    },
    enabled: Boolean(patientId),
  });
}

export function useAddAllergy(patientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: {
      allergyName: string;
      severity?: string;
      notes?: string;
    }) => {
      await apiClient.post(`/patients/${patientId}/allergies`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients", patientId] });
    },
  });
}

export function useRemoveAllergy(patientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (allergyId: string) => {
      await apiClient.delete(`/patients/allergies/${allergyId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients", patientId] });
    },
  });
}
