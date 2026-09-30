import Appointments from '@/pages/Appointments'
import AppointmentFormIC from '@/pages/AppointmentFormIC'
import Footer from '@/components/Footer'
import GiveReviews from '@/pages/GiveReviews'
import Login from '@/pages/Login'
import Navbar from '@/components/Navbar'
import Notification from '@/components/Notification'
import ProfileCard from '@/pages/ProfileCard'
import SignUp from '@/pages/Sign_Up'
import Landing from '@/pages/Landing'
import { AppProvider, useApp } from '@/store'

function Router() {
  const { page } = useApp()
  switch (page) {
    case 'appointments': return <Appointments />
    case 'login': return <Login />
    case 'signup': return <SignUp />
    case 'profile': return <ProfileCard />
    case 'consult': return <AppointmentFormIC />
    case 'review': return <GiveReviews />
    default: return <Landing />
  }
}

export default function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Notification />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}
