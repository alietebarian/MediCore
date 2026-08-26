// src/hooks/use-hydration.ts
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

export function useHasHydrated() {
  const [hydrated, setHydrated] = useState(() =>
    useAuthStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return unsubscribe;
  }, []);

  return hydrated;
}
