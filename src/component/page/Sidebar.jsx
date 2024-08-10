
import React, { useRef, useState, useEffect } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { FaBook, FaChalkboardTeacher, FaRegRegistered } from "react-icons/fa";
import { MdCategory, MdOutlineVerified } from "react-icons/md";
import { TbTransfer } from "react-icons/tb";
import { GrDocument } from "react-icons/gr";
import { SiCoursera } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "../ui/Profile";
import { PiSpinner } from "react-icons/pi";
import ClipLoader from "react-spinners/ClipLoader";

function Sidebar({ onClose }) {
  const divRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const closeSidebar = (e) => {
    if (divRef.current === e.target) {
      onClose();
    }
  };

  const handleClick = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 500); 
  };

  useEffect(() => {
    setLoading(false);
  }, [location.pathname]);

  const navlink = [
    { title: "Dashboard", icon: <RiDashboardFill />, path: "/" },
    { title: "Registration", icon: <FaRegRegistered />, path: "/hello" },
    { title: "Courses", icon: <FaBook />, path: "/courses" },
    { title: "Category", icon: <MdCategory />, path: "/category" },
    // { title: "Instructor", icon: <FaChalkboardTeacher />, path: "/addinstructor" },
    { title: "Testimonial", icon: <GrDocument />, path: "/testimonials" },
    { title: "Transaction", icon: <TbTransfer />, path: "/transaction" },
    { title: "KYC Form", icon: <MdOutlineVerified />, path: "/kycform" },
    { title: "My course", icon: <SiCoursera />, path: "/course" },
  ];

  return (
    <div ref={divRef} onClick={closeSidebar} className="w-full fixed left-0 z-10">
      <div className="h-full w-52 bg-primary fixed flex flex-col  top-0 z-10 mx-auto">
        {/* <div className="mt-16"> */}
          {/* <Profile top={false} /> */}
        {/* </div> */}

        <div onClick={onClose} className="text-white font-semibold grid w-10/12 mx-auto gap-5 text-base mt-24">
          {navlink.map((val, i) => (
            <div key={i} onClick={() => handleClick(val.path)}>
              <div className={`flex gap-3 p-2 items-center ${location.pathname === val.path ? "bg-teal-800" : 'bg-transparent'} cursor-pointer rounded-lg hover:bg-teal-800`}>
                <div>{val.icon}</div>
                <div>{val.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {loading && <Spinner />} 
    </div>
  );
}

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    
      <span className="visually-hidden  spinner-border  "  role="status"><ClipLoader
        
       
        color={"#123abc"}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"/></span>
    </div>
 
);

export default Sidebar;
