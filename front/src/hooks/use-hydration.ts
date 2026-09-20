import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

export function useHasHydrated() {
  // عمداً با false شروع می‌شود: در رندرِ hydration، زوستند
  // getInitialState را برمی‌گرداند (token = null) و اگر همان‌جا true بدهیم،
  // گاردِ لِی‌اوت کاربرِ لاگین‌کرده را به /login می‌فرستد.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useAuthStore.persist?.onFinishHydration(() => {
      setHydrated(true);
    });

    // اگر hydration قبلاً (هنگام ساخته‌شدن استور) تمام شده باشد،
    // onFinishHydration دیگر صدا زده نمی‌شود.
    if (useAuthStore.persist?.hasHydrated() ?? true) {
      setHydrated(true);
    }

    return unsubscribe;
  }, []);

  return hydrated;
}
