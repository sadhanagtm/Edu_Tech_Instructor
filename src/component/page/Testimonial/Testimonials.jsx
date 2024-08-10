
// import React, { useRef, useState, useEffect } from "react";
// import { BsFillEyeFill } from "react-icons/bs";
// import { Field, Formik, Form, ErrorMessage } from "formik";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import axiosinstance from "../../../Hoc/Axios";
// import { IoCloudUploadSharp } from "react-icons/io5";
// import JoditEditor from "jodit-react";
// import { Link } from "react-router-dom";
// import { ClipLoader } from "react-spinners";

// import * as Yup from "yup";

// const schema = Yup.object().shape({
//   name: Yup.string().required("This field is required"),
//   desc: Yup.string().required("This field is required"),
//   video: Yup.string().required("This field is required"),
//   image: Yup.string().required("This field is required"),
// });

// function Testimonials() {
//   const [content, setContent] = useState("");
//   const inputRef = useRef(null);
//   const videoRef = useRef(null);
//   const [redirect, setRedirect] = useState(false);

//   const[loading,setLoading]= useState(false);
//   const[testimonial,setTestimonial]=useState()
//   const editor = useRef(null);
//   const navigate = useNavigate();

//   const handleImageClick = () => {
//     inputRef.current.click();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFieldValue("image", file);
//   };

//   const handleVideoClick = () => {
//     videoRef.current.click();
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setFieldValue("video", file);
//   };

//   useEffect(() => {
//     if (redirect) {
//       setTimeout(() => {
//         navigate("/viewtestimonial");
//       }, 2000);
//     }
//   }, [redirect, navigate]);

//   return (
//     <div className="lg:ml-56 mt-24 lg:mx-5">
//        <div className="h-16 flex justify-between">
//          <div className="sm:text-2xl text-xl font-semibold text-purple-800 ml-4">
//           Testimonial
//         </div>

//        <Link to={"/viewtestimonial"}>
//           <div className="flex gap-2 justify-between mr-5 bg-red-700 rounded-xl h-10 w-42 px-2 font-semibold text-white items-center cursor-pointer">
//             View
//             <BsFillEyeFill className="text-base sm:text-lg mt-1" />
//            </div>
//         </Link>
//       </div>

//       <div className="mt-6 w-full">
//         <Formik
//           initialValues={{
//             name:"",
//             desc: "",
//             video: "",
//             image: "",
//             linkedin:"",
//             instagram:"",
//             facebook:"",
//           }}
//           validationSchema={schema}
//           onSubmit={(values, { resetForm }) => {
//             setLoading(true);

//             try{

//               const formData = new FormData();
//               formData.append("name", values.name);
//               formData.append("desc", values.desc);
//               formData.append("image", values.image);
//               formData.append("video", values.video);
//               formData.append("linkedin", values.linkedin);
//               formData.append("facebook", values.facebook);
//               formData.append("instagram", values.instagram);
  
//               axiosinstance
//                 .post("/testomonial", formData)
//                 .then((res) => {
//                   setTestimonial(res.data.userData)
//                   toast.success("Post Successful");
//                   setRedirect(true);
//                   resetForm();
//                  setLoading(true); 

//                 })
                
//                 .catch((error) => {
//                   toast.error(error.response.data.message);
//                   setLoading(false);

//                 });
//             } catch (error) {
//               console.log(error);
//               setLoading(false);  
//             }
//           }}
//         >
//           {({ handleSubmit, setFieldValue, values }) => (
//             <Form onSubmit={handleSubmit} className="flex flex-col gap-5 mx-5">
//               <Toaster />

//               {loading && (
//                 <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
//                   <ClipLoader size={50} color={"#123abc"} loading={loading} />
//                 </div>
//               )}
              
              
              
                
//                   <div className="lg:grid lg:grid-cols-3 md:grid sm:grid sm:grid-cols-2 gap-10">
//                     <div className="text-left mt-0 w-full">
//                       <div className="text-lg font-medium text-purple-700 mb-2">
//                         Upload Image
//                       </div>
//                       <div onClick={handleImageClick} className="w-full border">
//                         {values.image ? (
//                           <img
//                             src={URL.createObjectURL(values.image)}
//                             className="h-72 w-full object-contain cursor-pointer"
//                             alt=""
//                           />
//                         ) : (
//                           <div className="h-72 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
//                             <div className="text-5xl">
//                               <IoCloudUploadSharp />
//                             </div>
//                             <div>Click to upload</div>
//                           </div>
//                         )}
//                         <input
//                           name="image"
//                           type="file"
//                           accept="image/*"
//                           ref={inputRef}
//                           onChange={(e) => {
//                             setFieldValue("image", e.target.files[0]);
//                           }}
//                           style={{ display: "none" }}
//                         />
//                         <ErrorMessage
//                           name="image"
//                           component="div"
//                           className="text-red-600"
//                         />
//                       </div>
//                     </div>

