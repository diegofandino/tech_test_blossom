import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Sidebar from './components/organisms/sidebar/Sidebar'
import { useDesignUi } from './global/design-ui';
import { useEffect } from 'react';

function App() {

  const location = useLocation();
  const { isMobile, setIsMobile } = useDesignUi();
  const isMainRoute = location.pathname === '/';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);


  return (
    <>
     { isMobile ? (
        <>
          <div className={`${isMainRoute ? 'block' : 'hidden'}`}>
            <Sidebar />
          </div>
          <div className={`${isMainRoute ? 'hidden' : 'block'}`}>
            <Outlet />
          </div>
        </>
     ) : (
      <div className='md:grid md:grid-cols-3'>
          <div className='md:col-span-1'>
            <Sidebar />
          </div>
          <div className='md:col-span-2'>
            <Outlet />
          </div>
        </div>
     )
     }
    </>
  )
}

export default App
