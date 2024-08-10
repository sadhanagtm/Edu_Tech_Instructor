import React, { useRef, useState } from "react";
import {
  IoMailUnreadSharp,
  IoMenu,
  IoNotifications,
  IoSearchOutline,
} from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Sidebar from "../page/Sidebar";
import { FaAngleDown, FaAngleUp, FaSearch } from "react-icons/fa";

import Profile from "../ui/Profile";
import Showprofile from "./Showprofile";

function Toolbar() {
  const [isShow, setIsShow] = useState(false);
  const toggleMenu = () => {
    setIsShow(!isShow);
  };

  const[isOpen,setIsOpen]=useState(false)
  const toggleButton=()=>{
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <div className=" bg-primary h-fit py-3 w-full fixed z-20 ">
        <div className="flex  justify-between items-center   ">
          <img
            src={"/src/image/Lopho.png"}
            alt="image"
            className=" z-20 h-10 aspect-square   mx-2 w-40   "
          />

<div className=" flex relative left-3 ">
          <button onClick={toggleMenu} className="py-3  text-4xl lg:hidden ">
            {isShow ? (
              <RxCross2 className="text-white  animate-pulse hover:bg-zinc-300 hover:text-black hover:rounded-xl" />
            ) : (
              <IoMenu className="text-white  hover:bg-zinc-300 hover:text-black hover:rounded-xl" />
            )}
          </button>
          {isShow && <Sidebar onClose={() => setIsShow(false)} />}

          <div className="lg:flex text-center justify-end items-center  gap-5 mx-3  ">
            <div className=" lg:flex hidden lg:gap-3">
            <div className="text-black  h-6 text-xl bg-white rounded-2xl lg:flex  items-center border-2 gap-2">
              <input
                type="text"
                className="  outline-none border-none text-base px-2  text-black rounded-xl  "
                placeholder="Search...."
              />
              <div className=" mx-2  lg:block">
                <IoSearchOutline className="text-center font-semibold" />
              </div>
            </div>

            <IoNotifications className="  lg:flex h-6 w-6 text-white" />
            <IoMailUnreadSharp className="  lg:flex h-6 w-6 text-white" />

            </div>
             <div className=" flex flex-row relative bottom-1 lg:bottom-0  ">
            <Profile  top={true} />
            
            <button onClick={toggleButton} className="  pt-6 relative  right-1  ">
              {isOpen?(
                <FaAngleUp className="text-xl text-white " />
              ):(
                <FaAngleDown className="text-xl text-white " />
              )}
              </button>
              {isOpen && <Showprofile onClose={()=>setIsOpen(false)} />}
                </div>
          </div>

          </div>
        </div>
       
      </div>
    </div>
  );
}

export default Toolbar;
