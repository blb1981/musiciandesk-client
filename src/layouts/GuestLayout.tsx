import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import getMe from '../api/getMe'
import { isAxiosError } from 'axios'

const GuestLayout = () => {
  const navigate = useNavigate()
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        await getMe()
        // If logged in, redirect to dashboard
        console.log('Logged in. Redirecting to dashboard')
        navigate('/dashboard')
      } catch (error) {
        if (isAxiosError(error)) {
          // If logged in, but not verified, redirect to dashboard
          if (error.response?.status === 409) {
            console.log('Logged in, not verified, redirecting to dashboard.')
            navigate('/dashboard')
          }
          // If not logged do nothing
          console.log('Not logged in. Please login or register.')
        }
      } finally {
        setIsPageLoading(false)
      }
    }

    checkIfLoggedIn()
  }, [])

  return (
    !isPageLoading && (
      <div>
        <p>GuestLayout</p>
        <div
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
        <Outlet />
      </div>
    )
  )
}
export default GuestLayout
