import { useId, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react'

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  block?: boolean
}

const variants = {
  primary: 'bg-primary text-white hover:bg-[#086664]',
  secondary: 'bg-secondary text-white hover:bg-[#153d54]',
  outline: 'bg-base text-secondary border border-secondary hover:bg-page',
  ghost: 'text-secondary hover:bg-tint',
  danger: 'bg-base text-[#a12b2b] border border-[#a12b2b] hover:bg-[#fdf1f1]',
}

export function Button({ variant = 'primary', block, className = '', ...p }: BtnProps) {
  return (
    <button
      {...p}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-brand px-5 text-base font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${block ? 'w-full' : ''} ${className}`}
    />
  )
}

const field =
  'min-h-12 w-full rounded-brand border border-[#8ba0ad] bg-base px-4 text-base text-inverse placeholder:text-[#6b7f8a] transition-shadow focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/30 disabled:bg-page disabled:text-muted'

export function Field({ label, error, children, id }: { label: string; error?: string; children: ReactNode; id: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-inverse">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-[#a12b2b]">
          {error}
        </p>
      )}
    </div>
  )
}

export function Input({ label, error, ...p }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const id = useId()
  return (
    <Field label={label} error={error} id={id}>
      <input id={id} {...p} aria-invalid={!!error} className={`${field} ${error ? 'border-[#a12b2b]' : ''}`} />
    </Field>
  )
}

export function Select({ label, children, ...p }: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  const id = useId()
  return (
    <Field label={label} id={id}>
      <select id={id} {...p} className={field}>
        {children}
      </select>
    </Field>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-brand border border-line bg-base shadow-[0_1px_2px_rgba(15,33,41,0.04),0_8px_24px_-12px_rgba(27,78,107,0.15)] ${className}`}>
      {children}
    </div>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-10 ${className}`}>{children}</div>
}

export function Avatar({ name, size = 48 }: { name: string; size?: number }) {
  const initials = name
    .replace(/^Dr\.\s*/, '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className="grid shrink-0 place-items-center rounded-full bg-tint font-semibold text-secondary"
    >
      {initials}
    </div>
  )
}

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i <= Math.round(value) ? '#B7791F' : '#dbe4ea'}>
          <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
        </svg>
      ))}
    </span>
  )
}

export function Logo({ light }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
        <rect width="34" height="34" rx="8" fill="#0A7C7A" />
        <path d="M14 8h6v6h6v6h-6v6h-6v-6H8v-6h6z" fill="#fff" />
      </svg>
      <span className={`text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-secondary'}`}>StayHealthy</span>
    </span>
  )
}

export function PageHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl">{title}</h1>
      <p className="mt-2 max-w-xl text-lg text-muted">{sub}</p>
    </div>
  )
}
