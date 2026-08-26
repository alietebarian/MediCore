import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "نام الزامی است"),
    lastName: z.string().min(1, "نام خانوادگی الزامی است"),
    email: z.string().email("ایمیل معتبر نیست"),
    dateOfBirth: z.string().min(1, "تاریخ تولد الزامی است"),
    gender: z.enum(["Male", "Female", "Other"]),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;