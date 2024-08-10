import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios"
import {  IoCloudUploadSharp } from "react-icons/io5";
import * as Yup from "yup"
import { FaChalkboardTeacher } from "react-icons/fa";


const schema = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  middleName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  email: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
  phone: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  image:Yup.string().required("This field is required"),
})
 const field=[
  {name:"firstName",type:"text", label:"First Name"},
  {name:"middleName",type:"text", label:"Middle Name"},
  {name:"lastName",type:"text", label:"Last Name"},
  {name:"email",type:"email", label:"Email Name"},
  {name:"password",type:"text", label:"Password "},
  {name:"phone",type:"number", label:"Phone"},
  {name:"address",type:"text", label:"Address"},
 ]

function Addinstructor() {
  const [value, setFieldValue] = useState("");
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setredirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = () => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    let interval;
    if (redirect) {
      interval = setTimeout(() => {
        Navigation("/");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect]);

  return (
    <div className="mt-20">
      <Formik
        initialValues={{
          firstName: "",
          middleName: "",
          lastName: "",
          password: "",
          email: "",
          phone: "",
          address: "",
          image: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("middleName", values.middleName);
            formData.append("password", values.password);

            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("image", values.image);
            formData.append("address", values.address);

            axios
              .post("/instructor/", formData)
              .then((res) => {
                console.log(res, "insdATA");
                toast.success("Post Successful");
                setredirect((prev) => !prev);
                setinstructor([...res.data.data]);
                resetForm();
              })

              .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
              });
          } catch (error) {
            console.log(error);
          }

          console.log(values);
         
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Toaster />
              <div className=" lg:ml-64 mt-24 mx-6 lg:mx-12">

              
             
              <div className="flex gap-2  ">
               <div className=" flex items-center pt-1  text-purple-950"><FaChalkboardTeacher className="h-6 w-6"/></div>
               <div className=" font-bold font text-2xl text-purple-800 ">Instructor</div>
               </div>
              <div className=" lg:grid lg:grid-cols-3 mt-8  gap-10 flex flex-col sm:grid sm:grid-cols-2  ">
                {
                  field.map((val,i)=>{
                    return(
                      <div className="text-left">
                      <div className=" font-medium text-purple-700 mb-2">
                        {val.label}
                      </div>
                      <div>
                        <Field
                          name={val.name}
                          type={val.type}
                          className="outline-none h-8 pl-2 w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue(val.name, e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    )
                  })
                }
              </div>

                  <div className="text-left mt-10">
                    <div className=" font-medium text-purple-700 mb-2">
                      Upload Image
                    </div>
                    <div onClick={handleImageClick}>
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-52 w-52 cursor-pointer"
                          alt=""
                          name="image"
                          
                        />
                      ) : (
                        <div className="h-52  w-52  border border-black border-dashed flex text-xl flex-col cursor-pointer  justify-center text-center items-center text-gray-400 ">
                          <div className="text-5xl">
                            <IoCloudUploadSharp />
                          </div>
                          <div>Click to upload</div>
                        </div>
                      )}
                      <input
                        name="image"
                        type="file"
                        ref={inputRef}
                        onChange={(e) => {
                          setFieldValue("image", e.target.files[0]);
                        }}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                
                  <div className="text-left flex gap-6 my-5 ">
                    <button
                      onClick={() => {
                        Navigation(-1);
                      }}
                      type="button"
                      className="bg-red-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-indigo-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                    >
                      Post
                    </button>
                  </div>
                </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Addinstructor;