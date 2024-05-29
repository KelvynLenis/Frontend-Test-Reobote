import { Navigate } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth'
import type { ReactNode } from 'react'
import { getCookie } from '../cookies'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getCookie('token')

  if (!token) {
    return <Navigate to="/" />
  }
  return children
}
