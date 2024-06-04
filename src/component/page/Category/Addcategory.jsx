import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import * as Yup from "yup"
const schema =Yup.object().shape({
  name:Yup.string().required("This field is required"),
  image:Yup.string().required("This field is required")
})
function Addcategory() {
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

  return (
    <div className="mt-20 ml-72">
      <Formik
        initialValues={{
          name: "",

          image: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("image", values.image);
            axios
              .post("/category/", formData)
              .then((res) => {
                console.log(res);
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
              <div className=" lg:ml-64  left-0 mx-6 lg:mx-12 absolute">
              <div className="   flex flex-col gap-5 ">
                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Name
                  </div>
                  <div>
                    <Field
                      name="name"
                      type="text"
                      className="outline-none h-10 w-full outline-gray-200"
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

               
                  <div className="text-left mt-10">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Upload Image
                    </div>
                    <div onClick={handleImageClick}>
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-52 w-52"
                          alt="image"
                          name="image"
                        />
                      ) : (
                        <div className="h-52 w-52  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
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
                      <ErrorMessage
                        name="image"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div>


                  <div className="text-left flex gap-5  my-5">
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
              </div>
             
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Addcategory;