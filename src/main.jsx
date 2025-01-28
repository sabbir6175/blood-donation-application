import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Router/router'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './AuthContext/AuthProvider'
import { ToastContainer } from 'react-toastify'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='container mx-auto'>
       <AuthProvider>
       <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer />
          </QueryClientProvider>
       </AuthProvider>
    </div>
  </StrictMode>,
)
