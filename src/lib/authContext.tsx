import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { currentUser, login as authLogin, signOut as authLogout, register as authRegister } from './auth'
import type { AuthResult } from './auth'
import { getSupabase, initSupabase, currentUsername } from './supabase'
import { pullAll } from './sync'

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

  useEffect(() => {
    const sb = getSupabase()
    if (!sb) return undefined
    const { data } = sb.auth.onAuthStateChange((_event, session) => {
      const username = session?.user ? currentUsername(session.user) : null
      setUser(username)
      if (username) void pullAll()
      window.dispatchEvent(new CustomEvent('sb:synced'))
    })
    void initSupabase()
    return () => data.subscription.unsubscribe()
  }, [])

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