import { Form, Formik } from 'formik'
import React, { useRef } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router';

function Replybox({onClose}) {
   
    const divRef=useRef();

    const closeBox=(e)=>{
        if(divRef.current===e.target){
            onClose();
        }
    }
    const Navigate =useNavigate()
    return (
      <Formik
      initialValues={{
      message:"",
      }}
  
  
  onSubmit={(values) => {
   console.log(values);
       try {
         axios
           .post("", values)
           .then((res) => {
             console.log("user data", res);
             toast.success("Submit Successfully");  
           })
           .catch((error) => {
             console.log(error);
             toast.error("something went wrong");
           });
       } catch (error) {
         console.log(error);
       }
     }}
     >
{({ handleSubmit, setFieldValue, values }) => {
  return (
   <div ref={divRef} onClick={closeBox} className=' fixed inset-0 bg-opacity-30 backdrop-blur-sm '>
        <div  className='  mt-56 flex flex-col justify-center items-center lg:ml-20  w-full   '>
       
        <Form onSubmit={handleSubmit} className='bg-zinc-100 shadow-2xl sm:h-[340px] h-[300px]    lg:ml-28 rounded-2xl'>
            <div>
            <button onClick={onClose} className='flex float-end  bg-zinc-200 w-9 h-9  text-center  justify-center items-center rounded-full my-3 mx-4 hover:bg-zinc-300'><RxCross2 className='text-2xl text-center ' /></button>
            </div>

            
          <div className='sm:mt-2 mt-1'>
                <textarea 
                 type="text"
                placeholder='Leave a message'
                className='sm:h-52 h-48 sm:w-[650px] w-[250px] outline-none bg-transparent   mx-6 text-justify text-lg '
                />
            </div>
           
              <div className=' flex justify-center sm:float-end '>
            <button type="submit" className='bg-green-600 sm:h-9 sm:w-28 h-7 w-20 text-center text-base  items-center rounded-xl sm:mt-4 mt-1   sm:mx-5 text-white sm:float-right hover:bg-green-700 '> Submit </button>
            </div>

        </Form>
         
        </div>
   </div>
   )}}
   </Formik>
  )
}

export default Replybox