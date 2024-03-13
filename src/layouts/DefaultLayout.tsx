import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import apiClient from '../api/axios'
import getMe from '../api/getMe'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isProcessingLogout, setIsProcessingLogout] = useState(false)

  const handleLogout = async () => {
    setIsProcessingLogout(true)

    try {
      // Process logout
      const response = await apiClient.post('/logout')
      console.log(response)

      // If successful, redirect to /login
      if (response.status === 204) {
        console.log('Logout successful')
        navigate('/login')
      }
    } catch (error) {
      // If unsuccessful, handle errors
    } finally {
      setIsProcessingLogout(false)
    }
  }

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const response = await getMe()
        console.log(response)
        // If logged in, do nothing
      } catch (error) {
        console.log(error)
        // If not logged in redirect to login page
        console.log('Not logged in, redirecting to login')
        navigate('/login')
      } finally {
        setIsPageLoading(false)
      }
    }

    checkIfLoggedIn()
  }, [])

  return (
    !isPageLoading && (
      <div>
        <div>DefaultLayout</div>
        <button onClick={handleLogout} disabled={isProcessingLogout}>
          Logout
        </button>
        <Outlet />
      </div>
    )
  )
}
export default DefaultLayout
