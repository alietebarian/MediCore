export type Doctor = {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  specialtyId: string;
  specialtyName: string;
  licenseNumber: string;
  isActive: boolean;
};

export type StaffRole = "Receptionist" | "Nurse" | "Accountant";
