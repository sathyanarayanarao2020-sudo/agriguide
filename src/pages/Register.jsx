import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alreadyRegistered] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return Boolean(localStorage.getItem('registerUser'))
  })
  const [message, setMessage] = useState('')

  const handleRegister = () => {
    setMessage('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage('Please fill in all fields.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setMessage('Please enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.')
      return
    }

    const existingUserJson = localStorage.getItem('registerUser')
    if (existingUserJson) {
      const existingUser = JSON.parse(existingUserJson)
      if (existingUser.email === email) {
        setMessage('Account already exists. Please sign in.')
        return
      }
    }

    const user = {
      name,
      email,
      password
    }

    localStorage.setItem('registerUser', JSON.stringify(user))
    localStorage.setItem('userEmail', email)

    alert('Registration successful. Redirecting to login...')
    navigate('/login')
  }

  return (
    <div className='container'>
      <div className='form'>
        <h1>Register</h1>

        {alreadyRegistered ? (
          <>
            <p>
              An account already exists. If this is your account,
              please <Link to='/login'>sign in</Link>.
            </p>
            <p>If you want to register a new account, clear your browser storage first.</p>
          </>
        ) : (
          <>
            <input
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>Register</button>
          </>
        )}

        {message && <p className='field-error'>{message}</p>}
      </div>
    </div>
  )
}

export default Register