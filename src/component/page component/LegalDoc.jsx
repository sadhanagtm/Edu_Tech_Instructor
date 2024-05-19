import React, { useRef, useState } from 'react'
import { ErrorMessage, Formik,Form, Field } from "formik";
import axios from "../../Hoc/Axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { IoCloudUploadSharp } from 'react-icons/io5';

const schema=Yup.object().shape({
    citizenshipFront: Yup.string().required("Please upload your document "),
    citizenshipBack:Yup.string().required("Please upload your document "),
    
}
)

const doc=[
  {name:"citizenshipFront", type:"file", label:"Citizenship Front"},
  {name:"citizenshipBack", type:"file", label:"Citizenship Back"},
  {name:"passport", type:"file", label:"Passport"},
]

function LegalDoc({handleNext}) {
  const Navigate=useNavigate();

  const[image,setImage]=useState()
  const inputRef=useRef(null)
   const handleImageClick=()=>{
     inputRef.current.click();
   }
 const handleImageChange=()=>{
   const file = e.target.files[0];
   console.log(file);
   setImage( e.target.files[0]);
 }
  return (
    <Formik
    initialValues={{
      citizenshipFront:"",
      citizenshipBack:"",
      passport:"",
    }}

    //  validationSchema={schema}
     onSubmit={(values,{resetForm}) => {
      console.log(values);
      try {
        const formData = new formData();
        formData.append("citizenshipFront", values.citizenshipFront);
        formData.append("citizenshipBack", values.citizenshipBack);
        formData.append("passport", values.passport);
        // formData.append("image", values.image);
        axios
          .post("/user/auth/ ", formData)
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
      console.log(values)
      // resetForm();
    }}
    >
  
    {({ handleSubmit, setFieldValue, values }) => {
      return(
    <div>
<Toaster/>
<Form onSubmit={handleSubmit}  >
  <div className='flex justify-center gap-12  mt-14 '>
          {
            doc.map((val,i)=>{
              return(
                 <div className=' flex justify-center '>
                 <div className=" flex flex-col  ">
                      <label className=" font-medium text-blue-700 text-center  ">
                        {val.label}
                      </label>
                      <div onClick={handleImageClick} className='cursor-pointer'>
                        {values.doc ? (
                          <img
                            src={URL.createObjectURL(values.name)}
                            alt=""
                            name="image"
                          />
                        ) : (
                          <div className="h-48  w-48  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                            <div className="text-5xl">
                              <IoCloudUploadSharp />
                            </div>
                            <div>Click to upload</div>
                          </div>
                        )}
                        <input
                          name={val.name}
                          type={val.type}
                          ref={inputRef}
                          onChange={(e) => {
                            setFieldValue(val.name, e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
                   <ErrorMessage name={val.name} component={"div"}
                    className="text-red-600" />
                    </div>
              </div>
              )
            })
          }     
             </div> 


             <div className=' flex justify-end mx-16 relative top-14' > 
                <button type='submit' className='w-32  h-10 rounded-3xl   text-white bg-ternary'>
               Next
             </button>
             </div>


              </Form>
    </div>
  )}}
  </Formik>
  )
}

export default LegalDoc