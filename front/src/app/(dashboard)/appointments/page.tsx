"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppointments, useUpdateAppointmentStatus } from "@/hooks/use-appointments";
import { appointmentStatusLabels, AppointmentStatus } from "@/types/appointment";

const nextStatusOptions: Record<AppointmentStatus, AppointmentStatus[]> = {
    Pending: ["Confirmed", "Cancelled"],
    Confirmed: ["CheckedIn", "Cancelled", "NoShow"],
    CheckedIn: ["Completed"],
    Completed: [],
    Cancelled: [],
    NoShow: [],
};

const statusVariant: Record<AppointmentStatus, "default" | "secondary" | "destructive"> = {
    Pending: "secondary",
    Confirmed: "default",
    CheckedIn: "default",
    Completed: "secondary",
    Cancelled: "destructive",
    NoShow: "destructive",
};

export default function AppointmentsPage() {
    const { data: appointments, isLoading, isError } = useAppointments();
    const updateStatus = useUpdateAppointmentStatus();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">نوبت‌ها</h1>
                <Link href="/appointments/new">
                    <Button>
                        <Plus className="ml-2 h-4 w-4" />
                        رزرو نوبت جدید
                    </Button>
                </Link>
            </div>

            {isLoading && <p className="text-muted-foreground">در حال بارگذاری...</p>}
            {isError && <p className="text-destructive">خطا در دریافت نوبت‌ها.</p>}

            {appointments && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>بیمار</TableHead>
                            <TableHead>پزشک</TableHead>
                            <TableHead>کلینیک</TableHead>
                            <TableHead>تاریخ / ساعت</TableHead>
                            <TableHead>وضعیت</TableHead>
                            <TableHead className="w-24" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                    نوبتی ثبت نشده است.
                                </TableCell>
                            </TableRow>
                        ) : (
                            appointments.map((appt) => {
                                const nextOptions = nextStatusOptions[appt.status];
                                return (
                                    <TableRow key={appt.id}>
                                        <TableCell className="font-medium">{appt.patientName}</TableCell>
                                        <TableCell>{appt.doctorName}</TableCell>
                                        <TableCell>{appt.clinicName}</TableCell>
                                        <TableCell>
                                            {appt.date} — {appt.startTime.slice(0, 5)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={statusVariant[appt.status]}>
                                                {appointmentStatusLabels[appt.status]}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {nextOptions.length > 0 && (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline" size="sm">
                                                            تغییر وضعیت
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {nextOptions.map((status) => (
                                                            <DropdownMenuItem
                                                                key={status}
                                                                onClick={() =>
                                                                    updateStatus.mutate({ id: appt.id, status })
                                                                }
                                                            >
                                                                {appointmentStatusLabels[status]}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                            {appt.status === "CheckedIn" && (
                                                <Link href={`/appointments/${appt.id}/complete`}>
                                                    <Button size="sm" variant="secondary">
                                                        تکمیل ویزیت
                                                    </Button>
                                                </Link>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}