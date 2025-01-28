import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Router/router'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './AuthContext/AuthProvider'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='container mx-auto'>
       <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer />
       </AuthProvider>
    </div>
  </StrictMode>,
)
