import { useState, type FormEvent } from 'react'
import { useApp } from '@/store'
import { Avatar, Button, Card, Container, Input, Stars } from '@/ui'

export function Review() {
  const { notify } = useApp()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!rating) return setErr('Please choose a star rating.')
    setErr('')
    setDone(true)
    notify({ kind: 'success', title: 'Review submitted', body: 'Thank you — your feedback helps others.' })
  }

  const shown = hover || rating

  return (
    <Container className="grid place-items-center py-12 md:py-20">
      <Card className="w-full max-w-lg p-6 md:p-8">
        <h1 className="text-3xl">Rate your visit</h1>
        <p className="mb-6 mt-1 text-muted">How was your consultation with Dr. Amara Okafor?</p>
        <form onSubmit={submit} className="flex flex-col gap-5">
          <fieldset disabled={done} className="flex flex-col gap-5 disabled:opacity-60">
            <div>
              <legend className="mb-2 text-sm font-medium">Rating</legend>
              <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    type="button"
                    key={i}
                    aria-label={`${i} star${i > 1 ? 's' : ''}`}
                    aria-pressed={rating === i}
                    onMouseEnter={() => setHover(i)}
                    onClick={() => setRating(i)}
                    className="grid size-12 place-items-center rounded-brand hover:bg-page disabled:hover:bg-transparent"
                  >
                    <svg width="32" height="32" viewBox="0 0 20 20" fill={i <= shown ? '#B7791F' : '#dbe4ea'}>
                      <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
                    </svg>
                  </button>
                ))}
              </div>
              {err && <p role="alert" className="mt-1 text-sm text-[#a12b2b]">{err}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="c" className="text-sm font-medium">Comment</label>
              <textarea
                id="c"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us what went well or what could be better"
                className="w-full rounded-brand border border-[#8ba0ad] bg-base p-4 placeholder:text-[#6b7f8a] focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/30 disabled:bg-page"
              />
            </div>
            <Button type="submit" disabled={done}>{done ? 'Review submitted' : 'Submit review'}</Button>
          </fieldset>
        </form>
        {done && (
          <div role="status" className="mt-5 flex items-start gap-3 rounded-brand bg-tint p-4 text-secondary">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white">✓</span>
            <div>
              <p className="font-semibold">Thank you for your review</p>
              <div className="mt-1"><Stars value={rating} /></div>
            </div>
          </div>
        )}
      </Card>
    </Container>
  )
}

export function Profile() {
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

  const save = (e: FormEvent) => {
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
