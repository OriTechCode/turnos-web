"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, getMe } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/auth/auth.store";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);
  const setMe = useAuthStore((s) => s.setMe);

  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    const token = await login(values.email, values.password);
    setToken(token);

    const me = await getMe();
    setMe(me);

    const target =
      me.role === "ADMIN"
        ? "/admin/providers"
        : me.role === "PROVIDER"
          ? "/provider/agenda"
          : "/client/booking";

    router.replace(target);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm border rounded-lg p-6 space-y-4">
        <div className="text-lg font-semibold">Login</div>

        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <input className="w-full border rounded px-3 py-2" placeholder="Email" {...form.register("email")} />
          <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" {...form.register("password")} />
          <button className="w-full border rounded px-3 py-2" type="submit" disabled={form.formState.isSubmitting}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}