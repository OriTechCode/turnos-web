import { DateTime } from "luxon";

export function browserTz() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function fmtTimeRange(startIso: string, endIso: string) {
  const s = DateTime.fromISO(startIso, { setZone: true }).toFormat("HH:mm");
  const e = DateTime.fromISO(endIso, { setZone: true }).toFormat("HH:mm");
  return `${s} - ${e}`;
}

export function fmtDate(startIso: string) {
  return DateTime.fromISO(startIso, { setZone: true }).toFormat("dd/LL/yyyy");
}