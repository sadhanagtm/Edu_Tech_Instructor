
import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoArrowBack, IoArrowBackCircle, IoBookSharp, IoChevronBack, IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { duration } from "@mui/material";
import { RiVideoUploadLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import * as Yup from "yup"

// import Post from "../../page component/Post";

const schema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  price: Yup.string().required("This field is required"),
  duration: Yup.string().required("This field is required"),
  discount: Yup.string().required("This field is required"),
  rating: Yup.string()
    .matches(/^[0-5]$/, "Rating should be up to 5 only")
    .required("This field is required"),
  tags: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
  category: Yup.string().required("This field is required"),
  overview: Yup.string().required("This field is required"),
});

const field = [
  { name: "name", type: "text", label: "Name" },
  { name: "price", type: "number", label: "Price" },
  { name: "duration", type: "text", label: "Duration" },
  { name: "discount", type: "text", label: "Discount" },
  { name: "rating", type: "number", label: "Rating" },
  { name: "tags", type: "text", label: "Tags" },
];

function Addcourse() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    axios
      .get("/category")
      .then((res) => {
        setOptions([...res.data.newArr]);
        console.log(res.data, "category ko data");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

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
          overview: "",
          category: ""
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true); // Set loading to true before API call
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
            formData.append("category", values.category);
            console.log(values.overview, 'category value');

            axios
              .post("/course/instructor", formData)
              .then((res) => {
                console.log(res);
                toast.success("Post Successful");
                setredirect((prev) => !prev);
                setcourse([...res.data.data]);
                resetForm();
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
                setLoading(false);
              });
          } catch (error) {
            console.log(error);
            setLoading(false); 
          }

          console.log(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Toaster />
              {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              )}
              <div className=" lg:ml-64 mt-24 mx-6 lg:mx-12 ">
                <Link to={"/coursetable"}>
                  <div className=" bg-zinc-300 h-8 w-8 px-1 pt-1 text-center text-black rounded-full float-end hover:bg-zinc-400">
                    <IoChevronBack className="h-5 w-5" />
                  </div>
                </Link>

                <div className="flex gap-2 mt-4 ">
                  <div className=" font-bold font text-2xl text-purple-800 ">
                    Courses
                  </div>
                  <div className=" flex items-center pt-1 underline text-blue-400">
                    <IoBookSharp className="h-6 w-6" />
                  </div>
                </div>

                <div className="lg:grid lg:grid-cols-3 gap-8 mt-8 sm:grid sm:grid-cols-2 flex flex-col ">
                  {field.map((val, i) => {
                    return (
                      <div className="text-left" key={i}>
                        <div className=" font-medium  text-purple-700 mb-2">
                          {val.label}
                        </div>
                        <div>
                          <input
                            name={val.name}
                            type={val.type}
                            autoComplete="off"
                            className="outline-none h-8 pl-2 w-full outline-gray-200"
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
                      </div>
                    );
                  })}
                </div>

                <div className=" mt-10 w-full">
                  <div className=" font-medium text-purple-700 mb-2  ">
                    Select a Category
                  </div>

                  <select
                    className="outline-none   h-8  outline-gray-200 w-full  "
                    value={values.category}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setFieldValue('category', e.target.value);
                    }}
                  >
                    <option value="">select a category</option>
                    {options.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}{console.log(option.id, 'yo category ko id ho')}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                            name="category"
                            component={"div"}
                            className="text-red-600"
                          />

                </div>


                <div className=" md:grid lg:grid-cols-3 sm:grid sm:grid-cols-2 gap-10  mt-10 flex flex-col">
                  <div className="text-left  w-full ">
                    <div className=" font-medium text-purple-700 mb-2">
                     Upload Image
                   </div>
                   <div onClick={handleImageClick} className="w-full border">                     {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-72 object-contain w-full cursor-pointer"
                          alt="image"
                          name="image"
                        />
                      ) : (
                        <div className="h-72 w-full  cursor-pointer border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                          <div className="text-5xl">
                            <IoCloudUploadSharp />
                          </div>
                          <div>Click to upload</div>
                        </div>
                      )}
                      <input
                        name="image"
                        type="file"
                        accept="image/*"
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
                  <div className="  w-full lg:col-span-2 ">
                  <div className="">
                    <div className="  font-semibold  text-purple-700 mb-2">
                      Upload Course Video
                    </div>
                    <div onClick={handleVideoClick} className="w-full">
                      {values.overview ? (
                        <video controls
                        src={URL.createObjectURL(values.overview)}
                        alt="video"
                        name="overview"
                        className="w-full  h-72  bg-black controls={true} muted={true} loop={true} autoPlay={true}border border-black cursor-pointer"
                        />
                      ) : (
                        <div className=" h-72 w-full cursor-pointer  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
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
                        accept="video/*"
                        className="w-full h-72 bg-black controls={true}  muted={true} loop={true} autoPlay={true} "
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
                
              </div>
              </div>

              

                <div className="mt-10">
                  <div className="font-medium text-purple-700 mb-2">
                    Course Description
                  </div>
                  <JoditEditor
                    ref={editor}
                    value={values.description}
                    onChange={(content) => setFieldValue("description", content)}
                  />
                  <ErrorMessage
                    name="description"
                    component={"div"}
                    className="text-red-600"
                  />
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





             










