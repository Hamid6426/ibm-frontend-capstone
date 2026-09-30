import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'

type User = { role: string; name: string; email: string; phone: string; password: string }

const users: User[] = []

function makeToken(user: User): string {
  const payload = Buffer.from(JSON.stringify({ email: user.email, role: user.role, iat: Date.now() })).toString('base64url')
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.s1gn4tur3`
}

function reply(res: ServerResponse, status: number, body: object) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

function readBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (c) => (data += c))
    req.on('end', () => resolve(data ? JSON.parse(data) : {}))
  })
}

export const server = createServer(async (req, res) => {
  const body = await readBody(req)
  if (req.url === '/api/auth/register' && req.method === 'POST') {
    const { role, name, email, phone, password } = body
    if (!name || !email || !password) return reply(res, 400, { message: 'name, email and password are required' })
    if (users.some((u) => u.email === email)) return reply(res, 409, { message: 'User already exists' })
    const user: User = { role, name, email, phone, password }
    users.push(user)
    return reply(res, 201, { message: 'User registered successfully', authtoken: makeToken(user), user: { name, email, role } })
  }
  if (req.url === '/api/auth/login' && req.method === 'POST') {
    const { email, password } = body
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) return reply(res, 401, { message: 'Invalid email or password' })
    return reply(res, 200, { message: 'Login successful', authtoken: makeToken(user), user: { name: user.name, email: user.email, role: user.role, phone: user.phone } })
  }
  reply(res, 404, { message: 'Not found' })
})

const port = Number(process.env.PORT || 5050)
if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => console.log(`Auth API listening on http://localhost:${port}`))
}
