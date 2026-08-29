import { DayOfWeek } from "@/types/schedule";

const dayIndexMap: Record<DayOfWeek, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export function getNextDateForDayOfWeek(dayOfWeek: DayOfWeek): Date {
  const targetDayIndex = dayIndexMap[dayOfWeek];
  const today = new Date();
  const todayIndex = today.getDay();

  let daysToAdd = targetDayIndex - todayIndex;
  if (daysToAdd < 0) daysToAdd += 7;

  const result = new Date(today);
  result.setDate(today.getDate() + daysToAdd);
  return result;
}

export function formatDateFa(date: Date): string {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
