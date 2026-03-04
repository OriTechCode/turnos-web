export type Slot = {
  startUtc: string
  endUtc: string
  start: string
  end: string
  timeZone: string
}

export type SlotsResponse = {
  providerId: string
  providerTimeZone: string
  clientTimeZone: string
  date: string
  serviceId: string
  slotMinutes: number
  slots: Slot[]
}