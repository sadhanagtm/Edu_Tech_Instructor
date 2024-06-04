import React, { useRef, useState } from 'react'
import { IoMailUnreadSharp, IoMenu, IoNotifications, IoSearchOutline } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import Sidebar from '../page/Sidebar';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineForwardToInbox, MdOutlineVerified } from 'react-icons/md';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { CiSearch } from 'react-icons/ci';

function Toolbar() {
const [isShow,setIsShow]=useState(false);
const toggleMenu = () => {
  setIsShow(!isShow);
};

const [open, setOpen] = useState(false);
  const divRef = useRef();
  const buttonRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== divRef.current && e.target !== button.current) {
      setOpen(false);
    }
  });
  const [button, setButton] = useState();
 
  const handleButtonClick = () => {
    buttonRef.current.click();
  };
  const handleButtonChange = () => {
    const file = event.target.files[0];
    console.log(file);
    setButton(event.target.files[0]);
  };

  return (
    <div>
     <div className=' bg-primary h-16 w-full fixed z-20 '   >
     <div className='flex justify-between   '>
      
      <img src={"/src/image/Lopho.png"} alt='image' className=' z-10  h-14 mx-2   w-40   '/> 
      
      <button onClick={toggleMenu} className='py-3  px-2 lg:hidden '>
        {
          isShow?(
            <RxCross2 className='text-white h-11 w-12 animate-pulse hover:bg-zinc-300 hover:text-black hover:rounded-xl'/>
          ):(
          <IoMenu  className='text-white h-11 w-12  hover:bg-zinc-300 hover:text-black hover:rounded-xl' />
        )}
     </button>
     { isShow && <Sidebar onClose={()=>setIsShow(false)}/>} 


     <div className="  hidden lg:flex text-center justify-end items-center  gap-5 mx-3 mt-3 ">
          
          <div className="text-black h-9 text-2xl bg-white rounded-2xl flex  items-center border-2 gap-2">
           
            <input
            type="text"
            className="  outline-none border-none text-base pl-4  text-black rounded-xl  "
            placeholder="Search...."
            
            />
            <div className=" mx-2 hidden lg:block">
              <IoSearchOutline className='text-center font-semibold'/>
            </div>
          </div>

<IoNotifications className="h-7 w-7 text-white" />
<IoMailUnreadSharp className="h-7 w-7 text-white" />


          <div
            className="flex justify-center gap-3 text-white    "
           
          >

            <div className="">
            <img
              src="https://images.unsplash.com/photo-1660798027105-5da8ad164e27?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-full h-9 w-9 "
            
            />
            </div>
            <div className=" py-1">Instructor</div>
           <button  onClick={() => {
              setOpen(!open);
            }} ref={buttonRef}> <FaAngleDown  className="text-xl  "/>
</button>
          </div>
        </div>
      </div>
      {open && (
        <div ref={divRef} className="h-80 w-60 my-3 bg-gray-100 shadow-xl float-end absolute z-10  right-0 transition ease-in-out delay-150 hover:translate-y-1 hover:scale-100 hover: duration-300 ...">
        
          <div className=" text-black">
            <div className=" text-center my-4">
              <div className=" text-xl  font-semibold ">Mausami Adhikari</div>
              <div className="text-xs">someone123@gmail.com</div>
            </div>

            <div
            
              onClick={() => setOpen(false)}
              className="mx-10 grid gap-5 cursor-pointer "
            >
              <Link to ={'edit'}>
              <div className="flex gap-6  ">
                <CgProfile className="text-2xl " />
                My Profile
              </div>
              </Link>
              
              <div className="flex gap-6 ">
                <MdOutlineForwardToInbox className="text-2xl" />
                Inbox
              </div>
              <div className="flex gap-6 ">
                <FiSettings className="text-2xl" />
                Settings
              </div>

              <Link to={'kycform'}>
              <div className="flex gap-6 ">
              <MdOutlineVerified className="text-2xl" />
                KYC Form
              </div>
              </Link>
              <hr/>
              <div onClick={()=>{
                localStorage.removeItem('token');
                window.location.reload()
              }}
           className="flex gap-6 ">
                <FiLogOut className="text-2xl " />
                Logout
              </div>
            </div>
          </div>
        </div>
      )}
     </div>

     </div>
    
  )
}

export default Toolbar