'use client'

import { Stethoscope } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { navItems } from './nav-items'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Sidebar() {
    const pathName = usePathname()


  return (
      <aside className="hidden w-64 flex-col border-l bg-card md:flex">
          <div className="flex h-16 items-center gap-2 border-b px-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Stethoscope className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold">MediCore</span>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {navItems.map((item) => {
                  const isActive = pathName === item.href;
                  return (
                      <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                              isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                      >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                      </Link>
                  );
              })}
          </nav>
      </aside>
  )
}
