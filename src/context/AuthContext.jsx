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

  
function signUp({ name, email, phone, password }) {
  const users = readStorage('users', [])

  const normalizedEmail = email?.trim().toLowerCase()
  const normalizedPhone = phone?.trim()

  if (!normalizedEmail && !normalizedPhone) {
    return { error: 'Enter an email address or phone number.' }
  }

  const alreadyExists = users.some((u) =>
    normalizedEmail
      ? u.email?.toLowerCase() === normalizedEmail
      : u.phone === normalizedPhone
  )

  if (alreadyExists) {
    return {
      error: 'An account with these details already exists.',
    }
  }

  const newUser = {
    name: name.trim(),
    email: normalizedEmail || '',
    phone: normalizedPhone || '',
    password,
  }

  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))

  const currentUser = {
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
  }

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
  <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
    {children}
  </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}