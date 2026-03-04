"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth/auth.store";
import type { Role } from "@/types/auth";

export function RoleGuard({ allow, children }: { allow: Role[]; children: React.ReactNode }) {
  const router = useRouter();
  const me = useAuthStore((s) => s.me);

  useEffect(() => {
    if (!me) return;
    if (!allow.includes(me.role)) {
      const target =
        me.role === "ADMIN"
          ? "/admin/providers"
          : me.role === "PROVIDER"
            ? "/provider/agenda"
            : "/client/booking";
      router.replace(target);
    }
  }, [me, allow, router]);

  if (!me) return null;
  if (!allow.includes(me.role)) return null;
  return <>{children}</>;
}