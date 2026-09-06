export type VitalSigns = {
  temperature: number | null;
  heartRate: number | null;
  bloodPressureSystolic: number | null;
  bloodPressureDiastolic: number | null;
  weightKg: number | null;
};

export type MedicalRecord = {
  id: string;
  appointmentId: string;
  doctorName: string;
  visitDate: string;
  symptoms: string;
  diagnosis: string;
  notes: string | null;
  vitalSigns: VitalSigns | null;
  createdAt: string;
};
