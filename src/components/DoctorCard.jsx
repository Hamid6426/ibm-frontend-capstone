import { useApp } from '@/store'
import { Avatar, Button, Card, Stars } from '@/ui'

export default function DoctorCard({ doctor: d, onBook }) {
  const { bookings, cancel, notify } = useApp()
  const b = bookings[d.id]

  return (
    <Card className="flex flex-col p-6">
      <div className="flex items-center gap-4">
        <Avatar name={d.name} size={56} />
        <div>
          <h2 className="text-lg">{d.name}</h2>
          <p className="text-primary font-medium">{d.specialty}</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-muted">
        <span>{d.years} years experience</span>
        <span className="inline-flex items-center gap-1.5">
          <Stars value={d.rating} size={14} />
          <b className="text-inverse">{d.rating}</b> ({d.reviews})
        </span>
      </div>
      <p className="mt-3 rounded-brand bg-page px-3 py-2 text-sm text-secondary">Next available: {d.next}</p>
      <div className="mt-5 flex-1" />
      {b ? (
        <div>
          <p className="mb-3 rounded-brand bg-tint px-3 py-2 text-sm font-medium text-secondary">✓ Confirmed · {b.date} at {b.time}</p>
          <Button
            variant="danger"
            block
            onClick={() => {
              cancel(d.id)
              notify({ kind: 'info', title: 'Appointment cancelled', body: `Your visit with ${d.name} was cancelled.` })
            }}
          >
            Cancel Appointment
          </Button>
        </div>
      ) : (
        <Button block onClick={() => onBook(d)}>Book Appointment</Button>
      )}
    </Card>
  )
}
