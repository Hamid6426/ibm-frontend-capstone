import { useState } from 'react'
import { useApp } from '@/store'
import { Button, Input } from '@/ui'
import AuthShell from '@/components/AuthShell'
import { loginUser } from '@/api'

export default function Login() {
  const { go, setUser, notify } = useApp()
  const [f, setF] = useState({ email: '', password: '' })
  const [err, setErr] = useState({})
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const n = {}
    if (!/^\S+@\S+\.\S+$/.test(f.email)) n.email = 'Enter a valid email address.'
    if (!f.password) n.password = 'Enter your password.'
    setErr(n)
    if (Object.keys(n).length) return notify({ kind: 'error', title: 'Please check the form', body: 'Some details need fixing.' })
    setBusy(true)
    try {
      const data = await loginUser({ email: f.email, password: f.password })
      setUser({ role: data.user?.role || 'Patient', name: data.user?.name || 'Mariam Kamau', email: f.email, phone: data.user?.phone || '+254 712 345 678' })
      notify({ kind: 'success', title: 'Welcome back', body: 'You’re logged in.' })
      go('appointments')
    } catch (e2) {
      notify({ kind: 'error', title: 'Login failed', body: e2.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Welcome back" sub="Log in to manage your appointments.">
      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Input label="Email" type="email" autoComplete="email" placeholder="you@example.com" value={f.email} error={err.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <Input label="Password" type="password" autoComplete="current-password" value={f.password} error={err.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        <Button type="submit" block disabled={busy}>{busy ? 'Logging in…' : 'Login'}</Button>
      </form>
      <p className="mt-6 text-center text-muted">
        New here?{' '}
        <button onClick={() => go('signup')} className="font-medium text-primary underline underline-offset-2">Create an account</button>
      </p>
    </AuthShell>
  )
}
