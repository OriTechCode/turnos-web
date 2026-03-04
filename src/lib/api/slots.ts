import { api } from "@/lib/api/apiClient"
import type { SlotsResponse } from "@/types/slots"

export async function getProviderSlots(params: {
  providerId: string
  serviceId: string
  date: string
  tz?: string
}) {
  const { providerId, ...query } = params

  const { data } = await api.get<SlotsResponse>(
    `/providers/${providerId}/slots`,
    { params: query }
  )

  return data
}