import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ContextProvider } from './contexts/StateContext.tsx'
import router from './router.tsx'
import './index.css'

const queryClienet = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClienet}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
