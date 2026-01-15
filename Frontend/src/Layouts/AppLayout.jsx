import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './applayout.css'
const AppLayout = () => {
  return (
    <div>
      <Navbar/>
      <main className="app-main">
    <Outlet />
  </main>
      <Footer/>
    </div>
  )
}

export default AppLayout;