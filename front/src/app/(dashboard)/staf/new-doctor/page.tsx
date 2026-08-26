"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// این‌ها Mock Data هستن، فقط برای نمایش UI — بعداً از API واقعی میان
const mockSpecialties = [
    { id: "1", name: "قلب و عروق" },
    { id: "2", name: "پوست" },
    { id: "3", name: "اطفال" },
    { id: "4", name: "ارتوپدی" },
];

const mockClinics = [
    { id: "1", name: "کلینیک مرکزی" },
    { id: "2", name: "کلینیک شمال شهر" },
    { id: "3", name: "کلینیک غرب" },
];

export default function NewDoctorPage() {

    const [ selectedClinics, setSelectedClinics ] = useState<string[]>([])

    const toggleClinic = (clinicIc: string) => {
        setSelectedClinics((prev) => 
            prev.includes(clinicIc)
            ? prev.filter((id) => id !== clinicIc)
            : [...prev, clinicIc]
        )
    }

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
                  <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <Label htmlFor="fullName">نام و نام خانوادگی</Label>
                              <Input id="fullName" name="fullName" placeholder="دکتر رضا احمدی" />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="email">ایمیل</Label>
                              <Input id="email" name="email" type="email" placeholder="doctor@example.com" />
                          </div>
                      </div>

                      <div className="space-y-2">
                          <Label htmlFor="password">رمز عبور موقت</Label>
                          <Input id="password" name="password" type="password" placeholder="••••••••" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <Label htmlFor="specialty">تخصص</Label>
                              <select
                                  id="specialty"
                                  name="specialtyId"
                                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                              >
                                  {mockSpecialties.map((s) => (
                                      <option key={s.id} value={s.id}>
                                          {s.name}
                                      </option>
                                  ))}
                              </select>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="licenseNumber">شماره نظام پزشکی</Label>
                              <Input id="licenseNumber" name="licenseNumber" placeholder="123456" />
                          </div>
                      </div>

                      <div className="space-y-2">
                          <Label htmlFor="bio">بیوگرافی (اختیاری)</Label>
                          <Textarea id="bio" name="bio" placeholder="توضیح کوتاهی دربارهٔ سوابق پزشک..." />
                      </div>

                      <div className="space-y-3">
                          <Label>کلینیک‌های مرتبط</Label>
                          <div className="space-y-2 rounded-md border p-3">
                              {mockClinics.map((clinic) => (
                                  <div key={clinic.id} className="flex items-center gap-2">
                                      <Checkbox
                                          id={`clinic-${clinic.id}`}
                                          checked={selectedClinics.includes(clinic.id)}
                                          onCheckedChange={() => toggleClinic(clinic.id)}
                                      />
                                      <Label htmlFor={`clinic-${clinic.id}`} className="cursor-pointer font-normal">
                                          {clinic.name}
                                      </Label>
                                  </div>
                              ))}
                          </div>
                          {selectedClinics.length === 0 && (
                              <p className="text-xs text-muted-foreground">
                                  حداقل یک کلینیک باید انتخاب شود.
                              </p>
                          )}
                      </div>

                      <Button type="submit" className="w-full">
                          ساخت حساب پزشک
                      </Button>
                  </form>
              </CardContent>
          </Card>
      </div>
  )
}
