"use client"

import { useState } from "react"
import { getProviderSlots } from "@/lib/api/slots"
import { createAppointment } from "@/lib/api/appointments"
import { slotToLocalIso } from "@/lib/time/appointments"

export default function BookingPage() {
  const [providerId, setProviderId] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [date, setDate] = useState("")
  const [tz, setTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

  const [slots, setSlots] = useState<any[]>([])

  async function search() {
    const data = await getProviderSlots({
      providerId,
      serviceId,
      date,
      tz,
    })

    setSlots(data.slots)
  }

  async function book(slot: any) {
    const startAtLocal = slotToLocalIso(slot.start, tz)

    await createAppointment({
      providerId,
      serviceId,
      startAtLocal,
      tz,
    })

    alert("Turno reservado")
  }

  return (
    <div className="space-y-6 max-w-xl">

      <h1 className="text-xl font-semibold">
        Booking
      </h1>

      <input
        className="border p-2 w-full"
        placeholder="providerId"
        value={providerId}
        onChange={(e)=>setProviderId(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="serviceId"
        value={serviceId}
        onChange={(e)=>setServiceId(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      />

      <button
        className="border px-4 py-2"
        onClick={search}
      >
        Buscar disponibilidad
      </button>

      <div className="space-y-2">
        {slots.map((slot)=>(
          <div
            key={slot.startUtc}
            className="border p-3 flex justify-between"
          >
            <div>
              {slot.start} → {slot.end}
            </div>

            <button
              className="border px-3"
              onClick={()=>book(slot)}
            >
              Reservar
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}