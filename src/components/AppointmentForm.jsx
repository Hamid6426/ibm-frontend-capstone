import { useEffect, useState } from 'react'
import { useApp } from '@/store'
import { Button, Input } from '@/ui'

export default function AppointmentForm({ doctor, onClose }) {
  const { book, notify, user } = useApp()
  const [f, setF] = useState({ name: user?.name ?? '', phone: user?.phone ?? '', date: '', time: '' })
  const [err, setErr] = useState({})
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const submit = (e) => {
    e.preventDefault()
    const n = {}
    if (f.name.trim().length < 2) n.name = 'Please enter your name.'
    if (f.phone.replace(/\D/g, '').length < 7) n.phone = 'Enter a valid phone number.'
    if (!f.date) n.date = 'Choose a date.'
    if (!f.time) n.time = 'Choose a time.'
    setErr(n)
    if (Object.keys(n).length) return
    book(doctor.id, f)
    notify({ kind: 'success', title: 'Appointment confirmed', body: `${doctor.name} · ${f.date} at ${f.time}` })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-inverse/60 sm:place-items-center sm:p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Book appointment" onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-md overflow-auto rounded-t-2xl bg-base p-6 shadow-2xl sm:rounded-brand md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl">Book appointment</h2>
            <p className="mt-1 text-muted">with {doctor.name}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="grid size-11 place-items-center rounded-brand text-muted hover:bg-page">✕</button>
        </div>
        <form onSubmit={submit} className="mt-6 flex flex-col gap-4" noValidate>
          <Input label="Name" value={f.name} error={err.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <Input label="Phone number" type="tel" value={f.phone} error={err.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" type="date" min={today} value={f.date} error={err.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
            <Input label="Time" type="time" value={f.time} error={err.time} onChange={(e) => setF({ ...f, time: e.target.value })} />
          </div>
          <div className="mt-2 flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Back</Button>
            <Button type="submit" className="flex-1">Confirm booking</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
