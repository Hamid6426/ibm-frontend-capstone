import { Card, Container } from '@/ui'

export default function AuthShell({ title, sub, children }) {
  return (
    <Container className="grid min-h-[calc(100vh-4rem)] place-items-center py-12">
      <Card className="w-full max-w-md p-6 md:p-8">
        <h1 className="text-3xl">{title}</h1>
        <p className="mb-6 mt-1 text-muted">{sub}</p>
        {children}
      </Card>
    </Container>
  )
}
