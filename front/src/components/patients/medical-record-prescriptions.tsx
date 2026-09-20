"use client";

import { usePrescriptionsByMedicalRecord } from "@/hooks/use-prescriptions";

export function MedicalRecordPrescriptions({ medicalRecordId }: { medicalRecordId: string }) {
    const { data: prescriptions, isLoading } = usePrescriptionsByMedicalRecord(medicalRecordId);

    if (isLoading) return null;
    if (!prescriptions || prescriptions.length === 0) return null;

    return (
        <div className="mt-3 space-y-1 border-t pt-2">
            <p className="text-xs font-medium text-muted-foreground">نسخه‌های تجویزشده:</p>
            {prescriptions.map((rx) => (
                <div key={rx.id} className="text-xs">
                    <span className="font-medium">{rx.medicineName}</span>
                    {rx.medicineForm && <span className="text-muted-foreground"> ({rx.medicineForm})</span>}
                    {" — "}
                    {rx.dosage}, {rx.frequency}, {rx.duration}
                    {rx.instructions && <span className="text-muted-foreground"> — {rx.instructions}</span>}
                </div>
            ))}
        </div>
    );
}