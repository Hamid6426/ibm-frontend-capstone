import { DOCTORS } from '@/store'

export const SPECIALTIES = ['All', ...Array.from(new Set(DOCTORS.map((d) => d.specialty)))]

export function filterDoctors(q, spec) {
  return DOCTORS.filter(
    (d) => (spec === 'All' || d.specialty === spec) && (d.name + d.specialty).toLowerCase().includes(q.toLowerCase()),
  )
}

export default function FindDoctorSearch({ q, setQ, spec, setSpec }) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
        <input
          aria-label="Search doctors"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search doctors or specialties"
          className="min-h-14 w-full rounded-brand border border-[#8ba0ad] bg-base pl-12 pr-4 text-base placeholder:text-[#6b7f8a] focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by specialty">
        {SPECIALTIES.map((s) => (
          <button
            key={s}
            onClick={() => setSpec(s)}
            aria-pressed={spec === s}
            className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${spec === s ? 'border-primary bg-primary text-white' : 'border-line bg-base text-secondary hover:bg-tint'}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
