import { useApp } from '@/store'

const tone = {
  success: { bar: 'bg-primary', icon: 'M5 12l5 5 9-10' },
  error: { bar: 'bg-[#a12b2b]', icon: 'M12 7v6M12 17h.01' },
  info: { bar: 'bg-secondary', icon: 'M12 11v6M12 7h.01' },
}

export default function Notification() {
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

