import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation} from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { duration } from "@mui/material";
import { useLocation } from "react-router-dom";
import { RiVideoUploadLine }from "react-icons/ri";
import { ClipLoader } from "react-spinners";


function Edittestimonial(){
 const[loading,setLoading]=useState(false)
  const [value, setFieldValue] = useState("");
  const [testimonial, setTestimonial] = useState([]);

  const location = useLocation();
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
        Navigation("/viewtestimonial");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect]);

  const getdata = (id) => {
    try {
      axios
        .get(`/testomonial/${id}`)
        .then((res) => {
          console.log(res);
          setTestimonial([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(location,"right")
    if (location && location.state && location.state.id) {
      getdata(location.state.id);
    }
  }, []);
        
  return (
    <div className="mt-24 lg:ml-52">
      {console.log(testimonial,"ds")}
      {testimonial && testimonial.length > 0 && (
        <Formik
          initialValues={{
            name: testimonial && testimonial.length > 0 ? testimonial[0].name : "",
           oldimage: testimonial && testimonial.length > 0 ? testimonial[0].image : "",
            image:"",
            oldvideo: testimonial && testimonial.length > 0 ? testimonial[0].video : "",
            video:"",

            
            desc:
            testimonial && testimonial.length > 0 ? testimonial[0].desc:"",
          facebook:  testimonial && testimonial.length > 0 ? testimonial[0].facebook:"",
           instagram: testimonial && testimonial.length > 0 ? testimonial[0].instagram:"",
           linkedin: testimonial && testimonial.length > 0 ? testimonial[0].linkedin:"",
           
           
          }}
          onSubmit={(values, { resetForm }) => {
            setLoading(true)
            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("facebook", values.facebook);
              formData.append("instagram", values.instagram);
              formData.append("linkedin", values.linkedin);
             formData.append("desc", values.desc);
              formData.append("image", values.image);
              formData.append("video", values.video);
            axios
            .patch(`/testomonial/${location.state.id}` ,formData)
            .then((res)=>{
              console.log(res);
              toast.success("Save Successfully");
              setredirect((prev)=>!prev);
              setTestimonial([...res.data.data]);
              setLoading(false)
            })
            .catch((error)=>{
              console.log(error);
              toast.error(error.response.data.message);
              setLoading(false)
            });

            } catch (error) {
              console.log(error);
              setLoading(false)
            }

            console.log(values);
            resetForm();
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => {
            return (
                <Form onSubmit={handleSubmit} className=" flex flex-col gap-5 mt-2 sm:mx-9 mx-5 ">
                <Toaster />
                {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>)}
                
                
                  
                    <div className="text-lg font-semibold  text-purple-700  ">
                     Edit Testinomial
                    </div>
                    
                     <div className="sm:grid sm:grid-cols-2 gap-7 flex flex-col">
                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">Name</div>
                  <input
                    name="name"
                    type="text"
                    autoComplete="off"
                    className="outline-none h-10 w-full outline-gray-200"
                    onChange={(e) => setFieldValue("name", e.target.value)}
                  />
                 
                </div>

                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">Facebook</div>
                  <input
                    name="facebook"
                    type="text"
                    autoComplete="off"
                    className="outline-none h-10 w-full outline-gray-200"
                    onChange={(e) => setFieldValue("facebook", e.target.value)}
                  />
                
                </div>
                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">Instagram</div>
                  <input
                    name="instagram"
                    type="text"
                    autoComplete="off"
                    className="outline-none h-10 w-full outline-gray-200"
                    onChange={(e) => setFieldValue("instagram", e.target.value)}
                  />
                 
                </div>
                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">Linkedin</div>
                  <input
                    name="linkedin"
                    type="text"
                    autoComplete="off"
                    className="outline-none h-10 w-full outline-gray-200"
                    onChange={(e) => setFieldValue("linkedin", e.target.value)}
                  />
                
                </div>
              </div>

                    
                       
                   

                  <div className=" md:grid lg:grid-cols-3  mt-5 sm:grid sm:grid-cols-2 sm:gap-10  gap-7 flex flex-col">
                <div className="text-left  w-full ">
                  <div className=" font-medium text-purple-700 mb-2">
                    Upload Image
                  </div>
                  <div onClick={handleImageClick} className="w-full border">
                    {values.image ? (
                      <img
                        src={URL.createObjectURL(values.image)}
                        className="h-72 object-contain w-full cursor-pointer"
                        alt="image"
                        name="image"
                      />
                    ) : (
                      <img
                      src={`http://192.168.1.106.8080/public/${values.oldimage}`}
                      className="h-72 w-full cursor-pointer object-contain "
                      alt="image"
                     name="image"/>
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
                <div className="  w-full  lg:col-span-2 ">
                <div className="">
                  <div className="  font-semibold  text-purple-700 mb-2">
                    Upload Course Video
                  </div>
                  <div onClick={handleVideoClick} className="w-full">
                    {values.video ? (
                      <video controls
                      src={URL.createObjectURL(values.video)}
                      alt="video"
                      name="video"
                      className="w-full  h-72  bg-black controls={true} muted={true} loop={true} autoPlay={true} border border-black cursor-pointer"
                      />
                    ) : (
                      <div className=" h-72 w-full cursor-pointer border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                        <div className="text-5xl ">
                        <RiVideoUploadLine/>
                        </div>
                        <div>Click to upload</div>
                      </div>
                    )}
                    <input
                      name="video"
                      type="file"
                      ref={videoRef}
                      accept="video/*"
                      className="w-full h-72 bg-black controls={true}  muted={true} loop={true} autoPlay={true} "
                      onChange={(e) => {
                        setFieldValue("video",e.target.files[0]);
                      }}
                      style={{ display: "none" }}
                    />
                    
                  </div>
                </div>
              
            </div>
            </div>
                 
                  <div className=" mt-4 ">
                    <div className=" font-medium text-purple-700 py-2 w-full ">
                      Description
                      </div>
                      <JoditEditor
                        ref={editor}
                        value={values.description}
                        className="text-black font-normal"
                        name="desc"
                        
                        tabIndex={1} 
                        onBlur={(newContent) => setContent(newContent)}
                        onChange={(newContent) => {
                          setFieldValue("desc", newContent);
                        }}
                      />
                   
                  </div>

            
                  <div className="text-left flex gap-5 ">
                    <button
                      type="submit"
                      className="bg-indigo-600 h-11 my-5 w-64 text-lg rounded-xl text-center text-white  hover:bg-indigo-400"
                    >
                      Submit
                    </button>
                  </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}
export default Edittestimonial; 
         


