"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { CreateWorkingHourFormValues } from "@/lib/validations/schedule";
import { TimeSlot } from "@/types/schedule";

export function useCreateWorkingHour(doctorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: CreateWorkingHourFormValues) => {
      const { data } = await apiClient.post<{ id: string }>(
        "/doctors/working-hours",
        {
          doctorId,
          ...values,
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["available-slots", doctorId],
      });
    },
  });
}

export function useAvailableSlots(
  doctorId: string,
  clinicId: string,
  date: string,
) {
  return useQuery({
    queryKey: ["available-slots", doctorId, clinicId, date],
    queryFn: async () => {
      const { data } = await apiClient.get<TimeSlot[]>(
        `/doctors/${doctorId}/available-slots`,
        { params: { clinicId, date } },
      );
      return data;
    },
    enabled: Boolean(doctorId && clinicId && date),
  });
}
