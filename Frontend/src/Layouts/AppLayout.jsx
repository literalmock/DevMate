import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './applayout.css'
import { useEffect } from 'react';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
const AppLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    
    const fetchUser = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + '/profile/view', { withCredentials: true });
        dispatch(addUser(response.data.user))
      } catch (error) {
        navigate('/login')
        console.error("Error fetching user:", error);
      }
    };
    useEffect(()=>{
      if (!user) {
        fetchUser()
      }
    },[])
  
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar/>
      <main className="flex-1">
    <Outlet />
  </main>
      <Footer/>
    </div>
  )
}

export default AppLayout;