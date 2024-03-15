import { ReactNode, createContext, useContext, useState } from 'react'

import { User } from '../types'

interface ContextProps {
  children?: ReactNode
}

interface DefaultContext {
  user?: User | null
  setUser: (user: User) => void
}

const StateContext = createContext<DefaultContext>({
  user: null,
  setUser: () => {},
})

export const ContextProvider = ({ children }: ContextProps) => {
  const [user, _setUser] = useState<User | null>()

  const setUser = (user: User | null) => {
    _setUser(user)
  }

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
