import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoMdRocket } from "react-icons/io";
import { FaLock, FaRocket } from "react-icons/fa6";
import { number } from "yup";
import axios from "../../Hoc/Axios";
import {Link, useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
import registerimg from '../../assets/registration.svg'
import * as Yup from "yup";
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("This field is required"),
    
    
    lastName: Yup.string()
    .required("This field is required"),

    phone:Yup.string()
    .matches(/^\d{10}$/,"Phone number must be 10 digits")
    .required("This field is required"),

    address: Yup.string()
    .required("This field is required"),
   
  email: Yup.string()
  .email("Invalid Email address format")
  .required("This field is required"),

  password: Yup.string()
        .min(5, "Password must be 5 characters at minimum")
        .required("Password is required")
        // .matches(
          // /[!@#$%^&(),.{}|<>]/,
      //  "Password must contain at least one symbol" )
         .matches(/[0-9]/,"Password must contain at leastnumber ")
        //  .matches(/[A-Z]/,"Password must contain at one uppercase letter ")
        //  .matches(/[a-z]/,"Password must contain at one lowercase letter ")

});
function Registration() {
  const Navigate=useNavigate()
  const[password,setPassword]=useState("")
  const[visible,setVisible]=useState(false)
  const[loading,setLoading]=useState(false)
  
  return (
    <div className="sm:h-screen  w-full  box lg:flex ">
      <Toaster />
     
      <div className=" mx-2 py-3 sm:py-4 lg:py-3  lg:flex lg:items-center">
       
      <img src={registerimg} className="sm:h-96 sm:mx-auto  "/>
    
        
       </div>

<div className="w-full  ">
      <div className=" bg-gray-100 h-fit  mx-3 sm:mx-8 sm:mt-20   rounded-xl   relative bottom-3  lg:top-5 lg:right-3">
        <div className=" flex justify-center mt-9 sm:pt-8 pt-6 sm:text-4xl text-2xl font-semibold">
          Registration Form
        </div>

        <Formik
          initialValues={{
            middleName:"",
            firstName: "",
            phone:'',
            email: "",
            lastName: "",
            password: "",
            address:""
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            setLoading(true)
            try {
        
              axios
                .post("/user/auth/register/instructor/user", values)
                .then((res) => {
                  
                  console.log("user data",res);
                   toast.success("Register Successfully")
            
                   Navigate("/login")
                   setLoading(false)
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("something went wrong")
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
       <div className=" mx-5 ">
          <Form
          // key={i}
          onSubmit={handleSubmit}
          
          className=" sm:grid sm:grid-cols-2 gap-5 flex flex-col mt-6 sm:mt-10 ">
            <Toaster />
              {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              )}
           
            <div className="flex flex-col">
            <input
                       name="firstName"
                       type="text"
                       placeholder=" First name "
                       className="outline-blue-200 px-3  border-2 border-gray-200 h-12 w-full"
                       onChange={(e)=>{
                         setFieldValue("firstName",e.target.value)
                       }}
                     />
                       <ErrorMessage name="firstName" component={"div"} className="text-red-600" />
                       </div>
                       <div className="flex flex-col">
                     <input
                       name="phone"
                       type="number"
                       placeholder=" Phone number"
                       className="outline-blue-200 px-3  border-2 border-gray-200 h-12 w-full"
                       onChange={(e)=>{
                         setFieldValue("phone",e.target.value)
                       }}
                     />
                     <ErrorMessage name="phone" component={"div"} className="text-red-600" />
                      </div>

                      <div className="">
                     <input
                       name="middleName"
                       type="text"
                       placeholder=" Middle name "
                       className="outline-blue-200 px-3  border-2 border-gray-200 h-12 w-full"
                       onChange={(e)=>{
                         setFieldValue("middleName",e.target.value)
                       }}
                     />
                         
                          </div>

                      <div className="flex flex-col">
                      <input
                       name="email"
                       type="email"
                       placeholder=" Email "
                       className="outline-blue-200 px-3  border-2 border-gray-200 h-12 w-full"
                       onChange={(e)=>{
                         setFieldValue("email",e.target.value)
                       }}
                     />
                     <ErrorMessage name="email" component={"div"} className="text-red-600" />
                     </div>

                     <div className="">
                    <input
                       name="lastName"
                       type="text"
                       placeholder=" Last name "
                       className="outline-blue-200 px-3  border-2 border-gray-200 h-12 w-full"
                       onChange={(e)=>{
                         setFieldValue("lastName",e.target.value)
                       }}
                     />
                     <ErrorMessage name="lastName" component={"div"} className="text-red-600" />
                      </div>


<div className="flex flex-col ">
                      <div className=" flex">
              <input  
                name="password"
                id="password"
                type={visible?"text":"password"} 
                autoComplete="off"
                placeholder="Password"
                className="h-12 w-full  outline-none  border-2  px-3 "
                onChange={(e) => {
                    setFieldValue("password", e.target.value);
                  }}
              />
              <button onClick={()=>setVisible(!visible)} className="h-12 border-2   ">{visible?<IoEyeOutline/>:<BsEyeSlashFill/>}
              </button>
              </div>
              
               <ErrorMessage name="password" component={"div"} className="text-red-600" />
               </div>
                 <div className="flex flex-col" >
                    <input
                       name="address"
                       type="text"
                       placeholder="Address "
                       className="outline-blue-200 px-3  border-2 border-gray-200 h-12 w-full"
                       onChange={(e)=>{
                         setFieldValue("address",e.target.value)
                       }}
                     />
                       <ErrorMessage name="address" component={"div"} className="text-red-600" />
                       </div>

            <input
            
            type="submit"
            value={"Register"}
            className="font-semibold sm:h-12 h-10 w-36 mb-5 bg-primary   text-white text-center rounded-2xl cursor-pointer focus:bg-green-800"
           
            /> 
          </Form>
          </div>
          );
         }}

        </Formik>
      </div>
      </div>
</div>


    
  );
}

export default Registration;