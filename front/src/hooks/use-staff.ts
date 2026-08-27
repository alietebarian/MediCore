"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import {
  CreateDoctorFormValues,
  CreateClinicStaffFormValues,
} from "@/lib/validations/staff";

export function useCreateDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: CreateDoctorFormValues) => {
      await apiClient.post("/staff/doctors", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}

export function useCreateClinicStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: CreateClinicStaffFormValues) => {
      await apiClient.post("/staff/clinic-staff", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic-staff"] });
    },
  });
}
