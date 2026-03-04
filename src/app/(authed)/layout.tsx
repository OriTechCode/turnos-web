"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { useAuthStore } from "@/lib/auth/auth.store";
import { getMe } from "@/lib/api/auth";

export default function AuthedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const me = useAuthStore((s) => s.me);
  const setMe = useAuthStore((s) => s.setMe);
  const logout = useAuthStore((s) => s.logout);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function boot() {
      if (!token) {
        router.replace("/login");
        return;
      }
      try {
        if (!me) setMe(await getMe());
      } catch {
        logout();
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }
    boot();
  }, [token, me, setMe, logout, router]);

  if (loading) return <div className="p-6">Cargando...</div>;
  if (!token) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}