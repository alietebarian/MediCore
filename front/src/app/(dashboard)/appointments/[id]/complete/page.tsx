"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateMedicalRecord } from "@/hooks/use-medical-records";
import { useMedicines, useCreatePrescription } from "@/hooks/use-prescriptions";
import { Plus, X } from "lucide-react";

type DraftPrescription = {
    medicineId: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
};

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

    const { data: medicines } = useMedicines();
    const createPrescription = useCreatePrescription();
    const [prescriptions, setPrescriptions] = useState<DraftPrescription[]>([]);
    const [draft, setDraft] = useState<DraftPrescription>({
        medicineId: "", dosage: "", frequency: "", duration: "", instructions: "",
    });

    const addDraftPrescription = () => {
        if (!draft.medicineId || !draft.dosage || !draft.frequency || !draft.duration) return;
        setPrescriptions((prev) => [...prev, draft]);
        setDraft({ medicineId: "", dosage: "", frequency: "", duration: "", instructions: "" });
    };

    const removeDraftPrescription = (index: number) => {
        setPrescriptions((prev) => prev.filter((_, i) => i !== index));
    };

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
            {
                onSuccess: async (data) => {
                    for (const rx of prescriptions) {
                        await createPrescription.mutateAsync({
                            medicalRecordId: data.id,
                            medicineId: rx.medicineId,
                            dosage: rx.dosage,
                            frequency: rx.frequency,
                            duration: rx.duration,
                            instructions: rx.instructions || undefined,
                        });
                    }
                    router.push("/appointments");
                },
            }
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

                    <div className="space-y-3 rounded-md border p-4">
                        <Label>نسخه (اختیاری)</Label>

                        {prescriptions.map((rx, i) => (
                            <div key={i} className="flex items-center justify-between rounded-md bg-muted/30 p-2 text-sm">
                                <span>
                                    {medicines?.find((m) => m.id === rx.medicineId)?.name} — {rx.dosage}, {rx.frequency}, {rx.duration}
                                </span>
                                <button type="button" onClick={() => removeDraftPrescription(i)}>
                                    <X className="h-4 w-4 text-destructive" />
                                </button>
                            </div>
                        ))}

                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={draft.medicineId}
                                onChange={(e) => setDraft({ ...draft, medicineId: e.target.value })}
                                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                            >
                                <option value="">انتخاب دارو</option>
                                {medicines?.map((m) => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                            <Input placeholder="دوز (مثلاً 500mg)" value={draft.dosage} onChange={(e) => setDraft({ ...draft, dosage: e.target.value })} />
                            <Input placeholder="تکرار (مثلاً هر ۸ ساعت)" value={draft.frequency} onChange={(e) => setDraft({ ...draft, frequency: e.target.value })} />
                            <Input placeholder="مدت (مثلاً ۷ روز)" value={draft.duration} onChange={(e) => setDraft({ ...draft, duration: e.target.value })} />
                        </div>
                        <Input placeholder="دستور مصرف (اختیاری)" value={draft.instructions} onChange={(e) => setDraft({ ...draft, instructions: e.target.value })} />

                        <Button type="button" variant="outline" size="sm" onClick={addDraftPrescription}>
                            <Plus className="ml-2 h-4 w-4" />
                            افزودن به لیست نسخه
                        </Button>
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