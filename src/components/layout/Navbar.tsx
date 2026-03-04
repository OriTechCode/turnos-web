"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth/auth.store";

export function Navbar() {
  const router = useRouter();
  const me = useAuthStore((s) => s.me);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="border-b px-6 py-3 flex items-center justify-between">
      <div className="font-medium">Turnero</div>
      <div className="flex items-center gap-3 text-sm">
        <div className="text-gray-600">{me?.email} · {me?.role}</div>
        <button
          className="border rounded px-3 py-1"
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}