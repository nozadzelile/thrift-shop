import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage('currentUser', null))

  function signUp({ name, email, password }) {
    const users = readStorage('users', [])

    if (users.some((u) => u.email === email)) {
      return { error: 'An account with this email already exists.' }
    }

    users.push({ name, email, password })
    localStorage.setItem('users', JSON.stringify(users))

    const currentUser = { name, email }
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    setUser(currentUser)
    return { error: null }
  }

  function signIn({ email, password }) {
    const users = readStorage('users', [])
    const found = users.find((u) => u.email === email && u.password === password)

    if (!found) {
      return { error: 'Wrong email or password.' }
    }

    const currentUser = { name: found.name, email: found.email }
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    setUser(currentUser)
    return { error: null }
  }

  function signOut() {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}