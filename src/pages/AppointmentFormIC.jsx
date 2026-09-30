import { useState } from 'react'
import { useApp } from '@/store'
import { Button, Card, Container, Input } from '@/ui'

export default function AppointmentFormIC() {
  const { notify, go } = useApp()
  const [f, setF] = useState({ name: '', phone: '' })
  const [done, setDone] = useState(false)

  const submit = (e) => {
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
