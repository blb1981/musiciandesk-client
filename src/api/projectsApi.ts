import apiClient from './axios'

import { Project } from '../types'

export const getProjects = async () => {
  const response = apiClient.get('/api/projects')
  return response
}

export const createProject = async (project: Project) => {
  const response = apiClient.post('/api/projects', project)
  return response
}

export const getProject = async ({ id }: Project) => {
  const response = apiClient.get(`/api/proejcts/${id}`)
  return response
}

export const updateProject = async (project: Project) => {
  const response = apiClient.patch(`/api/projects/${project.id}`, project)
  return response
}

export const deleteProject = async ({ id }: Project) => {
  const response = apiClient.delete(`/api/projects/${id}`)
  return response
}
