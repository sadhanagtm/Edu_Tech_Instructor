

import { Outlet } from 'react-router-dom'
import React, { useEffect ,useState} from 'react'

import { useNavigate } from 'react-router-dom'
import Sidebar from '../component/page/Sidebar';
import Toolbar from '../component/Toolbar/Toolbar';


function Layout() {
  

  const Navigate=useNavigate()
  const [token,settoken]=useState(false);
  useEffect(()=>{
  if(!localStorage.getItem("token")){
      settoken(false)
      Navigate("/login") 
  }


  else{
      settoken(true)
  }

  },[localStorage]
  )

  return (
    <div className='flex w-full'>
      <div className='w-fit hidden lg:visible lg:block '>
      <Sidebar/>
</div> 
 <div className='w-full relative'>
      <Toolbar/> 
      
       <div className=' '>

       <Outlet/>
       </div>
      </div>
    </div>
  )
}

export default Layout