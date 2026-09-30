import { useApp } from '@/store'
import { Container, Logo } from '@/ui'

export default function Footer() {
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
          {([['Book appointment', 'appointments'], ['Instant consult', 'consult'], ['Give a review', 'review']]).map(([l, p]) => (
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

