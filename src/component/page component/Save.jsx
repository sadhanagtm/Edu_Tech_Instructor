import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Save({onClose}) {
  const divRef =useRef();
  const closeSave=(e)=>{
    if(divRef.current===e.target){
      onClose();
    }
  }
  const Navigate=useNavigate()
  return (
    <div>
        <div ref={divRef} onClick={closeSave} className="h-48 rounded-2xl w-96 m-auto mt-48 border-gray-100 border ficed inset-0 bg-white shadow-2xl">
          <div className=' text-lg font-medium text-center py-8'>Are you sure you want to save changes?</div>

          <div className='  flex justify-evenly my-4 mx-2 '>
           
            <button className=' h-9 w-20 bg-green-600 text-center text-lg text-white rounded-xl hover:bg-green-400'>Save</button>
            <button className=' h-9 w-24 bg-red-600  hover:bg-red-500 rounded-xl text-lg text-white'>Don't save</button>
            
          </div> 

        </div>
    </div>
    )}
    export default Save