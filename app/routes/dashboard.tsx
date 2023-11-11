import type { MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [{ title: 'Hello Remix!' }]
}

export default function Dashboard() {
  return (
    <div>
      <h1>Hello from the dashboard layout!</h1>
      <Outlet />
    </div>
  )
}
