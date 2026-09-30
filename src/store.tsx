import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

export type Page = 'home' | 'appointments' | 'login' | 'signup' | 'profile' | 'consult' | 'review'
export type User = { role: string; name: string; email: string; phone: string }
export type Booking = { name: string; phone: string; date: string; time: string }
export type Toast = { id: number; kind: 'success' | 'error' | 'info'; title: string; body?: string }

export type Doctor = {
  id: number
  name: string
  specialty: string
  years: number
  rating: number
  reviews: number
  next: string
}

export const DOCTORS: Doctor[] = [
  { id: 1, name: 'Dr. Amara Okafor', specialty: 'General Physician', years: 12, rating: 4.9, reviews: 318, next: 'Today, 4:30 PM' },
  { id: 2, name: 'Dr. Rahul Menon', specialty: 'Pediatrician', years: 9, rating: 4.8, reviews: 204, next: 'Tomorrow, 9:00 AM' },
  { id: 3, name: 'Dr. Lucía Fernández', specialty: 'Gynecologist', years: 15, rating: 4.9, reviews: 276, next: 'Today, 6:00 PM' },
  { id: 4, name: 'Dr. Tenzin Dorje', specialty: 'Cardiologist', years: 18, rating: 4.7, reviews: 152, next: 'Thu, 11:15 AM' },
  { id: 5, name: 'Dr. Priya Nair', specialty: 'Dermatologist', years: 7, rating: 4.6, reviews: 121, next: 'Tomorrow, 2:00 PM' },
  { id: 6, name: 'Dr. Samuel Achieng', specialty: 'Mental Health', years: 11, rating: 4.9, reviews: 189, next: 'Today, 5:15 PM' },
]

type Ctx = {
  page: Page
  go: (p: Page) => void
  user: User | null
  setUser: (u: User | null) => void
  bookings: Record<number, Booking>
  book: (id: number, b: Booking) => void
  cancel: (id: number) => void
  toasts: Toast[]
  notify: (t: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void
}

const C = createContext<Ctx>(null as never)
export const useApp = () => useContext(C)

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>('home')
  const [user, setUser] = useState<User | null>(null)
  const [bookings, setBookings] = useState<Record<number, Booking>>({})
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const notify = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = Date.now() + Math.random()
      setToasts((x) => [...x.slice(-2), { ...t, id }])
      setTimeout(() => dismiss(id), 5000)
    },
    [dismiss],
  )
  const go = useCallback((p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <C.Provider
      value={{
        page,
        go,
        user,
        setUser,
        bookings,
        book: (id, b) => setBookings((s) => ({ ...s, [id]: b })),
        cancel: (id) =>
          setBookings((s) => {
            const n = { ...s }
            delete n[id]
            return n
          }),
        toasts,
        notify,
        dismiss,
      }}
    >
      {children}
    </C.Provider>
  )
}
