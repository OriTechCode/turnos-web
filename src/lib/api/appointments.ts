import { api } from "@/lib/api/apiClient"

export async function createAppointment(input: {
  providerId: string
  serviceId: string
  startAtLocal: string
  tz?: string
}) {
  const { data } = await api.post("/appointments", input)
  return data
}