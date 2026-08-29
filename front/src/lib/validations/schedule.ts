import { z } from "zod";
import { daysOfWeek } from "@/types/schedule";

export const createWorkingHourSchema = z.object({
  clinicId: z.string().min(1, "کلینیک را انتخاب کنید"),
  dayOfWeek: z.enum(daysOfWeek),
  startTime: z.string().min(1, "ساعت شروع الزامی است"),
  endTime: z.string().min(1, "ساعت پایان الزامی است"),
  slotDurationMinutes: z.coerce.number().min(5, "حداقل ۵ دقیقه").max(240),
});

export type CreateWorkingHourFormValues = z.infer<
  typeof createWorkingHourSchema
>;
