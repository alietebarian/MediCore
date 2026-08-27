"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createDoctorSchema, CreateDoctorFormValues } from "@/lib/validations/staff";
import { useCreateDoctor } from "@/hooks/use-staff";
import { useClinicOptions, useSpecialties } from "@/hooks/use-lookups";

export default function NewDoctorPage() {
    const router = useRouter();
    const { mutate, isPending, error } = useCreateDoctor();
    const { data: specialties, isLoading: loadingSpecialties } = useSpecialties();
    const { data: clinics, isLoading: loadingClinics } = useClinicOptions();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateDoctorFormValues>({
        resolver: zodResolver(createDoctorSchema),
        defaultValues: { clinicIds: [] },
    });

    const onSubmit = (values: CreateDoctorFormValues) => {
        mutate(values, {
            onSuccess: () => router.push("/staff"),
        });
    };

    return (
        <div className="mx-auto max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>افزودن پزشک جدید</CardTitle>
                    <CardDescription>
                        اطلاعات زیر برای ساخت حساب کاربری پزشک و افزودن او به کلینیک(ها) استفاده می‌شود.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {error && (
                        <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            خطا در ساخت حساب پزشک. ممکن است این ایمیل یا شماره نظام پزشکی تکراری باشد.
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">نام و نام خانوادگی</Label>
                                <Input id="fullName" {...register("fullName")} />
                                {errors.fullName && (
                                    <p className="text-xs text-destructive">{errors.fullName.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">ایمیل</Label>
                                <Input id="email" type="email" {...register("email")} />
                                {errors.email && (
                                    <p className="text-xs text-destructive">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">رمز عبور موقت</Label>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && (
                                <p className="text-xs text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="specialtyId">تخصص</Label>
                                <select
                                    id="specialtyId"
                                    {...register("specialtyId")}
                                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                                    disabled={loadingSpecialties}
                                >
                                    <option value="">{loadingSpecialties ? "در حال بارگذاری..." : "انتخاب کنید"}</option>
                                    {specialties?.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.specialtyId && (
                                    <p className="text-xs text-destructive">{errors.specialtyId.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="licenseNumber">شماره نظام پزشکی</Label>
                                <Input id="licenseNumber" {...register("licenseNumber")} />
                                {errors.licenseNumber && (
                                    <p className="text-xs text-destructive">{errors.licenseNumber.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label>کلینیک‌های مرتبط</Label>
                            <Controller
                                name="clinicIds"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2 rounded-md border p-3">
                                        {loadingClinics && (
                                            <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>
                                        )}
                                        {clinics?.map((clinic) => (
                                            <div key={clinic.id} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`clinic-${clinic.id}`}
                                                    checked={field.value.includes(clinic.id)}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(
                                                            checked
                                                                ? [...field.value, clinic.id]
                                                                : field.value.filter((id) => id !== clinic.id)
                                                        );
                                                    }}
                                                />
                                                <Label htmlFor={`clinic-${clinic.id}`} className="cursor-pointer font-normal">
                                                    {clinic.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                            {errors.clinicIds && (
                                <p className="text-xs text-destructive">{errors.clinicIds.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "در حال ساخت..." : "ساخت حساب پزشک"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}