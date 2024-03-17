import { useEffect, useState } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { isAxiosError } from 'axios'

import apiClient from '../api/axios'
import getMe from '../api/getMe'
import { useStateContext } from '../contexts/StateContext'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const { setUser, user } = useStateContext()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isProcessingLogout, setIsProcessingLogout] = useState(false)
  const [isVerified, setIsVerified] = useState<null | boolean>(null)
  const [isProcessingSendEmail, setIsProcessingSendEmail] = useState(false)
  const [emailSendSuccessful, setEmailSendSuccessful] = useState(false)

  const handleLogout = async () => {
    setIsProcessingLogout(true)

    try {
      // Process logout
      const response = await apiClient.post('/logout')
      console.log(response)

      // If successful, reset user context, redirect to /login
      if (response.status === 204) {
        console.log('Logout successful')
        setUser({})
        navigate('/login')
      }
    } catch (error) {
      // If unsuccessful, handle errors
    } finally {
      setIsProcessingLogout(false)
    }
  }

  const sendVerificationEmail = async () => {
    setIsProcessingSendEmail(true)

    try {
      const response = await apiClient.post('/email/verification-notification')
      console.log(response)
      // If response is successful, leave button disabled, display message
      if (response.status === 200) {
        setEmailSendSuccessful(true)
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const { data } = await getMe()
        // If logged in, and verified, set verified to true
        console.log('Logged in, verified, proceed')
        setIsVerified(true)

        // Set user data context
        setUser(data)
      } catch (error) {
        if (isAxiosError(error)) {
          // If logged in, but email not verified, display verification notice
          if (error.response?.status === 409) {
            console.log(error)
            setIsVerified(false)
          } else {
            // If not logged in redirect to login page
            console.log('Not logged in, redirecting to login')
            navigate('/login')
          }
        }
      } finally {
        setIsPageLoading(false)
      }
    }

    checkIfLoggedIn()
  }, [])

  // Content to display if email is not verified
  const notVerifiedContent = (
    <div>
      <p>Please verify your email address.</p>
      <p>
        If you cannot find the email, click the button below to resend the
        verification link to your email address.
      </p>
      <button onClick={sendVerificationEmail} disabled={isProcessingSendEmail}>
        Reesend verification email
      </button>

      {emailSendSuccessful && (
        <p>
          Email sent successfully. Please check your email inbox and click the
          verification link in the email. Be sure to check your spam folder if
          you have trouble finding the email.
        </p>
      )}
    </div>
  )

  return (
    !isPageLoading && (
      <div>
        <div>DefaultLayout</div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button onClick={handleLogout} disabled={isProcessingLogout}>
            Logout
          </button>
          <Link to='/projects/create'>New Project</Link>
        </div>
        {user && <p>Hello {user?.name}!</p>}

        {isVerified ? <Outlet /> : notVerifiedContent}
      </div>
    )
  )
}
export default DefaultLayout
