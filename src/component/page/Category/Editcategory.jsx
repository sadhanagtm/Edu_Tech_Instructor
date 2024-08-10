import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import * as Yup from "yup"
import { MdCategory } from "react-icons/md";
import { useLocation } from "react-router";
const schema =Yup.object().shape({
  name:Yup.string().required("This field is required"),
  image:Yup.string().required("This field is required")
})
function Editcategory() {
  const [category,setCategory]=useState([]);
  const location=useLocation();

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

  const handleImageChange = (e) => {
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

  const getdata = (id) => {
    try {
      axios
        .get(`/category/${id}`)
        .then((res) => {
          console.log(res);
          setCategory([res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(location,"asa")

    if (location && location.state && location.state.id) {
      getdata(location.state.id);
    }
  }, []);


  return (
    <div className="mt-20">
      {
        console.log(category)
      }
      {category && category.length>0 &&(

      <Formik
        initialValues={{
          name: category && category.length>0? category[0].name:"",
          oldimage: category && category.length>0? category[0].image:"",
          image:""
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("image", values.image);
            axios
              .patch("/category/", formData)
              .then((res) => {
                console.log(res);
                toast.success("Save Successfully");
                setredirect((prev) => !prev);
               
                setCategory([...res.data.data]);
              })
              .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
              });
          } catch (error) {
            console.log(error);
          }

          console.log(values);
          resetForm();
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <Form onSubmit={handleSubmit} className="">
              <Toaster />
              {console.log(values,category)}
              <div className=" lg:ml-64 mt-24 mx-6 lg:mx-12     ">
              <div className="flex gap-2  ">
               <div className=" flex items-center pt-1  text-purple-950"><MdCategory  className="h-6 w-6"/></div>
               <div className=" font-bold font text-2xl text-purple-800 ">Category</div>
               </div>
              <div className="   flex flex-col gap-5 mt-8  ">
                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Name
                  </div>
                  <div>
                    <Field
                      name="name"
                      type="text"
                       autoComplete="off"
                      className="outline-none h-8 w-full  outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                      }}
                    />
                    <ErrorMessage
                        name="name"
                     component={"div"}
                    className="text-red-600"
                         />
                  </div>
                </div>

               
                  {/* <div className="text-left mt-5">
                    <div className="text-lg font-medium text-purple-700 py-2">
                      Upload Image
                    </div>
                    <div onClick={handleImageClick} className="sm:w-72 w-full">
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-72 sm:w-72 w-full border object-contain "
                          alt="image"
                          name="image"
                        />
                      ) : (
                        <img
                        src={`http://192.168.100.31.8080/public/${values.oldimage}`}
                        className="h-72 sm:w-72"
                        alt=""
                       name="image"/>
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
                      <ErrorMessage
                        name="image"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div> */}

<div className="text-left mt-5">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Upload Image
                      </div>
                      <div onClick={handleImageClick} className=" border sm:w-48 ">
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                            className="h-48  lg:w-48 sm:w-48 object-contain"
                            alt=""
                            name="image"
                          />
                        ) : (
                          
                          <img
                          src={`http://192.168.1.95:8080/public/${values.oldimage}`}
                          className="h-48  lg:w-48 sm:w-48"
                          alt=""
                          name="image"
                        />


                        )}
                        <input
                          name="image"
                          type="file"
                          ref={inputRef}
                          accept="image/*"
                          onChange={(e) => {
                            setFieldValue("image", e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>

                  <div className="text-left flex gap-5  ">
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
                      className="bg-green-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-green-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
             
            </Form>
          );
        }}
      </Formik>
      )}
    </div>
  );
}

export default Editcategory;