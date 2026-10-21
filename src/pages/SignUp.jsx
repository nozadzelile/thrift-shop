
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Phone } from 'lucide-react'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [signupType, setSignupType] = useState('email')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const result = signUp({
      name,
      email: signupType === 'email' ? email : '',
      phone: signupType === 'phone' ? phone : '',
      password,
    })

    if (result.error) {
      setError(result.error)
      return
    }

    navigate('/')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create an account</h1>

        <p className="auth-subtitle">
          Join Vuvuli and discover something special
        </p>

        <div className="login-tabs">
          <button
            type="button"
            className={signupType === 'email' ? 'active' : ''}
            onClick={() => {
              setSignupType('email')
              setError('')
            }}
          >
            <Mail size={17} />
            Email
          </button>

          <button
            type="button"
            className={signupType === 'phone' ? 'active' : ''}
            onClick={() => {
              setSignupType('phone')
              setError('')
            }}
          >
            <Phone size={17} />
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Full name</label>
          <input
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />

          {signupType === 'email' ? (
            <>
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </>
          ) : (
            <>
              <label htmlFor="signup-phone">Phone number</label>
              <input
                id="signup-phone"
                type="tel"
                placeholder="+34 600 000 000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                required
              />
            </>
          )}

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <label htmlFor="confirm-password">
            Confirm password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="auth-submit">
            Create account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  )
}