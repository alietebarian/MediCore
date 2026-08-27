import { z } from "zod";

export const clinicSchema = z.object({
  name: z.string().min(1, "نام کلینیک الزامی است"),
  address: z.string().min(1, "آدرس الزامی است"),
  phoneNumber: z.string().min(1, "شماره تماس الزامی است"),
  email: z.string().email("ایمیل معتبر نیست"),
});

export type ClinicFormValues = z.infer<typeof clinicSchema>;
