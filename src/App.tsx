import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Sidebar from './components/organisms/sidebar/Sidebar'

function App() {

  const location = useLocation();
  const isMainRoute = location.pathname === '/';

  return (
    <>
      <div className={`${isMainRoute ? 'block' : 'hidden'}`}>
        <Sidebar />
      </div>
      <div className={`${isMainRoute ? 'hidden' : 'block'}`}>
        <Outlet />
      </div>
    </>
  )
}

export default App
