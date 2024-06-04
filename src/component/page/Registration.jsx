import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoMdRocket } from "react-icons/io";
import { FaRocket } from "react-icons/fa6";
import { number } from "yup";
import axios from "../../Hoc/Axios";
import {Link, useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
import * as Yup from "yup";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("This field is required"),
    
    
    lasttName: Yup.string()
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
        .min(8, "Password must be 8 characters at minimum")
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
  
  return (
    <div className="sm:h-screen  w-full  box lg:flex ">
      <Toaster />
     
      <div className=" text-white  lg:w-2/4 s sm:m-auto  flex flex-col justify-center items-center ">
        <div className="flex gap-2 mt-4 sm:mt-24 lg:mt-0">
        <div className="sm:text-4xl text-2xl font-semibold pt-4  "> Welcome to</div>
        <div className=" animate-bounce mt-5   ">
        <IoMdRocket className="h-8 w-8"/>
        </div>
        </div>
        <h1>hello ,i am mausu</h1>
        <div>hello div added</div>
     <div>
      <img src="/src/image/Lopho.png" className="w-48 sm:h-14 h-12 sm:mt-3"/>
     </div>
        
       </div>

<div className="w-full  ">
      <div className=" bg-gray-100 h-fit sm:h-100 mx-3 sm:mx-8 sm:mt-20     rounded-xl   relative bottom-3  lg:top-5 lg:right-10">
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
            try {
        
              axios
                .post("/instructor/auth/register", values)
                .then((res) => {
                  
                  console.log("user data",res);
                   toast.success("Register Successfully")
            
                   Navigate("/login")
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("something went wrong")

                  
                });
            } catch (error) {
              console.log(error);
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
                     <ErrorMessage name="firstName" component={"div"} className="text-red-600" />
                      </div>


                     <div className="flex flex-col">
                     <input
                       name="password"
                       type="password"
                       placeholder=" Password "
                       className="outline-blue-200 px-3  border-2 border-gray-200 h-12 w-full"
                       onChange={(e)=>{
                         setFieldValue("password",e.target.value)
                       }}
                     />
                    <ErrorMessage name="password" component={"div"} className="text-red-600" />
                    </div>

                 <div className="flex flex-col" >
                    <input
                       name="address"
                       type="text"
                       placeholder=" Address "
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