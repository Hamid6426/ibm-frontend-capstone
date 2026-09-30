import { useState } from 'react'
import { useApp } from '@/store'
import { Avatar, Container, Logo } from '@/ui'

export default function Navbar() {
  const { page, go, user, setUser, notify } = useApp()
  const [open, setOpen] = useState(false)

  const links = [
    ['Home', 'home'],
    ['Appointments', 'appointments'],
    ['Instant Consult', 'consult'],
    ['Reviews', 'review'],
  ]
  const nav = (p) => {
    go(p)
    setOpen(false)
  }
  const logout = () => {
    setUser(null)
    notify({ kind: 'info', title: 'Logged out', body: 'Take care — see you soon.' })
    nav('home')
  }

  const linkCls = (p) =>
    `flex min-h-11 items-center rounded-brand px-3 text-base font-medium transition-colors ${
      page === p ? 'bg-white text-secondary' : 'text-white hover:bg-white/15'
    }`

  return (
    <header className="sticky top-0 z-40 bg-secondary shadow-sm">
      <Container className="flex h-16 items-center justify-between">
        <button onClick={() => nav('home')} aria-label="StayHealthy home">
          <Logo light />
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map(([l, p]) => (
            <button key={p} onClick={() => nav(p)} className={linkCls(p)} aria-current={page === p ? 'page' : undefined}>
              {l}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <button onClick={() => nav('profile')} className="flex min-h-11 items-center gap-2 rounded-brand pl-1 pr-3 text-white hover:bg-white/15">
                <Avatar name={user.name} size={34} />
                <span className="font-medium">{user.name.split(' ')[0]}</span>
              </button>
              <button onClick={logout} className="min-h-11 rounded-brand border border-white/60 px-4 font-medium text-white hover:bg-white/15">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => nav('login')} className="min-h-11 rounded-brand px-4 font-medium text-white hover:bg-white/15">
                Login
              </button>
              <button onClick={() => nav('signup')} className="min-h-11 rounded-brand bg-white px-4 font-medium text-secondary hover:bg-tint">
                Sign Up
              </button>
            </>
          )}
        </div>

        <button
          className="grid size-11 place-items-center rounded-brand text-white hover:bg-white/15 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/15 bg-secondary pb-4 lg:hidden">
          <Container className="flex flex-col gap-1 pt-3">
            {links.map(([l, p]) => (
              <button key={p} onClick={() => nav(p)} className={linkCls(p)}>
                {l}
              </button>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-white/15 pt-3">
              {user ? (
                <>
                  <button onClick={() => nav('profile')} className="flex min-h-11 items-center gap-3 text-white">
                    <Avatar name={user.name} size={34} /> {user.name}
                  </button>
                  <button onClick={logout} className="min-h-12 rounded-brand border border-white/60 font-medium text-white">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => nav('login')} className="min-h-12 rounded-brand border border-white/60 font-medium text-white">
                    Login
                  </button>
                  <button onClick={() => nav('signup')} className="min-h-12 rounded-brand bg-white font-medium text-secondary">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
