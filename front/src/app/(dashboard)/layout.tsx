"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { useAuthStore } from "@/store/auth-store";
import { useHasHydrated } from "@/hooks/use-hydration";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const token = useAuthStore((s) => s.token);
    const hasHydrated = useHasHydrated();

    useEffect(() => {
        if (hasHydrated && !token) {
            router.replace("/login");
        }
    }, [hasHydrated, token, router]);

    if (!hasHydrated || !token) {
        return null;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 overflow-y-auto bg-muted/30 p-6">{children}</main>
            </div>
        </div>
    );
}