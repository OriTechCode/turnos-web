"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { listMyAppointments, cancelAppointment } from "@/lib/api/appointments";
import type { MyAppointment } from "@/types/appointments";
import { browserTz, fmtDate, fmtTimeRange } from "@/lib/time/format";

export default function ClientAppointmentsPage() {
  const [tz, setTz] = useState(() => browserTz());

  const load = useMutation({
    mutationFn: () => listMyAppointments(tz),
  });

  const cancel = useMutation({
    mutationFn: (id: string) => cancelAppointment(id),
    onSuccess: () => load.mutate(),
  });

  const items = useMemo(() => (load.data ?? []) as MyAppointment[], [load.data]);

  return (
    <div className="space-y-4 max-w-3xl">
      <h1 className="text-xl font-semibold">Mis turnos</h1>

      <div className="flex gap-2 items-end flex-wrap">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">TZ</div>
          <input
            className="border rounded px-3 py-2 min-w-[320px]"
            value={tz}
            onChange={(e) => setTz(e.target.value)}
            placeholder="America/Argentina/Mendoza"
          />
        </div>

        <button
          className="border rounded px-3 py-2"
          onClick={() => load.mutate()}
          disabled={load.isPending}
        >
          {load.isPending ? "Cargando..." : "Buscar"}
        </button>
      </div>

      {load.isError && (
        <div className="text-sm text-red-600">{(load.error as Error).message}</div>
      )}

      <div className="border rounded-lg divide-y">
        {items.length === 0 && !load.isPending && (
          <div className="p-4 text-sm text-gray-500">No hay turnos.</div>
        )}

        {items.map((a) => {
          const disabled = a.status === "CANCELLED";
          return (
            <div key={a.id} className="p-4 flex items-center justify-between gap-4">
              <div className="text-sm">
                <div className="font-medium">
                  {fmtDate(a.start)} · {fmtTimeRange(a.start, a.end)}
                </div>
                <div className="text-gray-500">
                  status: <span className="font-medium">{a.status}</span> · tz: {a.timeZone}
                </div>
                <div className="text-gray-500">
                  providerId: {a.providerId} · serviceId: {a.serviceId}
                </div>
              </div>

              <button
                className="border rounded px-3 py-2 disabled:opacity-50"
                disabled={disabled || cancel.isPending}
                onClick={() => cancel.mutate(a.id)}
              >
                Cancelar
              </button>
            </div>
          );
        })}
      </div>

      {cancel.isError && (
        <div className="text-sm text-red-600">{(cancel.error as Error).message}</div>
      )}
    </div>
  );
}