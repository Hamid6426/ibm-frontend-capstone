import { useState, type FormEvent } from 'react'
import { useApp } from '@/store'
import { Button, Card, Container, Input, Select } from '@/ui'

function Shell({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <Container className="grid min-h-[calc(100vh-4rem)] place-items-center py-12">
      <Card className="w-full max-w-md p-6 md:p-8">
        <h1 className="text-3xl">{title}</h1>
        <p className="mb-6 mt-1 text-muted">{sub}</p>
        {children}
      </Card>
    </Container>
  )
}

export function Login() {
  const { go, setUser, notify } = useApp()
  const [f, setF] = useState({ email: '', password: '' })
  const [err, setErr] = useState<Record<string, string>>({})

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const n: Record<string, string> = {}
    if (!/^\S+@\S+\.\S+$/.test(f.email)) n.email = 'Enter a valid email address.'
    if (!f.password) n.password = 'Enter your password.'
    setErr(n)
    if (Object.keys(n).length) return notify({ kind: 'error', title: 'Please check the form', body: 'Some details need fixing.' })
    setUser({ role: 'Patient', name: 'Mariam Kamau', email: f.email, phone: '+254 712 345 678' })
    notify({ kind: 'success', title: 'Welcome back', body: 'You’re logged in.' })
    go('appointments')
  }

  return (
    <Shell title="Welcome back" sub="Log in to manage your appointments.">
      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Input label="Email" type="email" autoComplete="email" placeholder="you@example.com" value={f.email} error={err.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <Input label="Password" type="password" autoComplete="current-password" value={f.password} error={err.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        <Button type="submit" block>Login</Button>
      </form>
      <p className="mt-6 text-center text-muted">
        New here?{' '}
        <button onClick={() => go('signup')} className="font-medium text-primary underline underline-offset-2">Create an account</button>
      </p>
    </Shell>
  )
}

export function SignUp() {
  const { go, setUser, notify } = useApp()
  const [f, setF] = useState({ role: 'Patient', name: '', email: '', phone: '', password: '', confirm: '' })
  const [err, setErr] = useState<Record<string, string>>({})
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const n: Record<string, string> = {}
    if (f.name.trim().length < 2) n.name = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) n.email = 'Enter a valid email address.'
    if (f.phone.replace(/\D/g, '').length < 7) n.phone = 'Enter a valid phone number.'
    if (f.password.length < 8) n.password = 'Use at least 8 characters.'
    if (f.confirm !== f.password) n.confirm = 'Passwords do not match.'
    setErr(n)
    if (Object.keys(n).length) return notify({ kind: 'error', title: 'Please check the form', body: 'Some details need fixing.' })
    setUser({ role: f.role, name: f.name, email: f.email, phone: f.phone })
    notify({ kind: 'success', title: 'Account created', body: `Welcome to StayHealthy, ${f.name.split(' ')[0]}.` })
    go('appointments')
  }

  return (
    <Shell title="Create your account" sub="Free, always. It takes about a minute.">
      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Select label="I am a" value={f.role} onChange={set('role')}>
          <option>Patient</option>
          <option>Doctor</option>
        </Select>
        <Input label="Full name" autoComplete="name" value={f.name} error={err.name} onChange={set('name')} />
        <Input label="Email" type="email" autoComplete="email" value={f.email} error={err.email} onChange={set('email')} />
        <Input label="Phone number" type="tel" autoComplete="tel" placeholder="+254 700 000 000" value={f.phone} error={err.phone} onChange={set('phone')} />
        <Input label="Password" type="password" autoComplete="new-password" value={f.password} error={err.password} onChange={set('password')} />
        <Input label="Confirm password" type="password" autoComplete="new-password" value={f.confirm} error={err.confirm} onChange={set('confirm')} />
        <Button type="submit" block>Sign Up</Button>
      </form>
      <p className="mt-6 text-center text-muted">
        Already registered?{' '}
        <button onClick={() => go('login')} className="font-medium text-primary underline underline-offset-2">Login</button>
      </p>
    </Shell>
  )
}
