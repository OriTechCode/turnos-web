import { api } from "@/lib/api/apiClient";
import type { JwtMe } from "@/types/auth";

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  const token = data.accessToken ?? data.token;
  if (!token) throw new Error("Login response sin accessToken/token");
  return token as string;
}

export async function getMe() {
  const { data } = await api.get<JwtMe>("/auth/me");
  return data;
}