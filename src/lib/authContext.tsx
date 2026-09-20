import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { currentUser, login as authLogin, signOut as authLogout, register as authRegister } from './auth'
import type { AuthResult } from './auth'

interface AuthContextValue {
  user: string | null
  login: (username: string, password: string) => Promise<AuthResult>
  register: (username: string, password: string) => Promise<AuthResult>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: async () => ({ ok: false }),
  register: async () => ({ ok: false }),
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => currentUser())

  const login = useCallback(async (username: string, password: string) => {
    const result = await authLogin(username, password)
    if (result.ok) setUser(currentUser())
    return result
  }, [])

  const register = useCallback(async (username: string, password: string) => {
    const result = await authRegister(username, password)
    if (result.ok) setUser(currentUser())
    return result
  }, [])

  const logout = useCallback(() => {
    authLogout()
    setUser(null)
  }, [])

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}