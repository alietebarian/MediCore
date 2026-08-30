export type PatientListItem = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
};

export type Allergy = {
  id: string;
  allergyName: string;
  severity: string | null;
  notes: string | null;
};

export type PatientDetail = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  allergies: Allergy[];
};

export type PaginatedPatients = {
  items: PatientListItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};
