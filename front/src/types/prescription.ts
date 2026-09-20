export type Prescription = {
  id: string;
  medicineName: string;
  medicineForm: string | null;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string | null;
};

export type Medicine = {
  id: string;
  name: string;
  genericName: string | null;
  form: string | null;
};
