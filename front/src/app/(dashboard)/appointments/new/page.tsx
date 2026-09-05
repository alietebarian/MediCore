"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClinicOptions } from "@/hooks/use-lookups";
import { usePatients } from "@/hooks/use-patients";
import { useAvailableSlots } from "@/hooks/use-schedule";
import { useCreateAppointment } from "@/hooks/use-appointments";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

type DoctorOption = { id: string; name: string };

export default function NewAppointmentPage() {
    const router = useRouter();
    const { data: clinics } = useClinicOptions();
    const { data: patientsResult } = usePatients(1, 100);

    const [doctorId, setDoctorId] = useState("");
    const [clinicId, setClinicId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [date, setDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState<{ startTime: string; endTime: string } | null>(null);
    const [notes, setNotes] = useState("");

    const { data: slots, isLoading: loadingSlots } = useAvailableSlots(doctorId, clinicId, date);
    const { mutate, isPending, error } = useCreateAppointment();

    const onSubmit = () => {
        if (!doctorId || !clinicId || !patientId || !date || !selectedSlot) return;

        mutate(
            {
                doctorId,
                clinicId,
                patientId,
                date,
                startTime: selectedSlot.startTime,
                endTime: selectedSlot.endTime,
                notes: notes || undefined,
            },
            { onSuccess: () => router.push("/appointments") }
        );
    };

    return (
        <div className="mx-auto max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>رزرو نوبت جدید</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            خطا در رزرو نوبت. ممکن است این زمان دیگر در دسترس نباشد.
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="patient">بیمار</Label>
                        <select
                            id="patient"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                        >
                            <option value="">انتخاب کنید</option>
                            {patientsResult?.items.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.firstName} {p.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clinic">کلینیک</Label>
                            <select
                                id="clinic"
                                value={clinicId}
                                onChange={(e) => setClinicId(e.target.value)}
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="">انتخاب کنید</option>
                                {clinics?.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="doctorId">شناسهٔ پزشک (موقت)</Label>
                            {/* TODO: جایگزینی با یک Dropdown واقعی وقتی GetDoctorsQuery ساخته بشه */}
                            <input
                                id="doctorId"
                                value={doctorId}
                                onChange={(e) => setDoctorId(e.target.value)}
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                                placeholder="Doctor Id را موقتاً دستی وارد کنید"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>تاریخ</Label>
                        <DatePicker
                            calendar={persian}
                            locale={persian_fa}
                            value={date ? new Date(date) : null}
                            onChange={(d: DateObject | null) => {
                                setSelectedSlot(null);
                                setDate(d ? d.toDate().toISOString().split("T")[0] : "");
                            }}
                            inputClass="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                            containerClassName="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>زمان‌های خالی</Label>
                        {loadingSlots && <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>}
                        {slots && (
                            <div className="grid grid-cols-4 gap-2">
                                {slots.length === 0 ? (
                                    <p className="col-span-4 text-sm text-muted-foreground">
                                        زمان خالی برای این روز وجود ندارد.
                                    </p>
                                ) : (
                                    slots.map((slot, i) => {
                                        const isSelected =
                                            selectedSlot?.startTime === slot.startTime;
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`rounded-md border px-2 py-1.5 text-sm transition-colors ${isSelected
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted/30 hover:bg-muted"
                                                    }`}
                                            >
                                                {slot.startTime.slice(0, 5)}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">یادداشت (اختیاری)</Label>
                        <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>

                    <Button
                        className="w-full"
                        disabled={!selectedSlot || isPending}
                        onClick={onSubmit}
                    >
                        {isPending ? "در حال ثبت..." : "رزرو نوبت"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}