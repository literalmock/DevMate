import { Outlet } from 'react-router-dom'
import header from '../Components/header';
const AppLayout = () => {
  return (
    <div>
      <header />
      <Outlet />
    </div>
  )
}

export default AppLayout;
