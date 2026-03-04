export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export type MyAppointment = {
  id: string;
  providerId: string;
  serviceId: string;

  startAt: string; // UTC Z
  endAt: string;   // UTC Z
  createdAt: string;

  status: AppointmentStatus;

  // “vista” en tz solicitada
  start: string;   // ISO con offset
  end: string;     // ISO con offset
  timeZone: string;
};