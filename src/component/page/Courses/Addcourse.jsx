
import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { duration } from "@mui/material";
import { RiVideoUploadLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as Yup from "yup"
const schema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  price: Yup.string().required("This field is required"),
  duration: Yup.string().required("This field is required"),
  discount: Yup.string().required("This field is required"),
  rating: Yup.string()
  .matches(/^[0-5]$/,"Rating should be up to 5 only")
  .required("This field is required"),
  tags: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
  overview: Yup.string().required("This field is required"),
  
});

function Addcourse() {
  
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
  const videoRef = useRef(null);
const handleVideoClick = () => {
  videoRef.current.click();
};

const handleVideoChange = () => {
  const file = e.target.files[0];
  console.log(file);
  setVideo(e.target.files[0]);
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
          name: "",
          price: "",
          duration: "",
          description: "",
          image: "",
          rating: "",
          tags: "",
          discount: "",
          overview:""
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("duration", values.duration);
            formData.append("description", values.description);
            formData.append("rating", values.rating);
            formData.append("tags", values.tags);
            formData.append("discount", values.discount);
            formData.append("image", values.image);
            formData.append("overview", values.overview);

            axios
              .post("/course/", formData)
              .then((res) => {
                console.log(res);
                toast.success("Post Successful");
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
                <div className=" lg:grid lg:grid-cols-3 gap-8  sm:grid sm:grid-cols-2 flex flex-col ">
                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Name
                    </div>
                    <div>
                      <input
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

                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Price
                    </div>
                    <div>
                      <input
                        name="price"
                        type="number"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("price", e.target.value);
                        }}
                      />
                      <ErrorMessage
                        name="price"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Duration
                    </div>
                    <div>
                      <input
                        name="duration"
                        type="text"
                        className="outline-none h-10 w-full outline-gray-200 capitalize"
                        onChange={(e) => {
                          setFieldValue("duration", e.target.value);
                        }}
                      />
                        <ErrorMessage
                        name="duration"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                    
                  </div>


                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Rating
                    </div>
                    <div>
                      <input
                        name="rating"
                        type="number"
                     className="outline-none h-10 w-full outline-gray-200"
                      onChange={(e) => {
                      setFieldValue("rating",e.target.value);
                        }}
                      />
                      <ErrorMessage
                    name="rating"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Discount
                    </div>
                    <div>
                      <input
                        name="discount"
                        type="percentge"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("discount", e.target.value);
                        }}      
                      />
                      <ErrorMessage
                        name="discount"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Tags
                    </div>
                    <div>
                      <input
                        name="tags"
                        type="text"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("tags", e.target.value);
                        }}
                      />
                      <ErrorMessage
                        name="tags"
                     component={"div"}
                    className="text-red-600"
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
                          className="h-56  w-56 cursor-pointer"
                          alt="image"
                          name="image"
                        />
                      ) : (
                        <div className="h-56 w-56  cursor-pointer border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
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

                  <div className="text-left mt-10 w-full ">
                    <div className="text-lg font-medium text-purple-700 mb-2 ">
                      Description
                      <JoditEditor
                        ref={editor}
                        value={content}
                       className="text-black w-full"
                        tabIndex={1} 
                        onBlur={(newContent) => setContent(newContent)}
                        onChange={(newContent) => {
                            setFieldValue("description", e.target.value);
                        }}
                      />
                      <ErrorMessage
                        name="description"
                     component={"div"}
                    className="text-red-600 font-normal"
                         />
                    </div>
                  </div>

                  <div className=" mt-10 w-full ">
                  <div className="">
                    <div className="text-lg  font-semibold  text-purple-700 mb-2">
                      Upload Course Video
                    </div>
                    <div onClick={handleVideoClick}>
                      {values.overview ? (
                        <video controls
                        src={URL.createObjectURL(values.overview)}
                        alt="video"
                        name="overview"
                        className="w-full  height={200}  bg-black controls={true} muted={true} loop={true} autoPlay={true}border border-black cursor-pointer"
                        />
                      ) : (
                        <div className=" h-56 w-56 cursor-pointer  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                          <div className="text-5xl ">
                          <RiVideoUploadLine/>
                          </div>
                          <div>Click to upload</div>
                        </div>
                      )}
                      <input
                        name="overview"
                        type="file"
                        ref={videoRef}
                        className="w-full height={200} bg-black controls={true}  muted={true} loop={true} autoPlay={true} "
                        onChange={(e) => {
                          setFieldValue("overview", e.target.files[0]);
                        }}
                        style={{ display: "none" }}
                      />
                      <ErrorMessage
                        name="overview"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div>
                {/* <video src="/Videos/video.mp4"  width={1090} height={200}  controls={true}  muted={true} loop={true} autoPlay={true} className=" bg-black"/> */}
              </div>


                  <div className="text-left flex gap-6 my-5 ">
                    <button
                      onClick={() => {
                        Navigation(-1);
                      }}
                      type="button"
                      className="bg-red-600 h-11 my-5 w-24 shadow-2xl text-lg rounded-lg text-center text-white hover:bg-red-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-indigo-600 h-11 my-5 w-24 shadow-2xl text-lg rounded-lg text-center text-white hover:bg-indigo-500"
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
export default Addcourse;
        






             










