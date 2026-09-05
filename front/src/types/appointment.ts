export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "CheckedIn"
  | "Completed"
  | "Cancelled"
  | "NoShow";

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  Pending: "در انتظار تأیید",
  Confirmed: "تأیید شده",
  CheckedIn: "حضور یافته",
  Completed: "انجام شده",
  Cancelled: "لغو شده",
  NoShow: "عدم حضور",
};

export type Appointment = {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  clinicId: string;
  clinicName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes: string | null;
};