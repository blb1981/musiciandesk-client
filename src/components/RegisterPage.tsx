import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import apiClient from '../api/axios'
import { RegisterInfo } from '../types'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const payload: RegisterInfo = {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  }

  const handleRegistrationAttempt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Set cookie
      const responseFromCookie = await apiClient.get('/')
      console.log(responseFromCookie)

      // Attempt register
      const response = await apiClient.post('/register', payload)
      console.log(response)

      // If successful, redirect to dashboard
      if (response.status === 204) {
        console.log('Register successful!')
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
      // TODO: Processs unsuccessful attempts
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegistrationAttempt}>
        <p>
          <input
            name='name'
            type='text'
            value={name}
            placeholder='Name'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </p>
        <p>
          <input
            name='email'
            type='email'
            value={email}
            placeholder='Email'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </p>
        <p>
          <input
            name='password'
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </p>
        <p>
          <input
            name='passwordConfirmation'
            type='password'
            value={passwordConfirmation}
            placeholder='Confirm password'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirmation(e.target.value)
            }
          />
        </p>
        <p>
          <button type='submit' disabled={isProcessing}>
            Register
          </button>
        </p>
      </form>
    </div>
  )
}
export default RegisterPage
