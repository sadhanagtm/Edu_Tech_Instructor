import React from "react";

import ReCAPTCHA from "react-google-recaptcha";
import axios from "../../Hoc/Axios";
import { Formik, Form, ErrorMessage } from "formik";
import {Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaLock } from "react-icons/fa";
import { MdOutlineFingerprint } from "react-icons/md";
import * as Yup from "yup";

  const schema=Yup.object().shape({
    email: Yup.string()
    .email("Invalid Email address format")
    .required("This field is required"),
    
    password:Yup.string()
    .min(8, "Password must be 8 characters at minimum")
          .required("Password is required")
          // .matches(
            // /[!@#$%^&(),.{}|<>]/,
        //  "Password must contain at least one symbol" )
           .matches(/[0-9]/,"Password must contain at leastnumber ")
          //  .matches(/[A-Z]/,"Password must contain at one uppercase letter ")
          //  .matches(/[a-z]/,"Password must contain at one lowercase letter ")
  })
  function Logins(){
const Navigate=useNavigate()

return (
  <Formik
    initialValues={{
    email:'',
    password:'',
    type:"Teacher",
  }}
  validationSchema={schema}
 onSubmit={(values) => {
    try {



      axios
        .post("/user/auth/login", values)
        .then((res) => {
          // setUser([...res,data.data])
          console.log("errrrrorrrr",res);
           toast.success("Login Successfully")
          localStorage.setItem('token', res.data.token)
          Navigate("/")
          
        })
        .catch((error) => {
          console.log(error);
          // toast.error(error.response.data.message)
        });
    } catch (error) {
      console.log(error);
    }
 }}
  
  >


  

{({ handleSubmit, setFieldValue, values }) => {
  return(
    <Form onSubmit={handleSubmit}>
    <Toaster/>
   <div className=' ' >
       <div className='grid grid-cols-2'>
       <div className="bg-primary h-screen w-full relative flex overflow-hidden  flex-col gap-2 justify-center items-start px-40">
       <div className="h-72 absolute -top-40 right-24 w-72  bg-transparent border-ds  border-4 rounded-full"></div>
       <div className="h-80 absolute -top-36  -right-16 w-80  bg-transparent border-ds  border-4 rounded-full"></div>
       <div className="h-72 absolute -bottom-40 left-24 w-72  bg-transparent border-ds  border-4 rounded-full"></div>
       <div className="h-80 absolute -bottom-36 -left-16 w-80  bg-transparent border-ds  border-4 rounded-full"></div>
      <div className='mb-6 text-center w-full'>
      <div className=" text-white text-2xl font-semibold">Lopho Abroad Consultancy</div>
       <div className="text-xm font-normal text-white">
         TRAINING AND SOLUTION 
       </div>
       <button className="border-2 rounded-lg h-[40px] bg-white fot-bold mt-2 text-blue-500 w-[100px]">
         Read more
       </button></div>
     </div>
 
       <div className=' h-97 bg-gray-300 text-black flex flex-col  '>
           <div className=' bg-gray-50 rounded-2xl h-full w-96   my-8 mx-auto '>
           <div className='text-center text-2xl font-semibold capitalize py-8  text-blue-800 '>login form</div>
           <div className='grid grid-rows-2 gap-4 mx-10 text-center '>
              


              <div className="flex flex-col">
               <div className="flex  border-2 gap-2 p-1 px-4 items-center rounded-lg">
                     <MdOutlineFingerprint className="w-5 h-5 " />
                     <input
                       name="email"
                       type="text"
                       placeholder=" Email or username "
                       className="h-10 outline-none bg-transparent w-[250px] justify-start"
                       onChange={(e)=>{
                         setFieldValue("email",e. target.value)
                       }}
                     />

                   </div>
                     <ErrorMessage name="email" component={"div"} className="text-red-500  text-start"/>
                     </div>
 

                <div className="flex flex-col">
               <div className="flex  border-2 gap-2 items-center p-1 px-1 rounded-lg">
                     <FaLock className="w-10" />
                     <input
                       name="password"
                       type="text"
                       placeholder="Password"
                       className="h-10 w-[250px] bg-transparent outline-none"
                       onChange={(e)=>{
                         setFieldValue("password",e.target.value)
                       }}
                     />
                   </div>
                     <ErrorMessage name="password" component={"div"} className="text-red-500 text-start "/>
                   </div>
                 
               
               <ReCAPTCHA className='w-72  '
                     sitekey=" 6LfC_ngpAAAAAEqisEc9e4MFHS1Ac5LDfwcp1XdZ"
                   />
 
 <input type='submit'
 value={'Login'}
 className='h-10 w-32 mx-auto bg-blue-700 shadow-xl text-white rounded-3xl'/>
 </div>
 <div className=" text-center font-semibold my-2 text-blue-600"> Forgot your password?</div>
 
 
 
   <Link to={'/registration'}   >         
 <div className=" font-semibold text-blue-600 my-2 text-center">Create an account</div>
 </Link>   
                
           </div>
       </div>
       </div>   
   </div>
   </Form>
  )

}}
  </Formik>
  
)
}

export default Logins
