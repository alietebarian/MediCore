import { z } from "zod";

export const createDoctorSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  fullName: z.string().min(1, "نام الزامی است"),
  specialtyId: z.string().min(1, "تخصص را انتخاب کنید"),
  licenseNumber: z.string().min(1, "شماره نظام پزشکی الزامی است"),
  clinicIds: z.array(z.string()).min(1, "حداقل یک کلینیک باید انتخاب شود"),
});
export type CreateDoctorFormValues = z.infer<typeof createDoctorSchema>;

export const createClinicStaffSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  fullName: z.string().min(1, "نام الزامی است"),
  role: z.enum(["Receptionist", "Nurse", "Accountant"]),
  clinicId: z.string().min(1, "کلینیک را انتخاب کنید"),
});
export type CreateClinicStaffFormValues = z.infer<
  typeof createClinicStaffSchema
>;
