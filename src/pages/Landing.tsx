import { useApp } from '@/store'
import { Button, Card, Container, Stars } from '@/ui'
import { quotes, services, stats, steps } from '@/lib/content'

export default function Landing() {
  const { go } = useApp()
  return (
    <>
      <section className="relative overflow-hidden bg-base">
        <div className="absolute -right-32 -top-32 size-[520px] rounded-full bg-tint" aria-hidden />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1.5 text-sm font-medium text-primary">
              <span className="size-2 rounded-full bg-primary" /> Go Digital initiative · 100% non-profit
            </p>
            <h1 className="text-5xl leading-[1.05] md:text-6xl">StayHealthy</h1>
            <p className="mt-3 text-2xl font-medium text-primary md:text-3xl">Your health, wherever you are.</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              We connect patients in remote and underserved areas with caring, qualified doctors — anytime, on any phone. No long journeys. No long queues.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => go('appointments')} className="h-14 px-7 text-lg">Book an appointment</Button>
              <Button variant="outline" onClick={() => go('consult')} className="h-14 px-7 text-lg">Talk to a doctor now</Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {stats.map(([n, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-bold text-secondary md:text-3xl">{n}</dt>
                  <dd className="text-sm text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Card className="relative p-6">
            <p className="text-sm font-medium text-muted">Next available</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid size-14 place-items-center rounded-full bg-secondary text-lg font-semibold text-white">AO</div>
              <div>
                <p className="font-semibold text-inverse">Dr. Amara Okafor</p>
                <p className="text-sm text-muted">General Physician · 12 yrs</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {['4:30 PM', '5:00 PM', '5:30 PM'].map((t, i) => (
                <span key={t} className={`grid h-11 place-items-center rounded-brand border text-sm font-medium ${i === 0 ? 'border-primary bg-primary text-white' : 'border-line text-secondary'}`}>{t}</span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-brand bg-tint p-3 text-sm text-secondary">
              <span className="size-2.5 animate-pulse rounded-full bg-primary" /> 18 doctors online right now
            </div>
          </Card>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-3xl md:text-4xl">Care for the whole family</h2>
          <p className="mt-2 max-w-xl text-lg text-muted">Every service is free or subsidised, funded by donors and delivered by volunteer clinicians.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(([t, d], i) => (
              <Card key={t} className="p-6 transition-transform hover:-translate-y-1">
                <div className="mb-5 grid size-12 place-items-center rounded-brand bg-tint text-lg font-bold text-primary">0{i + 1}</div>
                <h3 className="text-xl">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-secondary py-20 text-white">
        <Container>
          <h2 className="text-3xl text-white md:text-4xl">How it works</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], i) => (
              <li key={t} className="border-t-2 border-white/30 pt-5">
                <span className="text-sm font-semibold text-[#8fe0dc]">Step {i + 1}</span>
                <h3 className="mt-1 text-xl text-white">{t}</h3>
                <p className="mt-2 text-[#cfe0e8]">{d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-3xl md:text-4xl">Trusted by the communities we serve</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {quotes.map(([q, n, r]) => (
              <Card key={n} className="flex flex-col p-6">
                <Stars value={5} />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-inverse">“{q}”</blockquote>
                <p className="mt-5 font-semibold text-secondary">{n}</p>
                <p className="text-sm text-muted">{r}</p>
              </Card>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-brand bg-tint p-8 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl">Feeling unwell? Don’t wait.</h3>
              <p className="mt-1 text-muted">A doctor is a few taps away.</p>
            </div>
            <Button onClick={() => go('appointments')} className="h-14 px-7 text-lg">Book an appointment</Button>
          </div>
        </Container>
      </section>
    </>
  )
}
