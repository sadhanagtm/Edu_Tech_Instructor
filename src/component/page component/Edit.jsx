import { Formik } from 'formik'
import React ,{useState,useRef}from 'react'

// import 'react-edit-text/dist/index.css';

  function Edit() {

  const[image,setImage]=useState()
const inputRef=useRef(null)
  const handleImageClick=()=>{
    inputRef.current.click();
}
const handleImageChange=()=>{
  const file = event.target.files[0];
  console.log(file);
  setImage( event.target.files[0]);
}
  return (

    <div>
 <div className='  h-105 flex gap-8  justify-center mt-16 ml-40  '>

 <div className='h-100 w-80  px-4 py-4 mx-8 my-16  bg-white shadow-2xl border border-blue-300 rounded-2xl'>
  <div className=' w-28 h-8 bg-green-400 text-center rounded-2xl py-1  mx-4 my-2'> Profile View</div>
  <div className=''>
    <img src="https://www.shareicon.net/data/128x128/2017/01/06/868320_people_512x512.png"
    alt="photo"
className='w-28 h-28 object-cover rounded-full  border-blue-600 border-2 mx-auto  cursor-pointer '
/>

<div className='text-center py-3'>

  <div className='text-xl font-semibold'>Instructor Name</div>
  <div className=' text-xs '>instructor@gmail.com</div>

  </div>

  <div className='grid gap-4 w-10/12 mx-auto '>

    <div className=''>Instructor Name</div>
    <div className=''>Phone No</div>
    <div className=''>Email</div>
    <div className=''>Address</div>
    <div className=''>Country</div>
  </div>
  </div>

  
</div>

  <div className=' my-8'>
<div className='text-3xl font-semibold text-center '>Update Profile
</div>
<div className=' flex justify-center'>
<div className=' bg-blue-400 h-2 w-14 rounded-3xl my-2 '></div>
<div className='  text-center'>Required*</div>
</div>
 <div className='gap-8 flex my-16 '>
<div className='  '>
 <div className='h-36 w-72 my-auto bg-white  border border-blue-300 rounded-2xl  '>
<div className='h-6 w-24 bg-blue-500 text-center font-semibold rounded-3xl relative bottom-2 mx-3 text-xs pt-1'>Your Profile</div>
 <div onClick={handleImageClick}>{image ? <img src={URL.createObjectURL(image)} alt=""  className='w-24 h-24 rounded-full border-blue-400 border-2 mx-5'/>:
<img 
src="https://www.shareicon.net/data/128x128/2017/01/06/868320_people_512x512.png"
alt="instructor"
className='w-24 h-24 rounded-full border-blue-600 border-2  cursor-pointer mx-5 '
/>
}
<input
type="file"
ref={inputRef}
onChange={handleImageChange}
style={{display:"none"}}

  />
  
</div>
  <button onClick={handleImageClick} className='h-10 w-32 text-center  bg-blue-500  border-2 border-blue-300 shadow-xl rounded-3xl flex items-center ml-32 relative bottom-8 justify-center'>Change image</button>
  
 </div>

<div className='mt-6 flex flex-col '>
   <label  className='w-28 font-semibold h-4 text-xs bg-blue-300 text-center rounded-full mx-3 relative top-2'   htmlFor="name" >Instructor Name</label>
    <input
     type="text"
     placeholder=''
     name="name"
    //  value=
     className='h-11 w-80 px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
     />
</div>

<div className=' flex flex-col mt-3'>

   <label  className=' w-20 text-xs font-semibold  h-4 bg-blue-300 text-center rounded-full mx-3 relative top-2 '   htmlFor="email" >Email</label>
    <input
     type="email"
     placeholder=''
     name="email"
    //  value=
     className='h-11 w-80 px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
     />
  
</div>
</div>

<div className='  grid gap-2 mt-7 '>

<div className=' flex flex-col '>

   <label  className='w-28 relative top-2 font-semibold h-4 text-xs bg-blue-300 text-center rounded-full mx-3'   htmlFor="phone" >Phone Number</label>
    <input
     type="number"
     placeholder=''
     name="phone"
    //  value=
     className='h-11 w-80 px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
     />
   
</div>
<div className=' flex flex-col '>

   <label  className=' relative top-2 w-24 h-4 text-xs font-semibold bg-blue-300 text-center rounded-full mx-3'   htmlFor="address" >Adrress</label>
    <input
     type="text"
     placeholder=''
     name="address"
    //  value=
     className='h-11 w-80 px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
     />
   
</div>

<div className=' flex flex-col '>

   <label  className=' relative top-2 w-24 text-xs font-semibold h-4 bg-blue-300 text-center rounded-full mx-3'   htmlFor="country" >Country</label>
    <input
     type="text"
     placeholder=''
     name="country"
    //  value=
     className='h-11 w-80 px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
     />
   
</div>

<button className='h-11 w-48 bg-green-600 font-semibold shadow-2xl text-center rounded-3xl mt-6'>Update Profile</button>
</div>

  </div>
  
</div>

</div>

    </div>
    
  )
}

export default Edit