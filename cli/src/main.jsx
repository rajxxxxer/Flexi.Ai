
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
 import { ClerkProvider } from '@clerk/clerk-react'
import { SidebarProvider } from './context/SidebarContext'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
        <SidebarProvider> <App /></SidebarProvider>
       </BrowserRouter>
      </ClerkProvider>
 
    
 
)