//                     <div className="text-left mt-7 sm:mt-0 w-full lg:col-span-2">
//                       <div className="text-lg font-medium text-purple-700 mb-2">
//                         Video
//                       </div>
//                       <div onClick={handleVideoClick} className="w-full">
//                         {values.video ? (
//                           <video
//                             controls
//                             src={URL.createObjectURL(values.video)}
//                             className="h-72 w-full"
//                             alt=""
//                           />
//                         ) : (
//                           <div className="h-72 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
//                             <div className="text-5xl">
//                               <IoCloudUploadSharp />
//                             </div>
//                             <div>Click to upload</div>
//                           </div>
//                         )}
//                         <input
//                           name="video"
//                           type="file"
//                           accept="video/*"
//                           ref={videoRef}
//                           onChange={(e) => {
//                             setFieldValue("video", e.target.files[0]);
//                           }}
//                           style={{ display: "none" }}
//                         />
//                         <ErrorMessage
//                           name="video"
//                           component="div"
//                           className="text-red-600"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="my-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       Description
//                     </div>
//                     <JoditEditor
//                       ref={editor}
//                       value={content}
//                       name="desc"
//                       tabIndex={1}
//                       onBlur={(newContent) => setContent(newContent)}
//                       onChange={(newContent) => {
//                         setFieldValue("desc", newContent);
//                       }}
//                     />
//                     <ErrorMessage
//                       name="desc"
//                       component="div"
//                       className="text-red-600"
//                     />
//                   </div>

//                   <div className="flex gap-5 my-5">
//                     <button
//                       onClick={() => navigate(-1)}
//                       type="button"
//                       className="bg-red-600 h-10 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       type="submit"
//                       className="bg-indigo-600 h-10 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
//                     >
//                       Post
//                     </button>
//                   </div>
        
              
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// export default Testimonials;



import React, { useRef, useState, useEffect } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { Field, Formik, Form, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  desc: Yup.string().required("This field is required"),
  video: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
});

function Testimonials() {
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const [redirect, setRedirect] = useState(false);

  const[loading,setLoading]= useState(false);
  const[testimonial,setTestimonial]=useState()
  const editor = useRef(null);
  const navigate = useNavigate();

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFieldValue("image", file);
  };

  const handleVideoClick = () => {
    videoRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFieldValue("video", file);
  };

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        navigate("/viewtestimonial");
      }, 2000);
    }
  }, [redirect, navigate]);

  return (
    <div className="lg:ml-56 mt-24 lg:mx-5">
       <div className="h-16 flex justify-between">
         <div className="sm:text-2xl text-xl font-semibold text-purple-800 ml-4">
          Testimonial
        </div>

       <Link to={"/viewtestimonial"}>
          <div className="flex gap-2 justify-between mr-5 bg-red-700 rounded-xl h-10 w-42 px-2 font-semibold text-white items-center cursor-pointer">
            View
            <BsFillEyeFill className="text-base sm:text-lg mt-1" />
           </div>
        </Link>
      </div>

      <div className="mt-6 w-full">
        <Formik
          initialValues={{
            name:"",
            desc: "",
            video: "",
            image: "",
            linkedin:"",
            instagram:"",
            facebook:"",
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            setLoading(true);

            try{

              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("desc", values.desc);
              formData.append("image", values.image);
              formData.append("video", values.video);
              formData.append("linkedin", values.linkedin);
              formData.append("facebook", values.facebook);
              formData.append("instagram", values.instagram);
  
              axiosinstance
                .post("/testomonial", formData)
                .then((res) => {
                  setTestimonial(res.data.userData)
                  toast.success("Post Successful");
                  setRedirect(true);
                  resetForm();
                 setLoading(true); 

                })
                
                .catch((error) => {
                  toast.error(error.response.data.message);
                  setLoading(false);

                });
            } catch (error) {
              console.log(error);
              setLoading(false);  
            }
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col gap-5 mx-5">
              <Toaster />

              {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              )}
              
              
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
                  <ErrorMessage name="name" component="div" className="text-red-600" />
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
                  <ErrorMessage name="facebook" component="div" className="text-red-600" />
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
                  <ErrorMessage name="instagram" component="div" className="text-red-600" />
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
                  <ErrorMessage name="linkedin" component="div" className="text-red-600" />
                </div>
              </div>
                
                  <div className="lg:grid lg:grid-cols-3 mt-5 md:grid sm:grid sm:grid-cols-2 gap-10">
                    <div className="text-left mt-0 w-full">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Upload Image
                      </div>
                      <div onClick={handleImageClick} className="w-full border">
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                            className="h-72 w-full object-contain cursor-pointer"
                            alt=""
                          />
                        ) : (
                          <div className="h-72 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
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
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>

                    <div className="text-left mt-7 sm:mt-0 w-full lg:col-span-2">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                       Upload Video
                      </div>
                      <div onClick={handleVideoClick} className="w-full">
                        {values.video ? (
                          <video
                            controls
                            src={URL.createObjectURL(values.video)}
                            className="h-72 w-full"
                            alt=""
                          />
                        ) : (
                          <div className="h-72 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
                            <div className="text-5xl">
                              <IoCloudUploadSharp />
                            </div>
                            <div>Click to upload</div>
                          </div>
                        )}
                        <input
                          name="video"
                          type="file"
                          accept="video/*"
                          ref={videoRef}
                          onChange={(e) => {
                            setFieldValue("video", e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                        <ErrorMessage
                          name="video"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="my-10">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Description
                    </div>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      name="desc"
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                      onChange={(newContent) => {
                        setFieldValue("desc", newContent);
                      }}
                    />
                    <ErrorMessage
                      name="desc"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="flex gap-5 my-5">
                    <button
                      onClick={() => navigate(-1)}
                      type="button"
                      className="bg-red-600 h-10 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-indigo-600 h-10 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                    >
                      Post
                    </button>
                  </div>
        
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Testimonials;
