
import React ,{useRef, useState} from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineEditNote } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { MdCategory } from "react-icons/md"
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { FaRegRegistered } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { TbTransfer } from 'react-icons/tb';
import { RxCross2 } from 'react-icons/rx';
import { IoDocumentAttach } from 'react-icons/io5';
import { GrDocument } from 'react-icons/gr';

function Sidebar({onClose}) {
    const divRef=useRef();

    const closeSidebar=(e)=>{
        if(divRef.current===e.target){
            onClose();
        }
    }
    const Navigate=useNavigate()


  return (

   <div ref={divRef} onClick={closeSidebar} className='w-full fixed  '>
    <div className=' h-full w-52 bg-primary fixed  top-0  '>
      
   
    <div className='mt-24 '>
      
      <div className='flex justify-evenly my-7   bg-teal-800 h-12 w-48 rounded-lg ml-2  '>
     <img src='https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='h-8 w-8 mt-2 rounded-full  '/>
     <div>
    <div className='text-white lg:font-semibold'>
      <p > Mausami Adhikari</p>
      </div>
      <div className='text-white text-sm  lg:w-12     '>Instructor</div>

     </div>
      </div>
      </div>

    <div onClick={onClose} className=' text-white font-semibold grid gap-5   '>
    
     
      
     
     <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <RiDashboardFill className='mt-1 ml-4' />
        Dashboard
      </div>

      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <FaRegRegistered className='mt-1 ml-4' />
       Registration
      </div>
        
        <Link to={"/coursetable"}>
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

  
     <Link to={"/instructor"}>
      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <FaChalkboardTeacher className='mt-1 ml-4' />
      Instructor
      </div>
      </Link>

      <Link to={'/testimonials'}>
      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <GrDocument className='mt-1 ml-4' />
       Testimonials
      </div>
      </Link>


         <Link to={'/transaction'}>
      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <TbTransfer  className='mt-1 ml-4' />
       Transaction
      </div>
      </Link>
    
      <div className='flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800'>
      <RiDashboardFill className='mt-1 ml-4' />
      Country
      </div>

      </div>
    </div>
    </div>
  )}    
export default Sidebar