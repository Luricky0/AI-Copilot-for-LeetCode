import React, { useEffect, useState } from 'react'
import LoginPortal from '../components/LoginPortal'
import { useUserContext } from '../contexts/userContext'
import { checkToken } from '../api/userApi'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useUserContext()
  const [isTokenValid, setIsTokenValid] = useState(false)
  const load = async () => {
    if (token) {
      const res = await checkToken()
      if (res === true) setIsTokenValid(true)
    }
  }
  useEffect(() => {
    load()
  }, [])
  return isTokenValid ? <>{children}</> : <LoginPortal />
}
