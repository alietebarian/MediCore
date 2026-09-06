"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePatientDetail, useAddAllergy, useRemoveAllergy } from "@/hooks/use-patients";
import { useMedicalRecords } from "@/hooks/use-medical-records";

const allergySchema = z.object({
    allergyName: z.string().min(1, "نام آلرژی الزامی است"),
    severity: z.string().optional(),
    notes: z.string().optional(),
});
type AllergyFormValues = z.infer<typeof allergySchema>;

export default function PatientDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: patient, isLoading, isError } = usePatientDetail(id);
    const addAllergy = useAddAllergy(id);
    const removeAllergy = useRemoveAllergy(id);
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AllergyFormValues>({ resolver: zodResolver(allergySchema) });

    const { data: medicalRecords, isLoading: loadingRecords } = useMedicalRecords(id);

    const onSubmit = (values: AllergyFormValues) => {
        addAllergy.mutate(values, {
            onSuccess: () => {
                reset();
                setDialogOpen(false);
            },
        });
    };

    if (isLoading) return <p className="text-muted-foreground">در حال بارگذاری...</p>;
    if (isError || !patient) return <p className="text-destructive">بیمار یافت نشد.</p>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">
                    {patient.firstName} {patient.lastName}
                </h1>
                <p className="text-muted-foreground">
                    {patient.dateOfBirth} — {patient.gender}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>اطلاعات تماس اضطراری</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p>نام: {patient.emergencyContactName ?? "ثبت نشده"}</p>
                        <p>شماره تماس: {patient.emergencyContactPhone ?? "ثبت نشده"}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>آلرژی‌ها</CardTitle>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                    <Plus className="ml-2 h-4 w-4" />
                                    افزودن
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>افزودن آلرژی جدید</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="allergyName">نام آلرژی</Label>
                                        <Input id="allergyName" {...register("allergyName")} />
                                        {errors.allergyName && (
                                            <p className="text-xs text-destructive">{errors.allergyName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="severity">شدت (اختیاری)</Label>
                                        <Input id="severity" {...register("severity")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="notes">یادداشت (اختیاری)</Label>
                                        <Input id="notes" {...register("notes")} />
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" disabled={addAllergy.isPending}>
                                            {addAllergy.isPending ? "در حال ثبت..." : "افزودن"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {patient.allergies.length === 0 ? (
                            <p className="text-sm text-muted-foreground">آلرژی ثبت‌شده‌ای وجود ندارد.</p>
                        ) : (
                            patient.allergies.map((allergy) => (
                                <div
                                    key={allergy.id}
                                    className="flex items-center justify-between rounded-md border p-2"
                                >
                                    <div>
                                        <p className="text-sm font-medium">{allergy.allergyName}</p>
                                        {allergy.severity && (
                                            <Badge variant="secondary" className="mt-1">
                                                {allergy.severity}
                                            </Badge>
                                        )}
                                    </div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>حذف آلرژی</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    آیا از حذف `{allergy.allergyName}` مطمئن هستید؟
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>انصراف</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => removeAllergy.mutate(allergy.id)}>
                                                    حذف
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>تاریخچهٔ پزشکی</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {loadingRecords && <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>}
                        {medicalRecords?.length === 0 && (
                            <p className="text-sm text-muted-foreground">سابقهٔ پزشکی ثبت‌شده‌ای وجود ندارد.</p>
                        )}
                        {medicalRecords?.map((record) => (
                            <div key={record.id} className="rounded-md border p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">
                                        ویزیت {record.visitDate} — دکتر {record.doctorName}
                                    </p>
                                </div>
                                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                    <p><span className="text-muted-foreground">علائم:</span> {record.symptoms}</p>
                                    <p><span className="text-muted-foreground">تشخیص:</span> {record.diagnosis}</p>
                                </div>
                                {record.vitalSigns && (
                                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                                        {record.vitalSigns.temperature != null && <span>دما: {record.vitalSigns.temperature}°C</span>}
                                        {record.vitalSigns.heartRate != null && <span>ضربان قلب: {record.vitalSigns.heartRate}</span>}
                                        {record.vitalSigns.bloodPressureSystolic != null && (
                                            <span>
                                                فشار خون: {record.vitalSigns.bloodPressureSystolic}/{record.vitalSigns.bloodPressureDiastolic}
                                            </span>
                                        )}
                                        {record.vitalSigns.weightKg != null && <span>وزن: {record.vitalSigns.weightKg} kg</span>}
                                    </div>
                                )}
                                {record.notes && (
                                    <p className="mt-2 text-sm text-muted-foreground">یادداشت: {record.notes}</p>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}