import apiClient from './axios'

const getMe = async () => {
  const response = await apiClient.get('/api/user')
  return response
}

export default getMe
