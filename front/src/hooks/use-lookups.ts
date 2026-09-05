"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Specialty, ClinicOption } from "@/types/lookup";
import { PaginatedResult } from "@/types/clinic";

export function useSpecialties() {
  return useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      const { data } = await apiClient.get<Specialty[]>("/specialties");
      return data;
    },
  });
}

export function useClinicOptions() {
  return useQuery({
    queryKey: ["clinics", "options"],
    queryFn: async () => {
      // چون /api/clinics صفحه‌بندی‌شده‌ست، برای Dropdown یک صفحهٔ بزرگ می‌گیریم
      // (راه‌حل درست‌تر بلندمدت: یک Endpoint جدا بدون Pagination، ولی فعلاً کافیه)
      const { data } = await apiClient.get<PaginatedResult<ClinicOption>>(
        "/clinics",
        {
          params: { pageNumber: 1, pageSize: 100 },
        },
      );
      return data.items;
    },
  });
}

export function useDoctorOptions(clinicId?: string) {
  return useQuery({
    queryKey: ["doctors", "options", clinicId],
    queryFn: async () => {
      const { data } = await apiClient.get<
        { id: string; fullName: string; specialtyName: string }[]
      >("/doctors", { params: clinicId ? { clinicId } : {} });
      return data;
    },
    enabled: Boolean(clinicId),
  });
}
