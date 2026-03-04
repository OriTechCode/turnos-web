import { api } from "@/lib/api/apiClient"
import type { MyAppointment } from "@/types/appointments";

export async function createAppointment(input: {
  providerId: string
  serviceId: string
  startAtLocal: string
  tz?: string
}) {
  const { data } = await api.post("/appointments", input)
  return data
}

export async function listMyAppointments(tz: string) {
  const { data } = await api.get<MyAppointment[]>("/appointments/me", { params: { tz } });
  return data;
}

export async function cancelAppointment(id: string) {
  const { data } = await api.patch(`/appointments/${id}/cancel`);
  return data;
}