import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import AppLayout from './Layouts/applayout'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<AppLayout/>}>
      <Route path="/login" element={<Login/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
