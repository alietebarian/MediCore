"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Medicine, Prescription } from "@/types/prescription";

export function useMedicines() {
  return useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const { data } = await apiClient.get<Medicine[]>("/medicines");
      return data;
    },
  });
}

export function usePrescriptionsByMedicalRecord(medicalRecordId: string) {
  return useQuery({
    queryKey: ["prescriptions", medicalRecordId],
    queryFn: async () => {
      const { data } = await apiClient.get<Prescription[]>(
        `/prescriptions/medical-record/${medicalRecordId}`,
      );
      return data;
    },
    enabled: Boolean(medicalRecordId),
  });
}

export function useCreatePrescription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: {
      medicalRecordId: string;
      medicineId: string;
      dosage: string;
      frequency: string;
      duration: string;
      instructions?: string;
    }) => {
      const { data } = await apiClient.post<{ id: string }>(
        "/prescriptions",
        values,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
  });
}
