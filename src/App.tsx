import { Profile, Review } from '@/Account'
import Appointments, { Consult } from '@/Appointments'
import { Login, SignUp } from '@/Auth'
import { Footer, Navbar, Toasts } from '@/Chrome'
import Landing from '@/Landing'
import { AppProvider, useApp } from '@/store'

function Router() {
  const { page } = useApp()
  switch (page) {
    case 'appointments': return <Appointments />
    case 'login': return <Login />
    case 'signup': return <SignUp />
    case 'profile': return <Profile />
    case 'consult': return <Consult />
    case 'review': return <Review />
    default: return <Landing />
  }
}

export default function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Toasts />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}
