import { apiClient } from "@/lib/api-client";
import { Appointment, AppointmentStatus } from "@/types/appointment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type AppointmentFilters = {
  doctorId?: string;
  patientId?: string;
  date?: string;
};

export function useAppointments(filters: AppointmentFilters = {}) {
  return useQuery({
    queryKey: ["appointments", filters],
    queryFn: async () => {
      const { data } = await apiClient.get<Appointment[]>("/appointments", {
        params: filters,
      });
      return data;
    },
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: {
      doctorId: string;
      patientId: string;
      clinicId: string;
      date: string;
      startTime: string;
      endTime: string;
      notes?: string;
    }) => {
      const { data } = await apiClient.post<{ id: string }>(
        "/appointments",
        values,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
  });
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: AppointmentStatus;
    }) => {
      await apiClient.patch(
        `/appointments/${id}/status`,
        JSON.stringify(status),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
