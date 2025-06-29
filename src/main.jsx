import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './routes/Home'
import Register from './routes/Register'
import Login from './routes/Login'
import { Provider } from 'react-redux'
import store from './app/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>  
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
