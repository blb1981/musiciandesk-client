import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import apiClient from '../api/axios'
import { Credentials } from '../types'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const payload: Credentials = {
    email,
    password,
    remember,
  }

  const handleLoginAttempt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Set cookie
      const responseFromCookie = await apiClient.get('/')
      console.log(responseFromCookie)

      // Attempt login
      const response = await apiClient.post('/login', payload)
      console.log(response)

      // If successful, redirect to Dashboard page
      if (response.status === 204) {
        console.log('Login successful!')
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
      //TODO:  Process unsuccessful attempts
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginAttempt}>
        <p>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </p>
        <p>
          <input
            type='password'
            name='email'
            placeholder='Password'
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </p>
        <label>
          Remember me?
          <input
            type='checkbox'
            name='email'
            placeholder='Password'
            checked={remember}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRemember(e.target.checked)
            }
          />
        </label>
        <p>
          <button type='submit' disabled={isProcessing}>
            Login
          </button>
        </p>
      </form>
    </div>
  )
}
export default LoginPage
