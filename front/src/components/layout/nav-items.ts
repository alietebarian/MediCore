import {
  Bell,
  CalendarDays,
  FileText,
  LayoutDashboard,
  LucideIcon,
  Pill,
  Receipt,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "داشبورد", href: "/dashboard", icon: LayoutDashboard },
  { label: "بیماران", href: "/patients", icon: Users },
  { label: "پزشکان", href: "/doctors", icon: Stethoscope },
  { label: "نوبت‌ها", href: "/appointments", icon: CalendarDays },
  { label: "پرونده‌های پزشکی", href: "/medical-records", icon: FileText },
  { label: "نسخه‌ها", href: "/prescriptions", icon: Pill },
  { label: "صورت‌حساب‌ها", href: "/invoices", icon: Receipt },
  { label: "اعلان‌ها", href: "/notifications", icon: Bell },
  { label: "تنظیمات", href: "/settings", icon: Settings },
];
