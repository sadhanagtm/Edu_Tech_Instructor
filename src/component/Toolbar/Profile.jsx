import React, { useEffect, useRef, useState } from "react";
import { IoMailUnreadSharp, IoMenuOutline } from "react-icons/io5";
import { MdOutlineHome, MdOutlineVerified } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
import { FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

function Profile() {
  const [open, setOpen] = useState(false);
  const divRef = useRef();
  const buttonRef = useRef();
  // const imgRef = useRef();
  
  
  window.addEventListener("click", (e) => {
    if (e.target !== divRef.current && e.target !== button.current) {
      setOpen(false);
    }
  });
  const [button, setButton] = useState();
 
  const handleButtonClick = () => {
    buttonRef.current.click();
  };
  // const handleButtonChange = () => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   setButton(event.target.files[0]);
  // };


  return (
    <>
      <div className="bg-primary h-16 w-full fixed  z-10 ">
        <div className=" flex text-center justify-end items-center  gap-8  relative top-3  right-4">
          
          <div className="text-black h-9 text-2xl bg-white rounded-2xl flex justify-center items-center border-2 gap-5">
           
            <div className="mx-3">
              <FaSearch />
            </div>
            <input
            type="text"
            className="outline-none border-none text-black rounded-2xl  "
            placeholder="Search here"
            
            />
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
        <div ref={divRef} className="h-80 w-60 my-16 bg-gray-100 shadow-xl float-end absolute z-10  right-0 transition ease-in-out delay-150 hover:translate-y-1 hover:scale-100 hover: duration-300 ...">
        
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

              <Link to={'kycverification'}>
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
    </>
  );
}

export default Profile;