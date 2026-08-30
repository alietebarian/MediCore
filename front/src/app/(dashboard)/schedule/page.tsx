"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createWorkingHourSchema, CreateWorkingHourFormValues } from "@/lib/validations/schedule";
import { useCreateWorkingHour, useAvailableSlots } from "@/hooks/use-schedule";
import { useClinicOptions } from "@/hooks/use-lookups";
import { daysOfWeek, dayOfWeekLabels } from "@/types/schedule";
import { formatDateFa, getNextDateForDayOfWeek } from "@/lib/date-utils";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useMyDoctorProfle } from "@/hooks/use-my-doctor-profile";

export default function SchedulePage() {
    const { data: myProfile, isLoading: loadingProfile, isError: profileError } = useMyDoctorProfle()
    const doctorId = myProfile?.id ?? ""

    const { data: clinics } = useClinicOptions();
    const { mutate, isPending, error } = useCreateWorkingHour(doctorId);

    const [previewClinicId, setPreviewClinicId] = useState("");
    const [previewDate, setPreviewDate] = useState("");

    const { data: slots, isLoading: loadingSlots } = useAvailableSlots(
        doctorId,
        previewClinicId,
        previewDate
    );

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<CreateWorkingHourFormValues>({
        resolver: zodResolver(createWorkingHourSchema),
        defaultValues: { slotDurationMinutes: 30, dayOfWeek: "Saturday" },
    });

    const onSubmit = (values: CreateWorkingHourFormValues) => {
        mutate(values, { onSuccess: () => reset() });
    };

    const selectedDayOfWeek = watch("dayOfWeek");
    const previewNextDate = selectedDayOfWeek
        ? formatDateFa(getNextDateForDayOfWeek(selectedDayOfWeek))
        : null;

    if (loadingProfile) {
        return <p className="text-muted-foreground">در حال بارگذاری پروفایل...</p>;
    }

    if (profileError || !myProfile) {
        return (
            <p className="text-destructive">
                پروفایل پزشک برای این حساب کاربری یافت نشد. لطفاً با یک حساب Doctor وارد شوید.
            </p>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>افزودن برنامهٔ کاری</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            خطا در ثبت برنامهٔ کاری. ممکن است برای این روز و کلینیک قبلاً ثبت شده باشد.
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="clinicId">کلینیک</Label>
                            <select
                                id="clinicId"
                                {...register("clinicId")}
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="">انتخاب کنید</option>
                                {clinics?.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.clinicId && (
                                <p className="text-xs text-destructive">{errors.clinicId.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dayOfWeek">روز هفته</Label>
                            <select
                                id="dayOfWeek"
                                {...register("dayOfWeek")}
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                            >
                                {daysOfWeek.map((day) => (
                                    <option key={day} value={day}>
                                        {dayOfWeekLabels[day]}
                                    </option>
                                ))}
                            </select>
                            {previewNextDate && (
                                <p className="text-xs text-muted-foreground">
                                    نزدیک‌ترین تاریخ: {previewNextDate}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startTime">ساعت شروع</Label>
                                <Input id="startTime" type="time" step="1" {...register("startTime")} />
                                {errors.startTime && (
                                    <p className="text-xs text-destructive">{errors.startTime.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime">ساعت پایان</Label>
                                <Input id="endTime" type="time" step="1" {...register("endTime")} />
                                {errors.endTime && (
                                    <p className="text-xs text-destructive">{errors.endTime.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slotDurationMinutes">مدت هر نوبت (دقیقه)</Label>
                            <Input
                                id="slotDurationMinutes"
                                type="number"
                                {...register("slotDurationMinutes")}
                            />
                            {errors.slotDurationMinutes && (
                                <p className="text-xs text-destructive">{errors.slotDurationMinutes.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "در حال ثبت..." : "افزودن برنامه"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>پیش‌نمایش نوبت‌های خالی</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="previewClinic">کلینیک</Label>
                            <select
                                id="previewClinic"
                                value={previewClinicId}
                                onChange={(e) => setPreviewClinicId(e.target.value)}
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
                            <Label htmlFor="previewDate">تاریخ</Label>
                            <DatePicker
                                calendar={persian}
                                locale={persian_fa}
                                value={previewDate ? new Date(previewDate) : null}
                                onChange={(dateObject: DateObject | null) => {
                                    if (dateObject) {
                                        const gregorianDate = dateObject.toDate();
                                        const isoDate = gregorianDate.toISOString().split("T")[0];
                                        setPreviewDate(isoDate);
                                    } else {
                                        setPreviewDate("");
                                    }
                                }}
                                inputClass="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                                containerClassName="w-full"
                            />
                        </div>
                    </div>

                    {loadingSlots && <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>}

                    {slots && (
                        <div className="grid grid-cols-3 gap-2">
                            {slots.length === 0 ? (
                                <p className="col-span-3 text-sm text-muted-foreground">
                                    نوبت خالی برای این تاریخ وجود ندارد.
                                </p>
                            ) : (
                                slots.map((slot, i) => (
                                    <div
                                        key={i}
                                        className="rounded-md border bg-muted/30 px-2 py-1.5 text-center text-sm"
                                    >
                                        {slot.startTime.slice(0, 5)}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}