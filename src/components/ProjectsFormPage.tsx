import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createProject } from '../api/projectsApi'
import { Project } from '../types'

const ProjectsFormPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [dueDate, setDueDate] = useState('')

  const payload: Project = {
    name,
    due_date: new Date(dueDate),
    is_complete: false,
  }

  const createProjectMutation = useMutation({
    mutationKey: ['proejcts'],
    mutationFn: async (payload: Project) => {
      return await createProject(payload)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
      navigate('/dashboard') //TODO: Change to project index later
    },
    onError: async (error) => {
      console.log('somethign screwed up!')
      console.log(error)
      console.log(error.message)
    },
    onSettled: async () => {
      console.log('settled')
      setName('')
      setDueDate('')
    },
  })

  const handleAddProjectAttempt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createProjectMutation.mutate(payload)
  }

  return (
    <div>
      <h2>Create a new Project</h2>
      <form onSubmit={handleAddProjectAttempt}>
        <p>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </p>
        <p>
          <input
            type='date'
            name='dueDate'
            placeholder='Due date'
            value={dueDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDueDate(e.target.value)
            }
          />
        </p>
        <p>
          <button type='submit' disabled={createProjectMutation.isPending}>
            Add Project
          </button>
        </p>
      </form>
    </div>
  )
}
export default ProjectsFormPage
