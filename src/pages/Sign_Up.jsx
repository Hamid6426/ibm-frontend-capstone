import { useState } from 'react'
import { useApp } from '@/store'
import { Button, Input, Select } from '@/ui'
import AuthShell from '@/components/AuthShell'
import { registerUser } from '@/api'

export default function SignUp() {
  const { go, setUser, notify } = useApp()
  const [f, setF] = useState({ role: 'Patient', name: '', email: '', phone: '', password: '', confirm: '' })
  const [err, setErr] = useState({})
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const n = {}
    if (f.name.trim().length < 2) n.name = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) n.email = 'Enter a valid email address.'
    if (f.phone.replace(/\D/g, '').length < 7) n.phone = 'Enter a valid phone number.'
    if (f.password.length < 8) n.password = 'Use at least 8 characters.'
    if (f.confirm !== f.password) n.confirm = 'Passwords do not match.'
    setErr(n)
    if (Object.keys(n).length) return notify({ kind: 'error', title: 'Please check the form', body: 'Some details need fixing.' })
    setBusy(true)
    try {
      await registerUser({ role: f.role, name: f.name, email: f.email, phone: f.phone, password: f.password })
      setUser({ role: f.role, name: f.name, email: f.email, phone: f.phone })
      notify({ kind: 'success', title: 'Account created', body: `Welcome to StayHealthy, ${f.name.split(' ')[0]}.` })
      go('appointments')
    } catch (e2) {
      notify({ kind: 'error', title: 'Sign up failed', body: e2.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Create your account" sub="Free, always. It takes about a minute.">
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
        <Button type="submit" block disabled={busy}>{busy ? 'Signing up…' : 'Sign Up'}</Button>
      </form>
      <p className="mt-6 text-center text-muted">
        Already registered?{' '}
        <button onClick={() => go('login')} className="font-medium text-primary underline underline-offset-2">Login</button>
      </p>
    </AuthShell>
  )
}
