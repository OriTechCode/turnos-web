import { DateTime } from "luxon"

export function slotToLocalIso(slotStart: string, tz: string) {
  const dt = DateTime.fromISO(slotStart, { setZone: true }).setZone(tz)

  return dt.toFormat("yyyy-LL-dd'T'HH:mm:ss")
}