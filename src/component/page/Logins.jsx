import React, { useState } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import axios from "../../Hoc/Axios";
import { Formik, Form, ErrorMessage } from "formik";
import {Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaLock } from "react-icons/fa";
import { MdOutlineFingerprint } from "react-icons/md";
import * as Yup from "yup";
import loginimage from '../../assets/lg.svg'
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

  const schema=Yup.object().shape({
    email: Yup.string()
    .email("Invalid Email address format")
    .required("This field is required"),
    
    password:Yup.string()
    .min(5, "Password must be 5 characters at minimum")
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

const [password, setPassword] = useState('');
const[visible ,setVisible]=useState(false)
const[loading,setLoading]=useState(false)

return (
  <Formik
    initialValues={{
    email:'',
    password:'',
    type:"Teacher",
  }}
  validationSchema={schema}
 onSubmit={(values) => {
  setLoading(true)
    try {



      axios
        .post("/user/auth/login", values)
        .then((res) => {
          // setUser([...res,data.data])
          console.log("errrrrorrrr",res);
           toast.success("Login Successfully")
          localStorage.setItem('token', res.data.token)
          Navigate("/")
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message)
          setLoading(false)

        });
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
 }}
  
  >


  

{({ handleSubmit, setFieldValue, values }) => {
  return(
    <Form onSubmit={handleSubmit}>
    <Toaster/>
    {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              )}
   <div className=' ' >
       <div className='lg:grid lg:grid-cols-2 flex flex-col'>
       <div className= "bg-primary h-72 sm:h-100  lg:h-screen  w-full  lg:flex overflow-hidden  flex-col gap-2 justify-center items-center"> 
      <div className='lg:mb-6 flex flex-col items-center text-center justify-center mt-12 sm:my-24  '>
      <div className=" text-white  text-2xl  sm:text-3xl  text-nowrap prifont font-light">Welcome To Edu_Tech</div>
       <div className="text-xm font-normal sm:text-lg text-white text-nowrap py-2 font">
         WHERE PROBLEM MEETS SOLUTIONS 
       </div>
       
       <div className="h-48 w-48 sm:h-64 sm:w-64  lg:w-96 mt-8">
        <img src={loginimage} alt="login image" className=""  />
       </div>
       </div>
     </div>
 
       <div className='  bg-white text-black flex flex-col  '>
           <div className='bg-gray-100 lg:rounded-2xl lg:h-fit  w-full lg:w-96 lg:my-16 mx-auto '>
           <div className='text-center text-2xl sm:text-3xl  lg:text-2xl font-semibold capitalize lg:pt-8 sm:pt-4 my-8 text-blue-800 '>login form</div>
           <div className='grid grid-rows-2 gap-6 sm:mx-10 mx-6 text-center sm:mt-11  lg:mt-10 '>
              


              <div className="flex flex-col  ">
               <div className="flex border border-zinc-400 gap-2 p-1 px-3 items-center rounded-lg">
                     <MdOutlineFingerprint className="w-5 h-5 " />
                     <input
                       name="email"
                       type="text"
                       placeholder=" Email or username "
                       autoComplete="off"
                       className="h-10   outline-none bg-transparent w-full justify-start "
                       onChange={(e)=>{
                         setFieldValue("email",e. target.value)
                       }}
                     />

                   </div>
                     <ErrorMessage name="email" component={"div"} className="text-red-500  text-start"/>
                     </div>
 

                <div className="flex flex-col">
               <div className="flex  border border-zinc-400 gap-2 items-center p-1 px-1 rounded-lg">
                     <FaLock className="w-10" />
                     <input
                       name="password"
                       id="password"
                       type={visible?"text":"password"}
                       placeholder="Password"
                       autoComplete="off"
                       className="h-10 w-full pr-2 bg-transparent  outline-none"
                       onChange={(e)=>{
                         setFieldValue("password",e.target.value)
                       }}
                     />
                     <button onClick={()=>setVisible(!visible)} className=" relative right-2 pt-1  ">{visible?<IoEyeOutline/>:<BsEyeSlashFill/>}
                     </button>
                   </div>
                     <ErrorMessage name="password" component={"div"} className="text-red-500 text-start "/>
                   </div>
                 
               
               {/* <ReCAPTCHA className='w-full '
                     sitekey=" 6LfC_ngpAAAAAEqisEc9e4MFHS1Ac5LDfwcp1XdZ"
                   /> */}
 <Link to={'/forgot'}>
 <div className=" text-center font-semibold flex justify-end  text-blue-600"> Forgot your password?</div>
 </Link>
 <input type='submit'
 value={'Login'}
 className='h-10 w-full cursor-pointer bg-blue-700 shadow-xl text-white rounded-2xl'/>
 </div>
 
 
 
 <div className=" flex my-4 items-center text-center   w-full  justify-center  gap-1">
  <div className="">Don't have an account?</div>
   <Link to={'/registration'}   >         
 <div className=" font-semibold text-blue-600 ">Create an account</div>
 </Link>   
 </div>             
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
