export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type DayOfWeek = (typeof daysOfWeek)[number];

export const dayOfWeekLabels: Record<DayOfWeek, string> = {
  Saturday: "شنبه",
  Sunday: "یکشنبه",
  Monday: "دوشنبه",
  Tuesday: "سه‌شنبه",
  Wednesday: "چهارشنبه",
  Thursday: "پنجشنبه",
  Friday: "جمعه",
};

export type TimeSlot = {
  startTime: string; // "HH:mm:ss"
  endTime: string;
};
