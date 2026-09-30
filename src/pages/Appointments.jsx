import { useState } from 'react'
import { Card, Container, PageHead } from '@/ui'
import AppointmentForm from '@/components/AppointmentForm'
import DoctorCard from '@/components/DoctorCard'
import FindDoctorSearch, { filterDoctors } from '@/components/FindDoctorSearch'

export default function Appointments() {
  const [q, setQ] = useState('')
  const [spec, setSpec] = useState('All')
  const [active, setActive] = useState(null)
  const list = filterDoctors(q, spec)

  return (
    <Container className="py-10 md:py-14">
      <PageHead title="Find your doctor" sub="Search by name or filter by specialty, then choose a time that works for you." />
      <FindDoctorSearch q={q} setQ={setQ} spec={spec} setSpec={setSpec} />
      {list.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-lg font-semibold text-secondary">No doctors match your search</p>
          <p className="mt-1 text-muted">Try another name or choose “All” specialties.</p>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <DoctorCard key={d.id} doctor={d} onBook={setActive} />
          ))}
        </div>
      )}
      {active && <AppointmentForm doctor={active} onClose={() => setActive(null)} />}
    </Container>
  )
}
