const API_URL = import.meta.env.VITE_API_URL || ''

export async function registerUser({ role, name, email, phone, password }) {
  const res = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, name, email, phone, password }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'Registration failed. Please try again.')
  }
  return res.json()
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'Invalid email or password.')
  }
  return res.json()
}
