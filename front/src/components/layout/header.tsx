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
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export default function Header() {
    
    const user = useAuthStore(s => s.user)
    const router = useRouter()
    const logout = useAuthStore((s) => s.logout);

    const handleLogout = () => {
        logout();
        router.push("/login");
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
                            <AvatarFallback>{user?.fullName?.charAt(0) ?? "?"}</AvatarFallback>
                        </Avatar>
                        <div className="text-right text-sm">
                            <p className="font-medium leading-none">{user?.fullName}</p>
                            <p className="text-xs text-muted-foreground">{user?.role}</p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>پروفایل</DropdownMenuItem>
                        <DropdownMenuItem>تنظیمات</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={handleLogout}>خروج</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
