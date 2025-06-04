import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"


import './index.css'
import App from './App.jsx'
import UsersList from './usersList.jsx'
import Dashboard from './Dashboard.jsx'
import Contact from './Contact.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/usersList' element={<UsersList/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
   </BrowserRouter>
  </StrictMode>,
)
