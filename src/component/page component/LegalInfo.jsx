import React from 'react'
import { ErrorMessage, Formik,Form, Field } from "formik";
import axios from "../../Hoc/Axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

const schema=Yup.object().shape({
panNo:Yup.string().required("This field is required"),
citizenshipNo:Yup.string().required("This field is required"),

}

)
const legal=[
  {
    name:"panNo" ,type:"number",placeholder:" " , label:"Pan No."},

    {name:"citizenshipNo" ,type:"number",placeholder:" ",  label:"Citizenship No."
  }
]

function LegalInfo({handleNext}) {
  const Navigate= useNavigate();
  return (
       <Formik
       initialValues={{
        panNo:"",
        citizenshipNo:"",

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
        return(

    <div>
     <Toaster/>

 <Form onSubmit={handleSubmit} className=" flex gap-8  w-full mx-16 mt-14">
 {legal.map((val, i) => {
  
              return(
                <div className="flex flex-col w-full ">
                  <label className="px-2">{val.label}</label>
                  <Field
                    name={val.name}
                    type={val.type}
                    placeholder={val.placeholder}
                    className="outline-blue-200 px-3  border border-gray-300 h-12 w-full rounded-xl"
                    onChange={(e) => {
                      setFieldValue(val.name, e.target.value);
                    }}
                  />
                   <ErrorMessage
                    name={val.name}
                    component={"div"}
                    className="text-red-600"
                  />
                </div>

) } )} 
               
             
             <div className='  relative top-20 right-36 my-1  '>
                <button type='submit' className='w-32  h-10 rounded-3xl   text-center  text-white bg-ternary'>
               NEXT
             </button>
             </div>
              </Form>
    </div>
        )}}
        </Formik>
      
  )
}

export default LegalInfo