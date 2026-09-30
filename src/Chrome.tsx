import { useState } from 'react'
import { useApp, type Page } from '@/store'
import { Avatar, Button, Container, Logo } from '@/ui'

export function Navbar() {
  const { page, go, user, setUser, notify } = useApp()
  const [open, setOpen] = useState(false)

  const links: [string, Page][] = [
    ['Home', 'home'],
    ['Appointments', 'appointments'],
    ['Instant Consult', 'consult'],
    ['Reviews', 'review'],
  ]
  const nav = (p: Page) => {
    go(p)
    setOpen(false)
  }
  const logout = () => {
    setUser(null)
    notify({ kind: 'info', title: 'Logged out', body: 'Take care — see you soon.' })
    nav('home')
  }

  const linkCls = (p: Page) =>
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

const tone = {
  success: { bar: 'bg-primary', icon: 'M5 12l5 5 9-10' },
  error: { bar: 'bg-[#a12b2b]', icon: 'M12 7v6M12 17h.01' },
  info: { bar: 'bg-secondary', icon: 'M12 11v6M12 7h.01' },
}

export function Toasts() {
  const { toasts, dismiss } = useApp()
  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-50 flex flex-col items-center gap-2 px-4" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast-in pointer-events-auto flex w-full max-w-md overflow-hidden rounded-brand border border-line bg-base shadow-xl">
          <div className={`grid w-12 place-items-center ${tone[t.kind].bar}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d={tone[t.kind].icon} />
            </svg>
          </div>
          <div className="flex-1 px-4 py-3">
            <p className="font-semibold text-inverse">{t.title}</p>
            {t.body && <p className="text-sm text-muted">{t.body}</p>}
          </div>
          <button onClick={() => dismiss(t.id)} aria-label="Dismiss" className="px-4 text-muted hover:text-inverse">
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export function Footer() {
  const { go } = useApp()
  return (
    <footer className="bg-inverse text-white">
      <Container className="grid gap-8 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-[#b9c8d0]">A non-profit bringing doctors to every village, town and home. Part of our Go Digital initiative.</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="font-semibold">Care</p>
          {([['Book appointment', 'appointments'], ['Instant consult', 'consult'], ['Give a review', 'review']] as [string, Page][]).map(([l, p]) => (
            <button key={p} onClick={() => go(p)} className="min-h-9 text-[#b9c8d0] hover:text-white">
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="font-semibold">Account</p>
          <button onClick={() => go('login')} className="min-h-9 text-[#b9c8d0] hover:text-white">Login</button>
          <button onClick={() => go('signup')} className="min-h-9 text-[#b9c8d0] hover:text-white">Sign Up</button>
        </div>
      </Container>
      <div className="border-t border-white/10 py-5 text-center text-sm text-[#b9c8d0]">© 2026 StayHealthy Foundation. A fictitious non-profit.</div>
    </footer>
  )
}

export { Button }
