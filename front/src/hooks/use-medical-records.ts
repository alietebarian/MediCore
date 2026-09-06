"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { MedicalRecord } from "@/types/medical-record";

export function useMedicalRecords(patientId: string) {
  return useQuery({
    queryKey: ["medical-records", patientId],
    queryFn: async () => {
      const { data } = await apiClient.get<MedicalRecord[]>(
        `/patients/${patientId}/medical-records`,
      );
      return data;
    },
    enabled: Boolean(patientId),
  });
}

export function useCreateMedicalRecord() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: {
      appointmentId: string;
      symptoms: string;
      diagnosis: string;
      notes?: string;
      vitalSigns?: {
        temperature?: number;
        heartRate?: number;
        bloodPressureSystolic?: number;
        bloodPressureDiastolic?: number;
        weightKg?: number;
      };
    }) => {
      const { data } = await apiClient.post<{ id: string }>(
        "/medical-records",
        values,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medical-records"] });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
