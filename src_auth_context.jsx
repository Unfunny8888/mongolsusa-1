import { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '@/shared/utils/storage'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from storage
    const savedUser = storage.get('user')
    if (savedUser) {
      setUser(savedUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    // Mock login
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      location: {
        city: 'New York',
        state: 'NY',
        coordinates: [40.71, -74.0],
      },
      trustScore: 85,
      verified: false,
    }
    setUser(user)
    storage.set('user', user)
    localStorage.setItem('auth_token', 'mock_token_' + Math.random())
    return user
  }

  const signup = async (email, password, name) => {
    return login(email, password)
  }

  const logout = () => {
    setUser(null)
    storage.remove('user')
    localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
