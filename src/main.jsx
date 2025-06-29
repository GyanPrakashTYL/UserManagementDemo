import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import store from './app/store'
import { lazy } from 'react'
import { Suspense } from 'react'

const Home = lazy(() => import('./routes/Home'))
const Register = lazy(() => import('./routes/Register'))
const Login = lazy(() => import('./routes/Login'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <Suspense fallback={<div className='w-full mt-20 text-4xl font-bold flex justify-center'>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Suspense>  
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
