// src/components/clinics/clinic-form-dialog.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clinicSchema, ClinicFormValues } from "@/lib/validations/clinic";
import { useCreateClinic, useUpdateClinic } from "@/hooks/use-clinics";
import { Clinic } from "@/types/clinic";

type ClinicFormDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    clinic?: Clinic; // اگه پر باشه یعنی حالت Edit، وگرنه Create
};

export function ClinicFormDialog({ open, onOpenChange, clinic }: ClinicFormDialogProps) {
    const isEditMode = Boolean(clinic);
    const createClinic = useCreateClinic();
    const updateClinic = useUpdateClinic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ClinicFormValues>({
        resolver: zodResolver(clinicSchema),
    });

    // وقتی Dialog برای Edit باز میشه، فیلدها رو با اطلاعات کلینیک فعلی پر کن
    useEffect(() => {
        if (clinic) {
            reset({
                name: clinic.name,
                address: clinic.address,
                phoneNumber: clinic.phoneNumber,
                email: clinic.email,
            });
        } else {
            reset({ name: "", address: "", phoneNumber: "", email: "" });
        }
    }, [clinic, reset]);

    const onSubmit = (values: ClinicFormValues) => {
        if (isEditMode && clinic) {
            updateClinic.mutate(
                { id: clinic.id, values: { ...values, isActive: clinic.isActive } },
                { onSuccess: () => onOpenChange(false) }
            );
        } else {
            createClinic.mutate(values, { onSuccess: () => onOpenChange(false) });
        }
    };

    const isPending = createClinic.isPending || updateClinic.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "ویرایش کلینیک" : "افزودن کلینیک جدید"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">نام کلینیک</Label>
                        <Input id="name" {...register("name")} />
                        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">آدرس</Label>
                        <Input id="address" {...register("address")} />
                        {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">شماره تماس</Label>
                        <Input id="phoneNumber" {...register("phoneNumber")} />
                        {errors.phoneNumber && (
                            <p className="text-xs text-destructive">{errors.phoneNumber.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">ایمیل</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "در حال ذخیره..." : isEditMode ? "ذخیره تغییرات" : "افزودن"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}