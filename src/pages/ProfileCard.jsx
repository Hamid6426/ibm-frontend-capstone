import { useState } from 'react'
import { useApp } from '@/store'
import { Avatar, Button, Card, Container, Input } from '@/ui'

export default function ProfileCard() {
  const { user, setUser, notify, go } = useApp()
  const [edit, setEdit] = useState(false)
  const [f, setF] = useState(user ?? { role: '', name: '', email: '', phone: '' })

  if (!user) {
    return (
      <Container className="grid place-items-center py-20">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-2xl">Please log in</h1>
          <p className="mb-6 mt-2 text-muted">Log in to view and edit your profile.</p>
          <Button onClick={() => go('login')}>Login</Button>
        </Card>
      </Container>
    )
  }

  const save = (e) => {
    e.preventDefault()
    if (!f.name.trim()) return notify({ kind: 'error', title: 'Name is required' })
    setUser(f)
    setEdit(false)
    notify({ kind: 'success', title: 'Profile updated' })
  }

  return (
    <Container className="grid place-items-center py-12 md:py-20">
      <Card className="w-full max-w-lg overflow-hidden">
        <div className="h-24 bg-secondary" />
        <div className="px-6 pb-8 md:px-8">
          <div className="-mt-12 rounded-full border-4 border-base w-fit"><Avatar name={user.name} size={88} /></div>
          {edit ? (
            <form onSubmit={save} className="mt-5 flex flex-col gap-4">
              <Input label="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              <Input label="Email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
              <Input label="Phone number" type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => { setF(user); setEdit(false) }}>Cancel</Button>
                <Button type="submit" className="flex-1">Save changes</Button>
              </div>
            </form>
          ) : (
            <>
              <h1 className="mt-4 text-2xl">{user.name}</h1>
              <span className="mt-1 inline-block rounded-full bg-tint px-3 py-1 text-sm font-medium text-primary">{user.role}</span>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {[['Email', user.email], ['Phone', user.phone]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3">
                    <dt className="text-muted">{k}</dt>
                    <dd className="break-all font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <Button className="mt-6" variant="secondary" onClick={() => { setF(user); setEdit(true) }}>Edit profile</Button>
            </>
          )}
        </div>
      </Card>
    </Container>
  )
}
