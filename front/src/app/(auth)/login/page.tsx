// src/app/(auth)/login/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { useLogin } from "@/hooks/use-auth-mutations";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { mutate, isPending, error } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (values: LoginFormValues) => {
        mutate(values);
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-3 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">ورود به MediCore</CardTitle>
                <CardDescription>برای دسترسی به پنل خود وارد شوید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {error && (
                    <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        ایمیل یا رمز عبور اشتباه است.
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">ایمیل</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">رمز عبور</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute inset-y-0 left-3 flex items-center text-muted-foreground"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "در حال ورود..." : "ورود"}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    حساب کاربری ندارید؟{" "}
                    <Link href="/register" className="font-medium text-primary hover:underline">
                        ثبت‌نام کنید
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}