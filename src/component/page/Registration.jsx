import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
    <div className="h-screen w-full m-auto box flex ">
      <Toaster />
      <div className="flex  text-4xl text-white relative top-24 left-52 ">
        <div className=" animate-bounce   h-32 ">
          <FaRocket />
        </div>
      </div>

      <div className=" text-white  w-2/4 relative top-32 left-28 ">
        <div className="text-4xl font-semibold "> Welcome to</div>
     <div>
      <img src="/src/image/Lopho.png" className="w-48 mt-3"/>
     </div>
        
      </div>

      <div className=" bg-gray-100 h-5/6 w-11/12  m-auto  relative right-10">
        <div className=" flex justify-center mt-14 text-4xl font-semibold">
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

          <Form
          // key={i}
          onSubmit={handleSubmit}
          className=" grid grid-cols-2 gap-5 w-11/12 m-auto mt-9 ">
           
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
            className="font-semibold h-12 w-36 bg-primary   text-white text-center rounded-2xl cursor-pointer focus:bg-green-800"
           
            />

            
            
          </Form>
          );
         }}

        </Formik>
      </div>




</div>


    
  );
}

export default Registration;