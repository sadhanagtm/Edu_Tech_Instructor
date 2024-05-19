
import React ,{useState} from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineEditNote } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { MdCategory } from "react-icons/md"
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { FaRegRegistered } from "react-icons/fa";
import { Link } from 'react-router-dom';
import JoditEditor from 'jodit-react';

function Sidebar() {
    const [name, setName] = useState("Mausami Adhikari");

  const handleEdit = () => {
    const newName = prompt("Enter the new name:", name);
    if (newName !== null && newName !== "") {
      setName(newName);
    }
  };
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this name?");
    if (confirmDelete) {
      setName("");
    }
  };

  return (
    <div className='h-full w-56 bg-primary fixed z-20'>
    <div className=' flex justify-center  '>
      <img src={"/src/image/Lopho.png"} alt='image' className=' flex w-40   '/>  
    </div>

     <div className='flex justify-evenly mt-7 bg-teal-800 h-12 w-48 rounded-lg ml-2 '>
     <img src='https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='h-8 w-8 mt-2 rounded-full '/>
     <div>
    <div className='text-white font-semibold    '>
      <p > {name}</p></div>
      <div className='text-white text-sm  w-12     '>Instructor</div>

     </div>

      {/* <button className='text-white text-3xl ' onClick={handleEdit}><MdOutlineEditNote /></button>
      <button  className="text-red-400 text-2xl " onClick={handleDelete}><RiDeleteBin5Fill /></button> */}
      </div>

    <div className=' text-white font-semibold grid gap-5 mt-10   '>
 
     <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <RiDashboardFill className='mt-1 ml-4' />
        Dashboard
      </div>

      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <FaRegRegistered className='mt-1 ml-4' />
       Registration
      </div>
        
        <Link to={"/courses"}>
      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <FaBook  className='mt-1 ml-4' />
      Courses 
      </div>
      </Link>

<Link to={'/category'}>
      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <MdCategory className='mt-1 ml-4' />
       Category
      </div>
      </Link>

    
      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <PiStudent className='mt-1 ml-4' />
       Students
      </div>
      

     <Link to={"/instructor"}>
      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <FaChalkboardTeacher className='mt-1 ml-4' />
      Instructor
      </div>
      </Link>



      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <FaUniversity className='mt-1 ml-4' />
       University
      </div>

      

      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <RiDashboardFill className='mt-1 ml-4' />
      Country
      </div>

      </div>
    </div>
  )}

    
export default Sidebar