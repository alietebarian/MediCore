'use client'

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
    // این‌ها Mock Data هستن فقط برای نمایش UI — بعداً از یک Session/Context واقعی میان
    const mockUser = {
        fullName: "کاربر نمونه",
        role: "Doctor",
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
            <div />

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>{mockUser.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-right text-sm">
                            <p className="font-medium leading-none">{mockUser.fullName}</p>
                            <p className="text-xs text-muted-foreground">{mockUser.role}</p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>پروفایل</DropdownMenuItem>
                        <DropdownMenuItem>تنظیمات</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">خروج</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
