import React from 'react'
import { useNavigate } from 'react-router';
import axios from "../../Hoc/Axios";

import toast, { Toaster } from "react-hot-toast"
import { Form, Formik } from 'formik';

const address=[
  {name:"district", type:"text",placeholder:"",label:"District"},
  {name:"province", type:"text",placeholder:"",label:"Province"},
  {name:"municipality", type:"text",placeholder:"",label:"Municipality"},
  {name:"wardNo", type:"text",placeholder:"",label:"Ward No"},
  {name:"tole", type:"text",placeholder:"",label:"Tole"},
]

function Addreess({handleNext}) {
  const Navigate =useNavigate()
  return (
    <Formik
    initialValues={{
   district:"",
   province:"",
   municipality:"",
   wardNo:"",
   tole:""
    }}

// validationSchema={schema}
onSubmit={(values) => {
 console.log(values);
     try {
       axios
         .post("/user/auth/ ", values)
         .then((res) => {
           console.log("user data", res);
           toast.success("Submit Successfully");
           handleNext()

           // Navigate("/");
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
    <div>
      <Toaster/>
      
      
 <Form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-5 mx-8 mt-12">
  {address.map((val,i)=>{
    return(
      <div className="flex flex-col">
      <label className="px-2">
        {val.label}
      </label>
      <input
        name={val.name}
        type={val.type}
        placeholder={val.placeholder}
        className="outline-blue-200 px-3  border border-gray-200 h-12 w-full rounded-xl"
        onChange={(e) => {
          setFieldValue(val.name, e.target.value);
        }}
      /> 
    </div>
    )
  })}
                <div className=" flex justify-end  relative top-20 mx-10  ">
                <button
                  type="submit"
                  className="w-32  h-10 rounded-3xl text-center text-white bg-ternary "
                >
                  NEXT
                </button>
              </div>
              </Form>
              </div>
  )}}
        </Formik>
  )
}

export default Addreess