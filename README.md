# StayHealthy — Front-End Capstone Project

StayHealthy is a non-profit healthcare platform that connects patients with doctors **anytime, anywhere**. Built as part of the *Go Digital* initiative, it aims to improve access to medical services in remote and underserved areas with limited healthcare infrastructure.

**Live deployment:** https://ibm-frontend-capstone.vercel.app/

## Features

- **Landing page** with mission overview and navigation (Home, Appointments, Sign Up, Login)
- **Sign Up / Login** with form validation and API integration (`/api/register`, `/api/login`)
- **Appointment booking** — doctor search, doctor cards, appointment scheduling (name, phone, date, time)
- **Instant consultation** — minimal one-step request form (name + phone only)
- **Reviews** — patients can rate doctors; forms disable after submission
- **Profile management** — profile card UI with editable details
- **Notifications** — global toast notifications for success/error feedback
- **Cancel appointments** — patients can cancel confirmed bookings
- Fully **responsive** layout, accessible forms, and SEO meta tags

## Tech Stack

- [React 19](https://react.dev/) — UI library
- [Vite](https://vite.dev/) — build tool & dev server
- [Tailwind CSS 4](https://tailwindcss.com/) — styling
- [Figma](https://figma.com/) — UI/UX design

## Project Structure

```
├── index.html                  # Entry HTML with SEO meta tags
├── site.config.json            # Site shell configuration
├── src/
│   ├── api.js                  # Registration & login API clients
│   ├── App.jsx                 # Root component (Notification integrated app-wide)
│   ├── main.tsx                # React entry point
│   ├── store.tsx               # Global state (auth, appointments)
│   ├── ui.tsx                  # Shared UI primitives
│   ├── components/             # Navbar, DoctorCard, AppointmentForm, etc.
│   └── pages/                  # Sign_Up, Login, Appointments, GiveReviews, etc.
└── results/                    # Submission artifacts (screenshots, build, cURL logs)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/Hamid6426/ibm-frontend-capstone.git
cd ibm-frontend-capstone

# Install dependencies
npm install

# (Optional) point the app at your backend API
echo "VITE_API_URL=https://your-backend.example.com" > .env

# Start the dev server
npm run dev
```

Open http://localhost:8443 in your browser.

### Production build

```bash
npm run build    # outputs static files to dist/
npm run preview  # serve the production build locally
```

## API

The sign-up and login forms call:

- `POST /api/register` — `{ role, name, email, phone, password }`
- `POST /api/login` — `{ email, password }`

Set `VITE_API_URL` at build/dev time to target your backend instance.

## Deployment

The site is deployed on **Vercel**: https://ibm-frontend-capstone.vercel.app/

## License

This project was created for educational purposes as a front-end development capstone.
