import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";

function Editinstructor() {
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
          lastName: "",
          middleName: "",
          password: "",
          email: "",
          phone: "",
          address: "",
          image: "",
        }}
        onSubmit={(values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("middleName", values.middleName);
            formData.append("password",values.password);
            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("image", values.image);
            formData.append("address", values.address);

            axios
              .post("/instructor/", formData)
              .then((res) => {
                console.log(res, "insdATA");
                toast.success("Login Successful");
                setredirect((prev) => !prev);
                localStorage.setItem("token", res.data.accesstoken);
                Navigate("/");
                // setcourse([...res.data.data]);
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
            <Form onSubmit={handleSubmit}>
              <Toaster />
              <div className=" lg:ml-64 mt-24 mx-6 lg:mx-12 ">
                <div className=" lg:grid lg:grid-cols-3  gap-10 flex flex-col sm:grid sm:grid-cols-2  ">


                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    First Name
                  </div>
                  <div>
                    <Field
                      name="firstName"
                      type="text"
                     
                      className="outline-none h-10 w-full outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("firstName", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Last Name
                  </div>
                  <div>
                    <Field
                      name="lastName"
                      type="text"
                      
                      className="outline-none h-10 w-full outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("lastName", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Middle Name
                  </div>
                  <div>
                    <Field
                      name="middleName"
                      type="text"
                     
                      className="outline-none h-10 w-full outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("middleName", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Password
                  </div>
                  <div>
                    <Field
                      name="password"
                      type="password"
                     
                      className="outline-none h-10 w-full outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("password", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Email
                  </div>
                  <div>
                    <Field
                      name="email"
                      type="email"
                      
                      className="outline-none h-10 w-full outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("email", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Address
                  </div>
                  <div>
                    <Field
                      name="address"
                      type="text"
                    
                      className="outline-none h-10 w-full outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("address", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Phone Number
                  </div>
                  <div>
                    <Field
                      name="phone"
                      type="number"
                     
                      className="outline-none h-10 w-full outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("phone", e.target.value);
                      }}
                    />
                  </div>
                </div>

                </div>

                
                  <div className="text-left mt-10 ">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Upload Image
                    </div>
                    <div onClick={handleImageClick}>
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-52 w-52"
                          alt=""
                          name="image"
                        />
                      ) : (
                        <div className="h-52  w-52  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
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

export default Editinstructor;