import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import getMe from '../api/getMe'

const GuestLayout = () => {
  const navigate = useNavigate()
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const response = await getMe()
        console.log(response)
        // If logged in, redirect to dashboard
        navigate('/dashboard')
      } catch (error) {
        console.log(error)
        // If not logged do nothing
        console.log('Not logged in. Please login.')
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
        <Outlet />
      </div>
    )
  )
}
export default GuestLayout
