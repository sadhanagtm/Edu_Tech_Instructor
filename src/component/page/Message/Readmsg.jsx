import React, { useState } from 'react'
import Replybox from './Replybox'

function Readmsg() {
    const[show,setShow]=useState(false)
  return (
    <div >
        <div className='mt-20 ml-96'>
    <button on onClick={()=>setShow(true)} className='bg-gray-600 text-white rounded-2xl  h-10 w-36  font-semibold shadow-2xl flex justify-center items-center ml-80 '>
        Open Message
    </button>
   {show && <Replybox onClose={()=>setShow(false)}/>} 
    </div>
    </div>
  )
}

export default Readmsg