"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateMedicalRecord } from "@/hooks/use-medical-records";

export default function CompleteVisitPage() {
    const { id: appointmentId } = useParams<{ id: string }>();
    const router = useRouter();
    const { mutate, isPending, error } = useCreateMedicalRecord();

    const [symptoms, setSymptoms] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [notes, setNotes] = useState("");
    const [temperature, setTemperature] = useState("");
    const [heartRate, setHeartRate] = useState("");
    const [bpSystolic, setBpSystolic] = useState("");
    const [bpDiastolic, setBpDiastolic] = useState("");
    const [weightKg, setWeightKg] = useState("");

    const onSubmit = () => {
        mutate(
            {
                appointmentId,
                symptoms,
                diagnosis,
                notes: notes || undefined,
                vitalSigns: {
                    temperature: temperature ? Number(temperature) : undefined,
                    heartRate: heartRate ? Number(heartRate) : undefined,
                    bloodPressureSystolic: bpSystolic ? Number(bpSystolic) : undefined,
                    bloodPressureDiastolic: bpDiastolic ? Number(bpDiastolic) : undefined,
                    weightKg: weightKg ? Number(weightKg) : undefined,
                },
            },
            { onSuccess: () => router.push("/appointments") }
        );
    };

    return (
        <div className="mx-auto max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>تکمیل ویزیت</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            خطا در ثبت پروندهٔ پزشکی. ممکن است این نوبت از قبل تکمیل شده باشد.
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="symptoms">علائم</Label>
                        <Textarea id="symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="diagnosis">تشخیص</Label>
                        <Textarea id="diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="temperature">دما (°C)</Label>
                            <Input id="temperature" type="number" step="0.1" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heartRate">ضربان قلب</Label>
                            <Input id="heartRate" type="number" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bpSystolic">فشار خون (سیستولیک)</Label>
                            <Input id="bpSystolic" type="number" value={bpSystolic} onChange={(e) => setBpSystolic(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bpDiastolic">فشار خون (دیاستولیک)</Label>
                            <Input id="bpDiastolic" type="number" value={bpDiastolic} onChange={(e) => setBpDiastolic(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weightKg">وزن (kg)</Label>
                            <Input id="weightKg" type="number" step="0.1" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">یادداشت (اختیاری)</Label>
                        <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>

                    <Button
                        className="w-full"
                        disabled={!symptoms || !diagnosis || isPending}
                        onClick={onSubmit}
                    >
                        {isPending ? "در حال ثبت..." : "تکمیل ویزیت و ثبت پرونده"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}