import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Phone } from 'lucide-react'

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [loginType, setLoginType] = useState('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (loginType === 'phone') {
      setError('Phone number sign in will be available soon.')
      return
    }

    const result = signIn({
      email,
      password,
    })

    if (result.error) {
      setError(result.error)
      return
    }

    navigate('/')
  }

  function handleGoogle() {
    setError('Google sign in will be available soon.')
  }

  function handleFacebook() {
    setError('Facebook sign in will be available soon.')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">

        <h1>Welcome back</h1>

        <p className="auth-subtitle">
          Sign in to your Vuvuli account
        </p>

        {/* Social login */}

        <button
          type="button"
          className="social-button google-button"
          onClick={handleGoogle}
        >
          <span className="google-icon">G</span>
          Continue with Google
        </button>

        <button
          type="button"
          className="social-button facebook-button"
          onClick={handleFacebook}
        >
            <span className="facebook-icon">f</span>
          Continue with Facebook
        </button>

        {/* Divider */}

        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Login type */}

        <div className="login-tabs">

          <button
            type="button"
            className={loginType === 'email' ? 'active' : ''}
            onClick={() => {
              setLoginType('email')
              setError('')
            }}
          >
            <Mail size={17} />
            Email
          </button>

          <button
            type="button"
            className={loginType === 'phone' ? 'active' : ''}
            onClick={() => {
              setLoginType('phone')
              setError('')
            }}
          >
            <Phone size={17} />
            Phone
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          {loginType === 'email' ? (
            <>
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </>
          ) : (
            <>
              <label htmlFor="phone">
                Phone number
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="+34 600 000 000"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </>
          )}

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button type="submit" className="auth-submit">
            Sign in
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup">
            Sign up
          </Link>
        </p>

      </div>
    </main>
  )
}