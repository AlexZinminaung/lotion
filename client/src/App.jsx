import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Login from './routes/Login';
import Register from './routes/Register';
import RedirectSucess from './routes/RedirectSucess';
import RedirectFail from './routes/RedirectFail';
import Profile from './routes/Profile';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className='text-4xl font-bold text-gray-800'>Welcome to Lotion</h1>
      <div className='mt-4 flex space-x-4'>
        <Link to="/login" className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">'>Login</Link>
        <Link to="/register" className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">'>Register</Link>
      </div>
    </div>
  )
}

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/redirect_sucess' element={<RedirectSucess />} />
      <Route path='/redirect_fail' element={<RedirectFail />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  </BrowserRouter>
  ) 
}

export default App
