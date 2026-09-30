import { useEffect, useState, type FormEvent } from 'react'
import { DOCTORS, useApp, type Doctor } from '@/store'
import { Avatar, Button, Card, Container, Input, PageHead, Stars } from '@/ui'

const SPECIALTIES = ['All', ...Array.from(new Set(DOCTORS.map((d) => d.specialty)))]

export default function Appointments() {
  const { bookings, cancel, notify } = useApp()
  const [q, setQ] = useState('')
  const [spec, setSpec] = useState('All')
  const [active, setActive] = useState<Doctor | null>(null)

  const list = DOCTORS.filter(
    (d) => (spec === 'All' || d.specialty === spec) && (d.name + d.specialty).toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <Container className="py-10 md:py-14">
      <PageHead title="Find your doctor" sub="Search by name or filter by specialty, then choose a time that works for you." />

      <div className="mb-8 flex flex-col gap-4">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            aria-label="Search doctors"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search doctors or specialties"
            className="min-h-14 w-full rounded-brand border border-[#8ba0ad] bg-base pl-12 pr-4 text-base placeholder:text-[#6b7f8a] focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/30"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by specialty">
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              onClick={() => setSpec(s)}
              aria-pressed={spec === s}
              className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${spec === s ? 'border-primary bg-primary text-white' : 'border-line bg-base text-secondary hover:bg-tint'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-lg font-semibold text-secondary">No doctors match your search</p>
          <p className="mt-1 text-muted">Try another name or choose “All” specialties.</p>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => {
            const b = bookings[d.id]
            return (
              <Card key={d.id} className="flex flex-col p-6">
                <div className="flex items-center gap-4">
                  <Avatar name={d.name} size={56} />
                  <div>
                    <h2 className="text-lg">{d.name}</h2>
                    <p className="text-primary font-medium">{d.specialty}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between text-sm text-muted">
                  <span>{d.years} years experience</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Stars value={d.rating} size={14} />
                    <b className="text-inverse">{d.rating}</b> ({d.reviews})
                  </span>
                </div>
                <p className="mt-3 rounded-brand bg-page px-3 py-2 text-sm text-secondary">Next available: {d.next}</p>
                <div className="mt-5 flex-1" />
                {b ? (
                  <div>
                    <p className="mb-3 rounded-brand bg-tint px-3 py-2 text-sm font-medium text-secondary">✓ Confirmed · {b.date} at {b.time}</p>
                    <Button
                      variant="danger"
                      block
                      onClick={() => {
                        cancel(d.id)
                        notify({ kind: 'info', title: 'Appointment cancelled', body: `Your visit with ${d.name} was cancelled.` })
                      }}
                    >
                      Cancel Appointment
                    </Button>
                  </div>
                ) : (
                  <Button block onClick={() => setActive(d)}>Book Appointment</Button>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {active && <AppointmentForm doctor={active} onClose={() => setActive(null)} />}
    </Container>
  )
}

function AppointmentForm({ doctor, onClose }: { doctor: Doctor; onClose: () => void }) {
  const { book, notify, user } = useApp()
  const [f, setF] = useState({ name: user?.name ?? '', phone: user?.phone ?? '', date: '', time: '' })
  const [err, setErr] = useState<Record<string, string>>({})
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const n: Record<string, string> = {}
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

export function Consult() {
  const { notify, go } = useApp()
  const [f, setF] = useState({ name: '', phone: '' })
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!f.name.trim() || f.phone.replace(/\D/g, '').length < 7) {
      return notify({ kind: 'error', title: 'Missing details', body: 'Please enter your name and phone number.' })
    }
    setDone(true)
    notify({ kind: 'success', title: 'You’re in the queue', body: 'A doctor will call you within 5 minutes.' })
  }

  return (
    <Container className="grid place-items-center py-12 md:py-20">
      <Card className="w-full max-w-md p-6 md:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1 text-sm font-medium text-primary">
          <span className="size-2 animate-pulse rounded-full bg-primary" /> 18 doctors online
        </span>
        <h1 className="mt-4 text-3xl">Instant consultation</h1>
        <p className="mb-6 mt-1 text-muted">Share your name and number. A doctor will call you back in minutes.</p>
        {done ? (
          <div role="status" className="rounded-brand bg-tint p-5 text-secondary">
            <p className="font-semibold">Thank you, {f.name.split(' ')[0]}.</p>
            <p className="mt-1">Please keep your phone nearby — a doctor will call {f.phone}.</p>
            <Button variant="outline" className="mt-4" onClick={() => go('home')}>Back to home</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
            <Input label="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            <Input label="Phone number" type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
            <Button type="submit" block>Request a doctor now</Button>
          </form>
        )}
      </Card>
    </Container>
  )
}
