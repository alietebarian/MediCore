"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth";
import { useRegister } from "@/hooks/use-auth-mutations";

export default function RegisterPage() {
    const { mutate, isPending, error } = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (values: RegisterFormValues) => {
        mutate(values);
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-3 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">ساخت حساب بیمار</CardTitle>
                <CardDescription>برای رزرو نوبت و مشاهده سوابق پزشکی ثبت‌نام کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {error && (
                    <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        ثبت‌نام ناموفق بود. ممکن است این ایمیل قبلاً استفاده شده باشد.
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">نام</Label>
                            <Input id="firstName" {...register("firstName")} />
                            {errors.firstName && (
                                <p className="text-xs text-destructive">{errors.firstName.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">نام خانوادگی</Label>
                            <Input id="lastName" {...register("lastName")} />
                            {errors.lastName && (
                                <p className="text-xs text-destructive">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">ایمیل</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">تاریخ تولد</Label>
                            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                            {errors.dateOfBirth && (
                                <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">جنسیت</Label>
                            <select
                                id="gender"
                                {...register("gender")}
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="Male">مرد</option>
                                <option value="Female">زن</option>
                                <option value="Other">سایر</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">رمز عبور</Label>
                        <Input id="password" type="password" {...register("password")} />
                        {errors.password && (
                            <p className="text-xs text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
                        <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                        {errors.confirmPassword && (
                            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "در حال ثبت‌نام..." : "ثبت‌نام"}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    قبلاً حساب دارید؟{" "}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                        وارد شوید
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}