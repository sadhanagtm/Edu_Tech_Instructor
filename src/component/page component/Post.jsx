import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Post({onClose}) {
  const divRef =useRef();
  const closePost=(e)=>{
    if(divRef.current===e.target){
      onClose();
    }
  }
  const Navigate=useNavigate()
  return (
    <div className=' '>
        <div className="h-48 rounded-2xl w-96  m-auto mt-48  fixed   inset-0 border-gray-100 border bg-white shadow-2xl">
          <div className=' text-lg font-semibold text-center py-8'>Are you sure you want to post?</div>

          <div className='  flex justify-evenly my-4 mx-2 '>
           
            <button className=' h-9 w-20 bg-green-600 text-center text-lg text-white rounded-xl hover:bg-green-700'>Yes</button>

            <button ref={divRef} onClick={closePost} className=' h-9 w-20 bg-red-600  hover:bg-red-700 rounded-xl text-lg text-white'>No</button>
            
          </div> 
           
        </div>
    </div>
    )}
    export default Post