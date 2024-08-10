import React, { useRef } from 'react'
import { CgProfile } from 'react-icons/cg';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { MdOutlineForwardToInbox, MdOutlineVerified } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Showprofile({onClose}) {
    const divRef =useRef();
    const closeData=(e)=>{
      if(divRef.current===e.target){
        onClose();
      }
    }
    const Navigate=useNavigate()
  return (
    <div  ref={divRef} onClick={onClose}  >
        <div 
          
            className="h-36 w-60 mt-16 bg-gray-100 shadow-xl float-end absolute z-10  right-0   "
          >
            <div className=" text-black">
            

              <div
                
              onClick={onClose}  className="mx-10 my-4 grid gap-5 cursor-pointer "
              >
                
                  <Link to={'/viewprofile'}>
                  <div  className="flex gap-6  ">
                    <CgProfile className="text-2xl " />
                    My Profile
                    
                  </div>
                  </Link>

               
                <hr />
                <div
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="flex gap-6 "
                >
                  <FiLogOut className="text-2xl " />
                  Logout
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Showprofile