import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import AppLayout from './Layouts/applayout'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './Pages/Feed';
import Profile from './Pages/Profile'
import Connections from './Components/Connections'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<AppLayout/>}>
      <Route path="/login" element={<Login/>}/>
      <Route path="/feed" element={<Feed/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/connections" element={<Connections/>}/>
      
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
