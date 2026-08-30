"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { usePatients } from "@/hooks/use-patients";

export default function PatientsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const { data, isLoading, isError } = usePatients(page, 10, search);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">بیماران</h1>
                <div className="relative w-64">
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="جستجوی نام..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1); // با تغییر جستجو، برگرد صفحهٔ اول
                        }}
                        className="pr-9"
                    />
                </div>
            </div>

            {isLoading && <p className="text-muted-foreground">در حال بارگذاری...</p>}
            {isError && <p className="text-destructive">خطا در دریافت لیست بیماران.</p>}

            {data && (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>نام</TableHead>
                                <TableHead>تاریخ تولد</TableHead>
                                <TableHead>جنسیت</TableHead>
                                <TableHead className="w-24" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                                        بیماری یافت نشد.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.items.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">
                                            {p.firstName} {p.lastName}
                                        </TableCell>
                                        <TableCell>{p.dateOfBirth}</TableCell>
                                        <TableCell>{p.gender}</TableCell>
                                        <TableCell>
                                            <Link href={`/patients/${p.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    مشاهده
                                                </Button>
                                            </Link>
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
        </div>
    );
}