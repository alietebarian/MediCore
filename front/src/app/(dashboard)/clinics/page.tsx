"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useClinics } from "@/hooks/use-clinics";
import { ClinicFormDialog } from "@/components/clinics/clinic-form-dialog";
import { Clinic } from "@/types/clinic";

export default function ClinicsPage() {
    const [page, setPage] = useState(1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingClinic, setEditingClinic] = useState<Clinic | undefined>(undefined);

    const { data, isLoading, isError } = useClinics(page, 10);

    const handleAddNew = () => {
        setEditingClinic(undefined);
        setDialogOpen(true);
    };

    const handleEdit = (clinic: Clinic) => {
        setEditingClinic(clinic);
        setDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">کلینیک‌ها</h1>
                <Button onClick={handleAddNew}>
                    <Plus className="ml-2 h-4 w-4" />
                    افزودن کلینیک
                </Button>
            </div>

            {isLoading && <p className="text-muted-foreground">در حال بارگذاری...</p>}
            {isError && <p className="text-destructive">خطا در دریافت اطلاعات کلینیک‌ها.</p>}

            {data && (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>نام</TableHead>
                                <TableHead>آدرس</TableHead>
                                <TableHead>تماس</TableHead>
                                <TableHead>وضعیت</TableHead>
                                <TableHead className="w-16" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                                        هنوز کلینیکی ثبت نشده است.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.items.map((clinic) => (
                                    <TableRow key={clinic.id}>
                                        <TableCell className="font-medium">{clinic.name}</TableCell>
                                        <TableCell>{clinic.address}</TableCell>
                                        <TableCell>{clinic.phoneNumber}</TableCell>
                                        <TableCell>
                                            <Badge variant={clinic.isActive ? "default" : "secondary"}>
                                                {clinic.isActive ? "فعال" : "غیرفعال"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(clinic)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            صفحه {data.pageNumber} از {data.totalPages || 1}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page <= 1}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                قبلی
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page >= data.totalPages}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                بعدی
                            </Button>
                        </div>
                    </div>
                </>
            )}

            <ClinicFormDialog open={dialogOpen} onOpenChange={setDialogOpen} clinic={editingClinic} />
        </div>
    );
}